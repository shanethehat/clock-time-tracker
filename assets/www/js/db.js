/**
 * Clock Time Tracker
 *
 * @copyright Copyright (c) 2013 Shane Auckland
 * @license   http://shaneauckland.co.uk/BSD-License.txt New BSD License
 * @author    Shane Auckland <shane.auckland@gmail.com>
 */

/**
 * Persistent database object
 */

var Db = {
    /**
     * Constructor sets up the database if it is not already created
     * 
     * @return void
     */
    initialise: function() {
        this.db = window.openDatabase('clockTimes', '1.0', 'Clock Times DB', 1000000);
        this.db.transaction(this.createTables, this.errorCallback, this.successCallback);
    },
    /**
     * Create the required tables if not already existing
     * 
     * @param dbh Database handler
     * 
     * @return void
     */
    createTables: function(dbh) {
        dbh.executeSql('DROP TABLE IF EXISTS days');
        dbh.executeSql("CREATE TABLE IF NOT EXISTS days (date DATETIME NOT NULL UNIQUE DEFAULT CURRENT_DATE, balance NUMERIC NOT NULL DEFAULT 0)");
        dbh.executeSql("CREATE TABLE IF NOT EXISTS time (date_id INTEGER NOT NULL , time DATETIME NOT NULL DEFAULT CURRENT_TIME, FOREIGN KEY(date_id) REFERENCES days(rowid))");
    },
    
    /**
     * Generic successful query callback
     * 
     * @return void
     */
    successCallback: function() {
        
    },
    /**
     * Generic error callback
     * 
     * @param error Error object
     * 
     * @return void
     */
    errorCallback: function(error) {
        alert('Database error: ' + error.message);
    },
    /**
     * Load all the times for a given date
     * 
     * @param callback
     * 
     * @return Array
     */
    loadTimesForDay: function(date, callback) {
        this.loadTimesForDayCallback = callback;
        this.loadTimesDate = date;
        this.db.transaction(this.loadTimes, this.errorCallback, this.successCallback);
    },
    /**
     * Run the load times query
     * 
     * @param dbh Database handler
     * 
     * @return void
     */
    loadTimes: function(dbh) {
        var date = app.db.loadTimesDate.getFullYear()+'-'+app.addZeros(app.db.loadTimesDate.getMonth() + 1)+'-'+app.addZeros(app.db.loadTimesDate.getDate() + 1);
        var query = 'SELECT days.balance, time.time FROM days, time WHERE days.date = "'+date+'"';
        dbh.executeSql(query, [], app.db.loadTimesSuccess, app.db.errorCallback);
    },
    /**
     * Handle load times success
     * 
     * @param dbh    Database handler
     * @param result Result object
     * 
     * @return void
     */
    loadTimesSuccess: function(dbh, result) {
        var len = result.rows.length;
        if (len == 0) {
            app.db.loadTimesForDayCallback(null);
            return;
        }
        
        var response = {balance: result.rows.item(0).balance, times: []};
        for (var i = 0; i < len; i++) {
            response.times.push(result.rows.item(i).time);
        }
        
        app.db.loadTimesForDayCallback(response);
    }
};
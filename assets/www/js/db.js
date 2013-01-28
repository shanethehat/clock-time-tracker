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
        
        this.db.transaction(this.testInsert, this.errorCallback, this.successCallBack);
        this.db.transaction(this.testSelect, this.errorCallback, this.successCallBack);
    },
    /**
     * Create the required tables if not already existing
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
     * @return void
     */
    errorCallback: function(error) {
        alert('Database error: ' + error.message);
    }
};
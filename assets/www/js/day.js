/**
 * Clock Time Tracker
 *
 * @copyright Copyright (c) 2013 Shane Auckland
 * @license   http://shaneauckland.co.uk/BSD-License.txt New BSD License
 * @author    Shane Auckland <shane.auckland@gmail.com>
 */

/**
 * Day object
 */

var Day = {
    /**
     * Constructor sets up the day with db and date objects, and a reference to 
     * the day section element
     * 
     * @return void
     */
    initialise: function(date, db) {
        this.date = date;
        this.db = db;
        
        this.db.loadTimesForDay(this.date, this.loadTimesCallback);
        this.setDateDisplay();
        
        document.getElementById('timeInput').addEventListener('submit', this.onFormSubmit, false);
    },
    /**
     * Sets the current day text
     * 
     * @return void
     */
    setDateDisplay: function() {
        var day = Calendar.days[this.date.getDay()];
        var month = Calendar.months[this.date.getMonth()];
        var suffix = this.getSuffix(this.date.getDate());
        document.getElementById('dayTitle').innerHTML = day + ', ' + this.date.getDate() + suffix + ' ' + month + ' ' + this.date.getFullYear();
    },
    /**
     * Return the English suffix for a date
     * 
     * @param date (1-31)
     * 
     * @return string
     */
    getSuffix: function(date) {
        switch (date) {
            case 1:
            case 21:
            case 31:
               return 'st';
            case 2:
            case 22:
               return 'nd';
            case 3:
            case 23:
               return 'rd';
            default:
               return 'th';
        }
    },
    /**
     * Callback function for day times loading
     * 
     * @param data
     * 
     * @return false
     */
    loadTimesCallback: function(data) {
        if (data == null) {
            document.getElementById('currentBalance').innerHTML = 'There are no times set for today';
        } else {
            if (data.times.length % 2 == 0) {
                document.getElementById('currentBalance').innerHTML = 'The balance for today is ' + data.balance;
            } else {
                this.balance = data.balance;
                this.inTime = data.times[data.times.length-1];
                
            }
        }
    },
    /**
     * Form submission handler
     * 
     * @param event
     * 
     * @return void
     */
    onFormSubmit: function(event) {
        event.preventDefault();
        app.day.handleForm(event.target);
    },
    /**
     * Form handler (scoped)
     * 
     * @param form
     * 
     * @return void
     */
    handleForm: function(form) {
        
    }
};
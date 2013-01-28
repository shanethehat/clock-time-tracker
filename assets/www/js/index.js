/**
 * Clock Time Tracker
 *
 * @copyright Copyright (c) 2013 Shane Auckland
 * @license   http://shaneauckland.co.uk/BSD-License.txt New BSD License
 * @author    Shane Auckland <shane.auckland@gmail.com>
 */

/**
 * Application main object
 */
var app = {
    /**
     * Application Constructor
     * 
     * @return void
     */
    initialize: function() {
        this.bindEvents();
        //this.onDeviceReady();
    },
    /**
     * Bind any device events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'
     * 
     * @return void
     */ 
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    /**
     * deviceready Event Handler
     * 
     * The scope of 'this' is the event. In order to call the 'receivedEvent' 
     * function, we must explicity call `app.receivedEvent(...);`
     * 
     * @return void
     */
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    /**
     * Act on received events using the scope of this object
     * 
     * @return void
     */
    receivedEvent: function(eventId) {
        switch(eventId) {
            case 'deviceready':
                this.startClock();
                this.initCalendar();
                break;
        }
    },
    /**
     * Initialise the clock update timer and fire the handler once immediately
     * 
     * @return void
     */
    startClock: function() {
    	app.clockTimer = setInterval(this.updateTime, 1000);
    	this.updateTime();
    },
    /**
     * Update the time display with the current time
     * 
     * @return void
     */
    updateTime: function() {
    	var date = new Date();
    	var h = app.addZeros(date.getHours());
    	var m = app.addZeros(date.getMinutes());
    	var s = app.addZeros(date.getSeconds());
    	document.getElementById('currentTime').innerHTML = h + ':' + m + ':' + s;
    },
    /**
     * Stop the clock update timer
     * 
     * @return void
     */
    stopClock: function() {
    	window.clearInterval(app.clockTimer);
    },
    /**
     * Add a leading zero to any single digit number
     * 
     * @return string
     */
    addZeros: function(num) {
    	num = num.toString()
    	if(num.length == 1) {
    		num = '0' + num;
    	}
    	return num;
    },
    /**
     * Start up the calendar object
     * 
     * @return void
     */
    initCalendar: function() {
        this.calendar = Object.create(Calendar);
        this.calendar.initialise(
            document.getElementById('dateRows'),
            document.getElementById('calendarTitle')
        );
        this.calendar.drawMonth(
            this.calendar.getCurrentMonth(), 
            this.calendar.getCurrentYear()
        );
        document.getElementById('prevMonth').addEventListener('click', function(e) {
            e.preventDefault();
            app.calendar.drawPreviousMonth();
        }, true);
        document.getElementById('nextMonth').addEventListener('click', function(e) {
            e.preventDefault();
            app.calendar.drawNextMonth();
        }, true);
    }
    
};

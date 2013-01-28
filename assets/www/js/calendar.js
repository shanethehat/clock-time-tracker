/**
 * Clock Time Tracker
 *
 * @copyright Copyright (c) 2013 Shane Auckland
 * @license   http://shaneauckland.co.uk/BSD-License.txt New BSD License
 * @author    Shane Auckland <shane.auckland@gmail.com>
 */

/**
 * Calendar object
 * 
 * Controls the generation and display of the calendar display
 */
var Calendar = {
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
	/**
	 * Constructor
	 * 
	 * @returns void
	 */
    initialise: function(target, textElement) {
    	this.target = target;
    	this.textElement = textElement;
    },
    /**
     * Draws a month to the DOM
     * 
     * @param month Month number 0-11
     * @param year Year number
     * 
     * @returns void
     */
    drawMonth: function(month,year) {
    	var date = new Date(year,month,1);
    	var daysInMonth = this.getDaysInMonth(date);
    	var daysDrawn = 0;
    	var startDay = date.getDay();
    	
    	// clear the existing calendar
    	this.clearCalendar();
    	
    	// draw rows
    	while (daysDrawn < daysInMonth) {
    		var row = this.getRow();
    		for (i = 0; i < 7; i++) {
    			var content = '';
    			if ((i >= startDay && daysDrawn === 0) || (daysDrawn > 0 && daysDrawn < daysInMonth)) {
    				content = ++daysDrawn;
    			}
    			var cell = this.getCell(content, content === '' ? 'inactive' : 'active');
    			row.appendChild(cell);
    		}
    		this.target.appendChild(row);
    	}
    	this.textElement.innerHTML = this.months[date.getMonth()] + ' ' + date.getFullYear();  	
    },
    /**
     * Removes all elements from the calendar container
     * 
     * @returns void
     */
    clearCalendar: function() {
    	while (this.target.firstChild) {
    		this.target.removeChild(this.target.firstChild);
    	}
    },
    /**
     * Creates a calendar row
     * 
     * @returns DOMElement
     */
    getRow: function() {
    	var row = document.createElement('div');
    	row.setAttribute('class', 'dateRow');
    	return row;
    },
    /**
     * Creates a calendar cell
     * 
     * @param c  Cell content
     * @param cl Class
     * 
     * @returns DomElement
     */
    getCell: function(c, cl) {
    	var cell = document.createElement('div');
    	var pusher = document.createElement('div');
    	var content = document.createElement('div');
    	cell.setAttribute('class', 'calendarCell '+ cl);
    	pusher.setAttribute('class', 'cellPusher');
    	content.setAttribute('class', 'cellContent');
    	content.innerHTML = c;
    	if (c.toString().length) content.addEventListener('click', app.onDaySelect, false);
    	cell.appendChild(pusher);
    	cell.appendChild(content);
    	return cell;
    },
    /**
     * Returns the number of days in the supplied date object's current month
     * 
     * @param date Date object
     * 
     * @returns Number
     */
    getDaysInMonth: function(date) {
    	month = date.getMonth();
    	longMonths = [0, 2, 4, 6, 7, 9, 11];
    	if (month == 1) {
    		// February detected, check for leap year
    		return new Date(date.getFullYear(), 1, 29).getMonth() == 1 ? 29 : 28;
    	} else if (longMonths.indexOf(month) >= 0) {
    		return 31;
    	}
    	return 30;
    },
    /**
     * Return the currently set month (0-11). If one is not defined then the 
     * current month will be used.
     * 
     * @return Number
     */
    getCurrentMonth: function() {
        if (window.localStorage.getItem('currentMonth') == undefined) {
            // set now as the current month
            var date = new Date();
            this.setCurrentMonth(date.getMonth());
        }
        return window.localStorage.getItem('currentMonth');
    },
    /**
     * Sets the current month to local storage
     * 
     * @param month Current month value (0-11)
     * 
     * @return void
     */
    setCurrentMonth: function(month) {
        if (!isNaN(month) && month >= 0 && month <= 11) {
            window.localStorage.setItem('currentMonth', month)
        }
    },
    /**
     * Return the currently set year. If one is not defined then the current 
     * year will be used.
     * 
     * @return Number
     */
    getCurrentYear: function() {
        if (window.localStorage.getItem('currentYear') == undefined) {
            // set now as the current month
            var date = new Date();
            this.setCurrentYear(date.getFullYear());
        }
        return window.localStorage.getItem('currentYear');
    },
    /**
     * Sets the current year to local storage
     * 
     * @param year Current year value
     * 
     * @return void
     */
    setCurrentYear: function(year) {
        if (!isNaN(year)) {
            window.localStorage.setItem('currentYear', year)
        }
    },
    /**
     * Update the view with the previous month
     * 
     * @return void
     */
    drawPreviousMonth: function() {
        var month = this.getCurrentMonth();
        var year = this.getCurrentYear();
        
        if (month == 0) {
            month = 11;
            this.setCurrentYear(--year);
        } else {
            month--;
        }
        
        this.setCurrentMonth(month);
        
        this.drawMonth(month, year);
    },
    /**
     * Update the view with the next month
     * 
     * @return void
     */
    drawNextMonth: function() {
        var month = this.getCurrentMonth();
        var year = this.getCurrentYear();
        
        if (month == 11) {
            month = 0;
            this.setCurrentYear(++year);
        } else {
            month++;
        }
        
        this.setCurrentMonth(month);
        
        this.drawMonth(month, year);
    },
}

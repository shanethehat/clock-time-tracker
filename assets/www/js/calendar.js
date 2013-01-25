/**
 * Calendar object controls the actions and display of the calendar view
 */
var calendar = {
	/**
	 * Constructor
	 * 
	 * @returns void
	 */
    initialise: function(target) {
    	this.target = target;
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
    	var currentDay = 0;
    	
    	// draw rows
    	while (daysDrawn < daysInMonth) {
    		var row = this.getRow();
    	}
    	
    	
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
    	cell.appendChilld(pusher);
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
    		return new Date(year, 1, 29).getMonth() == 1 ? 29 : 28;
    	} else if (longMonths.indexOf(month) >= 0) {
    		return 31;
    	}
    	return 30;
    }
}

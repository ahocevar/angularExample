/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
todomvc.factory('todoStorage', function() {
	var STORAGE_ID = 'todos-angularjs';

	var initialTodos = [{
		title: "ShopYEG.com: Complete the look and feel of the site and build the spinner in HTML/PHP",
		dueDate: "1/8/2014",
		statusFilter: "inactive",
		completed: true
	}, {
		title: "Crystal Glass: Add new video to the home page",
		dueDate: "2/25/2014",
		statusFilter: "inactive",
		completed: true
	}, {
		title: "Cleantech: Build the site in Wordpress",
		dueDate: "3/15/2014",
		statusFilter: "active",
		completed: false
	}, {
		title: "The Bay Company: Build the site in Drupal 7",
		dueDate: "6/5/2014",
		statusFilter: "active",
		completed: false
	}, {
		title: "The Victoria Foundation: Add toolbar buttons to TinyMCE in Drupal 7",
		dueDate: "8/28/2014",
		statusFilter: "inactive",
		completed: true
	}, {
		title: "AIHA: Learn Python for remote contract work",
		dueDate: "7/21/2014",
		statusFilter: "active",
		completed: false
	}, {
		title: "Crest.ca: Add pages based on client email",
		dueDate: "8/28/2014",
		statusFilter: "inactive",
		completed: true
	}, {
		title: "Fort Air: Connect to Envista SQL backend through GoDaddy using ASPX and dump the minute-by-minute and hourly data into SQL backend on new server using PHP. Connect data to custom PHP calls to display information in HTML5 canvas object and allow user to manipulate time, number of stations displayed, number of substances displayed, and objective/guideline values.",
		dueDate: "5/15/2014",
		statusFilter: "active",
		completed: false
	}];

	return {
		get: function() {
			return JSON.parse(localStorage.getItem(STORAGE_ID)) || initialTodos;
		},

		put: function(todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});

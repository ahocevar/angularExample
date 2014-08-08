/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, filterFilter) {
	//var todos = $scope.todos = todoStorage.get();
	var todos = $scope.todos = [
	{
		title: "ShopYEG.com: Complete the look and feel of the site and build the spinner in HTML/PHP",
		dueDate: "1/8/2014",
		statusFilter: "inactive",
		completed: true
	},
	{
		title: "Crystal Glass: Add new video to the home page",
		dueDate: "2/25/2014",
		statusFilter: "inactive",
		completed: true
	},
	{
		title: "Cleantech: Build the site in Wordpress",
		dueDate: "3/15/2014",
		statusFilter: "active",
		completed: false
	},
	{
		title: "The Bay Company: Build the site in Drupal 7",
		dueDate: "6/5/2014",
		statusFilter: "active",
		completed: false
	},
	{
		title: "The Victoria Foundation: Add toolbar buttons to TinyMCE in Drupal 7",
		dueDate: "8/28/2014",
		statusFilter: "inactive",
		completed: true
	},
	{
		title: "AIHA: Learn Python for remote contract work",
		dueDate: "7/21/2014",
		statusFilter: "active",
		completed: false
	},
	{
		title: "Crest.ca: Add pages based on client email",
		dueDate: "8/28/2014",
		statusFilter: "inactive",
		completed: true
	},
	{
		title: "Fort Air: Connect to Envista SQL backend through GoDaddy using ASPX and dump the minute-by-minute and hourly data into SQL backend on new server using PHP. Connect data to custom PHP calls to display information in HTML5 canvas object and allow user to manipulate time, number of stations displayed, number of substances displayed, and objective/guideline values.",
		dueDate: "5/15/2014",
		statusFilter: "active",
		completed: false
	}
	];

	$scope.predicate = 'dueDate';

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function (newValue, oldValue) {
		$scope.remainingCount = filterFilter(todos, { completed: false }).length;
		$scope.completedCount = todos.length - $scope.remainingCount;
		$scope.allChecked = !$scope.remainingCount;
		if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
			todoStorage.put(todos);
		}
	}, true);

	if ($location.path() === '') {
		$location.path('/');
	}

	$scope.location = $location;

	$scope.$watch('location.path()', function (path) {
		$scope.statusFilter = (path === '/active') ?
			{ completed: false } : (path === '/completed') ?
			{ completed: true } : null;
	});

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}

		var today = new Date();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var year = 1900 + today.getYear();
		today = month + "/" + day + "/" + year;
	
		todos.push({
			title: newTodo,
			statusFilter: "active",
			dueDate: today,
			completed: false
		});

		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {
		todos[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.doneEditing($scope.originalTodo);
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

	$scope.clearCompletedTodos = function () {
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
	};

	$scope.markAll = function (completed) {
		todos.forEach(function (todo) {
			todo.completed = completed;
		});
	};
});

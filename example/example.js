;(function($, window, document, undefined) {
	
	'use strict';

	window.ExampleApp = {
		init: function() {
			var self = ExampleApp;
			self.bindEvents();
		},

		bindEvents: function() {
			var self = ExampleApp;

			if (window.loaded) {
				self.windowLoad();
			} else {
				$(window).load(self.windowLoad);
			}
		},

		windowLoad: function() {
			var self = ExampleApp;
			self.typer();
		},

		typer: function() {
			$('[data-typer-targets]').typer();
		}
	};

	ExampleApp.init();

})(jQuery, window, document);

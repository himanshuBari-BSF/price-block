module.exports = function (grunt) {
	// Project configuration
	grunt.initConfig({
		shell: {
			command1: {
				command: "npm run lint:php",
			},
			command2: {
				command: "npm run lint:php:fix",
			},
			combined: {
				command: "npm run lint:php && npm run lint:php:fix",
			},
		},
	});

	// Load the plugin that provides the "shell" task.
	grunt.loadNpmTasks("grunt-shell");

	// Default task(s).
	grunt.registerTask("formatit", ["shell:combined"]);
};

module.exports = {
  // Specify the entry point of your application
  script: 'server.js',

  // Watch these files for changes
  watch: ['server'],

  // Ignore these files/directories
  ignore: ['node_modules'],

  // Environment variables
  env: {
    NODE_ENV: 'development'
  },

  // Additional options
  // More options can be found in the documentation: https://github.com/remy/nodemon#nodemon
};

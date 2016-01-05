module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
      'chai',
      'sinon-chai'
    ],

    reporters: [
      'mocha'
    ],

    files: [
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel']
    },

    browsers: [
      'PhantomJS'
    ],
  });
};

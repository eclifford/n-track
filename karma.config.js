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
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },

    browsers: [
      'PhantomJS'
    ],
  });
};

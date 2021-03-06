//"slim": Just the most important things for hack-n-slash

'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        js: [`${appRoot}/src/**/*.js`],
        jsTests: [`${appRoot}/test/**/*-test.js`]
    };

var defaultTasks = ['env:development', 'dev:eslint', 'dev:mocha', 'dev:watch'];

gulp.task('env:development', () => {
    process.env.NODE_ENV = 'development';
});

gulp.task('dev:eslint' , () => {
    return gulp.src(paths.js.concat(paths.jsTests))
        .pipe(plugins.plumber())
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());
});

gulp.task('dev:mocha', ['dev:eslint'], function () {
    gulp.src(paths.jsTests)
        .pipe(plugins.plumber())
        .pipe(plugins.mocha());
});

gulp.task('dev:watch', () => {
    gulp.watch(paths.js.concat(paths.jsTests), ['development', 'dev:mocha']);
});


gulp.task('development', defaultTasks);


'use strict'

var gulp = require('gulp')
var concat = require('gulp-concat')
var clean = require('gulp-clean-dest')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var browserSync = require('browser-sync').create()

gulp.task('build', function () {
  return gulp.src([
      './src/jquery.recital.js',
      './bower_components/player-api/javascript/froogaloop.js'
    ])
    .pipe(concat('jquery.recital.js'))
    .pipe(clean('./dist'))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('jquery.recital.min.js'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('serve', ['build'], function () {
  browserSync.init({
      server: { baseDir: './' }
    })

  browserSync.watch('./dist/**', browserSync.reload)
  gulp.watch('./src/**', ['build'])
})

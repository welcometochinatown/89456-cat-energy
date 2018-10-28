'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var csso = require('gulp-csso')
var imagemin = require('gulp-imagemin')
var webp = require('gulp-webp')
var svgstore = require('gulp-svgstore')
var posthtml = require('gulp-posthtml')
var include = require('posthtml-include')
var del = require('del')
var server = require('browser-sync').create()
var imagemin = require('gulp-imagemin')
var webp = require('gulp-webp')
var htmlmin = require('gulp-htmlmin')
var uglify = require('gulp-uglify')
var pump = require('pump')
var concat = require('gulp-concat')
var babel = require('gulp-babel')

gulp.task('css', function() {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
})

gulp.task('images', function() {
  return gulp.src('source/img/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img/optimized'))
})

gulp.task('webp', function() {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({
      quality: 70
    }))
    .pipe(gulp.dest('source/img/webp'))
})

gulp.task('sprite', function() {
  return gulp.src('source/img/optimized/sprite-*.svg')
    .pipe(svgstore({
      inLineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/img/sprite'))
})

gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'))
})

gulp.task('minify', () => {
  return gulp.src('build/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('compress', () => {
  return gulp.src('source/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
})

gulp.task('copy', function() {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/webp/**',
      'source/img/optimized/**',
      'source/img/sprite/sprite.svg',
      'source/js/**'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
})

gulp.task('clean', function() {
  return del('build')
})

gulp.task('server', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  })

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'))
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'))
  gulp.watch('source/*.html', gulp.series('html', 'refresh'))
})

gulp.task('refresh', function(done) {
  server.reload()
  done()
})

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'compress',
  'html',
  'minify'
))

gulp.task('start', gulp.series('build', 'server'))

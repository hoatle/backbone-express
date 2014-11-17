'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');




// gulp.task('browserify', function () {
//   var browserified = transform(function(filename) {
//     var b = browserify(filename);
//     return b.bundle();
//   });
//   return gulp.src(['src/*.js'])
//     .pipe(browserified)
//     .pipe(gulp.dest('public/dist'));
// });

// gulp.task('browserify', function(){
//   var b = browserify();
//   b.add('./main.js');
//   return b.bundle()
//     .pipe(source('main.js'))
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('browserify', function () {
//   return browserify('./src/main.js', {
//       transform: [hbsfy]
//     })
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('./public/dist'));
// });
gulp.task('browserify', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist'));
});


gulp.task('server', function() {
  return nodemon({
    script: 'server.js',
    ignore: ['src/js/**/*', 'public/**/*', 'README.md', 'Procfile']
  });
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*', ['browserify']);
});

gulp.task('default', ['server', 'browserify', 'watch']);









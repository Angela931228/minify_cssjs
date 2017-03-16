var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var js_folder = "js/"
var css_folder = "styles/"
 
gulp.task('compressjs', function (cb) {
  pump([
        gulp.src(js_folder+'*.js'),
        uglify(),
        rename({
            suffix: '.min'
        }),
        gulp.dest(js_folder)
    ],
    cb
  );
});

gulp.task('minify-css', function() {
    return gulp.src(css_folder+'*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        })).pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(css_folder));
});
gulp.task('default', ['compressjs','minify-css']);
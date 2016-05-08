var gulp = require('gulp'),  
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    modify = require('gulp-modify');

gulp.task('js', function(){
    gulp.src('./app/scripts/*.js')
    .pipe(concat('QuestionMaker.min.js'))
    .pipe(uglify({
        mangle: false,
        compress: {
            drop_console: true
        }
    }))
    .pipe(modify({
        fileModifier: function(file, contents) {
            return contents.replace(/\/app\//g, '/dist/');
        }
    }))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('fonts', function(){
    gulp.src('./app/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('css', function(){
    gulp.src('./app/styles/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('html', function(){
    gulp.src('./app/views/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('entry', function(){
    gulp.src('./app/index.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, minifyCss: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('image', function(){
    gulp.src('./app/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('clean', function() {
    gulp.src(['./dist/'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('modify', function(){
    setTimeout(function(){
        gulp.src('./dist/index.html')
        .pipe(modify({
            fileModifier: function(file, contents) {
                return contents.replace(/\/app\//g, '/dist/').replace(/<!--\{main\}-->.*<!--\{endmain\}-->/g, '<script src="/dist/js/QuestionMaker.min.js"></scirpt>').replace(/base.css/, 'base.min.css');
            }
        }))
        .pipe(gulp.dest('./dist'));
    }, 200);
    
});

gulp.task('default', ['clean'], function() {
    setTimeout(function(){
        gulp.start(['js', 'image', 'fonts', 'css', 'entry', 'html', 'modify']);
    }, 100);
});
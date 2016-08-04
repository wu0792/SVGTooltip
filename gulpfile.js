var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');

gulp.task('watch', function() {
    gulp.watch('./less/*.less', ['less']);
});

gulp.task('less', function() {
    return gulp.src('./less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .on('error', function(e) {})
        .pipe(gulp.dest('./src/css'));
});

// 静态服务器
gulp.task('browser-sync', ['watch'], function() {
    // 监听HTML更改事件并重新加载
    browserSync.watch(["*/*.html", "*.html"]).on("change", browserSync.reload);

    // 提供一个回调来捕获所有事件的CSS 
    // files - 然后筛选的'change'和重载所有
    // css文件在页面上
    browserSync.watch("**/*.css", function(event, file) {
        if (event === "change") {
            browserSync.reload("*.css");
        } else {
            browserSync.reload();
        }
    });

    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 1234
    });
});

gulp.task('init', ['browser-sync', 'less'])
gulp.task('default', ['init']);
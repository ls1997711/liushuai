// 1.导入所需模块
const { dest, watch } = require('gulp');
const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

// 发布任务 
//  测试任务
function fntext(){
    console.log('小测一下');
}
//优化html
function fnhtml(){
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/pages'));
}
// 优化主页
function fncopy(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
}
// 优化图片
function fnimg(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}
//优化css
function fncss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle : 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('dist/css'))
}
// 优化js
function fnJs() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/js'))
}
// 监听
function fnwatch(){
    watch('./src/pages/*.html',fnhtml);
    watch('./src/sass/*.scss',fncss);
    watch('./src/img/*',fnimg);
    watch('./src/js/*.js',fnJs);
    watch('./src/index.html',fncopy);
}

// 导出模块
exports.text = fntext;
exports.html = fnhtml;
exports.copy = fncopy;
exports.img = fnimg;
exports.css = fncss;
exports.js = fnJs;
exports.default = fnwatch;
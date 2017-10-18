var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('nodemon');

var jsfiles = ['*.js', 'src/**/*.js'];

gulp.task ('style', function (){
    return gulp.src(jsfiles).pipe(jshint());
});

gulp.task ('inject', function (){
   var wiredep =  require('wiredep').stream; 
   var inject = require('gulp-inject');
   
   var injectSrc = gulp.src(['./public/css/*.css' , './public/js/*.js']);
   
   var injectOptions = {
       ignorePath : "/public"
   };
   
   var options = {
       bowerJson : require('./bower.json'),
       directory : './bower_components',
       ignorePath: '../../bower_components'
   } 
   
   return gulp.src('./src/views/*.html').
          pipe(wiredep(options)).
          pipe(inject(injectSrc,injectOptions)).
          pipe(gulp.dest('./src/views'));
});

gulp.task('serve' , ['style','inject'], function (){
    var options = {
        script : 'app.js',
        delayTime : 1,
        watch : jsfiles
    } 
    
    return nodemon(options).on('restart', function (){
        console.log('Restarting server');
    });
});
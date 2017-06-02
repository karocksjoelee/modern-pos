const gulp = require('gulp');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const cm = require('./utility/common-module');

gulp.task('default', ['jshint', 'nodemon','watch']);


gulp.task('jshint', () => {
    return gulp.src(['routes/**/*.js', 'middleware.js', 'bin/www.js'])
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', () => {

    gulp.watch(['server/**/*.js','server.js','bin/www'],['jshint']);
    gulp.watch(['routes/**/*.js', 'middleware.js', 'bin/www.js', 'gulpfile.js','dist/*.*']).on('change', () => {
        cm.logWarn('[SERVER] Back-End File Changed');
    });

});

gulp.task('nodemon',() => {
   nodemon({
       script: './bin/www',
       env: {'NODE_ENV':'development'},
       ignore: ['src']
   }).on('restart',() => {
       cm.logWarn('[SERVER] Restarted ');
   });
});


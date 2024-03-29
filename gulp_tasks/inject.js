const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const gulpInject = require('gulp-inject');
const print = require('gulp-print').default;
const conf = require('../conf/gulp.conf');

gulp.task('inject', inject);

function inject() {
  const injectScripts = gulp.src([
    conf.path.tmp('**/*.js'),
    `!${conf.path.tmp('**/*.spec.js')}`
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  const injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(conf.paths.src + '/index.html')
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(print())
    .pipe(gulp.dest('./' + conf.paths.tmp))
    .pipe(print())
    .pipe(browserSync.stream());
}


gulp.task('wiredep',inject);

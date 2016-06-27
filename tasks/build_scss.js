import gulp from 'gulp';
import {path, tasks} from './const';
import exceptionHandler from 'gulp-plumber';
import sass from 'gulp-sass';


const SCSS = path.DEV + '**/*.scss';

gulp.task(tasks.CLIENT_BUILD_SCSS_DEV, () => {
  return gulp.src(SCSS, {base: path.DEV})
             .pipe(exceptionHandler({ errorHandler: handleError }))
             .pipe(sass({errLogToConsole: true}))
             .pipe(gulp.dest( path.DEV + '.'));
});

gulp.task(tasks.CLIENT_BUILD_SCSS_DIST, () => {
  return gulp.src(SCSS, {base: path.DEV})
             .pipe(exceptionHandler())
             .pipe(sass({outputStyle: 'compressed'}))
             .pipe(gulp.dest( path.DIST + '.'));
});


function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

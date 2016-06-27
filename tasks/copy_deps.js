import gulp from 'gulp';
import {path, tasks} from './const';

const NODE = path.NODE;
const DIST = path.DIST;

// gulp.task(tasks.CLIENT_COPY_DEPS_DIST, () => {

// });


gulp.task(tasks.CLIENT_COPY_VENDOR, () => {
  gulp.src([`${NODE}rxjs/**/*`])
      .pipe(gulp.dest(`${DIST}js/rxjs`));

  gulp.src([`${NODE}angular2-in-memory-web-api/**/*`])
    .pipe(gulp.dest(`${DIST}js/angular2-in-memory-web-api`));

  return gulp.src([`${NODE}@angular/**/*`])
    .pipe(gulp.dest(`${DIST}js/@angular`));
});

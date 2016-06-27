import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import { path, tasks } from './const';

const NODE = path.NODE;

gulp.task(tasks.CLIENT_BUNDLE_VENDOR, () => {
  return gulp.src([
    `${NODE}core-js/client/shim.min.js`,
    `${NODE}zone.js/dist/zone.js`,
    `${NODE}reflect-metadata/Reflect.js`,
    `${NODE}systemjs/dist/system.src.js`,
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST));
});


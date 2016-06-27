import gulp from 'gulp';
// import concat from 'gulp-concat';
import systemjsBuilder from 'systemjs-builder';
import { path, tasks } from './const';

const NODE = path.NODE;

// gulp.task(tasks.CLIENT_BUNDLE_APP, () => {
//   return gulp.src([
//     `${NODE}core-js/client/shim.min.js`,
//     `${NODE}zone.js/dist/zone.js`,
//     `${NODE}reflect-metadata/Reflect.js`,
//     `${NODE}systemjs/dist/system.src.js`,
//   ])
//     .pipe(concat('vendors.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(path.DIST));
// });


gulp.task(tasks.CLIENT_BUNDLE_APP,  () => {
  let builder = new systemjsBuilder('client/dist', './systemjs.config.js');
  return builder.buildStatic('app', 'client/dist/systemboot.js');
});

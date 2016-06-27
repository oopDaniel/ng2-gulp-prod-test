import gulp from 'gulp';
import browserSync from 'browser-sync';
import {path, tasks} from './const';

const TS   = path.DEV + '**/*.ts';
const SCSS = path.DEV + '**/*.scss';
const CSS  = path.DEV + 'charts/**/*.css';
const HTML = path.DEV + '**/*.html';

gulp.task(tasks.CLIENT_RELOAD, () => {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, [tasks.CLIENT_BUILD_TS_DEV, tasks.CLIENT_RELOAD], () => {
  browserSync({proxy: "http://localhost:3333", reloadDelay: 1000});


  gulp.watch(SCSS, [tasks.CLIENT_BUILD_SCSS_DEV, tasks.CLIENT_RELOAD]);
  gulp.watch(CSS, [tasks.CLIENT_CONCAT_CSS, tasks.CLIENT_RELOAD]);
  gulp.watch(TS, [tasks.CLIENT_BUILD_TS_DEV, tasks.CLIENT_RELOAD]);
  gulp.watch(HTML, [tasks.CLIENT_RELOAD]);
});

import gulp from 'gulp';
import {tasks} from './const';

gulp.task(tasks.CLIENT_BUILD_DEV, [
  tasks.CLIENT_BUILD_TS_DEV,
  tasks.CLIENT_BUILD_SCSS_DEV,

  // tasks.CLIENT_IMAGE_SPRITE,

  tasks.CLIENT_CONCAT_CSS
]);

gulp.task(tasks.CLIENT_BUILD_DIST, [
  tasks.CLIENT_DEL_DIST,

  tasks.CLIENT_BUILD_TS_DIST,
  tasks.CLIENT_BUILD_SCSS_DIST,

  tasks.CLIENT_CONCAT_CSS,
  // tasks.CLIENT_UNIT_TEST,

  tasks.CLIENT_VIEWS_DIST,

  tasks.CLIENT_IMAGE_SPRITE,

  tasks.CLIENT_IMAGE_DIST,
  tasks.CLIENT_FONT_DIST,

  tasks.CLIENT_REV
]);

import gulp from 'gulp';
import { path, tasks } from './const';
import concat from 'gulp-concat';


gulp.task(tasks.CLIENT_CONCAT_JS, () => {
  return gulp.src(CSSPath)
             .pipe(concat('d3charts.css'))
             .pipe(gulp.dest( path.DEV + '_assets/styles'));
});


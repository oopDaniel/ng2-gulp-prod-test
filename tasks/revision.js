import gulp from 'gulp';
import exceptionHandler from 'gulp-plumber';
import { path, tasks } from './const';
import RevAll from 'gulp-rev-all';
import util from 'gulp-util';

const TS_CONFIG = path.ROOT + 'tsconfig.json';


gulp.task(tasks.CLIENT_REV, () => {

  let revAll = new RevAll({ dontRenameFile: [/^\/favicon.ico$/g, '.html'] });
  return gulp.src('client/dist/**')
        .pipe(exceptionHandler())
        .pipe(revAll.revision())
        .on('end', ()=>util.log('> Appending content hash...'))
        .pipe(gulp.dest('client/dist'));
});

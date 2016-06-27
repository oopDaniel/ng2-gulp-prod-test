import gulp from 'gulp';
import tsc from 'gulp-typescript';
import exceptionHandler from 'gulp-plumber';
import { path, tasks } from './const';
import uglify from 'gulp-uglify';
// import rev from 'gulp-rev';
import util from 'gulp-util';
import embedTemplates from 'gulp-angular-embed-templates';

const TS_CONFIG = path.ROOT + 'tsconfig.json';

gulp.task(tasks.CLIENT_BUILD_TS_DEV, () => {
  let tsconfigSrc = tsc.createProject(TS_CONFIG);

  return tsconfigSrc.src(['client/dev/**','!typings/**', '!client/dist/**'])
                    .pipe(exceptionHandler())
                    .pipe(tsc(tsconfigSrc))
                    .js
                    .pipe(gulp.dest('.'));
});

gulp.task(tasks.CLIENT_BUILD_TS_DIST, () => {
  let tsconfigSrc = tsc.createProject(TS_CONFIG,
    {
      typescript: require('typescript'),
      removeComments: true,
      outFile: 'app.js'
    });

  console.log(`> Compiling the ts files (${path.DEV}**/*.ts)...`);

  return gulp.src([`${path.DEV}**/*.ts`, `!${path.DEV}boot.ts`])
                    // .pipe(embedTemplates())
                    .pipe(exceptionHandler())
                    .pipe(tsc(tsconfigSrc))
                    .js
                    // .on('end', ()=>util.log('> Finished compilation of ts files!'))
                    .on('end', ()=>util.log('> Uglifying...'))
                    .pipe(uglify())
                    // .on('end', ()=>util.log('> Finished uglification!'))
                    // .on('end', ()=>util.log('> Appending content hash...'))
                    // .pipe(rev())
                    // .on('end', ()=>util.log('> Finished revisioning!'))
                    .pipe(gulp.dest(path.DIST));
});

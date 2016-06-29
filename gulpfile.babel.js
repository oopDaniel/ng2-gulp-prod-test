import gulp             from 'gulp';
import tsc              from 'gulp-typescript';
import concat           from 'gulp-concat';
import uglify           from 'gulp-uglify';
import util             from 'gulp-util';
import sourcemaps       from 'gulp-sourcemaps';
import exceptionHandler from 'gulp-plumber';
import htmlreplace      from 'gulp-html-replace';
import systemjsBuilder  from 'systemjs-builder';
import del              from 'del';
import runSequence      from 'run-sequence';

const ROOT = './';
const DEV  = './client/dev/';
const DIST = './client/dist/';
const NODE = './node_modules/';
const SYSJSCONFIG = './systemjs.config.dist.js';



//****************************************
//        Clean the 'dist' folder
//****************************************

gulp.task('clean', () => del([`${DIST}**/*`]));



//****************************************
//          Compile ts files
//****************************************

gulp.task('compile_ts:dev', () => {
  let tsconfigSrc = tsc.createProject(`${ROOT}tsconfig.json`);

  return tsconfigSrc.src([`${DEV}**`, `!${DIST}**`])
                    .pipe(exceptionHandler())
                    .pipe(tsc(tsconfigSrc))
                    .js
                    .pipe(gulp.dest(`${DIST}`));
});


gulp.task('compile_ts:dist', () => {
  let TS_CONFIG   = `${ROOT}tsconfig.json`,
      tsconfigSrc = tsc.createProject(TS_CONFIG,
    {
      removeComments: true,
      // outFile:        'app.js',
      outDir:         `${DIST}js`,
    });

  console.log(`> Compiling the ts files (${DEV}**/*.ts)...`);

  return gulp.src([`${DEV}**/*.ts`
    // ,"typings/*.d.ts"
    ])
                    .pipe(exceptionHandler())
                    .pipe(sourcemaps.init())
                    .pipe(tsc(tsconfigSrc))
                    .pipe(sourcemaps.write('.'))
                    // .js
                    // .on('end', ()=>util.log('> Uglifying...'))
                    // .pipe(uglify())
                    .pipe(gulp.dest(`${DIST}js`));
});



//****************************************
//      Build static systemjs file
//****************************************

gulp.task('bundle:app', () => {
  var builder = new systemjsBuilder(DIST, SYSJSCONFIG);
  return builder.buildStatic(`boot`, `${DIST}booter.js`)
    .then( () => del(`${DIST}js`));
});



//****************************************
//           Minimization
//****************************************

gulp.task('minify:js', () => {
  console.log(`> Uglifying 'booter.js'...`);
  return gulp.src(`${DIST}booter.js`,{base: `./`})
    .pipe(uglify())
    .pipe(gulp.dest('./'));
})

//****************************************
//         Bundle the vendors
//****************************************

gulp.task('bundle:vendor', () => {
    return gulp.src([
        `${NODE}zone.js/dist/zone.js`,
        `${NODE}reflect-metadata/Reflect.js`,
        // `${NODE}systemjs/dist/system-polyfills.js`,
        `${NODE}core-js/client/shim.min.js`,
        // `${NODE}systemjs/dist/system.js`,
        `${NODE}systemjs/dist/system.src.js`,
        `system.config.js`,
      ])
        .pipe(concat('vendors.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(`${DIST}lib`));
});

gulp.task('bundle:vendor.min', () => {
  return gulp.src([
    `${NODE}core-js/client/shim.min.js`,
    `${NODE}zone.js/dist/zone.js`,
    `${NODE}reflect-metadata/Reflect.js`,
    `${NODE}systemjs/dist/system.src.js`,
  ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${DIST}lib`));
});



//****************************************
//            HTML replace
//****************************************

gulp.task('html:replace', () => {
  return gulp.src(`${DIST}index.html`)
    .pipe(htmlreplace({
        'vendor': 'lib/vendors.min.js',
        'boot':   'booter.js',
        'css':    'css/styles.css',
    }))
    .pipe(gulp.dest(`${DIST}`));
});


//****************************************
//         Copy dependencies
//****************************************

gulp.task('copy:vendor', () => {

  gulp.src([`${NODE}rxjs/**/*`])
      .pipe(gulp.dest(`${DIST}lib/rxjs`));

  return gulp.src([`${NODE}@angular/**/*`])
    .pipe(gulp.dest(`${DIST}lib/@angular`));

    // return gulp.src([
    //     `${NODE}rxjs/bundles/Rx.js`,
    //     `${NODE}@angular/**/*`
    // ])
    // .pipe(gulp.dest(`${DIST}lib`));
});

gulp.task('copy:css', () => {
  return gulp.src(`${DEV}css/**/*`)
      .pipe(gulp.dest(`${DIST}css`));
});

gulp.task('copy:html', () => {
  return gulp.src(`${ROOT}index.html`,{base:'./'})
      .pipe(gulp.dest(DIST));
});

gulp.task('copy:vendor.map', () => {
  return gulp.src([
      // `${NODE}es6-shim/es6-shim.map`,
      `${NODE}core-js/client/shim.min.js.map`,
      `${NODE}reflect-metadata/Reflect.js.map`,
      // `${NODE}systemjs/dist/system-polyfills.js.map`
    ]).pipe(gulp.dest(`${DIST}lib`));
});

gulp.task('copy', ['copy:vendor', 'copy:css', 'copy:html', 'copy:vendor.map']);



//****************************************
//               Build up
//****************************************

gulp.task('app', (callback) => {
  runSequence('compile_ts:dist', 'bundle:app', 'minify:js', callback);
});
gulp.task('bundle', ['bundle:vendor.min']);
gulp.task('view', ['html:replace']);
gulp.task('build', (callback) => {
  runSequence('clean', 'copy', 'bundle', 'app', 'view', callback);
});


/*
// ---------   Doesn't Work    ----------

gulp.task('bundle', ['vendor', 'app'], () => {
    return gulp.src([
        `${DIST}js/booter.js`,
        // `${DIST}app.js`,
        `${DIST}lib/vendors.js`
        // `${DIST}lib/vendors.min.js`
        // `${DIST}lib/vendors.minn.js`
        ])
    .pipe(concat('app.bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(DIST));
});
*/

/*
// ---------   Doesn't Work    ----------

gulp.task('cat', () => {
  return gulp.src([
      `${DIST}js/booter.js`,
      // `${DIST}app.js`,
      // `${DIST}lib/vendors.js`
      // `${DIST}lib/vendors.min.js`
      `${DIST}lib/vendors.minn.js`
    ])
    .pipe(concat('app.bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(DIST));
})
*/

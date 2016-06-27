import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import {path, tasks} from './const';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';

const IMAGES_PATH = path.DEV + '_assets/images/';
const IMAGES = IMAGES_PATH + '*';

const SPRITE_TARGET = 'elements'
const SPRITE = path.DEV + `_assets/images/${SPRITE_TARGET}/*.png`;



gulp.task(tasks.CLIENT_IMAGE_DIST, () => {
  return gulp.src(IMAGES, {base: path.DEV})
			       .pipe(imageMin())
             .pipe(gulp.dest(path.DIST));
});

gulp.task(tasks.CLIENT_IMAGE_SPRITE, () => {

  let spriteData = gulp.src(SPRITE, {base: path.DEV})
                       .pipe(spritesmith({
                          imgName: SPRITE_TARGET + '_sprite.png',
                          imgPath: IMAGES_PATH + SPRITE_TARGET + '_sprite.png',
                          cssName: 'sprite.scss',
                          cssFormat: 'scss',
                          padding: 1
                          // ,
                          // cssOpts: {
                          //   cssSelector: item => {
                          //       return (item.name.indexOf('_hover') !== -1 || item.name.indexOf('-hover') !== -1 )?
                          //         '.sprite-' + item.name.replace(/.hover/, ':hover')
                          //         :
                          //         '.sprite-' + item.name;
                          //     }
                          // }
                        }));

  // Pipe image stream through image optimizer and onto disk
  let imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    // .pipe(buffer())
    // .pipe(imageMin())
    .pipe(gulp.dest(IMAGES_PATH));

  // Pipe CSS stream through CSS optimizer and onto disk
  let cssStream = spriteData.css
    .pipe(gulp.dest(path.DEV + '_assets/styles/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);



  // return gulp.src(SPRITE, {base: path.DEV})
  //            .pipe(spritesmith({
  //               imgName: SPRITE_TARGET + '_sprite.png',
  //               cssName: 'sprite.scss',
  //               cssFormat: 'scss'
  //             }))
  //            .pipe(gulp.dest(path.DEV + '_assets/styles/'));
});

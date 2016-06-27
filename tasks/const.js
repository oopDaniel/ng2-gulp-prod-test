export const path = {
  ROOT: './',
  DEV: './client/dev/',
  DIST: './client/dist/',
  TEST: './tests/',
  NODE: './node_modules/'
}

export const tasks = {

  CLIENT_BUNDLE_APP: 'client.bundle:app',

  CLIENT_BUILD_DEV: 'client.build:dev',
  CLIENT_BUILD_DIST: 'client.build:dist',

  CLIENT_CONCAT_CSS: 'client.concat_css',
  CLIENT_CONCAT_JS: 'client.concat_js',

  CLIENT_BUNDLE_VENDOR: 'client.bundle:vendor',
  CLIENT_COPY_VENDOR: 'client.copy:vendor',

  CLIENT_REV: 'client.rev',

  CLIENT_BUILD_TS_DEV: 'client.build_ts:dev',
  CLIENT_BUILD_TS_DIST: 'client.build_ts:dist',
  CLIENT_BUILD_SCSS_DEV: 'client.build_scss:dev',
  CLIENT_BUILD_SCSS_DIST: 'client.build_scss:dist',

  CLIENT_IMAGE_SPRITE: 'client.imgs:sprite',

  CLIENT_CSS_DIST: 'client.build_css:dist',
  CLIENT_JS_DIST: 'client.build_js:dist',
  CLIENT_FONT_DIST: 'client.fonts:dist',
  CLIENT_VIEWS_DIST: 'client.views:dist',
  CLIENT_IMAGE_DIST: 'client.imgs:dist',
  CLIENT_DEL_DIST: 'client.del',
  // CLIENT_COPY_DEPS_DIST: 'client.copy_deps:dist',

  // CLIENT_UNIT_TEST: 'client.unit_test',
  // CLIENT_COVERAGE: 'client.coverage',

  CLIENT_RELOAD: 'client.reload',

  CLIENT_WATCH: 'client.watch'
}

/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  //map tells the System loader where to look for things
  var  map = {
    'app':                        'client/dev',
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'd3':                         'node_modules/d3',
    // 'ts':                         'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
    // 'typescript':                 'https://unpkg.com/typescript@1.9.0-dev.20160409/lib/typescript.js',
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'd3':                         { main: 'd3.min', defaultExtension: 'js'},
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router-deprecated',
    'upgrade',
  ];


  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  // No umd for router yet
  packages['@angular/router'] = { main: 'index', defaultExtension: 'js' };

  // Forms not on rc yet
  // packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    // transpiler: 'ts',
    // typescriptOptions: {
    //   tsconfig: true
    // },
    // meta: {
    //   'typescript': {
    //     "exports": "ts"
    //   }
    // },
    baseURL: '/',
    defaultJSExtensions: true,
    map: map,
    packages: packages
  };

  System.config(config);

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

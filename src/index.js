/**
 * This file is part of gulp-flow-css.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code.
 */

'use strict';

let autoprefixer = require('autoprefixer');
let flow = require('gulp-flow');
let {cfg, gp, pipes, utils} = flow;
let {lazypipe} = utils;
let {srcDir, notSrcDir, nodeModulesPath} = cfg;


/*----------------------------------------------------------------------------*\
  Gulp plugins
\*----------------------------------------------------------------------------*/

gp.postcss = require('gulp-postcss');
gp.cssnano = require('gulp-cssnano');
gp.less    = require('gulp-less');
gp.sass    = require('gulp-sass');


/*----------------------------------------------------------------------------*\
  Config
\*----------------------------------------------------------------------------*/

cfg.css = {
  src: [
    srcDir + '/assets/css/**/*.{css,scss,less}'
  ].concat(cfg.patterns.ignore),

  srcWatch: [
    srcDir + '/assets/css/**/*.{css,scss,less}'
  ],
  sass: {
    includePaths: [nodeModulesPath]
  },
  less: {
    paths: [nodeModulesPath]
  },
  autoprefixer: {browsers: ['last 3 versions', 'safari >= 8']}
};

// ignore CSS in files tasks
cfg.files.src.push(
  notSrcDir + '/assets/css/**/*.{css,scss,less}'
);

cfg.files.srcWatch.push(
  notSrcDir + '/assets/css/**/*.{css,scss,less}'
);


/*----------------------------------------------------------------------------*\
  Pipes
\*----------------------------------------------------------------------------*/

// NODE_ENV: development
pipes.devSassBundle = lazypipe()
  .pipe(gp.sass, cfg.css.sass)
  // .pipe(
  //   function (opt, cb) {
  //     return gp.sass(opt).on('error', cb);
  //   },
  //   cfg.css.sass,
  //   gp.sass.logError
  //  )
;

pipes.devLessBundle = lazypipe()
  .pipe(gp.less, cfg.css.less)
;

pipes.devCssBundle = lazypipe()
  .pipe(function() {
    // .less by devLessBundle, other files (.css, .scss, .sass) by devSassBundle
    return gp.if('*.less', pipes.devLessBundle(), pipes.devSassBundle());
  })
  .pipe(gp.concat, 'app.css')
;

// NODE_ENV: production
pipes.prodCssBundle = pipes.devCssBundle
  .pipe(gp.postcss, [autoprefixer(cfg.css.autoprefixer)])
  .pipe(gp.cssnano)
  .pipe(gp.header, cfg.banner)
;


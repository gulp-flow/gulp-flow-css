# gulp-flow-css

CSS, SASS, LESS bundle for [gulp-flow](https://github.com/gulp-flow/gulp-flow).


## Requirements

* [gulp-flow](https://github.com/gulp-flow/gulp-flow) must be installed.


## Install

```sh
npm install --save-dev gulp-flow-css
```

or

```sh
yarn add --dev gulp-flow-css
```


## Usage

By default this bundle is preconfigured in `cfg.css`.

This module adds some `gp` (Gulp plugins):

* gp.postcss
* gp.cssnano
* gp.less
* gp.sass

And `pipes`:

* pipes.devSassBundle (NODE_ENV=development)
* pipes.prodSassBundle (NODE_ENV=production)
* pipes.devLessBundle (NODE_ENV=development)
* pipes.prodLessBundle (NODE_ENV=production)
* pipes.devCssBundle (NODE_ENV=development)
* pipes.prodCssBundle (NODE_ENV=production)

And push ignored files in `cfg.files`.

See the source code for more details.

### Task

A common use case:

```js
'use strict';

require('gulp-flow-css');

// build: CSS
gulp.task('build.css', function() {
  return gulp.src(cfg.css.src)
    .pipe(gp.newer(cfg.publicCssDir))
    // .pipe(gp.using())
    .pipe(gp.ifElse(
      envList.NODE_ENV === 'production',
      pipes.prodCssBundle,
      pipes.devCssBundle
    ))
    .pipe(gulp.dest(cfg.publicCssDir))
  ;
});
```

And run your tasks: `APP_ENV=dev gulp`


## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow-css/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
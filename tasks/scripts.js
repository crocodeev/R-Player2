const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject-string');
const replace = require('gulp-string-replace');
const createTitle = require('./helpers/title');

function build() {
  return src('app/**/*.js')
    .pipe(babel())
    .pipe(inject.replace('process.env.NODE_ENV', '"production"'))
    .pipe(replace("R-Player", createTitle(), { searchValue: 'string' }))
    .pipe(dest('build'));
}

function developBuild() {
  return src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(replace("R-Player", createTitle(), { searchValue: 'string' }))
    .pipe(sourcemaps.write())
    .pipe(dest('build'));
}

build.displayName = 'build-scripts';
developBuild.displayName = 'dev-build-scripts';

exports.build = build;
exports.developBuild = developBuild;

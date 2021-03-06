const { src, dest, parallel } = require('gulp');

function copyHtml() {
  return src('app/renderer/index.html').pipe(dest('build/renderer'));
}

function copyCss() {
  return src('app/renderer/css/*.css').pipe(dest('build/renderer/css'));
}

function copyIcons() {
  return src('app/icons/*').pipe(dest('build/icons/'));
}



copyHtml.displayName = 'copy-html';
copyCss.displayName = 'copy-css';

exports.copyAll = parallel(copyCss, copyHtml, copyIcons);
exports.copyHtml = copyHtml;
exports.copyCss = copyCss;
exports.copyIcons = copyIcons;

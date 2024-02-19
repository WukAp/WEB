const { src, dest } = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
paths = { // Настройка путей
styles: {
src: 'public/less/*.less',
dest: 'public/styles/'
}
}
exports.default = function () {
  return src(paths.styles.src)
    .pipe(less()) // Обработать LESS
    .pipe(cleanCSS()) // Минификация CSS
    .pipe(dest(paths.styles.dest));
};

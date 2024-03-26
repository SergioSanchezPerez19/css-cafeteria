const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    // compilar sass
    // pasos 1 - identificar archivos, 2 - compilarla, 3 - guardar el .css

    done();
    src('src/scss/app.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

function imagenes() {
    return src('src/img/**/*').pipe(dest('build/img'));
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);

// Series se inicia una tarea, y hasta que finaliza, inicia la siguiente
// Parallel inicia todas a la vez

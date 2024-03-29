const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css() {
    // compilar sass
    // pasos 1 - identificar archivos, 2 - compilarla, 3 - guardar el .css

    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function versionWebp() {
    const opciones = {
        quality: 50,
    };
    return src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/img'));
}

function versionAvif() {
    const opciones = {
        quality: 50,
    };
    return src('src/img/**/*.{png,jpg}').pipe(avif(opciones)).pipe(dest('build/img'));
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);

// Series se inicia una tarea, y hasta que finaliza, inicia la siguiente
// Parallel inicia todas a la vez

import gulp from 'gulp';
import sass from 'gulp-sass';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import del from 'del';

const paths = {
    styles: {
        src: 'src/assets/scss/main.scss',
        dest: 'dist/assets/css'
    },
    scrips: {
        src: [
            'src/assets/js/main.js'
        ],
        dest: 'dist/assets/js'
    },
    images: {
        src: 'src/assets/img/*.{jpg,jpeg,png,svg,gif}',
        dest: 'dist/assets/img/'
    }
}

export const cleanWorksImages = () => del(['dist/assets/img/']);

export const images = () => {
    return gulp.src(paths.images.src, {base: 'src/assets/img/'})
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

export const styles = (done) => {
    return gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

export const scripts = () => {
    return gulp.src(paths.scrips.src)
        .pipe(terser())
        .pipe(gulp.dest(paths.scrips.dest));
}

export const build = gulp.series(styles, scripts);

export const compressImages = gulp.series(cleanWorksImages, images);
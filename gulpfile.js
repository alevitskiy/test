var gulp = require("gulp"),
    prefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    cssmin = require("gulp-minify-css"),
    browserSync = require("browser-sync");

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())        
        .pipe(sass())
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
    return gulp.src('app/js/main.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: { 
            baseDir: 'app'
        },
        notify: false 
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch('app/js/main.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'code', 'scripts', 'browser-sync', 'watch'));
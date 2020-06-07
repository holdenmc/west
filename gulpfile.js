const gulp = require('gulp');
const ts = require('gulp-typescript');

const { src, dest } = gulp;
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', () => {
    src('src/client/*.html')
        .pipe(dest('dist/client'));

    const tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(dest('dist'));
});

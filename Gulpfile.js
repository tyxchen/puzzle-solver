#!/usr/bin/env nodejs

const gulp =  require('gulp'),
gulpModules = {
    ts: require('gulp-typescript')
},
tsProject = gulpModules.ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('ts', function() {
    var tsResult = tsProject.src('app/src/ts/*.ts')
        .pipe(gulpModules.ts(tsProject));

    return tsResult.js.pipe(gulp.dest('app/built/js'));
});

gulp.task('watch', ['ts'], function() {
    gulp.watch('app/src/ts/*.ts', ['ts']);
})

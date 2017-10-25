const  gulp = require("gulp");
const ts = require("gulp-typescript");
const rename = require("gulp-rename");
const JSONFILES = ["src/*.json", "src/**/*.json"];
const nodemon = require("gulp-nodemon");

const tsProject = ts.createProject('tsconfig.json');

gulp.task("scripts", ()=>{
    gulp.src(["src/main/views/**/*"]).pipe(gulp.dest("dist/main/views"));
    gulp.src(["src/main/public/**/*"]).pipe(gulp.dest("dist/main/public"));
    const tsResult = tsProject.src().pipe(tsProject());
    tsResult.js.pipe(gulp.dest("dist"));
    gulp.src(["dist/main/index.js"]).pipe(rename("www")).pipe(gulp.dest("dist/main"));
});

gulp.task("watch", ["scripts"], ()=>{
    gulp.watch("src/**/*.ts", ["scripts"]);
});

gulp.task("assets", ()=>{
    return gulp.src(JSONFILES).pipe(gulp.dest("dist"));
});

gulp.task("start", ["watch"], ()=>{
    var stream = nodemon({
                    script: 'dist/main/index.js'
                });
    return stream;
});

gulp.task("default", ["watch", "assets"]);
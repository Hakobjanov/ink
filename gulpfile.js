//create variable for gulp working
let gulp = require("gulp");

//variable for sass
let sass = require("gulp-sass");

//variable for browsersync
let browserSync = require("browser-sync");

//variable for uglify
let uglify = require("gulp-uglify");

//variable for concat
let concat = require("gulp-concat");

//variable for renaming files
let rename = require("gulp-rename");

//variable for del
let del = require("del");

//variable for autoprefixer
let autoprefixer = require("gulp-autoprefixer");

//tasks
//task for deletion
gulp.task("clean", async function () {
  return del.sync("dist");
});

//task to scss
gulp.task("scss", function () {
  //finding scss files
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 versions"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

//task for concating css files
gulp.task("css", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss"))
    .pipe(browserSync.reload({ stream: true }));
});

//task for html
gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(browserSync.reload({ stream: true }));
});

//task for main js
gulp.task("script", function () {
  return gulp.src("app/js/*.js").pipe(browserSync.reload({ stream: true }));
});

//task for js modules
gulp.task("js", function () {
  return gulp
    .src(["node_modules/slick-carousel/slick/slick.js"])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

//task for browser sync
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });
});

//task for creating dist
gulp.task("export", function () {
  let buildHtml = gulp.src("app/**.html").pipe(gulp.dest("dist"));

  let buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));

  let buildJs = gulp.src("app/js/**/*.js").pipe(gulp.dest("dist/js"));

  let buildFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));

  let buildImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

//task for automatic
gulp.task("watch", function () {
  gulp.watch("./app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task("build", gulp.series("clean", "export"));

//task default
gulp.task(
  "default",
  gulp.parallel("css", "scss", "js", "browser-sync", "watch")
);

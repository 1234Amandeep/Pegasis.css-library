import { createRequire } from "module";
const require = createRequire(import.meta.url);
// ***RUN: $gulp watch

const { src, dest, series, watch, task } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");

task("sass", function () {
  return src("./src/sass/**/*.scss")
    .pipe(concat("custom.scss"))
    .pipe(sass())
    .pipe(dest("./src/css"));
});

// Create 'watch' task
task("watch", function () {
  return (
    // Watch the input folder for change,
    // and run `sass` task when something happens
    watch(["./src/sass/**/*.scss"], series("sass"))
      // When there is a change,
      // log a message in the console
      .on("change", function (event) {
        console.log("File " + event + " was updated" + ", running tasks...");
      })
  );
});

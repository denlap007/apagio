/**
 * @fileoverview Gulp tasks that serve the application.
 */
import fs from "fs";
import child from "child_process";
import gulp from "gulp";
import path from "path";
import conf from "./conf";
import replaceAll from "./utils";

/**
 * Currently running backend process object. Null if the backend is not running.
 *
 * @type {?child.ChildProcess}
 */
let runningBackendProcess = null;

/**
 * Builds array of arguments for backend process based on env variables and prod/dev mode.
 *
 * @return {!Array<string>}
 */
function getBackendArgs() {
  return [];
}

/**
 * Kills running backend process (if any).
 */
gulp.task("kill-backend", (doneFn) => {
  if (runningBackendProcess) {
    runningBackendProcess.on("exit", () => {
      // Mark that there is no backend process running anymore.
      runningBackendProcess = null;
      // Finish the task only when the backend is actually killed.
      doneFn();
    });
    runningBackendProcess.kill();
  } else {
    doneFn();
  }
});

/**
 * Watches for changes in source files and runs Gulp tasks to rebuild them.
 */
gulp.task("watch", () => {
  gulp.watch([conf.paths.backendSrc], gulp.parallel("spawn-backend", "watch"));
});

gulp.task("templates:dev", function (doneFn) {
  const {
    devServerHost,
    devServerPort,
    publicPath,
    jsBundleName,
    jsVendorName,
    jsRuntimeName,
  } = conf.wpkConf;
  const hostPath = `${devServerHost}:${devServerPort}${publicPath}`;
  const dataMap = {
    bundle: `${hostPath}${jsBundleName}.js`,
    vendor: `${hostPath}${jsVendorName}.js`,
    runtime: `${hostPath}${jsRuntimeName}.js`,
  };

  const errCheck = function (err, doneFn) {
    if (err) {
      console.log(err);
      return doneFn();
    }
  };

  fs.readFile(conf.paths.indexTemplateSrc, "utf8", function (err, data) {
    errCheck(err);
    const result = replaceAll(data, dataMap);

    fs.writeFile(conf.paths.indexTemplateDst, result, "utf8", function (err) {
      errCheck(err);
      doneFn();
    });
  });
});

/**
 * Spawns new backend application process. Previously spawned
 * backend process is killed beforehand.
 */
gulp.task(
  "spawn-backend",
  gulp.series("kill-backend", "backend", "templates:dev", (doneFn) => {
    runningBackendProcess = child.spawn(
      path.join(conf.paths.serve, conf.backend.binaryName),
      getBackendArgs(),
      { stdio: "inherit", cwd: conf.paths.base }
    );

    runningBackendProcess.on("exit", () => {
      // Mark that there is no backend process running anymore.
      runningBackendProcess = null;
    });

    doneFn();
  })
);

/**
 * Serves the application in development mode. Watches for changes in the source files to rebuild
 * development artifacts.
 */
gulp.task("serve", gulp.parallel("spawn-backend", "watch"));

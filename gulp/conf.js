/**
 * @fileoverview Common configuration constants used in other build/test files.
 */
const path = require("path");

/**
 * Base path for all other paths.
 */
const basePath = path.join(__dirname, "../");

/**
 * Compilation architecture configuration.
 */
const arch = {
  /**
   * Default architecture that the project is compiled to. Used for local development and testing.
   */
  default: "amd64",
  /**
   * List of all supported architectures by this project.
   */
  list: ["amd64", "arm64", "arm", "ppc64le", "s390x"],
};

/**
 * Package version information.
 */
const version = {
  /**
   * Current release version of the project.
   */
  release: "v0.0.1",
  /**
   * Version name of the head release of the project.
   */
  head: "head",
  /**
   * Year of last source change of the project
   */
  year: "2020",
};

/**
 * Exported configuration object with common constants used in build pipeline.
 */
module.exports = {
  /**
   * the expression of recording version info into src/app/backend/client/manager.go
   */
  // recordVersionExpression: `-X github.com/denlap007/apagio/src/backend/version=${version.release}`,
  /**
   * Backend application constants.
   */
  backend: {
    /**
     * The name of the backend binary.
     */
    binaryName: `apagio${process.platform === "win32" ? ".exe" : ""}`,
    /**
     * Name of the main backend package that is used in go build command.
     */
    mainPackageName: "github.com/denlap007/apagio/src/backend",
    /**
     * Names of all backend packages prefixed with 'test' command.
     */
    testCommandArgs: ["test", "github.com/denlap007/apagio/src/backend/..."],
  },

  /**
   * Project compilation architecture info.
   */
  arch,

  /**
   * Frontend application constants.
   */
  frontend: {
    /**
     * Port number to access the Apagio UI
     */
    serverPort: 8080,
  },

  /**
   * Configuration for tests.
   */
  test: {
    /**
     * Whether to use sauce labs for running tests that require a browser.
     */
    useSauceLabs: !!process.env.TRAVIS,
  },

  /**
   * webpack config
   */
  wpkConf: {
    jsBundleName: "bundle",
    jsVendorName: "vendor",
    jsRuntimeName: "runtime",
    cssBundleName: "bundle",
    publicPath: "/public/",
    devServerPort: 3000,
    devServerHost: "http://localhost",
    frontEndEntypoint: "./src/frontend/index.jsx",
    outputPath: path.join(basePath, "public"),
    outputPublicPath: path.join(basePath, "public"),
  },

  /**
   * Absolute paths to known directories, e.g., to source directory.
   */
  paths: {
    base: basePath,
    backendSrc: path.join(basePath, "src/backend"),
    dist: path.join(basePath, "dist", arch.default),
    distCross: arch.list.map((arch) => path.join(basePath, "dist", arch)),
    goTools: path.join(basePath, ".tools/go"),
    serve: path.join(basePath, ".tmp/serve"),
    src: path.join(basePath, "src"),
    indexTemplateSrc: path.join(basePath, "templates/html/index.html"),
    indexTemplateDst: path.join(basePath, "public/index.html"),
  },
};

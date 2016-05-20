### Notice
This project is for internal applications.  Feel free to submit pull requests or tickets, but if you are looking for a project with a lot of support, please use [angular2-seed](https://github.com/mgechev/angular2-seed).

# Intro
This project builds greatly on the work done in the [angular2-seed](https://github.com/mgechev/angular2-seed).  And, for the most part, all documentation from the angular2-seed project applies to this project.  This project creates a [standard workflow](#standard-gulp-build-task-workflow-dev-prod-e2e-) to the builds, allows relative urls for assets, and attempts to simplify testing by requiring only a command to run e2e and a single command for unit-tests.

# NPM Tasks
For the most part, each of the NPM tasks corresponds one-to-one to a gulp task, so running the task name in gulp will accomplish the same result.

| Task Name  | Description |
|---|---|
| build.dev | Builds a development copy of the client-side application |
| build.dev.watch | Builds a development copy of the client-side application and watches the APP_SRC directory for changes |
| build.docs | Builds documentation using typeDoc |
| build.e2e | Builds an end-to-end copy of the client-side application, which is currently just the dev build |
| build.prod | Builds a production copy of the client-side application, bundling app resources and dependencies |
| build.test | Builds a unit-test copy of the client-side application |
| generate.manifest | todo |
| e2e | Starts a server, builds an end-to-end app, runs e2e test once, and stops the server |
| e2e.live | Starts a server, builds an end-to-end app, runs e2e tests once, and stops the server.  This also supplies protractor with --protractorElement to pause the e2e tests for debugging |
| e2e.tdd | Starts a server, builds an end-to-end app, runs e2e tests, and watches APP_SRC directory changes.  On changes, build and test step |
| e2e.tdd.live | Starts a server, builds an end-to-end app, runs e2e tests, and watches APP_SRC directory changes.  On changes, build and test step. This also supplies protractor with --protractorElement to pause the e2e tests for debugging |
| serve.coverage | Serves the test coverage statistics. |
| serve.dev | Serves the development build and watches for changes. |
| serve.docs | Serves the documentation. |
| serve.e2e | Serves the end-to-end build. |
| serve.prod | Serves the prod build.  This does not watch for changes. |
| start | Serves the development build and watches for changes. |
| tasks.list | Lists the gulp tasks |
| tdd | Builds a test copy, runs unit-tests, and watches for changes to APP_SRC.  On change, process is repeated. |
| test | Builds a test copy and runs unit-tests once. |
| test.all | Runs unit test and end-to-end tests once. |

### Standard Gulp Build Task Workflow (dev|prod|e2e) 
All 'builds' follow the same template, making it easier to plug in a custom task into the workflow.

1. clean.all - remove dist directory (tmp, dev, prod)
2. clear.caches - clears gulp file caches
3. lint.pre - general step to do lint before js or css is created
    1. lint.pre.css - lint sass, scss, etc
        1. lint.pre.css.sass
    2. lint.pre.js
        1. lint.pre.js.typescript - lint typescript (or coffescript, etc)
4. copy.tmp - copies application and (NPM) dependencies to temporary directory
    1. copy.tmp.app
    2. copy.tmp.dep
5. process.assets - general step to do processing on application or dependency assets (styles, scripts, fonts, images, etc)
    1. process.assets.pre - general step to do processing on assets requiring additional processing (ie. Sass, Typescript, etc)
        1. process.assets.pre.css
            1. process.assets.pre.css.sass
        2. process.assets.pre.js
            1. process.assets.pre.js.typescript
    2. process.assets.css - general step to do processing on (possibly generated) css, such as minifying
        1. process.assets.css.min
    3. process.assets.js - general step to do processing on (possibly generated) js, such as minifying
    4. process.assets.post - general step to do post-processing on assets
        1. process.assets.post.js
            1. process.assets.post.js.bundle.dep
            2. process.assets.post.js.bundle.app
6. process.html(.prod|.dev|.e2e) - injection of application assets and dependencies into the html page(s)
7. copy(.prod|.dev|.e2e) - moves the files applicable to the environment (prod, dev, e2e, etc) from tmp to the appropriate dist directory

# License

MIT

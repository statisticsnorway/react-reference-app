# react-reference-app
This application, and its documentation, should be used as a reference when creating new React applications that you want to 
deploy to [BIP](https://github.com/statisticsnorway/platform).

**Note:** Everything written here is subject to heavy change during a testing process.

### What you need
When creating a React application you need the following installed: 
* JavaScript runtime [Node.js](https://nodejs.org/en/) (Use Current version)
* Dependency manager [Yarn](https://yarnpkg.com/en/) (Use Stable version)

Use `yarn create react-app my-app` when creating new applications (almost everything is then setup for you).
Replace `my-app` with the name of your application.

* Use [standardJS](https://standardjs.com/) for code formatting ([find your text editor plugin](https://standardjs.com/#are-there-text-editor-plugins))

### Preferred dependencies (tips)
* When working with JavaScript date objects, use [date-fns](https://date-fns.org/)
  * A great datepicker component is [ReactJS Datepicker](https://reactdatepicker.com/)
* When working with routes in your application, use [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* When styling the UI, use [Semantic UI React](https://react.semantic-ui.com/)
  * If you need a table component with more functions built-in than the one Semantic UI offers, use [React Table](https://github.com/tannerlinsley/react-table)
* When working with http-requests, use [axios](https://github.com/axios/axios) and [axios-hooks](https://github.com/simoneb/axios-hooks)
* Need to generate valid RFC UUIDs? Use [uuid](https://github.com/kelektiv/node-uuid)
* When writing tests, use [Jest](https://jestjs.io/en/) (comes pre-installed when creating application) and [React Testing Library](https://testing-library.com/react)
  * If you need more matchers than Jest offers, use [jest-dom](https://github.com/gnapse/jest-dom)
* Need a simple GraphQL client? Check out [graphql-request](https://github.com/prisma/graphql-request)
  * Alternatively try a more rich hooks variant [graphql-hooks](https://github.com/nearform/graphql-hooks)

### React application as a library
Requires some configuration and bundling with [rollup.js](https://rollupjs.org/guide/en).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000/`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker locally
* `yarn build`
* `docker build -t react-reference-app .`
* `docker run -p 8000:80 react-reference-app:latest`
* Navigate to `http://localhost:8000/`

### Writing tests
Easy to follow guides for **Jest** are located [here](https://jestjs.io/docs/en/tutorial-react) and if you need to test
DOM manipulation, use **React Testing Library** (guides found [here](https://testing-library.com/docs/react-testing-library/intro)). 
The `debug` property exposed by **React Testing Library** is very useful so do yourself a favor and check that out!

Test coverage thresholds and other options can be configured in the `jest` object in [package.json](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/package.json),
documentation found [here](https://jestjs.io/docs/en/configuration). Something to keep in mind would be to exclude files like 
`index.js`, or files that only use external libraries. Mainly because these types of files do not need to be testet, but also
because they may contribute to inaccurate coverage reporting.

`CI=true yarn coverage` exits with code 1 if thresholds are not met (those set in `package.json`) and thus
will not result in a successful test run.

Check out the tests written in this application, [fe-workbench-ui](https://github.com/statisticsnorway/fe-workbench-ui/tree/develop/src/__tests__) 
or in [linked-data-store-client](https://github.com/statisticsnorway/linked-data-store-client/tree/develop/src/__tests__), 
to get you started if you need some ideas.

The `--verbose=false` flag is added to `react scripts test` in `package.json` to enable `console.log()` to work in tests
(this bug might have been fixed). Useful for debugging of course.

### Environment variables
Simply follow the great [documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env) provided by the React developers.

### Deploying to platform
You can read all about it in the [SSB developer guide](https://github.com/statisticsnorway/ssb-developer-guide/blob/master/docs/drone_doc.md),
but in essence the **Dronefile** needs to be configured as per instructed at the bottom of the README. The `publish-docker` step is responsible
for pushing the image to GCR. Additionally there is a problem with Drone executing `react scripts` so in `package.json` everything
related to that needs to be swapped out with `node ./node_modules/react-scripts/bin/react-scripts.js`.

You can check running builds here [https://drone.prod-bip-ci.ssb.no/](https://drone.prod-bip-ci.ssb.no/).

**Note:**
* For the deploy to actually happen the application needs a HelmRelease
* To expose your application on the internet you need to add a VirtualService

These two things are handled by the platform developers for now. This might get automated or will be handled by the application
developers in the future.

### SonarQube
You can include a code analysis in the pipeline by adding the `code-analysis` step. For SonarQube to work properly with JavaScript
code you need some additional configuration found in the [sonar-project.properties](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/sonar-project.properties) 
file. `sonar.coverage.exclusions` needs to mirror your settings in the `jest` property in `package.json`. Everything else
set in the file is just standard exclusions.

### [Dockerfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Dockerfile)

The reason for copying over our own [nginx.conf](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/nginx.conf) 
is for it to work with **React Router**.

The `/health` endpoint is added so one can check for liveness and readiness of the Nginx serving the application.
For now they are equal but maybe in the future readiness will check for liveness of the applications integration points.

### [Dronefile (.drone.yml)](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/.drone.yml) 

More to come...

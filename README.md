# react-reference-app
This application, and its documentation, should be used as a reference when creating new React applications that you want to 
deploy to [BIP](https://github.com/statisticsnorway/platform).

**Note:** Everything written here is subject to heavy change during a testing process.

### What you need
When creating a React application/library you need the following installed: 
* JavaScript runtime [Node.js](https://nodejs.org/en/) (Use Current version)
* Dependency manager [Yarn](https://yarnpkg.com/en/) (Use Stable version)

Use `yarn create react-app my-app` when creating new applications or libraries (almost everything is then setup for you).
Replace `my-app` with the name of your application. Delete the contents of `/src` and start coding!

### Standards
* Use [standardJS](https://standardjs.com/) for code formatting ([find your text editor plugin](https://standardjs.com/#are-there-text-editor-plugins))

### Preferred dependencies
* When working with JavaScript date objects, use [date-fns](https://date-fns.org/)
  * A great datepicker component is [ReactJS Datepicker](https://reactdatepicker.com/)
* When working with routes in your application, use [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* When styling the UI, use [Semantic UI React](https://react.semantic-ui.com/)
  * If you need a table component with more functions built-in than the one Semantic UI offers, use [React Table](https://github.com/tannerlinsley/react-table)
* When working with http-requests, use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* Need to generate valid RFC UUIDs? Use [uuid](https://github.com/kelektiv/node-uuid)
* When writing tests, use [Jest](https://jestjs.io/en/) (comes pre-installed when creating application) and [React Testing Library](https://testing-library.com/react)
  * If you need more matchers than Jest offers, use [jest-dom](https://github.com/gnapse/jest-dom)
* Need a simple GraphQL client? Check out [graphql-request](https://github.com/prisma/graphql-request)

### Create library
Requires some configuration and bundling with [rollup.js](https://rollupjs.org/guide/en).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`.

Run `REACT_APP_BACKEND="url here" yarn start` and navigate to `http://localhost:3000/`.

The content of the environment is printed in the browser console when you visit the application page.

**Note** that if you leave out `REACT_APP_BACKEND` it is left out of the environment. There is no limit to how many you can have.
These variables can be accessed through `process.env` like in the `componentDitMount()` function in `App.js`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker locally
* `docker build . -t react-reference-app:0.1`
* `docker run -p 8000:80 react-reference-app:0.1`
* Navigate to `http://localhost:8000/`

### Writing tests
Easy to follow guides for **Jest** are located [here](https://jestjs.io/docs/en/tutorial-react) and if you need to test
DOM manipulation use **React Testing Library**, guides found [here](https://testing-library.com/docs/react-testing-library/intro). 
The `debug` property exposed by **React Testing Library** is very useful so do yourself a favor and check that out!

Test coverage thresholds and other options can be configured in the `jest` object in [package.json](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/package.json),
documentation found [here](https://jestjs.io/docs/en/configuration). Something to keep in mind would be to exclude files like 
`index.js`, or files that only use external libraries. Mainly because these types of files do not need to be testet, but also
because they contribute to inaccurate coverage reporting.

The **Dockerfile** runs `CI=true yarn coverage` which exits with code 1 if thresholds are not met (those set in `package.json`) and thus
will not result in a success on that stage in the pipeline.

Check out the tests written in this application, or in [linked-data-store-client](https://github.com/statisticsnorway/linked-data-store-client/tree/develop/src/__tests__), 
to get you started if you need some ideas.

The `--verbose=false` flag is added to `react scripts test` in `package.json` to enable `console.log()` to work in tests.
Useful for debugging of course.

### Environment variables
Simply follow the great [documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env) provided by the React developers.

### Deploying to platform
// TODO:

You can check running builds here [https://drone.infra.ssbmod.net/](https://drone.infra.ssbmod.net/).

**Note:**
* For the deploy to actually happen the application needs a HelmRelease
* To expose your application on the internet you need to add a VirtualService

These two things are handled by the platform developers for now. This might get automated or will be handled by the application
developers in the future.

#### Dockerfile
[Dockerfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Dockerfile)

The reason for copying over our own [nginx.conf](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/nginx.conf) 
is for it to work with **React Router**.

**Note:**
If you are using `react scripts` below version `3.0.0` you need to replace `CI=true yarn coverage` and `CI=true yarn build` on 
with `yarn test --no-watch` and `yarn build` respectivly. This is because `--no-watch` was deprecated and 
replaced with `CI=true` in `3.0.0` and we want the commands to run non-interactivly when dealing with continuous integration. 
Documentation found [here](https://facebook.github.io/create-react-app/docs/running-tests#continuous-integration).

The `.dockerignore` file prevents Docker from scanning and copying unnecessary files during building which speeds up
the process a little, escpecially on Windows.

#### Dronefile
[.drone.yml](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/.drone.yml) 

Change `repo` under `settings` in the `publish-docker` step and swap out the name of the application

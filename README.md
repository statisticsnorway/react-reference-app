# react-reference-app
[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/Frontends/statisticsnorway.react-reference-app?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=35&branchName=master)

This application and its documentation should be used as a reference when creating new React applications that you want to 
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
The first time you clone the repository, remember to run `yarn` or `yarn install`.

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
The `debug` property exposed by **React Testing Library** is very useful so do yourself a favor and check it out!

Test coverage thresholds and other options can be configured in the `jest` object in [package.json](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/package.json),
documentation found [here](https://jestjs.io/docs/en/configuration). Something to keep in mind would be to exclude files like 
`index.js`, or files that only use external libraries. Mainly because these types of files do not need to be testet, but also
because they may contribute to inaccurate coverage reporting.

`CI=true yarn coverage` exits with code 1 if thresholds are not met (those set in `package.json`) and thus
will not result in a successful test run.

Check out the tests written in this application, [variable-search](https://github.com/statisticsnorway/variable-search/tree/master/src/__tests__),
[user-access-admin](https://github.com/statisticsnorway/user-access-admin/tree/master/src/__tests__)
or in [linked-data-store-client](https://github.com/statisticsnorway/linked-data-store-client/tree/master/src/__tests__), 
to get you started if you need some ideas.

### Environment variables
Simply follow the great [documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env) 
provided by the React developers.

### Runtime environment variables
There is [documentation](https://create-react-app.dev/docs/title-and-meta-tags/#injecting-data-from-the-server-into-the-page)
on this and even an [importable component](https://github.com/beam-australia/react-env) which you can try out.

### Deployment
You can read all about it in the [SSB developer guide](https://github.com/statisticsnorway/ssb-developer-guide/blob/master/docs/azure_pipeline_doc.md),
but in essence the `.azure-pipelines.yml` file needs to be configured as per instructed at the bottom of the README. 
The `Docker`-tasks in the `mergeToMaster` job is responsible for pushing the image to GCR.

You can check running builds here [https://dev.azure.com/statisticsnorway](https://dev.azure.com/statisticsnorway).

**Note:**
* For deployment to actually happen the application needs a HelmRelease
* To expose your application on the internet you need to add a VirtualService

This is somewhat doable by yourself by adding the application to our `platform-dev` repository, so you can either check 
the docs in that repository or ask a fellow collegue for help.

### SonarQube
You can include a code analysis in the pipeline by adding the `SonarQube`-tasks in the `mergeToMaster` job. For SonarQube 
to work properly with JavaScript code you need some additional configuration found in the 
[sonar-project.properties](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/sonar-project.properties) 
file. `sonar.coverage.exclusions` needs to mirror your settings in the `jest` property in `package.json`. Everything else
set in the file is just standard exclusions.

**Note** that our experience with SonarQube so far has been a mixed bag. It provides some very nifty information about our code
and detects code smells and bugs rather accuratly and displays it in a nice UI. However, configurating SonarQube to correctly 
exclude certain files from coverage calculation has proven rather difficult. The step in the pipeline is also rather slow
for no understandable reason.

### [Dockerfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Dockerfile)
The reason for copying over our own [nginx.conf](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/nginx.conf) 
is for it to work with **React Router** among other things.

The `/health` endpoint is added so one can check for liveness and readiness of the Nginx serving the application.
For now, they are equal but maybe in the future readiness will check for liveness of the application's integration points.

### [Azure Pipelines (.azure-pipelines.yml)](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/.azure-pipelines.yml) 
The setup should be fairly easy by just following this applications `.azure-pipelines.yml` structure and remember to 
replace application names throughout the file with your applications name where applicable.

We will try to make use of caching in our Azure Piplelines which in essence is the usage of a `shared Yarn cache folder` 
each time a pipeline is ran. Read about it [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/caching?view=azure-devops#nodejsyarn).

Unfortunatly we cannot run `steps` or `tasks` in parallel, but we have tried to make the pipeline as short as possible by
seperating a build and test job for pull requests and a build and push Docker job for merges to master.

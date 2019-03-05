# react-reference-app
This application and its documentation should be used as a reference when creating new React applications that you want to 
deploy to BIP.

**Note:** Everything written here is subject to heavy change during a testing process.

### What you need
When creating a React application/library you need the following installed: 
* JavaScript runtime [Node.js](https://nodejs.org/en/) (Use LTS version)
* Dependency manager [Yarn](https://yarnpkg.com/en/) (Use Stable version)

Use `npx create-react-app app-name` when creating new applications or libraries (almost everything is then setup for you).

### Standards
* Use [standardJS](https://standardjs.com/) for code formatting ([find your text editor plugin](https://standardjs.com/#are-there-text-editor-plugins))

### Preferred dependencies
* When working with JavaScript date objects, use [date-fns](https://date-fns.org/)
* When working with routes in your application, use [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* When styling the UI use [Semantic UI React](https://react.semantic-ui.com/)
* When writing tests use [Jest](https://jestjs.io/en/) (comes pre-installed when creating application) and [React Testing Library](https://testing-library.com/react)

### Create library
Requires some configuration and bundling via [rollup.js](https://rollupjs.org/guide/en).

### Writing tests
Easy to follow guides for **Jest** are located [here](https://jestjs.io/docs/en/tutorial-react) and if you need to test
DOM manipulation use **React Testing Library**, guides for can be found [here](https://testing-library.com/docs/react-testing-library/intro).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`

Run `REACT_APP_BACKEND="BACKEND_url_here" yarn start` and navigate to `http://localhost:3000/`

The content of the environment is printed in the browser console when you visit the application page.

**Note** that if you leave out `REACT_APP_BACKEND` it is left out of the environment. There is no limit to how many you can have.
These variables can be accessed through `process.env` like the example in `App.js`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker
- `docker build . -t react-reference-app:0.1`
- `docker run -p 8000:80 react-reference-app:0.1`
- Navigate to `http://localhost:8000/`

### Deploying to platform
The repository name needs a prefix which should be `fe-`, this stands for front-end. If a Jenkinsfile is present the 
build should result in a docker-container that can be deployed on the platform. 

For the deploy to actually happen the applicationeeds a HelmRelease. To do that branch from 
[https://github.com/statisticsnorway/platform](https://github.com/statisticsnorway/platform) and add the release to 
[https://github.com/statisticsnorway/platform/tree/master/flux/staging/releases](https://github.com/statisticsnorway/platform/tree/master/flux/staging/releases).

To expose your application on the internet. To do that branch from [https://github.com/statisticsnorway/platform](https://github.com/statisticsnorway/platform) 
and add a VirtualService here [https://github.com/statisticsnorway/platform/blob/master/flux/staging/istio/common/istio-ingress.yaml](https://github.com/statisticsnorway/platform/blob/master/flux/staging/istio/common/istio-ingress.yaml)

#### Dockerfile
Should look like this:
```

```

#### Jenkinsfile
Should look like this:
```

```

# react-reference-app
This application, and its documentation, should be used as a reference when creating new React applications that you want to 
deploy to [BIP](https://github.com/statisticsnorway/platform).

**Note:** Everything written here is subject to heavy change during a testing process.

### What you need
When creating a React application/library you need the following installed: 
* JavaScript runtime [Node.js](https://nodejs.org/en/) (Use LTS version)
* Dependency manager [Yarn](https://yarnpkg.com/en/) (Use Stable version)

Use `yarn create react-app my-app` when creating new applications or libraries (almost everything is then setup for you).
Delete the content of `/src` and start coding!

### Standards
* Use [standardJS](https://standardjs.com/) for code formatting ([find your text editor plugin](https://standardjs.com/#are-there-text-editor-plugins))

### Preferred dependencies
* When working with JavaScript date objects, use [date-fns](https://date-fns.org/)
* When working with routes in your application, use [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* When styling the UI, use [Semantic UI React](https://react.semantic-ui.com/)
* When working with http-requests, use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* When writing tests, use [Jest](https://jestjs.io/en/) (comes pre-installed when creating application) and [React Testing Library](https://testing-library.com/react)
  * If you need more matchers than Jest offers, use [jest-dom](https://github.com/gnapse/jest-dom)

### Create library
Requires some configuration and bundling with [rollup.js](https://rollupjs.org/guide/en).

### Writing tests
Easy to follow guides for **Jest** are located [here](https://jestjs.io/docs/en/tutorial-react) and if you need to test
DOM manipulation use **React Testing Library**, guides found [here](https://testing-library.com/docs/react-testing-library/intro).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`.

Run `REACT_APP_BACKEND="url here" yarn start` and navigate to `http://localhost:3000/`.

The content of the environment is printed in the browser console when you visit the application page.

**Note** that if you leave out `REACT_APP_BACKEND` it is left out of the environment. There is no limit to how many you can have.
These variables can be accessed through `process.env` like the example in `App.js`.

`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

### Docker locally
* `yarn build`
* `docker build . -t react-reference-app:0.1`
* `docker run -p 8000:80 react-reference-app:0.1`
* Navigate to `http://localhost:8000/`

### Deploying to platform
A repository name with the prefix `fe-` (**f**ront-**e**nd) will be automatically picked up by the platform if a Jenkinsfile 
is present and the team MOD P1 has read/write access to the repository. A build will trigger on pull requests. A deploy will 
trigger when commiting to master. These default rules can be overridden by the platform team if needed.

The build must result in a docker-image that can be deployed on the platform. This is done through the Jenkinsfile.

You can check running builds here [https://jenkins.infra.ssbmod.net/job/mod-sirius/](https://jenkins.infra.ssbmod.net/job/mod-sirius/).

**Note:**
* For the deploy to actually happen the application needs a HelmRelease
* To expose your application on the internet you need to add a VirtualService

These two things are handled by the platform developers for now. This might get automated or will be handled by the application
developers in the future.

`credentials: 'include'` must be present in Fetch calls for the application to use tokens to talk to other services deployed
on the platform. Since this will not work when testing locally it is smart to set this per environment:
```
const credentials = process.env.NODE_ENV === 'production' ? 'include' : 'same-origin'

fetch(url, {
  credentials: credentials,
  method: 'GET',
  headers: {'Content-Type': 'application/json; charset=utf-8'}
})
```
`same-origin` is default but it can also be set to `omit`, check [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials).

#### Dockerfile
[Dockerfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Dockerfile)

The reason for copying over our own [nginx.conf](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/nginx.conf) 
is for it to work with **React Router**.

#### Jenkinsfile
[Jenkinsfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Jenkinsfile) - Change `DOCKER_IMAGE` name on line 5 to your application name.

### Things down the line
* Newer versions of Node.js and Yarn installed on Jenkins (right now we are limited to Node 8.14.0 and Yarn 1.7.0)
* Multistaging Dockerfiles (needs newer version of Docker on the platform)
  * This means that things like Yarn and NodeJS will be contained in the docker-image and the build is done when creating 
    the image, rather than by Jenkins beforehand
* Runtime environment variables (needs some trixing with Nginx and `window_env_`)
  * This will the replace `process.env` and means environment variables can be changed without needing a new deploy
* Better integration with Keycloak Gatekeeper so we do not have to refresh the web page (F5) every 5 minutes to 
  get a working token

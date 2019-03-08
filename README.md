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
  * If you need more matchers than Jest offers, use [jest-dom](https://github.com/gnapse/jest-dom)

### Create library
Requires some configuration and bundling via [rollup.js](https://rollupjs.org/guide/en).

### Writing tests
Easy to follow guides for **Jest** are located [here](https://jestjs.io/docs/en/tutorial-react) and if you need to test
DOM manipulation use **React Testing Library**, guides for can be found [here](https://testing-library.com/docs/react-testing-library/intro).

### Try this application locally
The first time you clone the repository, remember to run `yarn install`.

Run `REACT_APP_BACKEND="BACKEND_url_here" yarn start` and navigate to `http://localhost:3000/`.

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
The repository name needs a prefix which should be `fe-`, this stands for **f**ront-**e**nd. If a Jenkinsfile is present 
it will trigger a build on pull requests and commits to branches with a pull request open. The build should result in a 
docker-container that can be deployed on the platform. 

You can check running builds here [https://jenkins.infra.ssbmod.net/job/mod-sirius/](https://jenkins.infra.ssbmod.net/job/mod-sirius/).

For the deploy to actually happen the application needs a HelmRelease.

To expose your application on the internet you need to add a VirtualService.

These things are handled by the platform developers for now.

#### Keycloak
Applications deployed to the platform will have Keycloak Gatekeeper in front of them handling authorization. To use this
in your application you need to add `Authorization` to the header of your calls:
```
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${cookieToken}`
  }
})
```

This token can be found by accessing the cookies created by the Gatekeeper for your application:
```
const cookieItem = 'kc-access'
const cookieToken = document.cookie.split(';')
  .filter(item => item.includes(`${cookieItem}=`))[0]
  .replace(`${cookieItem}=`, '')
```

Replace `kc-access` with whatever the name of the token cookie item you are looking for is called. If you need to 
checkout what cookies Gatekeeper has created you can always open the developer tools in your browser and check Cookies 
under the Application tab.

#### Dockerfile
[Dockerfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Dockerfile)

The reason for copying over our own [nginx.conf](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/nginx.conf) is for it to work with **React Router**, so we make our own:
```
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

#### Jenkinsfile
[Jenkinsfile](https://github.com/statisticsnorway/fe-react-reference-app/blob/master/Jenkinsfile)

### Things down the line
* Multistaging Dockerfiles (needs newer version of Docker on the platform)
* Runtime environment variables (needs some trixing with Nginx and `window_env_`)
* Newer versions of Node.js and Yarn installed on Jenkins (right now we are limited to Node 8.14.0 and Yarn 1.7.0)

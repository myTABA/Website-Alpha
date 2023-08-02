# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## .env.local variables

Clerk Key as REACT_APP_CLERK_PUBLISHABLE_KEY

Google Key as REACT_APP_GOOGLE_KEY

AWS access key as AWS_ACCESS_KEY

AWS secret access key as AWS_SECRET_ACCESS_KEY

## General Directory Structure
public folder houses the public assets: index.html, favicon

src folder houses all the code.
app.js is where the "routing" is taken care of. this is the page where components are rendered.

### src/elements
Houses the react components.

Any non folder file is a "global" file to be used for all components as a whole(scrollToTop.jsx).
Any non folder file in the src folder is to be meant for the website as a whole, though they're interchangable.

Each folder inside of this is affiliated with a "page".
A single jsx file acts as the canvas that renders all other elements required for the page.
Each folder inside it has a jsx and a css folder for respective jsx and styling code

JSX are split up component wise.

## Handy Tips
If replacing or updating any data with backend, all requests are asynchronous in nature, e.g. axios. hence, the data is not available when the webpage renders. Will throw errors. 

Create a useState hook for the data, set it to `[]` initially so that it loops over empty array in render. Then in the `then` portion of the promise, update the state.

Once the state updates, the component will refresh and display the data.

Alternatively, conditional renders. use an `if-else` block and set a state to be a boolean which checks whether data has been loaded. I don't recommend this one because it will involve substantial rewrite and restructuring.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run deploy`

Runs the predeploy command which builds the app.
Then it pushes the build folder to gh pages

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

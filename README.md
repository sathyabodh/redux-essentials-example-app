# Redux Essentials Tutorial Example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

- - - -

### Features learnt

#### Redux usage
1. Usage redux toolkit to create store, slice, reducers
2. Additional configuration to specify extra reducers for custom action and reducer
3. Usage *thunk* middleware for fetching data from server
4. Always store primitive or serializable values like object inside the store. Dont store instances in the store. Ex. date instance. In this example, date is converted to string representation and then stored inside the store.

#### I18n Usage
Used i18next and i18next-react library for 18n support
1. Used string translation
2. Used string with interpolation (see UserPage.jsx)
3. Used plurals feature (see UserPage.jsx)
4. Used <Trans> for title (see Navbar.jsx) which contains elements (html) in string for translation
5. Used date formatting with moment.js.
   1. Configured i18n to load locale values for spanish
   2. Added format function in i18n.js
   3. Added listner in i18n.js to listen for local change to set moment.js 
6. Added option to change the locale(see Navbar.js)
7. Used namespace concept to split the translation file into module specific files with default namespace being app (see i18n.js). This also helps to load only the required translation in the browser
8. Used `useTranslation` hook to acheive translation in jsx files
9. Root level components are wrapped inside `<Suspense>` tag as i18n requires this which in turn used for async loading of translation files

#### Code splitting
Used code splitting support from react to split code into multiple chunks. Split is logic used here is 
1. Route level splitting using `lazy` and `import` function of react
2. PostExcerpt and ReactionButton are split at component level so that common code is not bundled for every chunk used for route level splitting


#### Performance tuning
Below are the main features learnt while doing redux implementation
1. Used React.memo to render the component only if the input `props` are changed. This is mainly useful if the parent component changes which in turn calls render for all child component. If child component input `props` not changed, then usage of `React.memo` helps in avoiding the re render
2. Use `Redux toolkit's createEntityAdapter` (see postSlice.js) to normalize the data which helps in returning the same reference if there is no change in the data. This also provides useful `selectors` for working with data.
3. Avoid returning new references in `selector` function like using array methods like `filter / map` etc which makes the component to call render since reference changes
4. Learnt the usage of profiler to see the which components are rendered when state changes
5. Always `select` minimum information for the component to render. This will help in avoiding re render if that piece of data is not changed

#### Use of hooks
Below hooks are used
1. useState
   1. This is used to maintain component status. Guideline is to use individual state rather than like object. Since this does not merge the status, when part of the object change, if we set entire object, then component using the different state also gets re renderd as this is state change
2. useEffect
   1. This is mainly used to make api calls or side effects. Good way to use this is specify the list of dependencies as the last arguments. If any change happens to any one of the mentioned dependencies then only effect will be run.
   2. Return the clean up function as part of useEffect to run the clean up when required. Either due to component un mount or part of next component did update lifecycle
   3. Pass empty list of dependency array for the last arugment to make the function run for Component mounted / component will un mount lifecyle exlcuding component did upate lifecyle. Empty list means there is no depednecy on the any props, state
   4. Always use function which uses props / state inside this hook as it will bind to correct version of the props / state 
   - - - -

### Pending Tasks
   - [ ]Currently redux store code is not split according to module. All the reducers / actions are loaded together insted when required
   - [ ]Learn Server side rendering for this app
   - [ ]Progressive App ????

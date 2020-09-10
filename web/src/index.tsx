import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/page.css';
import './styles/animate.min.css';
import './styles/tailwind.css';

const render = (Component: any) => {
  return ReactDOM.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

render(App);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

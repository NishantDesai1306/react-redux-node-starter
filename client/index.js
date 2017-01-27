import React from 'react';
import ReactDOM from 'react-dom';
import routes from './app/routes';
import {Provider} from 'react-redux';
import store from './app/store';

ReactDOM.render( <Provider store={store}>{routes}</Provider>, document.getElementById('app') );
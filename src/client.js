// client.js
// 演示项目的入口，入口模块负责调用ReactDOM.render()

import React from 'react';
import ReactDOM from 'react-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import actions from './actions';
import reducers from './reducers';
import utils from './utils';
import Immutable from 'immutable';
import state from './state';
import RepairClaim from './RepairClaim';

const STORE_NAMESPACE = 'redux-todos';

const middlewares = compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f);

// 创建整个应用的redux store ，用于存储整个应用的state，并提供初始的state值
const store = createStore(reducers,Immutable.fromJS(state), middlewares);

// 监听state的更改，并将state持久化保存。注意subscribe仅用于演示，请不要在正式开发中使用，容易导致内存泄漏
// store.subscribe(() => {
//     const state = store.getState();
//     utils.store(STORE_NAMESPACE,state);
//     // store.dispatch(actions.upload(state.get('todos').toJS()));
// });

// 在DOM ID为todoApp的节点上渲染react根组件，组件必须由react-redux的Provider包装，并为Provider赋值store属性
ReactDOM.render(<Provider store={store}><RepairClaim/></Provider>, document.getElementById('repairapp'));

// utils,js
// 工具模块

import Immutable from 'immutable';
import State from './state';
import {ALL_TODOS} from './localization';

// 提供一个简便的uuid算法，注意该方法中使用了Math.random()，所以不可以在reducer中调用
export function uuid() {
    let i, random;
    let uuid = '';
    for(i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if(i === 8 || i === 12 || i === 16 || i === 20)
            uuid += '-';
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }
    return uuid;
}

const toBoolean = value => {
    if(_.isBoolean(value))
        return value;

    if(_.isString(value)) {
        value = value.trim().toLocaleLowerCase();

        return value !== '' && value !== '0' && value !== 'false';
    }

    if(_.isNumber(value))
        return value !== 0;

    return !_.isNil(value);
};

// 用于将state存储到HTML5 LocalStorage内的方法，如果未提供state参数，则返回一个初始state值
export function store(namespace, state) {
    if(state)
        return localStorage.setItem(namespace, JSON.stringify(state.toJS()));

    const store = localStorage.getItem(namespace);
    return store ? Immutable.fromJS(JSON.parse(store)) : Immutable.fromJS(State);
}

export default {
    toBoolean,
    uuid,
    store
}

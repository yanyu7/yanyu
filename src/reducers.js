import Immutable from 'immutable';
import actions from './actions';
import commonActions from './Common/common-actions';
const createEmptyState = state => state === undefined || state === null ? Immutable.Map() : state;

import {combineReducers} from 'redux-immutable';

const shell = (state, action) => {
    if(state === undefined || state === null)
        state = Immutable.List.of();

    switch(action.type) {
        case 'ADD_REPAIR_CLAIM':
            // if(action.route) {
            //     state = state.set('route', action.route);
            //     state = state.set('routeParameters', Immutable.fromJS(action.parameters));
            // } else {
            //     state = state.delete('route');
            //     state = state.delete('routeParameters');
            // }
            state = state.set('route', '/add');
            return state;
        case 'ADD_REPAIR_CLAIM_REGISTRATION':
            state = state.set('route', '/addRepair');
            return state;
        case 'IS_REPLY_REPAIR_CLAIM':
            //state = state.delete('route');
            state = state.set('route', '#/');
            return state;
        case 'SEARCH_REPAIR_CLAIM':
            state = state.set('route', '/add');
            return state;
        case 'INIT_VEHICLE_KEY_SUCCEED':
            state = state.set('route', '/add');
            return state;
        case 'INIT_REPAIR_CLAIM_FAULT':
            state = state.set('route', '/addRepair');
            return state;
         default:
             state = state.set('route', '#/');
             return state;
    }
};

const queryPanelState = (state, action) => {
    state = createEmptyState(state);
    switch(action.type) {
        case 'QUERY_START_SUCCEED':
           return  state.set('condition',action.field,action.value);
        default:
            return state;
    }
};

const repairClaimApp = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        default:
            return state;
    }
};

const queryPanelPage = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        default:
        return state;
    }
};

const dataTablePanelPage  = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case 'INIT_KEY_SUCCEED':
            if(action.keyData)
                ['status', 'rejectStatus', 'repairType'].forEach(key => {
                    if(action.keyData[key]) {
                        let columns = state.getIn(['columns', 'columns']);

                        columns = columns.update(
                            columns.findIndex(item => item.get('field') === key),
                            item => item.set('enum', Immutable.fromJS(action.keyData[key]))
                        );
                        state = state.setIn(['columns', 'columns'], columns);
                    }
                });
            return state;
        case 'DATA_TABLE_PANEL_CHANGE_SELECTION':

            if(action.selectedRowKeys)
                state = state.set('selectedRowKeys', Immutable.fromJS(action.selectedRowKeys));
            break;
        default:
            return state;
    }
};

const queryCheckedPage = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case 'IS_EXPAND_QUERY_CHECKED_PAGE':
            const isExpand = !state.get('isExpand');

            state = state.set('isExpand', isExpand);
            break;
    }
    return state;
};

const repairClaimList = (state, action) => {
    switch(action.type) {
        case 'INIT_CONTACTS_SUCCEED':
            return state.set('data',Immutable.fromJS(action.data));
        default:
            return state;
    }
};

const repairClaimDetail = (state, action) => {
    switch(action.type) {
        case 'INIT_VEHICLE_KEY_SUCCEED':
            if(action.keyVehicleData)
                ['productType', 'repairTarget', 'vehicleSeries', 'productFactory'].forEach(key => {
                    if(action.keyVehicleData[key]){
                        let data = state.get('data');
                            if(action.keyVehicleData[key]===key) {
                                    data.set('value', action.keyVehicleData[key].get('value'));
                                state = state.set('data', data);
                            }
                    }
                });
            return state;
        case 'SEARCH_REPAIR_CLAIM':
            if(action.searchData)
              //  let data = state.get(['data']);
            // if(action.searchData[vin] === data.vin)
            state = state.set('data',Immutable.fromJS(action.searchData));
            return state;
        case 'ADD_REPAIR_CLAIM':
            return state.setIn(['data', action.id], action.value);
        default:
            return state;
    }
};

const repairClaimFault = (state, action) => {
    switch(action.type) {
        case 'INIT_REPAIR_CLAIM_FAULT':
            // if(action.state)
            let tabKey = "";
             const data = state.get('data');
             data.forEach(key =>{
                tabKey += key.size;
                tabKey++;
                 //('.card').push(tabPane);
             });
            return tabKey;
            return state;
        default:
            return state;
    }
};

const appState = combineReducers({
    queryPanelState,
    repairClaimApp
});

const uiState = combineReducers({
    queryPanelPage,
    dataTablePanelPage,
    queryCheckedPage
});

const domainData = combineReducers({
    repairClaimList,
    repairClaimDetail,
    repairClaimFault
});

export default (combineReducers({
    shell,
    uiState,
    appState,
    domainData
}));

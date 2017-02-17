import commonActions from './Common/common-actions';

export const ADD_REPAIR_CLAIM = 'ADD_REPAIR_CLAIM';
export const ADD_REPAIR_CLAIM_REGISTRATION = 'ADD_REPAIR_CLAIM_REGISTRATION';
export const SAVE_REPAIR_CLAIM = 'SAVE_REPAIR_CLAIM';
export const CANCEL_REPAIR_CLAIM = 'CANCEL_REPAIR_CLAIM';
export const IS_EXPAND_QUERY_CHECKED_PAGE = 'IS_EXPAND_QUERY_CHECKED_PAGE';
export const IS_REPLY_REPAIR_CLAIM = 'IS_REPLY_REPAIR_CLAIM';
export const QUERY_START_SUCCEED = 'QUERY_START_SUCCEED';
export const INIT_CONTACTS_SUCCEED = 'INIT_CONTACTS_SUCCEED';
export const INIT_KEY_SUCCEED = 'INIT_KEY_SUCCEED';
export const INIT_VEHICLE_KEY_SUCCEED = 'INIT_VEHICLE_KEY_SUCCEED';
export const PAGE_INIT_SUCCESS = 'PAGE_INIT_SUCCESS';
export const DATA_TABLE_PANEL_CHANGE_SELECTION = 'DATA_TABLE_PANEL_CHANGE_SELECTION';
export const SEARCH_REPAIR_CLAIM = 'SEARCH_REPAIR_CLAIM';
export const INIT_REPAIR_CLAIM_FAULT = 'INIT_REPAIR_CLAIM_FAULT';

const addRepairClaim = (id, value) => ({
    type: ADD_REPAIR_CLAIM,
    id,
    value
});

const addRepairClaimRegistration = (route) => ({
    type: ADD_REPAIR_CLAIM_REGISTRATION,
    route
});

const saveRepairClaim = () => ({
    type: SAVE_REPAIR_CLAIM
});

const cancelRepairClaim = () => ({
    type: CANCEL_REPAIR_CLAIM
});

const isExpandQueryCheckedPage =() =>({
    type: IS_EXPAND_QUERY_CHECKED_PAGE
});

const isReplyRepairClaim = () =>({
    type: IS_REPLY_REPAIR_CLAIM
});

const setCondition = (field, value) => ({
    type: QUERY_START_SUCCEED,
    field,
    value
});

const initRepairClaimFault = () => ({
    type : INIT_REPAIR_CLAIM_FAULT
});

const onSearch = function(vin) {
    return dispatch => {
        return fetch('../vehicleInfoes.json')
            .then(res => res.json())
            .then(searchData =>{
                dispatch({
                    type: SEARCH_REPAIR_CLAIM,
                    searchData : searchData.find(r => r.vin === vin)
                })
            });
    }
};

const initKeyValueItems = function(conditions) {
    return dispatch => {
        return fetch('../keyValueItems.json')
            .then(res => res.json())
            .then(keyData => {
                dispatch({
                    type: INIT_KEY_SUCCEED,
                    keyData: keyData
                })
            });
    }
};

const initVehicleKeyValueItems = function() {
    return dispatch => {
        return fetch('../vehicleKeyValueItem.json')
            .then(res => res.json())
            .then(keyVehicleData => {
                dispatch({
                    type: INIT_VEHICLE_KEY_SUCCEED,
                    keyVehicleData: keyVehicleData
                })
            });
    }
};

const initRepairClaim = function(conditions) {
    return dispatch => {
        return fetch('../repairClaim.json')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: INIT_CONTACTS_SUCCEED,
                    data: data
                })
            });
    }
};

const onQueryData = (conditions, page, pageSize, panelId) => dispatch => {
    dispatch(commonActions.queryPanelQueryBegin(panelId));
    return AjaxPost(url || './query', {
        conditions,
        page,
        pageSize
    }).then(
        data => {
            if(data.success)
                dispatch(commonActions.queryPanelQuerySuccess(panelId, data.data, page, pageSize));
            else
                ShowError(data.message);
        },
        jqXHR => {
            const error = new AjaxError(jqXHR);

            ShowError(error.message);
            dispatch(commonActions.queryPanelQueryFail(panelId, error));
        }
    )
};

const dataTablePanelChangeSelection = (selectedRowKeys, selectedRows) => ({
      type: DATA_TABLE_PANEL_CHANGE_SELECTION,
        selectedRowKeys,
        selectedRows
});

export default {initRepairClaimFault, onSearch, addRepairClaim, addRepairClaimRegistration, saveRepairClaim, cancelRepairClaim, isExpandQueryCheckedPage, isReplyRepairClaim, onQueryData, initRepairClaim, setCondition, initKeyValueItems, initVehicleKeyValueItems, dataTablePanelChangeSelection};

const PAGE_INIT_BEGIN = 'PAGE_INIT_BEGIN';
const PAGE_INIT_SUCCESS = 'PAGE_INIT_SUCCESS';
const PAGE_INIT_FAIL = 'PAGE_INIT_FAIL';
const PAGE_CHANGE_ROUTE = 'PAGE_CHANGE_ROUTE';

const QUERYPANEL_SET_VALUE = 'QUERYPANEL_SET_VALUE';
const QUERYPANEL_QUERY_BEGIN = 'QUERYPANEL_QUERY_BEGIN';
const QUERYPANEL_QUERY_SUCCESS = 'QUERYPANEL_QUERY_SUCCESS';
const QUERYPANEL_QUERY_FAIL = 'QUERYPANEL_QUERY_FAIL';

const DATATABLEPANEL_CHANGE_OPTION = 'DATATABLEPANEL_CHANGE_OPTION';
const DATATABLEPANEL_CHANGE_SELECTION = 'DATATABLEPANEL_CHANGE_SELECTION';
const DATATABLEPANEL_EXECUTE_ACTION = 'DATATABLEPANEL_EXECUTE_ACTION';

const pageInitBegin = () => ({
    type: PAGE_INIT_BEGIN
});

const pageInitSuccess = data => ({
    type: PAGE_INIT_SUCCESS,
    data
});

const pageInitFail = error => ({
    type: PAGE_INIT_FAIL,
    error
});

module.exports = {
    PAGE_INIT_BEGIN,
    PAGE_INIT_SUCCESS,
    PAGE_INIT_FAIL,
    PAGE_CHANGE_ROUTE,

    pageInit: url => dispatch => {
        dispatch(pageInitBegin());

        return AjaxGet(url || './init').then(
            data => {
                if(data.success)
                    dispatch(pageInitSuccess(data.data));
                else
                    ShowError(data.message);
            },
            jqXHR => {
                const error = new AjaxError(jqXHR);

                ShowError(error.message);
                dispatch(pageInitFail(error));
            }
        );
    },

    pageChangeRoute: (route, ...parameters) => ({
        type: PAGE_CHANGE_ROUTE,
        route,
        parameters
    }),

    QUERYPANEL_SET_VALUE,
    QUERYPANEL_QUERY_BEGIN,
    QUERYPANEL_QUERY_SUCCESS,
    QUERYPANEL_QUERY_FAIL,

    queryPanelSetValue: (panelId, field, value) => ({
        type: QUERYPANEL_SET_VALUE,
        panelId,
        field,
        value
    }),

    queryPanelQueryBegin: panelId => ({
        type: QUERYPANEL_QUERY_BEGIN,
        panelId
    }),

    queryPanelQuerySuccess: (panelId, data, page, pageSize, total) => ({
        type: QUERYPANEL_QUERY_SUCCESS,
        panelId,
        data,
        page,
        pageSize,
        total
    }),

    queryPanelQueryFail: (panelId, error) => ({
        type: QUERYPANEL_QUERY_FAIL,
        panelId,
        error
    }),

    DATATABLEPANEL_CHANGE_OPTION,
    DATATABLEPANEL_CHANGE_SELECTION,
    DATATABLEPANEL_EXECUTE_ACTION,

    dataTablePanelChangeOption: (panelId, page, pageSize) => ({
        type: DATATABLEPANEL_CHANGE_OPTION,
        panelId,
        page,
        pageSize
    }),

    dataTablePanelChangeSelection: (panelId, selection) => ({
        type: DATATABLEPANEL_CHANGE_SELECTION,
        panelId,
        selection
    }),

    dataTablePanelExecuteAction: (panelId, action) => ({
        type: DATATABLEPANEL_EXECUTE_ACTION,
        panelId,
        action
    })
};

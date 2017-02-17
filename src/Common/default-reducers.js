const Immutable = require('immutable');
const commonActions = require('./common-actions');

const createEmptyState = state => state === undefined || state === null ? Immutable.Map() : state;

const page = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case commonActions.PAGE_CHANGE_ROUTE:
            if(action.route) {
                state = state.set('route', action.route);
                state = state.set('routeParameters', Immutable.fromJS(action.parameters));
            } else {
                state = state.delete('route');
                state = state.delete('routeParameters');
            }

            return state;
    }

    return state;
};

const queryPanel = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case commonActions.QUERYPANEL_SET_VALUE:
            if(action.value === undefined || action.value === null) {
                state = state.deleteIn(['fields', action.field, 'value']);
                state = state.deleteIn(['data', action.field]);
            } else {
                const value = Immutable.fromJS(action.value);

                state = state.setIn(['fields', action.field, 'value'], value);

                let conditions = state.get('conditions');

                if(conditions === undefined || conditions === null)
                    conditions = Immutable.fromJS({
                        [action.field]: action.value
                    });
                else
                    conditions = conditions.set(action.field, value);

                state = state.set('conditions', conditions);
            }

            return state;
        case commonActions.QUERYPANEL_QUERY_BEGIN:
            return state.set('isLoading', true);
        case commonActions.QUERYPANEL_QUERY_SUCCESS:
        case commonActions.QUERYPANEL_QUERY_FAIL:
            return state.set('isLoading', false);
    }

    return state;
};

const dataTablePanel = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case commonActions.QUERYPANEL_QUERY_SUCCESS: {
            const data = state.get('data') || Immutable.Map();

            state = state.set('data', data.set(action.page, Immutable.fromJS(action.data)));
            state = state.set('page', action.page);
            state = state.set('pageSize', action.pageSize);
            state = state.set('total', action.total);
            state = state.delete('dataExpired');

            return state;
        }
        case commonActions.DATATABLEPANEL_CHANGE_OPTION:
            if(action.pageSize === state.get('pageSize')) {
                state = state.set('page', action.page);
                state = state.set('dataExpired', !state.hasIn('data', action.page));
            } else {
                state = state.set('page', 1);
                state = state.set('pageSize', action.pageSize);
                state = state.set('data', Immutable.Map());
                state = state.set('dataExpired', true);
            }
            state = state.delete('selection');

            return state;
        case commonActions.DATATABLEPANEL_CHANGE_SELECTION:
            return state.set('selection', Immutable.fromJS(action.selection));
    }

    return state;
};

module.exports = {
    page,
    queryPanel,
    dataTablePanel
};

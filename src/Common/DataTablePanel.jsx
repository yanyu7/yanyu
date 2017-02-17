const classNames = require('classnames');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Immutable = require('immutable');
const Portlet = require('./Portlet');
const DataTable = require('./DataTable');
const Paginator = require('./Paginator');
const PageSizeSwitcher = require('./PageSizeSwitcher');
const commonActions = require('./common-actions');

//noinspection JSUnusedGlobalSymbols
const DataTablePanel = React.createClass({
    propTypes: {
        state: React.PropTypes.instanceOf(Immutable.Map).isRequired
    },

    contextTypes: {
        dispatch: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    onPageChange(page) {
        this.context.dispatch(commonActions.dataTablePanelChangeOption(this.props.state.get('id') || null, page, this.props.state.get('pageSize')));
    },

    onPageSizeChange(pageSize) {
        this.context.dispatch(commonActions.dataTablePanelChangeOption(this.props.state.get('id') || null, this.props.state.get('page'), pageSize));
    },

    onSelectionChange(selection) {
        this.context.dispatch(commonActions.dataTablePanelChangeSelection(this.props.state.get('id') || null, selection));
    },

    onActionClick(action) {
        if(action && action.trim() !== '')
            this.context.dispatch(commonActions.dataTablePanelExecuteAction(this.props.state.get('id') || null, action));
    },

    render() {
        const state = this.props.state;
        const data = state.getIn(['data', state.get('page')]);
        const className = classNames('queryresultpanel', {
            hidden: !state.get('data')
        });

        return (
            <Portlet className={className} icon="list" title={state.get('title') || '查询结果'}
                     actions={state.get('actions')} onActionClick={this.onActionClick}>
                <div ref="wrapper" style={{
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: '450px'
                }}>
                    <DataTable columns={state.get('columns')} primaryKey={state.get('primaryKey')} data={data}
                               selection={state.get('selection')} onSelectionChange={this.onSelectionChange}/>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Paginator page={state.get('page')} pageSize={state.get('pageSize')} total={state.get('total')}
                                   onChange={this.onPageChange}/>
                    </div>
                    <div className="col-md-4">
                        <div style={{
                            float: 'right',
                            margin: '12px'
                        }}>
                            <PageSizeSwitcher pageSize={state.get('pageSize')} onChange={this.onPageSizeChange}/>
                        </div>
                    </div>
                </div>
            </Portlet>
        );
    }
});

module.exports = DataTablePanel;

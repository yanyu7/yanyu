import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import director from 'director';
import actions from './actions';
import {Button, Input, Table} from 'antd';
import {ALL_TODOS, ACTIVE_TODOS} from './localization';
require('antd/dist/antd.css');

class RepairClaimDataTablePanel extends Component {


    componentDidMount() {
        /*const props = this.props;
         const router = new director.Router({
         });
         router.init('/');*/
    }

    rowSelection() {
        this.props.rowSelection(this.props.state.get('id') || null,selectedRowKeys, selectedRows)
    };
   

    render() {
        const columnsDefined = [];
        const columns = this.props.columns;

        if(columns)
            columns.forEach(col => {
                const data = {};
                data.title = col.title;
                data.key = col.field;
                data.dataIndex = col.field;
                
                if(col.type === 'enum')
                    data.render = value => {
                        const result = col.enum.find(e => e.key === value);
                        if(result)
                            return result.value || value;
                    };
                columnsDefined.push(data);
            });

        return (
        <div>
            <Table ref="agGridReact"
                {...this.state}
                   style={{
                           whiteSpace: 'nowrap',
                           margin: '0px 20px',
                           width: '1800px'
                       }}
                   loading={this.props.loading}
                   columns={columnsDefined}
                   dataSource={this.props.rowData}
                   rowSelection={this.props.rowSelection}
            />
            
        </div>

        );
    }
}

RepairClaimDataTablePanel.propTypes = {
    rowData: React.PropTypes.array,
    rowSelection: React.PropTypes.func,
    columns: React.PropTypes.array
};

const getCurrentPageData = createSelector(
    state => state.getIn(['domainData', 'repairClaimList', 'data']),
    data => data ? data.toJS() : []
);

const getColumnsDefined = createSelector(
    state => state.getIn(['uiState', 'dataTablePanelPage', 'columns', 'columns']), columns => {
        const colsDefined = columns.toJS();

        colsDefined.forEach(col => {
            col.render = value => value;
        });

        return colsDefined;
    }
);

const mapStateToProps = state => ({
    rowData: getCurrentPageData(state),
    columns: getColumnsDefined(state)
});

const mapDispatchToProps = dispatch => ({
    rowSelection: (selectedRowKeys, selectedRows) => (actions.dataTablePanelChangeSelection(selectedRowKeys, selectedRows))
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairClaimDataTablePanel);
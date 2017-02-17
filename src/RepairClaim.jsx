import React, {Component} from 'react';
import {connect} from 'react-redux';
import RepairClaimQueryPanel from './RepairClaimQueryPanel';
import RepairClaimDataTablePanel from './RepairClaimDataTablePanel';
import RepairClaimAdd from './RepairClaimAdd';
import RepairClaimAddRegistration from './RepairClaimAddRegistration';
import {ADD_REPAIR_CLAIM} from './actions';
const commonActions = require('./Common/common-actions');
import director from 'director';
import actions from './actions';
import Immutable from 'immutable';

import {Button, Input, Table, Icon} from 'antd';
require('antd/dist/antd.css');

class RepairClaim extends Component{
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onAddRepair = this.onAddRepair.bind(this);
        this.onEdit = this.onEdit.bind(this);

        const title = () => <span style={{
            color: 'red',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif'
        }}>维修索赔单查询</span>;

        this.state = {
            bordered: true,
            loading: false,
            size: 'small',
            title,
            scroll: {
                x: true,
                y: false
            },
        };
    };

    onSelect(){
        this.props.onSelect(this.props.condition);
    };

    onAdd(){
        this.props.onAdd(this.props.route);
    };

    onAddRepair(){
        this.props.onAddRepair(this.props.route);
    };

    onEdit(){
        this.props.onEdit(this.props.route);
    };

    componentDidMount() {
        this.props.onKeyClick(this.props.condition);
        // const dispatch = this.props.dispatch;
        // const router = new director.Router({
        //     '/add': () => this.props.addRepairClaim('/add')
        // });
        //  router.init('/');
    };


    render() {
        const route = this.props.route;

                switch(route) {
                    case '/add':
                        return (<div><RepairClaimAdd/></div>);
                    case '/addRepair':
                        return (<div><RepairClaimAddRegistration/></div>);
                    default:
                        return (
                            <div style={{border: '1px #5E5E5E solid', width: '1850px', marginTop: '10px', paddingTop: '10px', marginLeft: '30px', marginRight: '30px'}}>
                                <div style={{textAlign: 'left', marginLeft: 18, marginTop: 5, marginBottom: 5, fontSize: '16px', fontWeight: 'bold'}}>维修索赔单查询 
                                    &nbsp;&nbsp;<Button onClick={this.onSelect}><Icon type="search"/><a href="#/">查询</a></Button>
                                    &nbsp;&nbsp;<Button onClick={this.onAdd}><Icon type="plus"/><a href="#/add">来客登记</a></Button>
                                    &nbsp;&nbsp;<Button onClick={this.onAddRepair}><Icon type="plus"/><a href="#/addRepair">维修单登记</a></Button>
                                    &nbsp;&nbsp;<Button onClick={this.onEdit}><Icon type="edit"/><a href="#/edit">修改</a></Button>
                                </div>
                                <RepairClaimQueryPanel/>
                                <RepairClaimDataTablePanel/>
                            </div>);
                }
    }
}

const mapStateToProps = state => ({
    route: state.getIn(['shell', 'route']),
    condition: state.getIn(['appState', 'queryPanelState', 'condition']),
    load: false
});

const mapDispatchToProps = dispatch => ({
    onAdd: route => dispatch(actions.addRepairClaim(route)),
    onAddRepair: route => dispatch(actions.addRepairClaimRegistration(route)),
    onEdit: route => dispatch(actions.addRepairClaim(route)),
    onSelect: (conditions) => dispatch(actions.initRepairClaim(conditions)),
    onKeyClick: (conditions) => dispatch(actions.initKeyValueItems(conditions))
});

RepairClaim.propTypes = {
    onKeyClick: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    load: React.PropTypes.bool,
    route: React.PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(RepairClaim);

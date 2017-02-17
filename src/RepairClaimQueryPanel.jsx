import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import director from 'director';
import actions from './actions';
import {Button, Input, Table} from 'antd';
require('antd/dist/antd.css');
import Immutable from 'immutable';
import commonActions from './Common/common-actions';

import {ALL_TODOS, ACTIVE_TODOS} from './localization';


class RepairClaimQueryPanel extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }



    onChange(event) {
        this.props.setCondition(event.target.dataset.field, event.target.value.trim());
    };

    render() {
        const title = '维修索赔单查询';
        const fields = this.props.state;
        const styleInternal = {
            margin: '0px 20px',
            width: '80px'
        };
        return (
            <div icon="search" title={title} onChange={this.onChange} form="true" style={{margin: '0px 20px', width: '2020px', paddingBottom: '5px', marginHeight: '10px'}}>
                <label className="control-label col-md-3">车牌号</label>
                <input type="text" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="plate"/>
                <label className="control-label col-md-6">出厂编号</label>
                <input type="text" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="productionCode"/>
                <label className="control-label col-md-9">维修单编号</label>
                <input type="text" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="repairOrderCode"/>
                <label className="control-label col-md-12">维修类型</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="repairType">
                    <option value="1">普通维修</option>
                    <option value="2">外出服务</option>
                    <option value="3">强制保养</option>
                </select>
                <label className="control-label col-md-15">VIN码</label>
                <input type="text" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="vin"/>
                <label className="control-label col-md-18">分公司</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="branch">
                    <option value="1">北汽福田汽车股份有限公司北京配件销售分公司</option>
                </select>
                <label className="control-label col-md-21">品牌</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="brand">
                    <option value="1">奥铃</option>
                    <option value="2">欧可</option>
                    <option value="3">拓陆者萨普</option>
                </select>
                <label className="control-label col-md-24">服务产品线</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange}  style={styleInternal} data-field="productLine">
                    <option value="10">奥铃捷运</option>
                    <option value="11">奥铃TX</option>
                    <option value="12">奥铃CTX</option>
                </select>
                <label className="control-label col-md-27">状态</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="status">
                    <option value="1">新建</option>
                    <option value="99">作废</option>
                    <option value="2">生成</option>
                </select>
                <label className="control-label col-md-30">驳回状态</label>
                <select type="select" className="form-control input-sm" onChange={this.onChange} style={styleInternal} data-field="rejectStatus">
                    <option value="1">未驳回</option>
                    <option value="2">维修驳回</option>
                    <option value="4">全部驳回</option>
                </select>
                <label className="control-label col-md-33">创建时间</label>
                <input type="date" className="form-control input-sm" onChange={this.onChange} style={{width: '120px'}} data-field="createTime"/>

            </div>
        );
    }
}
;

RepairClaimQueryPanel.propTypes = {
    state: React.PropTypes.object.isRequired,
    setCondition: React.PropTypes.func
};

RepairClaimQueryPanel.contextTypes = {
    //dispatch: React.PropTypes.func
};



const mapStateToProps = state => ({
    state: state.getIn(['uiState', 'queryPanelPage', 'fields'])
});

const mapDispatchToProps = dispatch => ({
    setCondition: (field, value) => dispatch(actions.setCondition(field, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(RepairClaimQueryPanel);
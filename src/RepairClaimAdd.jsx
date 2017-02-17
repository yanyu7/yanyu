import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import actions from './actions';
import {Table, Col, Input, Row, Icon, Form, Select, Checkbox, Button, Tabs, DatePicker, Modal} from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
require('antd/dist/antd.css');

class RepairClaimAdd extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onReply = this.onReply.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSearch = this.onSearch.bind(this);
    };

    componentWillReceiveProps() {
        this.props.onKeyClick();
        //this.props.onChange(e.target.dataset.id, e.target.value.trim());
    };

    onSearch(e) {
        this.props.onSearch(e);
    };

    onExpand() {
        this.props.onExpand();
    };

    onSave() {
        Modal.confirm({
            title: '是否保存？',
            content: '保存此操作',
            okText: '确定',
            cancelText: '取消',
            onOk: this.handleOk,
            onCancel: this.handleCancel
        });
    };

    onCancel() {
        //if(action && action === 'abondon')
            Modal.confirm({
                title: '是否撤销？',
                content: '撤销此操作',
                okText: '确定',
                cancelText: '取消',
                onOk: this.handleOk,
                onCancel: this.handleCancel
            });
    };

    onReply() {
        this.props.onReply();
    };

    onChange(e) {
        this.props.onChange(e.target.dataset.id, e.target.value.trim());
    };
    
    render() {

        const data = this.props.detailData;

        const content = (
            <div className="gutter-example">
                <Form style={{margin: 20}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, fontColor: 'red'}}
                                      label="维修对象"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Select defaultValue="整车" style={{ width: 150, height: 26}} size="small" value={data.repairTarget}>
                                    <Option value="1">整车</Option>
                                    <Option value="2">专项发动机</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                      label="出厂编号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Search
                                    style={{ width: 150 , height: 26}}
                                    onSearch={value => console.log(value)}
                                    value={data.serialNumber}
                                />
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'

                            }}
                                      label="车牌号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Search
                                    style={{ width: 150 , height: 26}}
                                    onSearch={value => console.log(value)}
                                    value={data.vehicleLicensePlate}
                                />
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                      label="VIN码"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Search
                                    style={{ width: 150 , height: 26}}
                                    onSearch={this.onSearch}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="产品系列"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.vehicleCategoryName}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="工况类别"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.productType}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="服务产品线"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.serviceProductLineName}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="品牌"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.productCategoryName}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="整车编码"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.productCode}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="发动机型号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.engineModel}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="发动机编号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.engineSerialNumber}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="车型名称"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value="无"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="变速箱型号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: '150px',
                                    height: '26px'}} disabled="true"
                                       value={data.gearModel}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="变速箱序列号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.gearSerialNumber}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="销售日期"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.salesDate}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="车桥类型"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.bridgeType}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="营销公司"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                       value={data.brandName}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                      label="生产工厂"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Select defaultValue="" size="small" style={{width: 150,
                                    height: 26}} value={data.productFactory}>
                                    <Option value="1">北汽福田汽车股份有限公司南海汽车厂</Option>
                                    <Option value="2">北汽福田汽车股份有限公司北京多功能汽车厂</Option>
                                    <Option value="3">北汽福田汽车股份有限公司山东多功能汽车厂</Option>
                                    <Option value="4">北汽福田汽车股份有限公司奥铃多功能汽车厂</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="客户名称"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.dealerCode}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="出厂日期"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.outOfFactoryDate}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="联系人"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true"
                                value={data.customerName}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                      label="联系人电话"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}}
                                       value={data.customerCellPhoneNumber}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="手机号码"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.memberPhone}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="VIP"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 6}}>
                                <Checkbox onChange={this.onChange} value={data.vIPVehicle}/>
                                <span>车队客户</span> <Checkbox onChange={this.onChange} value={data.isTeamCustomers}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="会员号"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.memberCode}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                      label="客户名称"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.memberName}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="证件类型"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.idDocumentType}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="证件号码"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.idNumer}/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="会员等级"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.memberRank}/>
                            </FormItem>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <FormItem style={{marginBottom: 3}}
                                      label="手机号码"
                                      labelCol={{span: 5}}
                                      wrapperCol={{span: 12}}>
                                <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.memberPhone}/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>);
        //const isExpand = this.props.isExpand;
        //const vehicleInfo = this.props.vehicleInfo;

        return (
            <div style={{backGroundColor: '#ccc', border: '1px #5E5E5E solid', width: 1850, marginTop: 10,  paddingTop: 10, marginBottom: 5, marginLeft: 30, marginRight: 30,  fontSize: 14}}>
                <div>
                    <a style={{marginLeft: 10, fontWeight: 'bold'}} onClick={this.onExpand}><Icon type={this.props.isExpand ? 'down-circle-o' : 'up-circle-o'} />车辆信息</a>
                    <Button  style={{marginLeft: 1500 , marginBottom: 5}} href="#/" onClick={this.onSave}><Icon type="check" />保存</Button>&nbsp;&nbsp;
                    <Button  style={{marginBottom: 5}} href="" onClick={this.onCancel}><Icon type="close" />撤销</Button>
                    &nbsp;&nbsp;
                    <Button  style={{marginBottom: 5}} href="#/" onClick={this.onReply}><Icon type="rollback" />返回</Button>
                </div>
                    <hr style={{ marginBottom: 10}}/>
                    {this.props.isExpand ? '' : content}
                <div className="card-container">
                    <Tabs type="card">
                        <TabPane tab="主信息">
                            <span style={{fontSize: 14, fontWeight: 'bold', marginLeft: 30}}>維修基本信息</span>
                            <hr style={{ marginBottom: 10, width: 1600, marginLeft: 30}}/>
                            <Form style={{margin: 20}}>
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <FormItem style={{marginBottom: 3, Color: 'red'}}
                                                  label="车辆状态"
                                                  labelCol={{span: 5}}
                                                  wrapperCol={{span: 12}}>
                                            <Input size="small" style={{width: 150,
                                    height: 26}} disabled="true" value={data.salesStatus} data-id="salesStatus" onChange={this.onChange}/>
                                        </FormItem>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <FormItem style={{marginBottom: 3, color: 'red'}}
                                                  label="维修类型"
                                                  labelCol={{span: 5}}
                                                  wrapperCol={{span: 12}}>
                                            <Select size="small" style={{width: 150,
                                    height: 26}} value={data.repairType} data-id="repairType" onChange={this.onChange}>
                                                <Option value="0">普通维修</Option>
                                                <Option value="1">外出维修</Option>
                                                <Option value="2">强制保养</Option>
                                                <Option value="3">普通保养</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <FormItem style={{marginBottom: 3}}
                                                  label="商品车类别"
                                                  labelCol={{span: 5}}
                                                  wrapperCol={{span: 12}}>
                                            <Input size="small" style={{width: 150,
                                    height: 26}} value={data.repairAddition} data-id="repairAddition" onChange={this.onChange}/>
                                        </FormItem>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <FormItem style={{marginBottom: 3, color: 'red'}}
                                                  label="报修时间"
                                                  labelCol={{span: 5}}
                                                  wrapperCol={{span: 12}}>
                                            <DatePicker format="YYYY-MM-DD HH:mm" style={{width: 150,
                                    height: 26}} value={data.repairRequestTime} data-id="repairRequestTime" onChange={this.onChange}/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="行驶里程"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 150,
                                  height: 26}} value={data.mileage} data-id="mileage" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="工作小时"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 150,
                                  height: 26}} value={data.workingHours} data-id="workingHours" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="方量"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 150,
                                  height: 26}} value={data.capacity} data-id="capacity" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="视频手机号"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 150,
                                  height: 26}} value={data.videoMobileNumber} data-id="videoMobileNumber" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={18} pull={2}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="车辆用途说明"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 1010,
                                  height: 26}} value={data.vehicleUse} data-id="vehicleUse" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                      <Col className="gutter-row" span={6} >
                                          <FormItem style={{marginBottom: 3}}
                                                    label="派工单号"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 150,
                                  height: 26}} disabled="true"/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="车辆故障描述"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 1520,
                                  height: 26}} value={data.carActuality} data-id="carActuality" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="客户意见"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 1520,
                                  height: 26}} value={data.customOpinion} data-id="customOpinion" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="处理意见"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 1520,
                                  height: 26}} value={data.callOpinion} data-id="callOpinion" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                                  <Row gutter={16}>
                                      <Col className="gutter-row" span={6}>
                                          <FormItem style={{marginBottom: 3}}
                                                    label="备注"
                                                    labelCol={{span: 5}}
                                                    wrapperCol={{span: 12}}>
                                              <Input size="small" style={{width: 1520,
                                  height: 76}} value={data.remark} data-id="remark" onChange={this.onChange}/>
                                          </FormItem>
                                      </Col>
                                  </Row>
                            </Form>
                            <span style={{fontSize: 14, fontWeight: 'bold', marginLeft: 30}}>发动机信息</span>
                            <hr style={{ marginBottom: 10, width: 1600, marginLeft: 30}}/>
                            <div className="gutter-example">
                                <Form style={{margin: 20}}>
                                    <Row gutter={16}>
                                        <Col className="gutter-row" span={6}>
                                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                                      label="保修性质"
                                                      labelCol={{span: 5}}
                                                      wrapperCol={{span: 12}}>
                                                <Select size="small" style={{width: 150,
                                    height: 26}} value={data.engineWarrantyProperties} data-id="engineWarrantyProperties" onChange={this.onChange}>
                                                    <Option value="1">新零件保修</Option>
                                                    <Option value="2">发动机保修</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                                      label="应用领域"
                                                      labelCol={{span: 5}}
                                                      wrapperCol={{span: 12}}>
                                                <Select  size="small" style={{width: 150,
                                    height: 26}} value={data.engineApplicationArea} data-id="engineApplicationArea" onChange={this.onChange}>
                                                    <Option value="1">新/重卡</Option>
                                                    <Option value="2">商务车</Option>
                                                    <Option value="3">公交</Option>
                                                    <Option value="4">工程机械</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <FormItem style={{marginBottom: 3, color: 'red'}}
                                                      label="损坏程度"
                                                      labelCol={{span: 5}}
                                                      wrapperCol={{span: 12}}>
                                                <Select size="small" style={{width: 150,
                                    height: 26}} value={data.engineDamagedCondition} data-id="engineDamagedCondition" onChange={this.onChange}>
                                                    <Option value="1">一般</Option>
                                                    <Option value="2">严重</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

        </div>);
    }
};

const getRepairClaimDetailData= createSelector(
    state => state.getIn(['domainData', 'repairClaimDetail', 'data']),
    data => data ? data.toJS() : []
);

const mapStateToProps = state => ({
    isExpand: state.getIn(['uiState', 'queryCheckedPage', 'isExpand']),
    detailData: getRepairClaimDetailData(state)
});

const mapDispatchToProps = dispatch => ({
    onSearch: (vin) => dispatch(actions.onSearch(vin)),
    onChange: (id, value) => dispatch(actions.addRepairClaim(id, value)),
    onExpand: () => dispatch(actions.isExpandQueryCheckedPage()),
    onReply: () => dispatch(actions.isReplyRepairClaim()),
    onSave: () => dispatch(actions.saveRepairClaim()),
    onCancel: () => dispatch(actions.cancelRepairClaim()),
    onKeyClick: () => dispatch(actions.initVehicleKeyValueItems())
});
RepairClaimAdd.propTypes = {
    onChange: React.PropTypes.func,
    isExpand: React.PropTypes.bool,
    onExpand: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onKeyClick: React.PropTypes.func.isRequired,
    detailData: React.PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps) (RepairClaimAdd);

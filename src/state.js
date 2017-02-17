const state= {

    shell: {
        actionPool: {
            default: [{
                text: '新建维修单',
                url: '#/new',
                icon: 'plus',
                color: 'blue'
            }],
            '/add': [{
                text: '返回',
                url: '#/',
                icon: 'reply',
                color: 'blue'
            }]
        }
    },

    domainData: {

        //索赔单数据源
        repairClaimList: {
            data: []
        },
        repairClaimDetail: {
            data: []
        },
        repairClaimFault: {
            data: [{
                a: ""
            },{
                b: ""
            }]
        }
    },

    appState: {
        queryPanelState: {
            condition: {

            }
        },
        repairClaimApp: {
            
            // 查询条件
            conditions: [],
            // 选择的品牌数据
            repairClaimsSelected: [],
            repairClaimsExpanded: []
        },
    },

    uiState: {
        queryPanelPage: {
            title: '维修单查询',
            fields: {
                plate: {
                    row: 1,
                    column: 1,
                    label: '车牌号',
                    type: 'text'
                },
                productionCode: {
                    row: 1,
                    column: 2,
                    label: '出厂编号',
                    type: 'text'
                },
                repairOrderCode: {
                    row: 1,
                    column: 3,
                    label: '维修单编号',
                    type: 'text'
                },
                repairType: {
                    row: 1,
                    column: 4,
                    label: '维修类型',
                    type: 'select'
                },
                vin: {
                    row: 2,
                    column: 1,
                    label: 'VIN码',
                    type: 'text'
                },
                branch: {
                    row: 2,
                    column: 2,
                    label: '分公司',
                    type: 'select'
                },
                brand: {
                    row: 2,
                    column: 3,
                    label: '品牌',
                    type: 'select'
                },
                productLine: {
                    row: 2,
                    column: 4,
                    label: '服务产品线',
                    type: 'select'
                },
                status: {
                    row: 3,
                    column: 1,
                    label: '状态',
                    type: 'select'
                },
                rejectStatus: {
                    row: 3,
                    column: 2,
                    label: '驳回状态',
                    type: 'select'
                },
                createTime: {
                    row: 3,
                    column: 3,
                    label: '创建时间',
                    type: 'daterange'
                },
                condition: {
                    page: 1,
                    pageSize: 50
                }
            }
        },

        queryCheckedPage: {
            isExpand: false,
            columns: {
                columns: [{
                    dataIndex: 'customerTypeId',
                    title: '价格类型ID'
                }, {
                    dataIndex: 'groupType',
                    title: '分组类型'
                }, {
                    dataIndex: 'groupCode',
                    title: '配件/分组编号'
                }, {
                    dataIndex: 'groupName',
                    title: '配件/分组名称'
                }, {
                    dataIndex: 'status',
                    title: '状态'
                }, {
                    dataIndex: 'parentGroupCode',
                    title: '父级分组编号'
                }, {
                    dataIndex: 'parentGroupName',
                    title: '父级分组名称'
                }, {
                    dataIndex: 'createTime',
                    title: '创建时间'
                }]
            }
        },

        dataTablePanelPage: {
            isExpand: false,
            columns: {
                columns: [{
                    field: 'code',
                    title: '维修单编号'
                }, {
                    field: 'status',
                    title: '状态',
                    type: 'enum'
                }, {
                    field: 'repairType',
                    title: '维修类型',
                    type: 'enum'
                }, {
                    field: 'rejectStatus',
                    title: '驳回状态',
                    type: 'enum'
                }, {
                    field: 'plate',
                    title: '车牌号'
                }, {
                    field: 'vin',
                    title: 'VIN码'
                }, {
                    field: 'client',
                    title: '客户名称'
                }, {
                    field: 'branch.name',
                    title: '分公司'
                }, {
                    field: 'productLine.name',
                    title: '产品线'
                }, {
                    field: 'brands.name',
                    title: '品牌'
                }, {
                    field: 'subShop.code',
                    title: '二级站编号'
                }, {
                    field: 'subShop.name',
                    title: '二级站名称'
                }, {
                    field: 'totalFee',
                    title: '费用合计',
                    type: 'money'
                }, {
                    field: 'manHourFee',
                    title: '工时费',
                    type: 'money'
                }, {
                    field: 'materialFee',
                    title: '材料费',
                    type: 'money'
                }, {
                    field: 'managementFee',
                    title: '材料管理费',
                    type: 'currency'
                }, {
                    field: 'otherFee',
                    title: '其他费用',
                    type: 'money'
                }],
                total: 0,
                // 根据什么排序
                sortBy: '',
                // 是否升序排序
                isAscSorted: 'false',
                // 表格配置
                condition: {
                    page: 1,
                    pageSize: 5
                }
            }
        }
    }
};
export  default state;

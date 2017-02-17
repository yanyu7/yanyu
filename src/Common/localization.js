const en = {
    COMMON_QUERY: 'Search'
};

const zhCN = {
    COMMON_QUERY: '查询',
    DATE_RANGE_INPUT_LOCALE: {
        format: 'YYYY/MM/DD',
        separator: ' - ',
        applyLabel: '确定',
        cancelLabel: '取消',
        fromLabel: '从',
        toLabel: '到',
        customRangeLabel: '自定义',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1
    },
    DATE_RANGE_INPUT_FORMAT: 'YYYY/MM/DD',
    DATE_RANGE_INPUT_TODAY: '今天',
    DATE_RANGE_INPUT_LAST_3_DAY: '最近3天',
    DATE_RANGE_INPUT_LAST_7_DAY: '最近7天',
    DATE_RANGE_INPUT_LAST_30_DAY: '最近30天',
    DATE_RANGE_INPUT_THIS_MONTH: '本月',
    DATE_RANGE_INPUT_THIS_YEAR: '今年'
};

module.exports = {
    en,
    'zh-CN': zhCN
};

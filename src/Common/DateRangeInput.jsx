const _ = require('lodash');
const React = require('react');

/** 提供日期（没有时间）范围输入功能的输入框。 */
const DateRangeInput = React.createClass({
    propTypes: {
        /** 控件的唯一性标识，会在`onChange()`回调函数中使用。 */
        id: React.PropTypes.string,
        /** 控件的表单名称，如果没有指定`id`属性，那么该值会在`onChange()`回调函数中使用。 */
        name: React.PropTypes.string,
        /** 控件的初始值，value[0]为起始日期，value[1]为结束日期。 */
        value: React.PropTypes.arrayOf(React.PropTypes.string),
        /**
         * 在日期范围值发生变化时会调用该方法。
         * 参数：
         * `value (array)`：当前选定的日期范围，value[0]为起始日期，value[1]为结束日期。
         * `id (string)`：控件的`id`或者`name`属性的值。
         */
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return this.parseValue(this.props.value);
    },

    componentDidMount() {
        const control = $(this.refs.control);

        control.daterangepicker({
            locale: L('DATE_RANGE_INPUT_LOCALE'),
            ranges: {
                [L('DATE_RANGE_INPUT_TODAY')]: [moment(), moment()],
                [L('DATE_RANGE_INPUT_LAST_3_DAY')]: [moment().subtract(2, 'days'), moment()],
                [L('DATE_RANGE_INPUT_LAST_7_DAY')]: [moment().subtract(6, 'days'), moment()],
                [L('DATE_RANGE_INPUT_LAST_30_DAY')]: [moment().subtract(29, 'days'), moment()],
                [L('DATE_RANGE_INPUT_THIS_MONTH')]: [moment().startOf('month'), moment().endOf('month')],
                [L('DATE_RANGE_INPUT_THIS_YEAR')]: [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: this.state.value[0],
            endDate: this.state.value[1]
        });
        control.on('apply.daterangepicker', this.onChange);
        if(this.state.shouldSetDefaultValue && _.isFunction(this.props.onChange))
            this.props.onChange(this.props.id, this.state.value);
    },

    componentWillReceiveProps(nextProps) {
        const value = this.parseValue(nextProps.value).value;
        const control = $(this.refs.control).data('daterangepicker');

        control.setStartDate(value[0]);
        control.setEndDate(value[1]);
        this.setState({
            value
        });
    },

    componentWillUnmount() {
        const control = $(this.refs.control);

        control.off('apply.daterangepicker', this.onChange);
        control.daterangepicker('remove');
    },

    parseValue(value) {
        if(_.isArray(value)) {
            if(value.length > 2)
                return {
                    value: [value[0], value[1]],
                    shouldSetDefaultValue: true
                };
            else if(value.length === 2)
                return {
                    value,
                    shouldSetDefaultValue: false
                };
            else if(value.length === 1)
                return {
                    value: [value[0], value[0]],
                    shouldSetDefaultValue: true
                };
        } else if(_.isString(value))
            return {
                value: [value, value],
                shouldSetDefaultValue: true
            };

        return {
            value: [moment().subtract(6, 'days').format(L('DATE_RANGE_INPUT_FORMAT')), moment().format(L('DATE_RANGE_INPUT_FORMAT'))],
            shouldSetDefaultValue: true
        };
    },

    onChange(e, picker) {
        const value = [picker.startDate.format(L('DATE_RANGE_INPUT_FORMAT')), picker.endDate.format(L('DATE_RANGE_INPUT_FORMAT'))];

        this.setState({
            value
        });

        if(_.isFunction(this.props.onChange))
            this.props.onChange(value, e.target.dataset.id || e.target.name);
    },

    render() {
        return (
            <div ref="control" className="btn-group bootstrap-select form-control input-sm">
                <button type="button" className="btn btn-default dropdown-toggle" style={{
                    textAlign: 'left'
                }}>
                    <i className="fa fa-calendar"></i>
                    &nbsp;&nbsp;
                    <span>{`${this.state.value[0]} - ${this.state.value[1]}`}</span>
                </button>
            </div>
        );
    }
});

module.exports = DateRangeInput;

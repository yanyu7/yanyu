const _ = require('lodash');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

/** 提供日期（没有时间）输入功能的输入框。 */
const DateInput = React.createClass({
    propTypes: {
        /** 设置控件是否已禁用。 */
        disabled: React.PropTypes.bool,
        /** 控件的唯一性标识，会在`onChange()`回调函数中使用。 */
        id: React.PropTypes.string,
        /** 控件的表单名称，如果没有指定`id`属性，那么该值会在`onChange()`回调函数中使用。 */
        name: React.PropTypes.string,
        /** 设置控件是否为只读状态。 */
        readOnly: React.PropTypes.bool,
        /** 控件的初始值。 */
        value: React.PropTypes.string,
        /**
         * 在日期值发生变化时会调用该方法。
         * 参数：
         * `value (Date)`：控件当前的值。
         * `id (string)`：控件的`id`或者`name`属性的值。
         */
        onChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    componentDidMount() {
        this.applyDatePicker();
        $(this.refs.control).datepicker().on('changeDate', this.onChangeDate);
    },

    componentDidUpdate() {
        this.applyDatePicker();
    },

    componentWillUnmount() {
        const control = $(this.refs.control);

        control.datepicker().off('changeDate', this.onChangeDate);
        control.datepicker('destroy');
    },

    lastValue: null,

    applyDatePicker() {
        const control = $(this.refs.control);

        control.datepicker('destroy');
        control.datepicker();
    },

    onChangeDate(e) {
        if(_.isFunction(this.props.onChange) && this.lastValue !== e.date) {
            this.lastValue = e.date;
            this.props.onChange(e.date, e.target.dataset.id || e.target.name);
        }
    },

    render() {
        return (<input type="text" ref="control" className="form-control" data-id={this.props.id} name={this.props.name}
                       value={this.props.value} disabled={this.props.disabled} readOnly={this.props.readOnly}/>);
    }
});

module.exports = DateInput;

const React = require('react');

/** 提供一个文本输入框控件。 */
const TextInput = React.createClass({
    propTypes: {
        /** 控件的唯一性标识，会在`onChange()`回调函数中使用。 */
        id: React.PropTypes.string,
        /** 控件的表单名称，如果没有指定`id`属性，那么该值会在`onChange()`回调函数中使用。 */
        name: React.PropTypes.string,
        /** 控件的初始值。 */
        value: React.PropTypes.string,
        /**
         * 在文本框失去焦点且值有变化时会调用该方法。
         * 参数：
         * `value (string)`：文本框中当前的值。
         * `id (string)`：控件的`id`或者`name`属性的值。
         */
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return {
            value: this.props.value || ''
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || ''
        });
    },

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    },

    onBlur(e) {
        if(typeof this.props.onChange === 'function') {
            let value = e.target.value.trim();

            value = value === '' ? null : value;
            if(value !== this.props.value)
                this.props.onChange(value, e.target.dataset.id || e.target.name);
        }
    },

    render() {
        return (<input type="text" className="form-control input-sm" value={this.state.value} data-id={this.props.id}
                       name={this.props.name} onChange={this.onChange} onBlur={this.onBlur}/>);
    }
});

module.exports = TextInput;

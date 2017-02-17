const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

/** 提供掩码功能的输入框。 */
const MaskInput = React.createClass({
    propTypes: {
        /** 控件掩码的值，具体文档请[点击这里](https://github.com/RobinHerbots/jquery.inputmask#masking-types)。 */
        mask: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
        /** 控件的唯一性标识，会在`onChange()`回调函数中使用。 */
        id: React.PropTypes.string,
        /** 控件的表单名称，如果没有指定`id`属性，那么该值会在`onChange()`回调函数中使用。 */
        name: React.PropTypes.string,
        /** 控件的初始值。 */
        value: React.PropTypes.string,
        /**
         * 在控件值发生变化时会调用该方法。
         * 参数：
         * `value (string)`：控件当前的值。
         * `id (string)`：控件的`id`或者`name`属性的值。
         */
        onChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            value: this.props.value
        };
    },

    componentDidMount() {
        this.lastValue = this.props.value || '';
        this.applyMask();
    },

    componentDidUpdate() {
        this.applyMask();
    },

    componentWillUnmount() {
        $(this.refs.control).inputmask('remove');
    },

    lastValue: null,

    applyMask() {
        const control = $(this.refs.control);

        control.inputmask('remove');
        control.inputmask(typeof this.props.mask === 'string' ? {
            mask: this.props.mask,
            placeholder: '',
            greedy: false
        } : this.props.mask);
    },

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    },

    onBlur(e) {
        if(typeof this.props.onChange === 'function' && this.lastValue !== e.target.value) {
            this.lastValue = e.target.value;
            this.props.onChange(e.target.value, e.target.dataset.id || e.target.name);
        }
    },

    render() {
        return (<input type="text" ref="control" className="form-control" data-id={this.props.id} name={this.props.name}
                       value={this.state.value} onChange={this.onChange} onBlur={this.onBlur}/>);
    }
});

module.exports = MaskInput;

const _ = require('lodash');
const Immutable = require('immutable');
const React = require('react');

/** 提供一个可以多选的下拉框控件。 */
const ComboBox = React.createClass({
    propTypes: {
        /**
         * 下拉框内容的集合，每个对象代表一个下拉框项目。
         * 配置项字段：
         * `name (string)`：下拉项的标题，如果`value`类型为集合，则代表分组标题。
         * <code>value (string &#124; array &#124; Immutable.List)</code>：下拉项的值，如果为集合则将集合中的`name`和`value`字段作为子列表配置。
         */
        options: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.instanceOf(Immutable.List)]).isRequired,
        /** 设置控件是否已禁用。 */
        disabled: React.PropTypes.bool,
        /** 控件的唯一性标识，会在`onChange()`回调函数中使用。 */
        id: React.PropTypes.string,
        /** 是否允许多选。 */
        multiple: React.PropTypes.bool,
        /** 控件的表单名称，如果没有指定`id`属性，那么该值会在`onChange()`回调函数中使用。 */
        name: React.PropTypes.string,
        /** 控件的初始值。 */
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]),
        /**
         * 在下拉框选择项发生变化时会调用该方法。
         * 参数：
         * <code>value (string &#124; array)</code>：控件当前所选择的值，类型会依据`multiple`属性不同而不同。
         * `id (string)`：控件的`id`或者`name`属性的值。
         */
        onChange: React.PropTypes.func
    },

    componentDidMount() {
        const control = $(this.refs.control);

        control.on('loaded.bs.select', this.onLoad);
        control.on('changed.bs.select', this.onChange);
    },

    componentWillReceiveProps(nextProps) {
        this.setValue(nextProps.value);
    },

    componentDidUpdate() {
        $(this.refs.control).selectpicker('refresh');
    },

    componentWillUnmount() {
        const control = $(this.refs.control);

        control.off('loaded.bs.select', this.onLoad);
        control.off('changed.bs.select', this.onChange);
        control.selectpicker('destroy');
    },

    setValue(value) {
        const control = $(this.refs.control);

        if(_.isArray(value) || _.isString(value) || _.isInteger(value))
            control.selectpicker('val', value);
        else
            control.selectpicker('val', null);
    },

    onLoad() {
        this.setValue(this.props.value);
    },

    onChange(e) {
        if(_.isFunction(this.props.onChange))
            this.props.onChange($(e.target).selectpicker('val'), e.target.dataset.id || e.target.name);
    },

    render() {
        let createOptionArray = null;
        let createOptionImmutable = null;

        createOptionImmutable = config => {
            const value = config.get('value');
            const text = config.get('text');

            if(Immutable.List.isList(value))
                return <optgroup key={text} label={text}>{value.map(createOptionImmutable)}</optgroup>;
            else if(_.isArray(config.value))
                return <optgroup key={text} label={text}>{value.map(createOptionArray)}</optgroup>;

            return <option key={value} value={value}>{text}</option>;
        };

        createOptionArray = config => {
            if(Immutable.List.isList(config.value))
                return <optgroup key={config.text} label={config.text}>{config.value.map(createOptionImmutable)}</optgroup>;
            else if(_.isArray(config.value))
                return <optgroup key={config.text} label={config.text}>{config.value.map(createOptionArray)}</optgroup>;

            return <option key={config.value} value={config.value}>{config.text}</option>;
        };

        let options = null;

        if(Immutable.List.isList(this.props.options))
            options = this.props.options.map(createOptionImmutable).toArray();
        else if(_.isArray(this.props.options))
            options = this.props.options.map(createOptionArray);

        return (
            <select ref="control" className="selectpicker form-control input-sm" data-id={this.props.id}
                    name={this.props.name} data-none-selected-text="" multiple={this.props.multiple || false}
                    disabled={this.props.disabled || !options || options.length === 0}>
                {options}
            </select>
        );
    }
});

module.exports = ComboBox;

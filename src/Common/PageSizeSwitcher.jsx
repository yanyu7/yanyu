const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const DEFAULT_PAGE_SIZE = 10;

const PageSizeSwitcher = React.createClass({
    propTypes: {
        pageSize: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            id: Guid(),
            pageSize: this.props.pageSize || DEFAULT_PAGE_SIZE
        };
    },

    componentDidMount() {
        const control = $(this.refs.control);

        control.popover({
            container: 'body',
            html: true,
            placement: 'auto bottom',
            trigger: 'manual',
            template: `<div class="popover" role="tooltip">
                            <div class="arrow"></div>
                            <h3 class="popover-title"></h3>
                            <div class="popover-content" style="width: 200px"></div>
                        </div>`,
            content: `<input id="${this.state.id}"/>`
        });

        control.on('shown.bs.popover', this.onShown);
        control.on('hidden.bs.popover', this.onHidden);
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            pageSize: nextProps.pageSize
        });
    },

    componentWillUnmount() {
        if(this.slider)
            this.slider.destroy();

        const control = $(this.refs.control);

        control.off('shown.bs.popover', this.onShown);
        control.off('hidden.bs.popover', this.onHidden);
        control.popover('destroy');
    },

    slider: null,

    onClick() {
        $(this.refs.control).popover('toggle');
    },

    onFinish(value) {
        this.setState({
            pageSize: value
        });
        if(typeof this.props.onChange === 'function')
            this.props.onChange(value);
    },

    onSliderFinish(data) {
        $(this.refs.control).popover('hide');
        this.onFinish(data.from);
    },

    onShown() {
        const input = $(`#${this.state.id}`);

        input.ionRangeSlider({
            type: 'single',
            min: 10,
            max: 100,
            step: 10,
            from: this.state.pageSize,
            onFinish: this.onSliderFinish
        });
        this.slider = input.data('ionRangeSlider');
    },

    onHidden() {
        if(this.slider)
            this.slider.destroy();
    },

    render() {
        const style = {
            color: '#337ab7',
            cursor: 'pointer'
        };

        return (
            <div>
                每页显示 <span ref="control" style={style} onClick={this.onClick}>{this.state.pageSize}</span> 条数据
            </div>
        );
    }
});

module.exports = PageSizeSwitcher;

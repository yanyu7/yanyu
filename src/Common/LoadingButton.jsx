const classNames = require('classnames');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

//noinspection JSUnusedGlobalSymbols
/** 提供一个有繁忙指示动画的按钮。 */
const LoadingButton = React.createClass({
    propTypes: {
        /** 按钮的颜色，详情请参考系统颜色文档。 */
        color: React.PropTypes.string,
        /** 设定按钮是否呈现为繁忙状态。 */
        loading: React.PropTypes.bool,
        /** 按钮的文字。 */
        text: React.PropTypes.string,
        /**
         * 按钮点击后的回调函数。
         * 参数：
         * `e (object)`：React事件对象。
         */
        onClick: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            loading: this.props.loading
        };
    },

    componentDidMount() {
        this.ladda = Ladda.create(this.refs.control);
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loading
        });
    },

    componentWillUnmount() {
        if(this.ladda)
            this.ladda.remove();
    },

    ladda: null,

    checkLoading() {
        if(!this.ladda)
            return;

        if(this.state.loading)
            this.ladda.start();
        else
            this.ladda.stop();
    },

    render() {
        this.checkLoading();

        return (
            <button ref="control" type="button" className={classNames('btn btn-default ladda-button', this.props.color)}
                    data-style="expand-right" disabled={this.state.loading} onClick={this.props.onClick}>
                <span className="ladda-label"><i className="fa fa-list"></i> {this.props.text}</span>
            </button>
        );
    }
});

module.exports = LoadingButton;

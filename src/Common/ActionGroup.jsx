const _ = require('lodash');
const classNames = require('classnames');
const Immutable = require('immutable');
const React = require('react');
const utils = require('../utils');

/** 用于显示一组按钮，并可自定义每个按钮被点击时所执行的操作。 */
const ActionGroup = React.createClass({
    propTypes: {
        /**
         * 按钮配置数据的集合，每个对象代表一个按钮的配置。
         * 单个配置数据的字段：
         * `name (string)`：Action的名称，该名称会在`onActionClick()`回调函数中使用。
         * `text (string)`：按钮上显示的标题文字。
         * `icon (string)`：按钮上显示的图标，详情请参考系统图标文档。
         * `url (string)`：点击按钮所转到的网址。注意：设置该参数将**不会**触发`onActionClick()`回调函数。
         * `color (string)`：按钮的颜色CSS名称，详情请参考系统颜色文档。
         * `hidden (boolean)`：按钮是否隐藏，隐藏的按钮不会显示。
         */
        actions: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.instanceOf(Immutable.List)]),
        /** CSS类名，会被应用在组件最外层，可用于自定义样式。 */
        className: React.PropTypes.string,
        /**
         * 在有按钮被点击时会调用该方法。
         * 参数：
         * `action (string)`：配置中所定义的Action的名称。
         */
        onActionClick: React.PropTypes.func
    },

    onClick(e) {
        if(typeof this.props.onActionClick === 'function')
            this.props.onActionClick($(e.target).data('action'));
    },

    render() {
        const actions = [];
        const addAction = action => {
            if(actions.length > 0)
                actions.push(<span key={actions.length}>&nbsp;</span>);

            const hasUrl = utils.isValidString(action.url);
            const url = (hasUrl && action.url) || 'javascript:;';
            const className = classNames('btn btn-default btn-sm', action.color);
            const onClick = hasUrl ? null : this.onClick;

            actions.push((
                <a key={actions.length} data-action={action.name} href={url} className={className} onClick={onClick}>
                    <i className={utils.isValidString(action.icon) ? utils.getIcon(action.icon) : null}></i> {action.text}
                </a>
            ));
        };

        if(Immutable.List.isList(this.props.actions))
            this.props.actions.filter(action => !utils.toBoolean(action.get('hidden'))).forEach(action => addAction({
                name: action.get('name'),
                text: action.get('text'),
                icon: action.get('icon'),
                url: action.get('url'),
                color: action.get('color')
            }));
        else if(_.isArray(this.props.actions))
            this.props.actions.filter(action => !utils.toBoolean(action.hidden)).forEach(addAction);

        return <div className={this.props.className}>{actions}</div>;
    }
});

module.exports = ActionGroup;

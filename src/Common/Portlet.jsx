const classNames = require('classnames');
const React = require('react');
const Immutable = require('immutable');
const ActionGroup = require('./ActionGroup');
const utils = require('../utils').default;

/** 提供一个自带标题、样式以及功能按钮的内容框。 */
const Portlet = props => {
    const portletClasses = classNames('portlet', {
        box: props.type === 'box',
        light: props.type === 'light' || props.type === 'solid',
        bordered: props.type === 'solid'
    }, props.type === 'box' && props.color, props.className);

    const bodyClasses = classNames('portlet-body', {
        form: utils.toBoolean(props.form)
    });

    const icon = utils.isValidString(props.icon) ? <i className={utils.getIcon(props.icon)}></i> : null;

    const collapsible = utils.toBoolean(props.collapsible);
    const collapsed = collapsible && utils.toBoolean(props.collapsed);

    const tools = [];

    if(collapsible)
        tools.push(<a key="collapse" href="javascript:;" className={collapsed ? 'expand' : 'collapse'} title="收起 / 展开"></a>);

    return (
        <div className={portletClasses}>
            <div className="portlet-title">
                <div className="caption">{icon} {props.title}</div>
                {tools.length === 0 ? null : <div className="tools">{tools}</div>}
                <ActionGroup className="actions" actions={props.actions} onActionClick={props.onActionClick}/>
            </div>
            <div className={bodyClasses} style={{
                display: collapsed ? 'none' : 'block'
            }}>
                {props.children}
            </div>
        </div>
    );
};

Portlet.propTypes = {
    /** 包含在内容框中的内容。 */
    children: React.PropTypes.node.isRequired,
    /** 自定义按钮的配置，详情请参考[ActionGroup](ActionGroup.md)组件。 */
    actions: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.instanceOf(Immutable.List)]),
    /** CSS类名，会被应用在组件最外层，可用于自定义样式。 */
    className: React.PropTypes.string,
    /** 控制内容框是否为收起状态。 */
    collapsed: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
    /** 控制内容框是否为可收起状态。 */
    collapsible: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
    /** 内容框的整体颜色，详情请参考系统颜色文档。 */
    color: React.PropTypes.string,
    /** 如果内容中含有表单，请设置该值为`true`。 */
    form: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
    /** 内容框的标题图标，详情请参考系统图标文档。 */
    icon: React.PropTypes.string,
    /** 内容框的标题。 */
    title: React.PropTypes.string,
    /** 内容框的类型。 */
    type: React.PropTypes.oneOf(['box', 'light', 'solid']),
    /** 在有按钮被点击时会调用该方法，详情请参考[ActionGroup](ActionGroup.md)组件。 */
    onActionClick: React.PropTypes.func
};

module.exports = Portlet;

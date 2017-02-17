const _ = require('lodash');
const classNames = require('classnames');
const Immutable = require('immutable');
const React = require('react');
const utils = require('../utils');

const convertToArray = collection => {
    if(Immutable.List.isList(collection))
        return collection.toJS();
    else if(_.isArray(collection))
        return collection;

    return [];
};

const TodoListSubItem = React.createClass({
    propTypes: {
        content: React.PropTypes.element,
        done: React.PropTypes.bool,
        groupId: React.PropTypes.string,
        icon: React.PropTypes.string,
        id: React.PropTypes.string,
        showDone: React.PropTypes.bool,
        title: React.PropTypes.string,
        onDeleteItemClick: React.PropTypes.func,
        onEditItemClick: React.PropTypes.func,
        onGetItemContent: React.PropTypes.func,
        onItemDoneClick: React.PropTypes.func
    },

    onEditItemClick() {
        if(typeof this.props.onEditItemClick === 'function')
            this.props.onEditItemClick(this.props.groupId, this.props.id || null);
    },

    onDeleteItemClick() {
        if(typeof this.props.onDeleteItemClick === 'function')
            this.props.onDeleteItemClick(this.props.groupId, this.props.id || null);
    },

    onItemDoneClick() {
        if(typeof this.props.onItemDoneClick === 'function')
            this.props.onItemDoneClick(this.props.groupId, this.props.id || null);
    },

    render() {
        const content = typeof this.props.onGetItemContent === 'function'
            ? this.props.onGetItemContent(this.props.groupId, this.props.id || null)
            : <p>{this.props.content}</p>;
        const done = utils.toBoolean(this.props.showDone) && utils.toBoolean(this.props.done)
            ? <a className="done" href="javascript:;" onClick={this.onItemDoneClick}><i className="fa fa-check"></i></a>
            : null;

        return (
            <li className={classNames('task-list-item', {
                done: utils.toBoolean(this.props.showDone)
            })}>
                <div className="task-icon">
                    <i className={utils.isValidString(this.props.icon)
                        ? utils.getIcon(this.props.icon)
                        : 'fa fa-circle-thin'}></i>
                </div>
                <div className="task-status">
                    {done}
                    <a className="pending" href="javascript:;" onClick={this.onDeleteItemClick}>
                        <i className="fa fa-close"></i>
                    </a>
                </div>
                <div className="task-content">
                    <h4 className="uppercase bold">
                        <a href="javascript:;" onClick={this.onEditItemClick}>{this.props.title}</a>
                    </h4>
                    {content}
                </div>
            </li>
        );
    }
});

const TodoListItem = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
        icon: React.PropTypes.string,
        id: React.PropTypes.string,
        itemsField: React.PropTypes.string,
        showDone: React.PropTypes.bool,
        title: React.PropTypes.string,
        onAddItemClick: React.PropTypes.func,
        onDeleteGroupClick: React.PropTypes.func,
        onDeleteItemClick: React.PropTypes.func,
        onEditGroupClick: React.PropTypes.func,
        onEditItemClick: React.PropTypes.func,
        onGetItemContent: React.PropTypes.func,
        onItemDoneClick: React.PropTypes.func
    },

    getInitialState() {
        return {
            id: Guid()
        };
    },

    onAddItemClick() {
        if(typeof this.props.onAddItemClick === 'function')
            this.props.onAddItemClick(this.props.id || null);
    },

    onEditGroupClick() {
        if(typeof this.props.onEditGroupClick === 'function')
            this.props.onEditGroupClick(this.props.id || null);
    },

    onDeleteGroupClick() {
        if(typeof this.props.onDeleteGroupClick === 'function')
            this.props.onDeleteGroupClick(this.props.id || null);
    },

    render() {
        const parentProps = {
            groupId: this.props.id || null,
            showDone: this.props.showDone,
            onEditItemClick: this.props.onEditItemClick,
            onDeleteItemClick: this.props.onDeleteItemClick,
            onItemDoneClick: this.props.onItemDoneClick,
            onGetItemContent: this.props.onGetItemContent
        };

        const itemsField = this.props.itemsField || 'items';
        const items = [];

        convertToArray(this.props[itemsField]).forEach((item, i) => items.push(
            <TodoListSubItem key={item.id || i} {...parentProps} {...item} />
        ));

        const badge = items.length > 0
            ? <div className="badge badge-default pull-right bold">{items.length}</div>
            : null;

        const listTodoIconWrapperClass = classNames('list-todo-icon bg-white', utils.isValidString(this.props.color)
            ? `font-${this.props.color}`
            : null);
        const listTodoIconClass = utils.isValidString(this.props.icon)
            ? utils.getIcon(this.props.icon)
            : 'fa fa-circle';

        return (
            <li className="mt-list-item">
                <div className={listTodoIconWrapperClass}>
                    <i className={listTodoIconClass}></i>
                </div>
                <div className={classNames('list-todo-item', this.props.color)}>
                    <a className="list-toggle-container font-white" href={`#${this.state.id}`}
                       data-toggle="collapse" aria-expanded="false">
                        <div className="list-toggle uppercase">
                            <div className="list-toggle-title bold">{this.props.title}</div>
                            {badge}
                        </div>
                    </a>
                    <div id={this.state.id} className="task-list panel-collapse collapse in">
                        <ul>{items}</ul>
                        <div className="task-footer bg-grey">
                            <div className="row">
                                <div className="col-xs-4">
                                    <a className="task-add" href="javascript:;" onClick={this.onAddItemClick}>
                                        <i className="fa fa-plus"></i>
                                    </a>
                                </div>
                                <div className="col-xs-4">
                                    <a className="task-add" href="javascript:;" onClick={this.onEditGroupClick}>
                                        <i className="fa fa-edit"></i>
                                    </a>
                                </div>
                                <div className="col-xs-4">
                                    <a className="task-trash" href="javascript:;" onClick={this.onDeleteGroupClick}>
                                        <i className="fa fa-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});

const TodoList = props => {
    const headClasses = classNames('mt-list-head list-todo', props.color);
    const title = utils.isValidString(props.title) ? <h3 className="list-title">{props.title}</h3> : null;
    const subtitles = [];

    convertToArray(props.subtitles).forEach((subtitle, i) => {
        const icon = utils.isValidString(subtitle.icon) ? <i className={utils.getIcon(subtitle.icon)}></i> : null;

        subtitles.push(<div key={i} className="list-head-count-item">{icon} {subtitle.text}</div>);
    });

    let addButton = null;

    if(typeof props.onAddGroupClick === 'function')
        addButton = (<a href="javascript:;" onClick={props.onAddGroupClick}>
            <div className={classNames('list-count pull-right', props.addButtonColor)}>
                <i className="fa fa-plus"></i>
            </div>
        </a>);

    const parentProps = {
        showDone: props.showDone,
        onEditGroupClick: props.onEditGroupClick,
        onDeleteGroupClick: props.onDeleteGroupClick,
        onAddItemClick: props.onAddItemClick,
        onEditItemClick: props.onEditItemClick,
        onDeleteItemClick: props.onDeleteItemClick,
        onItemDoneClick: props.onItemDoneClick,
        onGetItemContent: props.onGetItemContent
    };
    const groups = [];

    convertToArray(props.groups).forEach((group, i) => {
        groups.push(<TodoListItem key={group.id || i} itemsField={props.subItemsField} {...parentProps} {...group} />);
    });

    return (
        <div className="mt-element-list">
            <div className={headClasses}>
                <div className="list-head-title-container">
                    {title}
                    <div className="list-head-count">{subtitles}</div>
                </div>
                {addButton}
            </div>
            <div className="mt-list-container list-todo">
                <div className={classNames('list-todo-line', props.color)}></div>
                <ul>{groups}</ul>
            </div>
        </div>
    );
};

TodoList.propTypes = {
    addButtonColor: React.PropTypes.string,
    color: React.PropTypes.string,
    groups: React.PropTypes.array,
    showDone: React.PropTypes.bool,
    subItemsField: React.PropTypes.string,
    subtitles: React.PropTypes.array,
    title: React.PropTypes.string,
    onAddGroupClick: React.PropTypes.func,
    onAddItemClick: React.PropTypes.func,
    onDeleteGroupClick: React.PropTypes.func,
    onDeleteItemClick: React.PropTypes.func,
    onEditGroupClick: React.PropTypes.func,
    onEditItemClick: React.PropTypes.func,
    onGetItemContent: React.PropTypes.func,
    onItemDoneClick: React.PropTypes.func
};

module.exports = TodoList;

const _ = require('lodash');
const classNames = require('classnames');
const Immutable = require('immutable');
const React = require('react');
const utils = require('../utils');

const Steps = React.createClass({
    propTypes: {
        active: React.PropTypes.string.isRequired,
        steps: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.instanceOf(Immutable.List)]).isRequired,
        onClick: React.PropTypes.func
    },

    onClick(step) {
        if(typeof this.props.onClick === 'function')
            this.props.onClick(step);
    },

    render() {
        const stepsArray = _.isArray(this.props.steps) ? this.props.steps : [];
        const stepsData = Immutable.List.isList(this.props.steps)
            ? this.props.steps.toJS()
            : stepsArray;

        if(stepsData.length === 0)
            return <div></div>;

        let colSize = Math.floor(12 / stepsData.length);
        const activeIndex = _.findIndex(stepsData, step => step.name === this.props.active);
        const steps = [];

        colSize = colSize < 1 ? 1 : colSize;
        stepsData.filter(step => step.hidden !== true).forEach((step, i) => {
            const number = utils.isValidString(step.icon)
                ? <div className="mt-step-number bg-white"><i className={utils.getIcon(step.icon)}></i></div>
                : <div className="mt-step-number bg-white">{i + 1}</div>;
            const title = <div className="mt-step-title uppercase font-grey-cascade">{step.title}</div>;
            const content = utils.isValidString(step.content)
                ? <div className="mt-step-content font-grey-cascade">{step.content}</div>
                : null;
            const onClick = step.clickable === false || i >= activeIndex ? null : this.onClick.bind(this, step.name);
            const className = classNames(`mt-step-col col-md-${colSize}`, {
                first: i === 0,
                last: i === stepsData.length - 1,
                error: step.error === true && i <= activeIndex,
                done: step.error !== true && i < activeIndex,
                active: step.error !== true && i === activeIndex
            });

            steps.push(
                <div key={i} className={className} onClick={onClick} style={{
                    cursor: onClick ? 'pointer' : undefined
                }}>
                    {number}{title}{content}
                </div>
            );
        });

        return (
            <div className="mt-element-step">
                <div className="row step-line">{steps}</div>
            </div>
        );
    }
});

module.exports = Steps;

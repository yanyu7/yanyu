const _ = require('lodash');
const classNames = require('classnames');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Paginator = React.createClass({
    propTypes: {
        page: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        total: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        const state = {
            visiblePages: 5,
            total: this.parseNumber(this.props.total, 1),
            pageSize: this.parseNumber(this.props.pageSize, 10),
            page: this.parseNumber(this.props.page, 1)
        };

        state.maxPage = Math.ceil(state.total / state.pageSize);

        return state;
    },

    componentWillReceiveProps(nextProps) {
        const state = {
            total: this.parseNumber(nextProps.total, 1),
            pageSize: this.parseNumber(nextProps.pageSize, 10),
            page: this.parseNumber(nextProps.page, 1)
        };

        state.maxPage = Math.ceil(state.total / state.pageSize);
        this.setState(state);
    },

    parseNumber(number, defaultValue) {
        if(_.isInteger(number))
            return number;

        if(_.isNumber(number))
            return Math.floor(number);

        if(_.isString(number)) {
            const result = parseInt(number, 10);

            return isNaN(result) ? defaultValue : result;
        }

        return defaultValue;
    },

    onChange(page) {
        if(this.state.page !== page && _.isFunction(this.props.onChange))
            this.props.onChange(page);
    },

    onGoFirstPage() {
        this.onChange(1);
    },

    onGoPreviousPage() {
        if(this.state.page > 1)
            this.onChange(this.state.page - 1);
    },

    onGoNextPage() {
        if(this.state.page < this.state.maxPage)
            this.onChange(this.state.page + 1);
    },

    onGoLastPage() {
        this.onChange(this.state.maxPage);
    },

    onGotoPage(e) {
        this.onChange(parseInt(e.target.innerText, 10));
    },

    render() {
        const visiblePages = this.state.visiblePages;
        const total = this.state.total;
        const pageSize = this.state.pageSize;
        const page = this.state.page;
        const maxPage = Math.ceil(total / pageSize);

        let begin = 1,
            end = 1;

        if(page <= visiblePages + 1) {
            begin = 1;
            end = visiblePages * 2;
        } else if(page >= maxPage - visiblePages - 1) {
            begin = maxPage - (visiblePages * 2) - 1;
            end = maxPage;
        } else {
            begin = page - visiblePages;
            end = page + visiblePages;
        }

        const pages = [];

        for(let i = begin; i <= end; i++)
            pages.push(<li key={i} className={classNames({
                active: i === page
            })}>
                <a href="javascript:;" onClick={i === page ? null : this.onGotoPage}>{i}</a>
            </li>);

        return (
            <ul className="pagination">
                <li>
                    <a href="javascript:;" onClick={this.onGoFirstPage}>
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" onClick={this.onGoPreviousPage}>
                        <i className="fa fa-angle-left"></i>
                    </a>
                </li>
                {pages}
                <li>
                    <a href="javascript:;" onClick={this.onGoNextPage}>
                        <i className="fa fa-angle-right"></i>
                    </a>
                </li>
                <li>
                    <a href="javascript:;" onClick={this.onGoLastPage}>
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        );
    }
});

module.exports = Paginator;

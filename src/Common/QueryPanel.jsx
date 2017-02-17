const _ = require('lodash');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Portlet = require('./Portlet');
const commonActions = require('./common-actions');

const QueryInput = props => (
    <div className="form-group">
        <label className="control-label col-md-3">{props.label}</label>
        <div className="col-md-9">{props.control}</div>
    </div>
);

QueryInput.propTypes = {
    control: React.PropTypes.element.isRequired,
    label: React.PropTypes.string.isRequired
};

//noinspection JSUnusedGlobalSymbols
const QueryInputText = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    // AutoComplete代码
    // const engine = new Bloodhound({
    //     local: ['Test1', 'Test2'],
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     datumTokenizer: Bloodhound.tokenizers.whitespace
    // });
    // $('#shell').find('div > div.page-container > div.page-content-wrapper > div > div:nth-child(3) > div > div.portlet-body.form > form > div.row > div:nth-child(1) > div > div > input').typeahead({}, {
    //     source: engine
    // });

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

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    },

    handleBlur(e) {
        if(typeof this.props.onChange === 'function') {
            let value = e.target.value.trim();

            value = value === '' ? null : value;
            if(value !== this.props.value)
                this.props.onChange(this.props.id, value);
        }
    },

    render() {
        const control = (<input type="text" className="form-control input-sm"
                                value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur}/>);

        return <QueryInput label={this.props.label} control={control}/>;
    }
});

//noinspection JSUnusedGlobalSymbols
const QueryInputSelect = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.array,
        value: React.PropTypes.array,
        onChange: React.PropTypes.func
    },

    componentDidMount() {
        const control = $(this.refs.control);

        control.on('loaded.bs.select', this.handleLoad);
        control.on('changed.bs.select', this.handleChange);
    },

    componentWillReceiveProps(nextProps) {
        this.setValue(nextProps.value);
    },

    componentDidUpdate() {
        $(this.refs.control).selectpicker('refresh');
    },

    componentWillUnmount() {
        const control = $(this.refs.control);

        control.off('loaded.bs.select', this.handleLoad);
        control.off('changed.bs.select', this.handleChange);
        control.selectpicker('destroy');
    },

    setValue(value) {
        const control = $(this.refs.control);

        if(_.isArray(value) || _.isString(value) || _.isInteger(value))
            control.selectpicker('val', value);
        else
            control.selectpicker('val', null);
    },

    handleLoad() {
        this.setValue(this.props.value);
    },

    handleChange() {
        if(typeof this.props.onChange === 'function')
            this.props.onChange(this.props.id, $(this.refs.control).selectpicker('val'));
    },

    render() {
        const createOption = config => {
            if(_.isArray(config.value))
                return <optgroup key={config.text} label={config.text}>{config.value.map(createOption)}</optgroup>;

            return <option key={config.value} value={config.value}>{config.text}</option>;
        };
        const options = this.props.options ? this.props.options.map(createOption) : undefined;
        const control = (
            <select ref="control" className="selectpicker form-control input-sm" data-none-selected-text=""
                    multiple={true} disabled={typeof options === 'undefined'}>
                {options}
            </select>
        );

        return <QueryInput label={this.props.label} control={control}/>;
    }
});

//noinspection JSUnusedGlobalSymbols
const QueryInputDateRange = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.array,
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return this.parseValue(this.props.value);
    },

    componentDidMount() {
        const control = $(this.refs.control);

        control.daterangepicker({
            locale: {
                format: 'YYYY/MM/DD',
                separator: ' - ',
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '从',
                toLabel: '到',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            },
            ranges: {
                今天: [moment(), moment()],
                最近3天: [moment().subtract(2, 'days'), moment()],
                最近7天: [moment().subtract(6, 'days'), moment()],
                最近30天: [moment().subtract(29, 'days'), moment()],
                本月: [moment().startOf('month'), moment().endOf('month')],
                今年: [moment().startOf('year'), moment().endOf('year')]
            },
            startDate: this.state.value[0],
            endDate: this.state.value[1]
        });
        control.on('apply.daterangepicker', this.handleChange);
        if(this.state.shouldSetDefaultValue && typeof this.props.onChange === 'function')
            this.props.onChange(this.props.id, this.state.value);
    },

    componentWillReceiveProps(nextProps) {
        const value = this.parseValue(nextProps.value).value;
        const control = $(this.refs.control).data('daterangepicker');

        control.setStartDate(value[0]);
        control.setEndDate(value[1]);
        this.setState({
            value
        });
    },

    componentWillUnmount() {
        const control = $(this.refs.control);

        control.off('apply.daterangepicker', this.handleChange);
        control.daterangepicker('remove');
    },

    DATE_FORMAT: 'YYYY/MM/DD',

    parseValue(value) {
        let defaultValue = [moment().subtract(6, 'days').format(this.DATE_FORMAT), moment().format(this.DATE_FORMAT)];
        let shouldSetDefaultValue = true;

        if(_.isArray(value)) {
            if(value.length > 2)
                defaultValue = [value[0], value[1]];
            else if(value.length === 2) {
                defaultValue = value;
                shouldSetDefaultValue = false;
            } else if(value.length === 1)
                defaultValue = [value[0], value[0]];
        } else if(_.isString(value))
            defaultValue = [value, value];

        return {
            value: defaultValue,
            shouldSetDefaultValue
        };
    },

    handleChange(e, picker) {
        const value = [picker.startDate.format(this.DATE_FORMAT), picker.endDate.format(this.DATE_FORMAT)];

        this.setState({
            value
        });
        if(typeof this.props.onChange === 'function')
            this.props.onChange(this.props.id, value);
    },

    render() {
        const control = (
            <div ref="control" className="btn-group bootstrap-select form-control input-sm">
                <button type="button" className="btn btn-default dropdown-toggle" style={{
                    textAlign: 'left'
                }}>
                    <i className="fa fa-calendar"></i>
                    &nbsp;&nbsp;
                    <span>{`${this.state.value[0]} - ${this.state.value[1]}`}</span>
                </button>
            </div>
        );

        return <QueryInput label={this.props.label} control={control}/>;
    }
});

//noinspection JSUnusedGlobalSymbols
const QueryPanel = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired,
        state: React.PropTypes.object.isRequired
    },

    contextTypes: {
        dispatch: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    handleChange(field, value) {
        this.context.dispatch(commonActions.queryPanelSetValue(this.props.state.get('id') || null, field, value));
    },

    render() {
        const title = this.props.state.get('title') || '数据查询';
        const fields = this.props.state.get('fields');
        const fieldsValues = fields.valueSeq();
        const maxColumn = fieldsValues.maxBy(v => v.get('column')).get('column');
        const maxRow = fieldsValues.maxBy(v => v.get('row')).get('row');
        const controlsGrid = [];

        for(let row = 1; row <= maxRow; row++) {
            const cells = [];

            for(let column = 1; column <= maxColumn; column++) {
                const config = fieldsValues.find(v => v.get('column') === column && v.get('row') === row);

                if(config === undefined)
                    continue;

                let control = null;
                const id = fields.keyOf(config);
                const props = {
                    id,
                    label: config.get('label'),
                    value: config.get('value'),
                    onChange: this.handleChange
                };

                if(!_.isNil(props.value) && _.isFunction(props.value.toJS))
                    props.value = props.value.toJS();

                switch(config.get('type').toLowerCase()) {
                    case 'text':
                    case 'textbox':
                        control = <QueryInputText {...props}/>;
                        break;
                    case 'select':
                    case 'combo':
                    case 'combobox':
                        control = (<QueryInputSelect {...props}
                                                     options={config.get('options') && config.get('options').toJS()}/>);
                        break;
                    case 'daterange':
                        control = <QueryInputDateRange {...props}/>;
                        break;
                }
                const width = Math.floor(12 / maxColumn);

                cells.push(<div key={id} className={`col-md-${width}`}>{control}</div>);
            }
            controlsGrid.push(<div key={row} className="row">{cells}</div>);
        }

        return (
            <Portlet className="querypanel" icon="search" title={title} collapsible="true" form="true">
                <form className="form-horizontal">
                    {controlsGrid}
                    {this.props.children}
                </form>
            </Portlet>
        );
    }
});

module.exports = QueryPanel;

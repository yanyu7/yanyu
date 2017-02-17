const _ = require('lodash');
const accounting = require('accounting');
const Immutable = require('immutable');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

//noinspection JSUnusedGlobalSymbols
const DataTable = React.createClass({
    propTypes: {
        columns: React.PropTypes.instanceOf(Immutable.List).isRequired,
        data: React.PropTypes.instanceOf(Immutable.List),
        primaryKey: React.PropTypes.string,
        selection: React.PropTypes.instanceOf(Immutable.List),
        onSelectionChange: React.PropTypes.func
    },

    mixins: [PureRenderMixin],

    componentDidUpdate() {
        this.changeHeaderCheckBoxStatus();
        this.refreshColResize();
    },

    formatValue(column, value) {
        switch(column.get('type')) {
            case 'currency':
            case 'money':
                return accounting.formatMoney(value);
            case 'enum':
                if(Immutable.List.isList(column.get('enum'))) {
                    const result = column.get('enum').find(e => e.get('value') === value);

                    if(result)
                        return result.get('text') || value;
                }
                break;
        }

        return value;
    },

    refreshColResize() {
        const table = $(this.refs.table);

        table.colResizable({
            disable: true
        });
        table.colResizable({
            resizeMode: 'overflow',
            liveDrag: true,
            headerOnly: true
        });
    },

    changeHeaderCheckBoxStatus() {
        const table = $(this.refs.table);
        const headerCheckBox = table.find('input:checkbox.select-toggle-all');
        const checkboxes = table.find('input:checkbox.select-toggle').toArray();

        if(_.every(checkboxes, cb => cb.checked === true)) {
            headerCheckBox.prop('indeterminate', false);
            headerCheckBox.prop('checked', true);
        } else if(_.every(checkboxes, cb => cb.checked === false)) {
            headerCheckBox.prop('indeterminate', false);
            headerCheckBox.prop('checked', false);
        } else
            headerCheckBox.prop('indeterminate', true);
    },

    changeCheckBoxStatus(checkbox, exclusive) {
        if(!checkbox)
            return;

        if(exclusive && checkbox.checked)
            $(this.refs.table).find('input:checkbox.select-toggle')
                .toArray()
                .forEach(cb => {
                    if(cb.value !== checkbox.value)
                        cb.checked = false;
                });

        this.onSelectionChange();
    },

    onHeaderCheckBoxChange(e) {
        $(this.refs.table).find('input:checkbox.select-toggle').prop('checked', e.target.checked);
        this.onSelectionChange();
    },

    onCellCheckBoxChange(e) {
        this.changeCheckBoxStatus(e.target, false);
    },

    onCheckBoxClick(e) {
        e.stopPropagation();
    },

    onTableRowClick(e) {
        const checkbox = $(e.target).parents('tr').find('input:checkbox.select-toggle');

        checkbox.prop('checked', !checkbox.prop('checked'));
        this.changeCheckBoxStatus(checkbox[0], !e.ctrlKey || e.altKey || e.shiftKey);
    },

    onSelectionChange() {
        if(typeof this.props.onSelectionChange !== 'function')
            return;
        this.props.onSelectionChange(_.map($(this.refs.table).find('input:checkbox.select-toggle:checked').toArray(), cb => cb.value));
    },

    render() {
        const cbHeader = (
            <th key="__checkbox" style={{
                textAlign: 'center'
            }}>
                <input type="checkbox" className="select-toggle-all" onChange={this.onHeaderCheckBoxChange}/>
            </th>
        );
        const headers = <tr>{_.concat(cbHeader, this.props.columns.map(column => <th key={column.get('title')}>{column.get('title')}</th>))}</tr>;
        const rows = [];

        if(Immutable.List.isList(this.props.data))
            this.props.data.forEach((item, i) => {
                const id = item.get(this.props.primaryKey || 'id');
                const checked = Immutable.List.isList(this.props.selection) && this.props.selection.some(s => s === id);
                const cbCell = (
                    <td key="__checkbox" style={{
                        textAlign: 'center'
                    }}>
                        <input type="checkbox" className="select-toggle" value={id} checked={checked}
                               onChange={this.onCellCheckBoxChange} onClick={this.onCheckBoxClick}/>
                    </td>
                );
                const cells = _.concat(cbCell, this.props.columns.map((column, i) => (
                    <td key={i}>
                        <div className="cell">{this.formatValue(column, item.getIn(column.get('field').split('.')))}</div>
                    </td>
                )));

                rows.push(<tr key={i} style={{
                    cursor: 'pointer'
                }} onClick={this.onTableRowClick}>{cells}</tr>);
            });

        return (
            <table ref="table" className="table table-striped table-bordered table-hover order-column">
                <thead>{headers}</thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

module.exports = DataTable;

import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Button, Form, FormGroup, Input, Label, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {FormattedMessage} from "react-intl";
import withViewport from "../../../../../shared-components/withViewport";

class FilterRankEditor extends Component {
    state = {
        from: null,
        to: null,
    };

    isActiveButtonAuto({from, to}) {
        const {currentRange} = this.props;

        const fromR = currentRange.get('from');
        const toR = currentRange.get('to');

        const equalFrom = (!fromR && !from) || parseInt(fromR, 10) === parseInt(from, 10);
        const equalTo = (!toR && !to) || parseInt(toR, 10) === parseInt(to, 10);

        return equalFrom & equalTo;
    }

    render() {
        const {isOpen, currentRange, className, isMobile} = this.props;
        const {from, to} = currentRange.toJS();

        return (
            <div className={classNames("FilterRankEditor", className)}>
                <Popover className={className} placement="bottom" isOpen={isOpen} target="FilterRank"
                         toggle={this._handleToggle.bind(this)}>
                    <PopoverHeader><FormattedMessage id="searchItem.header.rank_is_between"/></PopoverHeader>
                    <PopoverBody>
                        <Form className="FormFilterRank" onKeyUp={this._handleSubmitForm.bind(this)}>
                            <div className="Auto">
                                <div className="Options">
                                    <Button
                                        className={classNames({
                                            active: this.isActiveButtonAuto({
                                                from: '', to: ''
                                            })
                                        })}
                                        onClick={this._onClickAuto.bind(this, {from: '', to: ''})}
                                        type="button"><FormattedMessage id="searchItem.header.view_all"/></Button>
                                    <Button
                                        className={classNames({
                                            active: this.isActiveButtonAuto({
                                                from: '',
                                                to: 100000
                                            })
                                        })}
                                        onClick={this._onClickAuto.bind(this, {from: '', to: 100000})}
                                        type="button">Top 100,000</Button>
                                    <Button
                                        className={classNames({
                                            active: this.isActiveButtonAuto({
                                                from: '',
                                                to: 200000
                                            })
                                        })}
                                        onClick={this._onClickAuto.bind(this, {from: '', to: 200000})}
                                        type="button">Top 200,000</Button>
                                    <Button
                                        className={classNames({
                                            active: this.isActiveButtonAuto({
                                                from: '',
                                                to: 500000
                                            })
                                        })}
                                        onClick={this._onClickAuto.bind(this, {from: '', to: 500000})}
                                        type="button">Top 500,000</Button>
                                    <Button
                                        className={classNames({
                                            active: this.isActiveButtonAuto({
                                                from: '',
                                                to: 1000000
                                            })
                                        })}
                                        onClick={this._onClickAuto.bind(this, {from: '', to: 1000000})}
                                        type="button">Top 1000,000</Button>
                                </div>
                            </div>

                            <div className="Custom">
                                <FormGroup>
                                    <Label className="InputNumber">
                                        <span className="Label"><FormattedMessage id="searchItem.header.from"/></span>
                                        <Input
                                            autoFocus={!isMobile}
                                            onChange={(e) => this._onChangeInput(e, 'from')}
                                            type="number" min={1} value={from} name="filter-rank-from"
                                            placeholder="number"/>
                                        <span
                                            onClick={(e) => this._handleRemoveValueInput(e, 'from')}
                                            className={classNames(["Remove", {"Removable": from > 1}])}/>
                                    </Label>
                                </FormGroup>

                                <FormGroup>
                                    <Label className="InputNumber">
                                        <span className="Label"><FormattedMessage id="searchItem.header.to"/></span>
                                        <Input
                                            onChange={(e) => this._onChangeInput(e, 'to')}
                                            value={to}
                                            type="number" min={1} name="filter-rank-to" placeholder="infinity"/>
                                        <span
                                            onClick={(e) => this._handleRemoveValueInput(e, 'to')}
                                            className={classNames(["Remove", {"Removable": !!to}])}/>
                                    </Label>
                                </FormGroup>

                                <FormGroup>
                                    <Button
                                        onClick={this._handleChangeRange.bind(this)}
                                        color="primary" block><FormattedMessage id="searchItem.header.save"/></Button>
                                </FormGroup>
                            </div>
                        </Form>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }

    _onClickAuto({from, to}, e) {
        e.preventDefault();

        const {currentRange, onChange, onSubmit} = this.props;
        const rangeChanged = currentRange.set('from', from).set('to', to);
        onChange(rangeChanged).then(() => {
            onSubmit(rangeChanged);
        });
    }

    _handleRemoveValueInput(e, key) {
        const {currentRange, onChange} = this.props;
        const rangeChanged = currentRange.set(key, '');

        onChange(rangeChanged);
    }

    _handleSubmitForm(e) {
        e.preventDefault();

        if (e.keyCode !== 13) {
            return;
        }

        this._submitFilterRank();
    }

    _handleChangeRange(e) {
        e.preventDefault();
        this._submitFilterRank();
    }

    _submitFilterRank() {
        const {currentRange, onSubmit} = this.props;
        onSubmit(currentRange);
    }

    _onChangeInput(e, key) {
        const value = parseInt(e.target.value, 10);
        const valueChanged = isNaN(value) ? '' : value;

        const {currentRange, onChange} = this.props;
        const rangeChanged = currentRange.set(key, valueChanged);
        onChange(rangeChanged);
    }

    _handleToggle() {
        this.props.toggle();
    }
}

FilterRankEditor.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    currentRange: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    toggle: PropTypes.func,
};

export default withViewport(FilterRankEditor);
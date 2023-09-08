import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Button, Form, FormGroup, Input, Label, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {FormattedMessage} from "react-intl";

class FilterMaxPriceEditor extends Component {
    state = {
        from: null,
        to: null,
    };

    render() {
        const {isOpen, currentRange, className} = this.props;
        const {from, to} = currentRange.toJS();

        return (
            <div className={classNames(["FilterMaxPriceEditor", className])}>
                <Popover className={className} placement="bottom" isOpen={isOpen} target="FilterMaxPrice"
                         toggle={this._handleToggle.bind(this)}>
                    <PopoverHeader><FormattedMessage id="searchItem.header.price_is_between"/></PopoverHeader>
                    <PopoverBody>
                        <Form className="FormFilterMaxPrice" inline onKeyUp={this._handleSubmitForm.bind(this)}>
                            <FormGroup>
                                <Label className="InputNumber">
                                    <span className="Label"><FormattedMessage id="searchItem.header.from"/></span>
                                    <Input
                                        autoFocus
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
                        </Form>
                    </PopoverBody>
                </Popover>
            </div>
        );
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

FilterMaxPriceEditor.propTypes = {
    currentRange: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    toggle: PropTypes.func,
};

export default FilterMaxPriceEditor;
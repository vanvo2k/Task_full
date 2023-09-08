import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Button, Popover, PopoverBody} from "reactstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";

class CreateQuery extends Component {
    state = {
        title: ''
    };

    _handleClickCreateQuery = (e) => {
        e.preventDefault();

        this.props.onToggle();
    };

    _handleChangeInput = (e) => {
        const {value} = e.target;

        this.setState({
            title: value
        });
    };

    _handleSubmit = (e) => {
        e.preventDefault();

        const {title} = this.state;
        this.setState({
            title: '',
        });

        this.props.onCreate(title);
    };

    _getLanguageText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`searchItem.query.${key}`, defaultValue);
    }

    render() {
        const {title} = this.state;
        const {isOpen, onToggle} = this.props;

        return (
            <Fragment>
                <Button id="BtnCreateQuery"
                        disabled={isOpen}
                        onClick={this._handleClickCreateQuery}><FormattedMessage
                    id="searchItem.query.save"/></Button>

                <Popover
                    className="FormCreateQuery"
                    placement="bottom"
                    toggle={onToggle}
                    target="BtnCreateQuery" isOpen={isOpen}>
                    <PopoverBody>
                        <form onSubmit={this._handleSubmit}>
                            <input
                                placeholder={this._getLanguageText('create_placeholder')}
                                className="form-control"
                                onChange={this._handleChangeInput} type="text"/>

                            <Button color="primary" disabled={!title}><FormattedMessage
                                id="searchItem.query.save"/></Button>
                        </form>
                    </PopoverBody>
                </Popover>
            </Fragment>
        );
    }
}

CreateQuery.propTypes = {
    intl: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default injectIntl(CreateQuery);
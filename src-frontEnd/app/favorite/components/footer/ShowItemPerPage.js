import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, FormGroup} from "reactstrap";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";

class ShowItemPerPage extends Component {
    state = {
        options: [10, 36]
    };

    render() {
        return null

        const {pagination, className} = this.props;
        const {perPage} = pagination.toJS();

        return (
            <Form className="Left float-left" inline>
                <FormGroup className={classNames(['ShowPerPage', className])}>
                    <span><FormattedMessage id="general.show"/></span>
                    {this._renderShowItemsPerPage(perPage)}
                    <span><FormattedMessage id="general.products"/></span>
                </FormGroup>
            </Form>
        );
    }

    _renderShowItemsPerPage(current) {
        return (
            <select
                onChange={this._handleChangeShowItemsPerPage.bind(this)}
                className="form-control"
                value={current}
                name="showItemsPerPage">
                {this.state.options.map((value, index) => {
                    return <option
                        key={index}
                        value={value}>{value}</option>
                })}
            </select>
        );
    }

    _handleChangeShowItemsPerPage(e) {
        const number = parseInt(e.target.value, 10);
        this.props.changePaginationPerPage(number)
            .then(() => {
                this.props.triggerSearch();
            });

        this.props
            .saveUserSettings({
                showItemsPerPage: number
            });
    }
}

ShowItemPerPage.propTypes = {
    pagination: PropTypes.object.isRequired,
    changePaginationPerPage: PropTypes.func.isRequired,
    saveUserSettings: PropTypes.func,
};

export default ShowItemPerPage;
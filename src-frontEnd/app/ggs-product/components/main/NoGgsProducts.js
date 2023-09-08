import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import getMessageText from "../../../../helpers/i18n/getMessageText";
import {injectIntl} from "react-intl";

class NoGgsProducts extends PureComponent {
    _getLanguageText(key) {
        return getMessageText(this.props.intl)(`general.${key}`);
    }

    render() {
        const {loading, error} = this.props;

        return (
            <li className="NoItems col d-table-row text-center">
                <h4>
                    {
                        !!loading &&
                        this._getLanguageText('searching')
                    }

                    {
                        !loading &&
                        ((!!error) ? this._getLanguageText('wrong') : this._getLanguageText('no_product'))
                    }
                </h4>
            </li>
        );
    }
}

NoGgsProducts.defaultProps = {
    error: ''
};

NoGgsProducts.propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    intl: PropTypes.object,
};

export default injectIntl(NoGgsProducts);
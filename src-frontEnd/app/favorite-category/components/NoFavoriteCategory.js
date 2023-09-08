import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

class NoFavoriteCategory extends Component {
    render() {
        return (
            <div className="NoFavoriteCategory col text-center">
                <FormattedMessage id="favorite.no_category"/>
            </div>
        );
    }
}

NoFavoriteCategory.propTypes = {
    any: PropTypes.any
};

export default NoFavoriteCategory;
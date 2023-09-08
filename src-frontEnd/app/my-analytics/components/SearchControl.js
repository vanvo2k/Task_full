import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

class SearchControl extends Component {
    render() {
        const {type, term, excluded} = this.props;

        return (
            <div className="SearchControl">
                <strong>Search: </strong>

                <span className="Type TagItem">
                    <span className="Label">Type</span>
                    <FormattedMessage id={`searchItem.search.type.${type}`}/>
                </span>

                {
                    !!term &&
                    <span className="Term TagItem">
                        <span className="Label">Keyword</span>
                        <span>{term}</span>
                    </span>
                }

                {
                    !!excluded &&
                    <span className="Excluded TagItem">
                        <span className="Label">Excluded</span>
                        <span>{excluded}</span>
                    </span>
                }
            </div>
        );
    }
}

SearchControl.propTypes = {
    type: PropTypes.string,
    term: PropTypes.string,
    excluded: PropTypes.string,
};

export default SearchControl;
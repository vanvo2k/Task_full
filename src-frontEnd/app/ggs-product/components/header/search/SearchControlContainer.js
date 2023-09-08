import React, {Component} from "react";
import {connect} from "react-redux";
import SearchControl from "./SearchControl";
import {changeSearchItemsQuery} from "../../../actions";

class SearchControlContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {props} = this;

        return (
            <SearchControl {...props}/>
        );
    }
}

const mapDispatchToProps = {
    changeSearchItemsQuery,
};

export default connect(null, mapDispatchToProps)(SearchControlContainer);


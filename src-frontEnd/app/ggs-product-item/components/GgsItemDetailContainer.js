import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchItemDetail} from "../actions";
import {getItemDetail} from "../selectors";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import GgsItemDetail from "./GgsItemDetail";

class GgsItemDetailContainer extends Component {
    render() {
        const {props} = this;
        const {match} = props;
        const {params} = match;
        const {itemId} = params;

        return (
            <EnsureLoggedInContainer>
                <GgsItemDetail id={itemId} {...props}/>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    item: getItemDetail(state)
});

const mapDispatchToProps = {
    fetchItemDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(GgsItemDetailContainer);
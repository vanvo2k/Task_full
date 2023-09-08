import React, {Component} from "react";
import {connect} from "react-redux";
import HomePage from "./HomePage";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {fetchTotalItems} from "../../search/actions";
import {getTotalItems} from "../selectors";

class HomePageContainer extends Component {
    render() {
        const {props} = this;

        return (
            <HomePage {...props}/>
        );
    }

    componentDidMount() {
        document.title = 'Home page';
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    totalItems: getTotalItems(state)
});

const mapDispatchToProps = {
    fetchTotalItems
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
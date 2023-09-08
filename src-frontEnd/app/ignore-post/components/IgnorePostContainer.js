import React, {Component} from "react";
import {connect} from "react-redux";
import IgnorePostPage from "./IgnorePostPage";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import {fetchProducts} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";

class IgnorePostContainer extends Component {
    render() {
        const {props} = this;
        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Favorite products">
                    <IgnorePostPage {...props}/>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(IgnorePostContainer);
import React, {Component} from "react";
import {connect} from "react-redux";
import FavoriteProducts from "./FavoriteProducts";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import {fetchProducts} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";

class FavoriteProductsContainer extends Component {
    render() {
        const {props} = this;
        const {categoryId} = this.props.match.params;

        return (
            <EnsureLoggedInContainer>
                <DocTitle title="Favorite products">
                    <FavoriteProducts categoryId={categoryId} {...props}/>
                </DocTitle>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProductsContainer);
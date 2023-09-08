import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchItemsTopRanking} from "../actions";
import {getItemsTopRanking} from "../selectors";
import ItemsTopRanking from "./ItemsTopRanking";

class ItemsTopRankingContainer extends Component {
    render() {
        const {props} = this;

        return <ItemsTopRanking {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    items: getItemsTopRanking(state)
});

const mapDispatchToProps = {
    fetchItemsTopRanking
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTopRankingContainer);
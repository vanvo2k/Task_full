import React, {PureComponent} from "react";
import {connect} from "react-redux";
import FilterControl from "./FilterControl";

class FilterControlContainer extends PureComponent {
    render() {
        const {props} = this;

        return <FilterControl {...props} />
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterControlContainer);
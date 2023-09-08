import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsExplorerHeader from "./ItemsExplorerHeader";
import {changePaginationNumber, initCheckQuerySearch} from "../../actions";
import {withRouter} from "react-router-dom";
import {isAdvancedSearch} from "../../selectors";
import {changeQuerySearch, parseSearchQuery} from "../../../../helpers/RouterHelper";
import DateSelectionModal from "../DateSelectionModal";
import moment from "moment";

class ItemsExplorerHeaderContainer extends Component {
    state = {
        hasHDay: false,
        isInvalidDate: false
    }

    componentWillMount() {
        const {history} = this.props
        const parsed = parseSearchQuery(history)
        if (parsed.date) {
            const isOutsideRange = this._isOutsideRange(parsed.date)
            if (!isOutsideRange) {
                this.setState({
                    hasHDay: true
                })
            } else {
                this.setState({
                    isInvalidDate: true
                })
            }
        }
    }

    _onSubmitDate = (hDate) => {
        const {history} = this.props
        const {date} = hDate

        const isOutsideRange = this._isOutsideRange(date)

        if (!isOutsideRange) {
            this.setState({
                hasHDay: true
            })
        } else {
            this.setState({
                isInvalidDate: true
            })
        }

        changeQuerySearch(history)({date: date})
    }

    _isOutsideRange = (date) => {
        const today = moment()
        const merchAvailable = moment('01-09-2015', 'DD-MM-YYYY');
        const regex = /^\d{2}-\d{2}-\d{4}$/;

        return !regex.test(date) || !moment(date, 'DD-MM-YYYY').isBetween(merchAvailable, today)
            || moment(date, 'DD-MM-YYYY').isSame(today, 'day');
    }

    render() {
        const {hasHDay, isInvalidDate} = this.state
        const {props} = this

        return (
            <div>
                <DateSelectionModal isOpen={!hasHDay} onSubmit={this._onSubmitDate} isInvalidDate={isInvalidDate}/>
                {hasHDay && <ItemsExplorerHeader {...props} />}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isAdvancedSearch: isAdvancedSearch(state)
});

const mapDispatchToProps = {
    initCheckQuerySearch,
    changePaginationNumber
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsExplorerHeaderContainer));
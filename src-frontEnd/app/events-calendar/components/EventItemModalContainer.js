import React, {Component} from "react"
import {connect} from "react-redux"
import {_getEventInfo,_isOpenModal,_getEventId} from "../selectors";
import {actionCloseEventDetail} from "../actions";
import EventItemModal from "./EventItemModal";

class EventItemModalContainer extends Component {
    render() {
        const {props} = this
        return <EventItemModal {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    id: _getEventId(state),
    isOpen: _isOpenModal(state),
    event: _getEventInfo(state)
})

const mapDispatchToProps = {
    actionCloseEventDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(EventItemModalContainer)

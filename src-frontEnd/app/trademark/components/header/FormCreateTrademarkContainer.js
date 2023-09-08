import React, {Component} from "react"
import {connect} from "react-redux"
import {changeInputCreateTradeMark, createNewTradeMark} from "../../actions"
import FormCreateTrademark from "./FormCreateTrademark"
import {canAddMoreKeyword, getFormData} from "../../selectors"
import { getUserScopes } from "../../../../selectors/UserSelectors"

class FormCreateTrademarkContainer extends Component {
    render() {
        const {props} = this
        return <FormCreateTrademark {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    form: getFormData(state),
    beAdded: canAddMoreKeyword(state),
    userScope:getUserScopes(state)
})

const mapDispatchToProps = {
    createNewTradeMark,
    changeInputCreateTradeMark
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateTrademarkContainer)

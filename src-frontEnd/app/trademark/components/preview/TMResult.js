import React, {Component} from "react"
import PropTypes from "prop-types"

class TMResult extends Component {
    render() {
        const {result,userScope,onUpgradePopup,onHideTrademarkResults} = this.props
        const {serialNumber, regNumber, status, wordMark, url, type} = result.toJS()
        const isUserTrial = (userScope.includes("trial")&&!userScope.includes("admin")&&!userScope.includes("mod"))||false
        return (
              <tr className="TMResult">
              <td>{isUserTrial?"******":wordMark}</td>
            {isUserTrial ? <td><a target="_blank" href="#" onClick={(e)=>{
                e.preventDefault()
                onHideTrademarkResults()
                onUpgradePopup()
            }}>******</a></td>:<td><a target="_blank" href={url}>{serialNumber}</a></td>}
              <td>{isUserTrial?"******":regNumber || '--'}</td>
              <td>{isUserTrial?"******":status}</td>
              <td>{isUserTrial?"******":type || 'Text'}</td>
          </tr>
        )
    }
}

TMResult.propTypes = {
    result: PropTypes.object.isRequired
}

export default TMResult

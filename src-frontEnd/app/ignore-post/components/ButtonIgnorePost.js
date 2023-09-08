import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
// import {FormattedMessage} from "react-intl"
import {_toggleProductIgnore} from "../../../services/FavoriteServices";

class ButtonIgnorePost extends PureComponent {

    _handleClickIgnore = async() =>  {
        const {id, triggerSearch} = this.props;
        if(id){
            const ignored = await _toggleProductIgnore(id)
            const {success, data} = ignored;
            if(success) {
                triggerSearch && triggerSearch();
            }
        }
    }

    render() {
        const {mode} = this.props;
        return (
            <div
                 className={classNames('ButtonIgnore')}
                 onClick={this._handleClickIgnore} title="Ignore Item">
                {mode && mode === 'ignore' ? <span className="Text">UnIgnore</span> : <i className="fas fa-ban" aria-hidden="true"/>}
            </div>
        )
    }
}

ButtonIgnorePost.propsTypes = {
    id: PropTypes.string.isRequired,
}

export default ButtonIgnorePost

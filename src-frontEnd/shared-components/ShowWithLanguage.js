import {Component} from "react"
import PropTypes from "prop-types"
import {addLanguageListener, getUserLanguage, removeLanguageListener} from "../services/LocaleServices"

class ShowWithLanguage extends Component {
    state = {
        language: getUserLanguage()
    }

    componentDidMount() {
        addLanguageListener(this._handleChangeLanguage)
    }

    componentWillUnmount() {
        removeLanguageListener(this._handleChangeLanguage)
    }

    _handleChangeLanguage = (language) => {
        this.setState({
            language
        })
    }

    render() {
        const {language} = this.state
        const {children, lang} = this.props

        if (language !== lang) {
            return null
        }

        return children
    }
}

ShowWithLanguage.propsTypes = {
    lang: PropTypes.string.isRequired
}

ShowWithLanguage.defaultProps = {
    lang: ''
}

export default ShowWithLanguage

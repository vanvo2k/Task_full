import React, {Component} from "react"
import {connect} from "react-redux"
import {ThemeProvider} from "styled-components"
import PropTypes from "prop-types"
import {getThemeData} from "../selectors/ThemeSelectors"

class MyTheme extends Component {
    render() {
        const {theme} = this.props

        return (
            <ThemeProvider theme={theme}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

MyTheme.propTypes = {
    theme: PropTypes.object
}

const mapStateToProps = (state) => ({
    theme: getThemeData(state)
})

export default connect(mapStateToProps)(MyTheme)

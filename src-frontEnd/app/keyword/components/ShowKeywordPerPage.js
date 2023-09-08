import React, {Component} from "react"
import PropTypes from "prop-types"
import {Form, FormGroup} from "reactstrap"
import classNames from "classnames"
import {FormattedMessage} from "react-intl"


class ShowKeywordPerPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [10, 20, 50, 100]
        }
    }

    render() {
        const {perPage} = this.props

        return (
            <Form className="Left" inline>
                <FormGroup className={classNames('ShowKeywordPerPage ShowPerPage')}>
                    <span><FormattedMessage id="keyword.keywords_show"/></span>
                    {this._renderShowItemsPerPage(perPage)}
                    <span><FormattedMessage id="keyword.keywords"/></span>
                </FormGroup>
            </Form>
        )
    }

    _renderShowItemsPerPage(current) {
        return (
            <select
                onChange={this._handleChangeShowItemsPerPage.bind(this)}
                className="form-control"
                value={current}
                name="showItemsPerPage">
                {
                    this.state.options.map((value, index) => {
                        return <option
                            key={index}
                            value={value}>{value}</option>
                    })
                }
            </select>
        )
    }

    _handleChangeShowItemsPerPage(e) {
        const number = parseInt(e.target.value, 10)

        this.props.onChangePerPage(number)
    }
}

ShowKeywordPerPage.propTypes = {
    perPage: PropTypes.number.isRequired,
    onChangePerPage: PropTypes.func.isRequired,
}

export default ShowKeywordPerPage

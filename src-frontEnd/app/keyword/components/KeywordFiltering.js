import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {Form, FormGroup, Label} from "reactstrap"
import moment from "moment"
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"
import {FormattedMessage} from "react-intl"
import SearchTermKeywords from "./SearchTermKeywords"
import {SingleDatePicker} from "react-dates"


class KeywordFiltering extends Component {
    state = {
        focused: false
    }

    _isOutsideRange = (date) => {
        const yesterday = moment()
        const today = moment()
        const from = moment('28-11-2017', 'DD-MM-YYYY')

        return !date.isBetween(from, yesterday) || today.isSame(date, 'd')
    }

    render() {
        const {options, selected} = this.props

        if (!options.size) {
            return null
        }

        const maxRank = options.get('maxRank')

        const selectedRank = selected.get('rank')
        const selectedDate = selected.get('date')

        return (
            <div className="KeywordFiltering">
                <Form className="d-flex">
                    <FormGroup className="Filter">
                        <SearchTermKeywords onChange={this._handleChangeTerm}/>
                    </FormGroup>

                    <FormGroup className="Filter ml-auto">
                        <Label for="date-analytics"><FormattedMessage id="general.date"/> </Label>

                        <SingleDatePicker
                            noBorder
                            readOnly
                            enableOutsideDays
                            numberOfMonths={1}
                            isOutsideRange={this._isOutsideRange}
                            date={selectedDate}
                            onDateChange={this._handleChangeDate.bind(this)}
                            focused={this.state.focused}
                            onFocusChange={({focused}) => this.setState({focused})}
                        />
                    </FormGroup>

                    <FormGroup className="Filter">
                        <Label for="max-rank"><FormattedMessage id="general.rank"/> </Label>

                        <div className="Options ButtonOptions">
                            {
                                maxRank.size &&
                                maxRank.map((rank, index) => {
                                    return (
                                        <div
                                            onClick={this._handleChangeRank.bind(this, rank)}
                                            className={classNames("Option", {active: rank === selectedRank})}
                                            key={index}>&le; {formatThousandNumber(rank)}</div>
                                    )
                                })
                            }
                        </div>

                        <div className="Selects">
                            <select value={selectedRank}
                                    onChange={this._handleChangeSelectRank}
                                    className="form-control">
                                {
                                    maxRank.size &&
                                    maxRank.map((rank, index) => {
                                        return (
                                            <option
                                                value={rank}
                                                key={index}>&le; {formatThousandNumber(rank)}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        )
    }

    _handleChangeSelectRank = (e) => {
        const {value} = e.target
        const {onChangeOptions} = this.props

        onChangeOptions({
            rank: parseInt(value, 10)
        })
    }

    _handleChangeTerm = (term) => {
        const {onChangeOptions} = this.props

        onChangeOptions({
            term
        })
    }

    _handleChangeDate(date) {
        this.props.onChangeOptions({
            date
        })
    }

    _handleChangeRank(maxRank, e) {
        const {onChangeOptions} = this.props

        onChangeOptions({
            rank: parseInt(maxRank, 10)
        })
    }
}

KeywordFiltering.propTypes = {
    options: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    onChangeOptions: PropTypes.func.isRequired,
}

export default KeywordFiltering

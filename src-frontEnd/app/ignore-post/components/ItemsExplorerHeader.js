import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"
import {FormattedMessage} from "react-intl"
import SwitchLayoutContainer from "../../search/components/header/sort/SwitchLayoutContainer"
import {Label} from "reactstrap";

class ItemsExplorerHeader extends Component {
    state = {
        form: {
            title: '',
            description: ''
        },
        openEdit: false,
        field: 'added_date'
    }

    _handleClickChange(option, e) {
        e.preventDefault();
        this._changeOption(option);
    }

    _changeOption(option) {
        const currentField = this.state.field

        if (currentField !== option) {
            this.setState({
                field: option,
            })
            this.props.changeField(option);
            this.props.triggerSearch(option);
        }
    }

    render() {
        const {className, total} = this.props
        const {openEdit, field} = this.state

        const options = [
            {
                key: 'rank',
                text: 'Rank'
            },
            {
                key: 'added_date',
                text: 'Added Date'
            }
        ];

        return (
            <div className={classNames('TableItemsMeta', className, {openEdit})}>
                <div className="Wrapper d-flex justify-content-end">
                    <div className="d-flex align-items-center">
                        <Label className="label">Sort by: </Label>
                        <ul className="Options ButtonOptions">
                            {
                                options.map((option) => {
                                    return (
                                        <li
                                            onClick={this._handleClickChange.bind(this, option.key)}
                                            className={classNames('Option', {active: field === option.key}, option.key)}
                                            key={option.key}>
                                            {option.text}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <SwitchLayoutContainer/>
                        <span className="TotalItems">
                            {formatThousandNumber(total)} <FormattedMessage id="general.products"/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

ItemsExplorerHeader.propTypes = {
    total: PropTypes.number.isRequired,
    category: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
}

export default ItemsExplorerHeader

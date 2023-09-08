import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"
import {FormattedMessage} from "react-intl"
import SwitchLayoutContainer from "../../search/components/header/sort/SwitchLayoutContainer"
import getMessageText from "../../../helpers/i18n/getMessageText"
import {_deleteCategoryFavorite} from "../../../services/FavoriteServices"
import getHistory from "../../../store/getHistory"
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

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key)
    }

    _handleClickOpenEdit = (e) => {
        e.preventDefault()
        const {title, description} = this.props.category

        this.setState({
            form: {
                title: title || '',
                description: description || '',
            },
            openEdit: true
        })
    }

    _handleChangeInput = (field) => e => {
        const {value} = e.target

        this.setState(({form}) => ({
            form: {
                ...form,
                [field]: value
            }
        }))
    }

    _handleSubmitForm = (e) => {
        e.preventDefault()

        const {form} = this.state
        this.props.onUpdate(form)

        this.setState({
            openEdit: false
        })
    }

    _handleClickCancel = (e) => {
        e.preventDefault()

        this.setState({
            openEdit: false
        })
    }

    _handleClickDelete = (e) => {
        e.preventDefault()
        const text = this._getLanguageText('favorite.confirm_delete')
        const r = window.confirm(text)

        if (r) {
            const {category} = this.props
            _deleteCategoryFavorite(category._id)
                .then(this._afterDelete)
                .catch(this._afterDelete)
        }
    }

    _afterDelete = () => {
        const history = getHistory()
        history.replace('/a/favorites')
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
        const {className, total, category} = this.props
        const {title, description} = category
        const {openEdit, form, field} = this.state

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
                <div className="Wrapper d-flex justify-content-between">
                    <div className="Details">
                        {
                            !openEdit
                                ?
                                <div className="Show">
                                    <h1 className="PageTitle">
                                        <span onClick={this._handleClickOpenEdit} className="Edit"><i
                                            className="linear-pencil2"/></span>
                                        <span className="Title">{title}</span>
                                    </h1>
                                    <div className="Description">{description}</div>
                                </div>
                                :
                                <form onSubmit={this._handleSubmitForm} className="Editor">
                                    <input name="title"
                                           className="Title form-control"
                                           placeholder={this._getLanguageText('general.title')}
                                           onChange={this._handleChangeInput('title')} value={form.title}
                                           type="text"/>
                                    <textarea
                                        rows={2}
                                        name="description"
                                        className="Description form-control"
                                        placeholder={this._getLanguageText('general.description')}
                                        onChange={this._handleChangeInput('description')}
                                        value={form.description}/>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="Left">
                                            <button type="submit" className="Save btn btn-primary"><FormattedMessage
                                                id="general.update"/></button>
                                            <button onClick={this._handleClickCancel} type="button"
                                                    className="Cancel btn btn-link"><FormattedMessage
                                                id="general.cancel"/>
                                            </button>
                                        </div>
                                        <div className="Right">
                                            <button onClick={this._handleClickDelete} type="button"
                                                    className="Cancel btn btn-link text-danger"><FormattedMessage
                                                id="general.delete"/>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        }
                    </div>

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

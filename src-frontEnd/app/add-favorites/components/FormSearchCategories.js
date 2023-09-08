import React, {Component,Fragment} from "react";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import getMessageText from "../../../helpers/i18n/getMessageText";

class FormSearchCategories extends Component {
    state = {
        term: '',
        disabled: true,
        errorText:"searchItem.query.no_error"
    };

    _timeoutChangeTerm = null;

    _handleChangeSearchTerm = (e) => {
        const {value} = e.target;

        if (!value.split("").some((item) => item !== " ")) {
            this.setState({ ...this.state, disabled: true, term: value,errorText:"searchItem.query.invalid_query_name" });
          }
          if (this.props.categories.some((item) => item.title === value.trim())) {
            this.setState({ ...this.state, disabled: true, term: value,errorText:"searchItem.query.query_name_exists" });
          } 
          
          if((value.split("").some((item) => item !== " "))&&!(this.props.categories.some((item) => item.title === value.trim()))){
            this.setState({ ...this.state, disabled: false, term: value,errorText:"searchItem.query.no_error" });
          }
        this._delayChangeTerm(value);
    };

    _delayChangeTerm(term) {
        if (this._timeoutChangeTerm) {
            clearTimeout(this._timeoutChangeTerm);
        }

        this._timeoutChangeTerm = setTimeout(() => {
            this.props.onChangeTerm(term);
        }, 500);
    }

    _handleCreate = (e) => {
        e.preventDefault();

        const {term} = this.state;

        if (!term) {
            return;
        }
        if(!(term.split("").some((item)=> item!==" "))){
            return
        }
        if(this.props.categories.some((item)=>item.title===term)){
            return
        }
        this.props.onCreate(term);

        this.setState({
            term: '',
            disabled:true,
            errorText:"searchItem.query.no_error"
        });
    };

    render() {
        const {term,disabled} = this.state;

        return (
          <Fragment> <form className="FormSearchCategories d-flex justify-content-center align-items-center">
                <input
                    className="Name form-control"
                    placeholder={getMessageText(this.props.intl)('favorite.modal.placeholder_input')}
                    onChange={this._handleChangeSearchTerm}
                    value={term} name="search-category"
                    type="text"/>

                <button
                    disabled={disabled}
                    className="BtnCreate btn btn-primary" onClick={this._handleCreate}><FormattedMessage
                    id="favorite.modal.create"/></button>
            </form>
            <span className='ErrorQueryName'>{this.state.errorText!=="searchItem.query.no_error"&&<FormattedMessage id={this.state.errorText}/>}</span>
            </Fragment> 
        );
    }
}

FormSearchCategories.propTypes = {
    onChangeTerm: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(FormSearchCategories);
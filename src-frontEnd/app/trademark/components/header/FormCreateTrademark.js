import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "reactstrap";
import { injectIntl } from "react-intl";
import getMessageText from "../../../../helpers/i18n/getMessageText";

class FormCreateTrademark extends Component {
  _getLanguageText(key) {
    return getMessageText(this.props.intl)(key);
  }

  render() {
    const { form, beAdded, userScope, onUpgradePopup } = this.props;
    const placeHolder = beAdded
      ? this._getLanguageText("tm.placeholder_beAdded")
      : this._getLanguageText("tm.placeholder");
    const text = form.get("text");
    const isUserTrial =
      (userScope.includes("trial") &&
        !userScope.includes("admin") &&
        !userScope.includes("mod")) ||
      false;
    return (
      <div className="FormCreateTrademark" onClick={()=>{
        if(!beAdded){
        onUpgradePopup()
      }else{
        return
      }
      }}>
          <Form onSubmit={this._onSubmitForm.bind(this)}>
            <Input
              disabled={!beAdded}
              data-lpignore="true"
              name="trademark-input"
              placeholder={placeHolder}
              onChange={this._onChangeInput.bind(this)}
              type="text"
              value={text}
            />
            <button disabled={!text} type="submit" className="Add" />
          </Form>
      </div>
    );
  }

  _onChangeInput(e) {
    const { value } = e.target;

    this.props.changeInputCreateTradeMark(value);
  }

  _onSubmitForm(e) {
    e.preventDefault();

    const { form, createNewTradeMark, beAdded } = this.props;

    if (!beAdded) {
      return;
    }

    const text = form.get("text");
    if (!text) {
      return;
    }

    createNewTradeMark(text).catch((error) => {
      const message = error.message || error;

      alert(message);
    });
  }
}

FormCreateTrademark.propTypes = {
  form: PropTypes.object.isRequired,
  beAdded: PropTypes.bool.isRequired,
  createNewTradeMark: PropTypes.func.isRequired,
  changeInputCreateTradeMark: PropTypes.func.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(FormCreateTrademark);

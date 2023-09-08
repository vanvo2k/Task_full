import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, FormGroup, Input} from "reactstrap";
import {
    changeUserLanguage,
    getUserLanguage,
    addLanguageListener,
    removeLanguageListener
} from "../../../../services/LocaleServices";
import {_getSettings, _saveSettings} from "../../../../services/UserService";
import StorageServices from "../../../../services/StorageServices";
import {injectIntl, FormattedMessage} from "react-intl";
import getMessageText from "../../../../helpers/i18n/getMessageText";
import {Button} from "reactstrap"

class ProfileSettings extends Component {
    state = {
        language: getUserLanguage(),
        phone: '',
        processing: false,
        isChange: false,
        showAlert: false
    };

    componentDidMount() {
        this.props.fetchProfile();
        this._fetchSettings();

        addLanguageListener(this._handleChangeLanguage);
    }

    componentWillUnmount() {
        removeLanguageListener(this._handleChangeLanguage);
    }

    _handleChangeLanguage = (_language) => {
        const {language} = this.state;

        if (_language !== language) {
            this.setState({
                language: _language
            });
        }
    };

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(`settings.profile.settings.language_${key}`);
    }

    _fetchSettings() {
        _getSettings()
            .then(response => {
                const {success, data} = response;

                if (success) {
                    const {language, phone} = data;

                    this.setState({phone})

                    if (language) {
                        changeUserLanguage(language);
                        StorageServices.saveUserSettings({language});
                    }
                }
            });
    }

    _handleChangeInputLanguage = (e) => {
        const {value} = e.target;

        this.setState({
            language: value,
            isChange: true
        });

        _saveSettings({language: value})
            .then(settings => {
                StorageServices.saveUserSettings({language: value});

                changeUserLanguage(value);
            });
    };

    _handleChangePhone = (e) => {
        e.preventDefault()

        const {value} = e.target

        this.setState({phone: value, isChange: true})
    }

    _submitChangeUserSettings = () => {
        const {phone} = this.state

        this.setState({processing: true})

        _saveSettings({phone})
            .then(settings => {
                this.setState({processing: false, isChange: false, showAlert: true})

                setTimeout(() => this.setState({showAlert: false}), 2000);
            })
    }

    render() {
        const {profileData} = this.props;

        if (!profileData.size) {
            return null;
        }

        const profile = profileData.get('profile');
        const {language, phone, processing, isChange, showAlert} = this.state;

        return (
            <div className="ProfileSettings">

                <h1 className="title"><FormattedMessage id="settings.profile.title"/></h1>

                <div className="Info">
                    <div className="Avatar">
                        <img className="img-fluid" src={profile.get('avatar')} alt={profile.get('name')}/>
                    </div>

                    <div className="Basic">
                        <Form>
                            <FormGroup>
                                <label><FormattedMessage id="settings.profile.name"/></label>
                                <Input readOnly type="text"
                                       value={profile.get('name')}/>
                            </FormGroup>

                            <FormGroup>
                                <label><FormattedMessage id="settings.profile.email"/></label>
                                <Input readOnly type="text"
                                       value={profile.get('email')}/>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

                <div className="Settings">
                    <h3><FormattedMessage id="settings.profile.settings.title"/></h3>

                    <Form inline>
                        <label><FormattedMessage id="settings.profile.settings.label_language"/></label>
                        <Input value={language} onChange={this._handleChangeInputLanguage} type="select">
                            <option value="en">{this._getLanguageText('en')}</option>
                            <option value="vi">{this._getLanguageText('vi')}</option>
                        </Input>
                    </Form>

                    <Form inline>
                        <label><FormattedMessage id="settings.profile.settings.label_phone"/></label>
                        <Input value={phone} onChange={this._handleChangePhone}/>
                    </Form>

                    <div className="Save">
                        {
                            showAlert &&
                            <span className="alert"><i className="ion-android-done"/> <FormattedMessage id="general.saved"/></span>
                        }
                        <Button type="submit" color="primary" disabled={!isChange || processing}
                                onClick={this._submitChangeUserSettings}><FormattedMessage id="general.save"/></Button>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileSettings.propTypes = {
    fetchProfile: PropTypes.func.isRequired,
    profileData: PropTypes.object,
    intl: PropTypes.object,
};

export default injectIntl(ProfileSettings);
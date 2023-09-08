import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {FormattedMessage} from "react-intl";
import classNames from "classnames";

class IntroToolsDashboard extends PureComponent {
    render() {

        const {tool} = this.props
        const tools = {
            'spybadass': {
                'link': 'https://app.spybadao.com',
                'fb_group': 'https://www.facebook.com/groups/spyads',
                'fb_page': 'https://www.facebook.com/spybadass'
            },
            'spyetsy': {
                'link': 'https://app.spyetsy.com',
                'fb_group': 'https://www.facebook.com/groups/spyetsy',
                'fb_page': 'https://www.facebook.com/spyetsy'
            }
        };

        if (!tool || Object.keys(tools).indexOf(tool) === -1) {
            return null;
        }

        return (
            <li className={classNames("nav-item Logo", tool)}>
                <a href={tools[tool].link} target="_blank" className="nav-link"/>
                <div className={classNames("ToolInfo", tool)}>
                    <div className={classNames("Title", tool)}>
                        <h4 className={classNames("Name", tool)}><FormattedMessage id={`otherTools.${tool}.title`}/>
                        </h4>
                        <p className="SubTitle"><FormattedMessage id={`otherTools.${tool}.subtitle`}/></p>
                    </div>
                    <div className="Info">
                        <div className="Description"><FormattedMessage id={`otherTools.${tool}.description`}/>
                        </div>
                        <div className="LinkTool">
                            <FormattedMessage id="otherTools.ToolLabel.link_tool"/>
                            <a href={tools[tool].link} target="_blank">{tools[tool].link}</a>
                        </div>
                        <div className="FBGroup">
                            <FormattedMessage id="otherTools.ToolLabel.fb_group"/>
                            <a href={tools[tool].fb_group} target="_blank">{tools[tool].fb_group}</a>
                        </div>
                        <div className="FBPage">
                            <FormattedMessage id="otherTools.ToolLabel.fb_page"/>
                            <a href={tools[tool].fb_page} target="_blank">{tools[tool].fb_page}</a>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

IntroToolsDashboard.propTypes = {
    tool: PropTypes.string
}

export default IntroToolsDashboard
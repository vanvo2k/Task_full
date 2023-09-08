import React, {Component} from "react";
import classNames from "classnames";
import styled from "styled-components";
import {Link} from "react-router-dom";

class PageNotFound extends Component {
    render() {
        const {className} = this.props;

        return (
            <div className={classNames(['PageNotFound text-center', className])}>
                <h1>Page not found</h1>

                <div className="Images d-flex align-items-center justify-content-center">
                    <span className="Number">4</span>
                    <img className="Icon" src="/assets/images/icon-ghost.svg" alt="404"/>
                    <span className="Number">4</span>
                </div>

                <div className="Help">
                    Woops. Looks like this page doesn't exits.<br/>
                    You could return <Link to="/">to the homepage</Link> or or feel free to report this issue.
                </div>
            </div>
        );
    }
}

export default styled(PageNotFound)`
`;
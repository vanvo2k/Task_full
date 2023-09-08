import React, {Component} from "react";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import OptInEmail from "./OptInEmail";

class OptInEmailContainer extends Component {
    render() {
        return (
            <EnsureLoggedInContainer redirect={false}>
                <OptInEmail/>
            </EnsureLoggedInContainer>
        );
    }
}


export default OptInEmailContainer;
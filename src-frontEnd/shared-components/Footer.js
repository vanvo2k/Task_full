import React, {PureComponent} from "react"
import {Container} from "reactstrap"

class Footer extends PureComponent {
    render() {
        return (
            <footer id="footer">
                <Container fluid>
                    <span className="text-muted">© SpyAMZ 2018. All rights reserved.</span>
                </Container>
            </footer>
        )
    }
}

export default Footer

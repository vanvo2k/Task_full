import React, {Component} from "react"
import {Link} from "react-router-dom"

class EmptyCart extends Component {
    render() {
        return (
            <div className="container">
                <div className="EmptyCart">
                    Empty cart. <Link to="/pricing">See pricing</Link>
                </div>
            </div>
        )
    }
}

export default EmptyCart

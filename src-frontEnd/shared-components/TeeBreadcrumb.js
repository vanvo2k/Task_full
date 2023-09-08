import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Breadcrumb, BreadcrumbItem} from "reactstrap"
import {Link} from "react-router-dom"

class TeeBreadcrumb extends PureComponent {
    render() {
        const {list} = this.props

        return (
            <div className="TeeBreadcrumb">
                <Breadcrumb>
                    {
                        list.map((item, index) => {
                            return this._renderItem(item, index)
                        })
                    }
                </Breadcrumb>
            </div>
        )
    }

    _renderItem(item, id) {
        const {link, title, active} = item

        return (
            <BreadcrumbItem key={id} active={active}>
                {
                    link ? <Link to={link}>{title}</Link> : title
                }
            </BreadcrumbItem>
        )
    }
}

TeeBreadcrumb.propTypes = {
    list: PropTypes.array
}

export default TeeBreadcrumb

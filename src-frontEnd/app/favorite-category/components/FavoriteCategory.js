import React, {Component} from "react";
import PropTypes from "prop-types";
import ListProductsByCategory from "./ListProductsByCategory";
import TimeAgo from "../../../shared-components/TimeAgo";
import {_getTotalProductsByCategory} from "../../../services/FavoriteServices";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class FavoriteCategory extends Component {
    state = {
        total: this.props.category.total || 0
    };

    _request = null;

    componentDidMount() {
        const {category} = this.props;

        if (!Number.isInteger(category.total)) {
            this._fetchTotalProducts();
        }
    }

    componentWillUnmount() {
        this._request && this._request.cancel && this._request.cancel();
    }

    _fetchTotalProducts = () => {
        const {category} = this.props;
        this._request = _getTotalProductsByCategory(category._id);
        this._request.then(({data, success}) => {
            if (success) {
                this.setState({
                    total: data
                })
            }
        }).catch(error => {

        });
    };

    render() {
        const {category} = this.props;
        const {_id, title, updated} = category;
        const {total} = this.state;

        return (
            <div className="FavoriteCategory col-12 col-md-6 col-lg-4">
                <Link to={`/a/favorites/${_id}`} className="Wrapper">
                    <ListProductsByCategory categoryId={_id}/>

                    <div className="Header">
                        <div className="Title">{title}</div>

                        <div className="Meta d-flex justify-content-between align-items-center">
                            <div className="Total">{total} <FormattedMessage id="general.products"/></div>

                            <div className="Updated"><TimeAgo time={updated}/></div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

FavoriteCategory.propTypes = {
    category: PropTypes.object.isRequired,
};

export default FavoriteCategory;
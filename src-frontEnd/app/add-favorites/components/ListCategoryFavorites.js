import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import FormSearchCategories from "./FormSearchCategories";
import CheckboxAnimated from "../../../shared-components/CheckboxAnimated";
import Loading from "../../../shared-components/Loading";

class ListCategoryFavorites extends Component {
    _handleToggleFavorite = (categoryId) => e => {
        e.preventDefault();
        this.props.onToggle(categoryId);
    };

    render() {
        const {categories, onChangeTerm, onCreate, loading} = this.props;

        return (
            <div className="ListCategoryFavorites col-12 col-md-6">
                <Loading loading={loading}/>
                <FormSearchCategories
                    onCreate={onCreate}
                    onChangeTerm={onChangeTerm}
                    categories={categories}/>

                <ul className="Categories">
                    {
                        categories.map(category => {
                            const categoryId = category._id;
                            const {added} = category;

                            return (
                                <li className={classNames("Category", {added})}
                                    key={categoryId}>
                                    <div
                                        onClick={this._handleToggleFavorite(categoryId)}
                                        className="Left d-flex align-items-center">
                                        <CheckboxAnimated readOnly checked={added}/>

                                        <span className="Title">{category.title}</span>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

ListCategoryFavorites.propTypes = {
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default ListCategoryFavorites;
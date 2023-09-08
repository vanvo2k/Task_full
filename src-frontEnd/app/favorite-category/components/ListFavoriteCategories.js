import React, {Component} from "react";
import PropTypes from "prop-types";
import FavoriteCategory from "./FavoriteCategory";
import NoFavoriteCategory from "./NoFavoriteCategory";
import FavoriteCategoryCreator from "./FavoriteCategoryCreator"
import UserHasRoleContainer from "../../../shared-containers/UserHasRoleContainer"

class ListFavoriteCategories extends Component {
    render() {
        const {categories, loading, onRefreshPage} = this.props;

        return (
            <div className="ListFavoriteCategories">
                <div className="row">
                    {
                        !loading && (!categories || !categories.length) &&
                        <NoFavoriteCategory/>
                    }

                    {
                        categories.map(category => {
                            const categoryId = category._id;

                            return (
                                <FavoriteCategory key={categoryId} category={category}/>
                            );
                        })
                    }
                    <UserHasRoleContainer hasRole='admin' noAlert>
                        <FavoriteCategoryCreator onRefreshPage={onRefreshPage}/>
                    </UserHasRoleContainer>
                </div>
            </div>
        );
    }
}

ListFavoriteCategories.propTypes = {
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    onRefreshPage: PropTypes.func.isRequired,
};

export default ListFavoriteCategories;
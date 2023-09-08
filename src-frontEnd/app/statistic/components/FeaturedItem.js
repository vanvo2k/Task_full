import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {filterRank, getLinkImageBestQuality} from "../../../helpers/AmazonHelpers";
import ButtonAddFavorites from "../../add-favorites/shared/ButtonAddFavorites";

class FeaturedItem extends Component {
    render() {
        const {item} = this.props;

        const id = item.get('_id');
        const isCropped = !!item.get('cropped');
        const category = item.get('category') || 'clothing';
        const preview = getLinkImageBestQuality(item.get('preview'), 600);

        return (
            <div
                className={classNames("FeaturedItem d-flex", `c-${category}`, {isCropped})}>
                <div className="Thumbnail">
                <div className="FavoriteAndIgnore">
                    <ButtonAddFavorites id={id}/>
                </div>

                    <div className="Image">
                        <img
                            src={preview}
                            alt="thumbnail"/>
                    </div>


                    <div className="Hover">
                        <img src={preview} alt="featured"/>
                    </div>
                </div>
                <div className="Detail">
                    <a href={`/a/items/${id}`} target="_blank"
                       className="Name">
                        {
                            item.get('name')
                        }
                    </a>

                    <div className="Rank">
                        Rank: <span>#{filterRank(item.get("rank"))}</span>
                    </div>

                    <div className="Brand">
                        Brand: <a
                        href={`/a/items?page=1&term=brand:${item.get('brand')}&sortByField=rank&searchType=match_phrase`}
                        target="_blank">{item.get('brand')}</a>
                    </div>
                </div>
            </div>
        );
    }
}

FeaturedItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default FeaturedItem;
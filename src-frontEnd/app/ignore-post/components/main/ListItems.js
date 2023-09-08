import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemTableContainer from "./ItemTableContainer";
import NoItems from "../../../search/components/main/NoItems";
import { randomArrForTrial } from "../../../../helpers/common/randomArrForTrial";

class ListItems extends Component {
    render() {
        const {items, loading} = this.props;

        return (
            !items.size ? <NoItems loading={loading}/> : this._renderListItems()
        );

    }

    _renderListItems() {
        const {items, triggerSearch, mode} = this.props;
        const randomArr = randomArrForTrial(items)
        return items
            .filter(id => {
                return !!id;
            })
            .map((id, index) => {
                return (
                    <ItemTableContainer
                        key={id}
                        index={index}
                        id={id}
                        mode={mode}
                        randomArr={randomArr}
                        triggerSearch={triggerSearch}
                        />
                );
            });
    }
}

ListItems.propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ListItems;
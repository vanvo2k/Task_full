import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ItemDetailContainer from "./ItemDetailContainer";

class ShowItemDetail extends PureComponent {
    render() {
        const {props} = this;
        const {modal} = props;
        const id = modal.get('id');
        const index = modal.get('index');

        return (
            <ItemDetailContainer
                id={id}
                index={index}
                {...props}
            />
        );
    }
}

ShowItemDetail.propTypes = {
    modal: PropTypes.object.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    showItemDetail: PropTypes.func.isRequired,
    closeModalItemDetail: PropTypes.func.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
};

export default ShowItemDetail
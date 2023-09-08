import React, {Component} from 'react';
import FavoriteCategoryCreatorForm from "./FavoriteCategoryCreatorForm"
import PropTypes from "prop-types"

class FavoriteCategoryCreator extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
        }
    }


    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen,
        }))
    }

    render() {
        const {isModalOpen} = this.state;
        return (
            <div className="FavoriteCategoryCreator col-12 col-md-6 col-lg-4">
                <div className="wrapper">
                    <div className="add-favorite" onClick={this.toggleModal}>
                        <div className='add-symbol'>&#xe95b;</div>
                        <h5 className='add-text'>Add new favorite category</h5>
                    </div>
                    <FavoriteCategoryCreatorForm
                        isModalOpen={isModalOpen}
                        onToggleModal={this.toggleModal}
                        onRefreshPage={this.props.onRefreshPage}
                    />
                </div>
            </div>
        )
    }
}

FavoriteCategoryCreator.propTypes = {
    onRefreshPage: PropTypes.func.isRequired,
};

export default FavoriteCategoryCreator;
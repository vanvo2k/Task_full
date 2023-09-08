import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalBody, ModalFooter} from "reactstrap"
import {_createCategoryFavorite} from "../../../services/FavoriteServices"

class FavoriteCategoryCreatorForm extends Component {
    state = {
        title: '',
        ASINList: '',
        isCreating: false,
        error: '',
    }
    handleChangeInput = (field, e) => {
        const {value} = e.target;
        this.setState({
            [field]: value,
            error: '',
        })
    }

    handleCreateCategory = () => {
        const {title, ASINList} = this.state;
        this.setState({
            isCreating: true,
            error: '',
        })
        _createCategoryFavorite(title, '', ASINList)
            .then(result => {
                if (result.success) {
                    this.props.onToggleModal();
                    this.props.onRefreshPage();
                    this.setState({
                        isCreating: false,
                        title: '',
                        ASINList,
                    })
                } else {
                    this.setState({
                        error: result.message,
                        isCreating: false,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const {title, ASINList, isCreating, error} = this.state;
        const {isModalOpen} = this.props;
        return (
            <Modal isOpen={isModalOpen} toggle={this.props.onToggleModal} size="lg">
                <ModalBody>
                    <div className='FavoriteCategoryCreatorForm'>
                        {
                            error && <div className='alert alert-danger'>{error}</div>
                        }

                        <div className='form-group'>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-title'>Title</label>
                                </div>
                                <div className='col-10'>
                                    <input
                                        placeholder='Name of the Category'
                                        className='form-control' value={title}
                                        onChange={(e) => this.handleChangeInput('title', e)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-2'>
                                    <label className='form-title'>ASIN list</label>
                                </div>
                                <div className='col-10'>
                                    <form>
                                        <textarea
                                            placeholder='Optional, separate by comma '
                                            rows='5'
                                            className='ASIN-list form-control'
                                            value={ASINList}
                                            onChange={(e) => this.handleChangeInput('ASINList', e)}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={this.handleCreateCategory}
                            disabled={isCreating}>Create
                    </button>
                </ModalFooter>
            </Modal>

        )
    }
}

FavoriteCategoryCreatorForm.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onToggleModal: PropTypes.func.isRequired,
    onRefreshPage: PropTypes.func.isRequired,
};

export default FavoriteCategoryCreatorForm;
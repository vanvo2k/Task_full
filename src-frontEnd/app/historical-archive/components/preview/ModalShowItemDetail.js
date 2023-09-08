import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "reactstrap";
import ModalShowItemDetailBody from "./ModalShowItemDetailBody";
import moment from "moment";

class ModalShowItemDetail extends PureComponent {
    componentDidMount() {
        document.addEventListener('keyup', this._handleKeyUp.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this._handleKeyUp.bind(this));
    }

    render() {
        const {props} = this;
        const {item, historicalDate} = props;
        const {modal, id} = props;
        const {isOpen} = modal.toJS();
        const {next, previous} = this._getControl();

        return (
            <Modal
                size="lg"
                className="ModalShowItemDetail"
                toggle={this._handleClose.bind(this)}
                isOpen={isOpen}>

                <div className="ml-auto">
                    <div className="CloseButton">
                        <Button onClick={this._handleClose.bind(this)}><span className="linear-cross"/>
                        </Button>
                    </div>
                </div>

                <ModalShowItemDetailBody item={item} id={id} historicalDate={historicalDate}/>

                <div className="mr-auto Previous">
                    <Button color="secondary"
                            disabled={!previous}
                            className="previous-item"
                            onClick={this._handlePreviousItem.bind(this)}><span
                        className="linear-chevron-left"/></Button>

                </div>
                <div className="mr-auto Next">
                    <Button
                        disabled={!next}
                        color="secondary"
                        className="next-item"
                        onClick={this._handleNextItem.bind(this)}><span className="linear-chevron-right"/></Button>
                </div>
            </Modal>
        );
    }


    _handleKeyUp(e) {
        const {modal} = this.props;
        const isOpen = modal.get('isOpen');
        if (!isOpen) {
            return;
        }

        const {keyCode} = e;
        const ArrowRight = 39;
        const ArrowLeft = 37;
        const ENTER = 13;

        if (keyCode === ArrowRight) {
            this._handleNextItem();
        }

        if (keyCode === ArrowLeft) {
            this._handlePreviousItem();
        }

        if (keyCode === ENTER) {
            this._handleClose();
        }
    }

    _handleNextItem() {
        const {next} = this._getControl();

        if (!next) {
            return;
        }

        const {modal} = this.props;
        const index = modal.get('index');
        return this._showItem(index + 1);
    }

    _handlePreviousItem() {
        const {previous} = this._getControl();

        if (!previous) {
            return;
        }

        const {modal} = this.props;
        const index = modal.get('index');

        return this._showItem(index - 1);
    }

    _showItem(index) {
        const {items, historicalDate} = this.props;
        const id = items.get(index);

        if (!id) {
            return;
        }

        const currentDate = historicalDate.get('current');
        const date = currentDate.get('date');
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        const historicalDay = regex.test(date) ? date : moment().subtract(1, 'd').format('DD-MM-YYYY');

        return this.props.showItemDetail({index, id, historicalDay});
    }

    _handleClose() {
        this.props.closeModalItemDetail();
    }

    _getControl() {
        const {pagination, index} = this.props;
        const {perPage} = pagination.toJS();

        let canNexShowItem = true;
        let canPreviousShowItem = true;

        if (index <= 0) {
            canPreviousShowItem = false;
        }

        if (index + 1 >= perPage) {
            canNexShowItem = false;
        }

        return {
            next: canNexShowItem,
            previous: canPreviousShowItem
        };
    }
}

ModalShowItemDetail.propTypes = {
    pagination: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    showItemDetail: PropTypes.func.isRequired,
    historicalDate: PropTypes.object.isRequired
};

export default ModalShowItemDetail;
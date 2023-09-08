import React, {Component} from "react"
import isEmpty from "lodash/isEmpty";
import {Input, Modal, ModalBody} from "reactstrap"
import Loading from "../../../shared-components/Loading";
import {_getProducts} from "../../../services/EventServices";
import timeHuman from "../../../helpers/time/timeHuman";
import classNames from "classnames";
import EventActions from "../../events/components/EventActions";
import EventDetails from "../../events/components/EventDetails";
import ListProducts from "./ListProducts";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class EventItemModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: true,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id && prevProps.id !== this.props.id) {
            this._fetchProducts();
        }
    }

    _fetchProducts = () => {
        const {event} = this.props;
        const {query} = event;

        this.setState({
            loading: true
        });

        _getProducts({query})
            .then(result => {
                const {success, data} = result;

                if (success) {
                    const {docs} = data;

                    this.setState({
                        products: docs,
                        loading: false
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
    };

    _handleCloseModal = () => {
        this.props.actionCloseEventDetail()
    }

    render() {
        const {event,isOpen} = this.props;
        const {products,loading} = this.state;

        const {thumbnail,title,desc,area,start,type,query} = event;
        const time = timeHuman(start, 'DD/MM/YYYY');

        var keyword = '';
        if(query){
            keyword = query.keyword || ''
        }

        const link = `/a/items/?page=1&sortByField=rank&term=${keyword}&status=all&searchType=at_least_one`;
        return (
            <Modal
                isOpen={isOpen}
                toggle={this._handleCloseModal}
                className="popup-event-detail"
                size="xl">
                <ModalBody>
                    <div className="modal-closer" onClick={this._handleCloseModal}>
                        <i className="linear-cross"/>
                    </div>
                    <div className="Wrapper">
                        <div className="Inner">
                            {/*<Loading loading={loading}/>*/}
                            <div className="event-info">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="event-thumb">
                                            <img src={thumbnail} title={title}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="event-meta">
                                            <h3 className="event-title">{title}</h3>
                                            <div className="meta-item">
                                                <i className="Icon linear-calendar-empty"></i>
                                                {time}
                                            </div>
                                            <div className="meta-item">
                                                <i className="Icon linear-map-marker"></i>
                                                {area}
                                            </div>
                                            <div className="meta-item">
                                                <i className="Icon linear-list"></i>
                                                {type}
                                            </div>
                                            <div className="event-desc">
                                                {desc}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="event-products">
                                <ListProducts loading={loading} products={products} handleCloseModal={this.props.actionCloseEventDetail}/>
                            </div>
                            <div className="ViewMoreProducts">
                                <Link to={link} className="btn btn-link"><FormattedMessage id="event.more_products"/></Link>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default EventItemModal

import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";

const MAX_ITEMS = 10000;

class PaginationItems extends Component {
    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyUp);
    }

    componentDidMount() {
        window.addEventListener('keydown', this._handleKeyUp);
    }

    _handleKeyUp = (e) => {
        const {keyCode, altKey} = e;
        const {isOpenShowItem} = this.props;
        if (isOpenShowItem || !altKey) {
            return;
        }

        if (keyCode === 37) {
            this._previousPage();
        }

        if (keyCode === 39) {
            this._nextPage();
        }
    };

    _nextPage() {
        const {pagination} = this.props;
        const {page, totalPage, perPage} = pagination.toJS();
        const totalPageLimited = totalPage * perPage < MAX_ITEMS ? totalPage : parseInt(MAX_ITEMS / perPage, 10);

        if (page < totalPageLimited) {
            this._changePage(page + 1);
        }
    }

    _previousPage() {
        const {pagination} = this.props;
        const {page, totalPage, perPage} = pagination.toJS();
        const totalPageLimited = totalPage * perPage < MAX_ITEMS ? totalPage : parseInt(MAX_ITEMS / perPage, 10);

        if (totalPageLimited > 1 && page > 1) {
            this._changePage(page - 1);
        }
    }

    _changePage(page) {
        const {history, changePaginationNumber, triggerSearch} = this.props;
        changePaginationNumber(page, history)
            .then(() => {
                triggerSearch()
                    .then(() => {
                        document.querySelector('.ItemsExplorerHeader').scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
            });
    }

    render() {
        const {pagination, className, isMobile} = this.props;
        const {page, totalPage, perPage} = pagination.toJS();

        if (!totalPage || totalPage < 2) {
            return null;
        }

        const totalPageLimited = totalPage * perPage < MAX_ITEMS ? totalPage : parseInt(MAX_ITEMS / perPage, 10);

        return (
            <div>
                {
                    (page === 36) && <div className="QueryAnnouncement">
                        <FormattedMessage id="general.announcement"/>
                        <a href="https://spyamz.com/huong-dan-su-dung-bo-loc-de-xem-het-cac-mau-t-shirt-tren-spyamz/"
                           target="_blank" rel="noopener noreferrer"> <FormattedMessage id="general.read_more"/></a>
                    </div>
                }
                <div className={classNames('PaginationItems float-right', className)}>
                    <ReactPaginate previousLabel="<"
                                   nextLabel=">"
                                   pageCount={totalPageLimited}
                                   pageRangeDisplayed={isMobile ? 2 : 3}
                                   marginPagesDisplayed={isMobile ? 0 : 2}
                                   forcePage={page - 1}
                                   disableInitialCallback={true}
                                   onPageChange={this.handlePageClick.bind(this)}
                                   containerClassName={"pagination"}
                                   pageClassName="page-item"
                                   pageLinkClassName="page-link"
                                   previousClassName="Previous page-item"
                                   nextClassName="Next page-item"
                                   previousLinkClassName="page-link"
                                   nextLinkClassName="page-link"
                                   activeClassName="active"/>
                </div>
            </div>
        );
    }

    handlePageClick(data) {
        const {selected} = data;

        this._changePage(selected + 1);
    }
}

PaginationItems.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    isOpenShowItem: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    changePaginationNumber: PropTypes.func.isRequired
};

export default PaginationItems;
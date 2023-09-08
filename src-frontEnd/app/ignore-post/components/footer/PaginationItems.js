import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../helpers/RouterHelper";

class PaginationItems extends Component {
    static getInitQuery() {
        const parsed = parseSearchQuery();

        return parsed['page'] ? parseInt(parsed['page'], 10) : 1;
    }

    componentDidUpdate(prevProps, prevState) {
        this._syncPagination();
    }

    _syncPagination = () => {
        const {pagination} = this.props;
        const page = pagination.get('page');

        const parsed = parseSearchQuery();
        if (parseInt(page, 10) === parseInt(parsed.page, 10)) {
            return;
        }

        changeQuerySearch()({page});
    };

    render() {
        const {pagination, className} = this.props;
        const {page, totalPage, perPage} = pagination.toJS();

        if (totalPage < 2) {
            return null;
        }

        const MAX_ITEMS = 10000;
        const totalPageLimited = totalPage * perPage < MAX_ITEMS ? totalPage : parseInt(MAX_ITEMS / perPage, 10);

        return (
            <div className={classNames('PaginationItems float-right', className)}>
                <ReactPaginate previousLabel="Previous"
                               nextLabel="Next"
                               pageCount={totalPageLimited}
                               pageRangeDisplayed={5}
                               marginPagesDisplayed={2}
                               forcePage={page - 1}
                               disableInitialCallback={true}
                               onPageChange={this.handlePageClick.bind(this)}
                               containerClassName={"pagination"}
                               pageClassName="page-item"
                               pageLinkClassName="page-link"
                               previousClassName="page-item"
                               nextClassName="page-item"
                               previousLinkClassName="page-link"
                               nextLinkClassName="page-link"
                               activeClassName="active"/>
            </div>
        );
    }

    handlePageClick(data) {
        const {changePaginationNumber, triggerSearch} = this.props;
        const {selected} = data;
        changePaginationNumber(selected + 1)
            .then(() => {
                triggerSearch();
            });
    }
}

PaginationItems.propTypes = {
    pagination: PropTypes.object.isRequired,
    changePaginationNumber: PropTypes.func.isRequired
};

export default PaginationItems;
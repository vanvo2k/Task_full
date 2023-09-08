import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';

class QueryPagination extends Component {
    _handlePageChange = ({selected}) => {
        this.props.onChangePage(selected + 1);
    };

    render() {
        const {page, pages} = this.props;

        if (!pages || pages <= 1) {
            return null;
        }

        return (
            <div className='QueryPagination'>
                <ReactPaginate
                    forcePage={page - 1}
                    pageCount={pages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    onPageChange={this._handlePageChange}
                    disableInitialCallback
                    containerClassName={"pagination"}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="Previous page-item"
                    nextClassName="Next page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        );
    }
}

QueryPagination.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
}

export default QueryPagination;
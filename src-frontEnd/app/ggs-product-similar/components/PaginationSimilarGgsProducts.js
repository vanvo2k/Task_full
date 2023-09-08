import React, {Component} from "react"
import PropTypes from "prop-types"
import ReactPaginate from "react-paginate"

class PaginationSimilarGgsProducts extends Component {
    _handleChangePage = ({selected}) => {
        this.props.onChangePage(selected + 1)
    }

    render() {
        const {page, pages} = this.props

        if (pages <= 1) {
            return null
        }

        const totalPageLimited = parseInt(pages, 10)

        return (
            <div className="PaginationSimilarProducts PaginationItems">
                <ReactPaginate previousLabel="<"
                               nextLabel=">"
                               pageCount={totalPageLimited}
                               pageRangeDisplayed={2}
                               marginPagesDisplayed={0}
                               forcePage={page - 1}
                               disableInitialCallback={true}
                               onPageChange={this._handleChangePage}
                               containerClassName="pagination"
                               pageClassName="page-item"
                               pageLinkClassName="page-link"
                               previousClassName="Previous page-item"
                               nextClassName="Next page-item"
                               previousLinkClassName="page-link"
                               nextLinkClassName="page-link"
                               activeClassName="active"/>
            </div>
        )
    }
}

PaginationSimilarGgsProducts.propTypes = {
    page: PropTypes.number,
    pages: PropTypes.number,
    onChangePage: PropTypes.func.isRequired,
}

export default PaginationSimilarGgsProducts

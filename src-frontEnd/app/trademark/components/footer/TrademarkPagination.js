import React, {Component} from "react"
import PropTypes from "prop-types"
import ReactPaginate from "react-paginate"
import withViewport from "../../../../shared-components/withViewport"

class TrademarkPagination extends Component {
    render() {
        const {meta, isMobile} = this.props
        const page = meta.get('page')
        const totalPages = meta.get('totalPages')

        if (totalPages < 2) {
            return null
        }

        return (
            <div className="TrademarkPagination PaginationItems">
                <ReactPaginate previousLabel="Previous"
                               nextLabel="Next"
                               pageCount={totalPages}
                               pageRangeDisplayed={isMobile ? 2 : 3}
                               marginPagesDisplayed={isMobile ? 0 : 2}
                               forcePage={page - 1}
                               disableInitialCallback={true}
                               onPageChange={this._handlePageClick.bind(this)}
                               containerClassName={"pagination"}
                               pageClassName="page-item"
                               pageLinkClassName="page-link"
                               previousClassName="page-item"
                               nextClassName="page-item"
                               previousLinkClassName="page-link"
                               nextLinkClassName="page-link"
                               activeClassName="active"/>
            </div>
        )
    }

    _handlePageClick({selected}) {
        const {changeCurrentPage, triggerFetch} = this.props

        changeCurrentPage(selected + 1)
            .then(() => {
                triggerFetch && triggerFetch()
            })
    }
}

TrademarkPagination.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    meta: PropTypes.object.isRequired,
    changeCurrentPage: PropTypes.func.isRequired,
    triggerFetch: PropTypes.func

}

export default withViewport(TrademarkPagination)

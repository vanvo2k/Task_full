import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import ReactPaginate from "react-paginate"
import ShowKeywordPerPage from "./ShowKeywordPerPage"
import withViewport from "../../../shared-components/withViewport"

class KeywordPagination extends Component {
    render() {
        const {data, onChangePerPage, isMobile} = this.props

        const {totalPage, currentPage, perPage} = data

        if (!totalPage || totalPage <= 1) {
            return null
        }

        return (
            <div className={classNames('KeywordPagination')}>
                <ShowKeywordPerPage perPage={perPage} onChangePerPage={onChangePerPage}/>

                <div className="PaginationItems">
                    <ReactPaginate previousLabel="<"
                                   nextLabel=">"
                                   pageCount={totalPage}
                                   pageRangeDisplayed={isMobile ? 2 : 3}
                                   marginPagesDisplayed={isMobile ? 0 : 2}
                                   forcePage={currentPage - 1}
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
            </div>
        )
    }

    _handlePageClick(data) {
        const {onChangePage} = this.props
        const {selected} = data

        onChangePage(selected + 1)
    }
}

KeywordPagination.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangePerPage: PropTypes.func.isRequired,
}

export default withViewport(KeywordPagination)

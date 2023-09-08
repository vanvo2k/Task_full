import React, {Component} from 'react';
import {changeQuerySearch, parseSearchQuery} from "../../../../helpers/RouterHelper"
import {_getListSearchQueries, _getTotalQueries} from "../../../../services/SearchHistoryServices";
import QueryItem from "./QueryItem";
import QueryPagination from "./QueryPagination";

const MAX_QUERIES = 500

const getInitPage = () => {
    const parsedQuery = parseSearchQuery();
    return !!parsedQuery.page ? parseInt(parsedQuery.page, 10) : 1
}

class SearchHistory extends Component {
    state = {
        queries: [],
        total: 0,
        pagination: {
            page: getInitPage(),
            pages: 1,
            limit: 100
        },
        needFetch: false
    }

    componentDidMount() {
        this._fetchListQueries()
        this._fetchTotalQueries()
    }

    componentDidUpdate(prevProps, prevState) {
        const {pagination} = this.state
        const currentPage = pagination.page

        if (this.state.needFetch) {
            return this._fetchListQueries()
        }

        if (prevState.pagination && prevState.pagination.page !== currentPage) {
            this._fetchListQueries()
        }
    }

    _fetchListQueries = () => {
        const {pagination} = this.state;
        const {page, limit} = pagination;

        this.setState({
            needFetch: false
        })

        return _getListSearchQueries({page, limit})
            .then(response => {
                const {success, data} = response;

                if (success) {
                    const {page, pages, limit, total, docs} = data;
                    const MAX_PAGES = Math.ceil(MAX_QUERIES / limit);
                    const pagesValidated = pages <= MAX_PAGES ? pages : MAX_PAGES

                    this.setState({
                        queries: docs,
                        total,
                        pagination: {
                            page,
                            pages: pagesValidated,
                            limit
                        }
                    })
                }
            })
    }

    _fetchTotalQueries = () => {
        return _getTotalQueries()
            .then(result => {
                const {success, data} = result;

                if (success) {
                    this.setState({
                        total: data
                    })
                }
            })
    }

    _handleChangePage = (page) => {
        changeQuerySearch({page})
        this.setState(({pagination}) => ({
            needFetch: true,
            pagination: {
                ...pagination,
                page: parseInt(page, 10)
            }
        }))
    }

    render() {
        const {queries, pagination} = this.state
        const {page, pages, limit} = pagination

        return (
            <div className='SearchHistory'>
                <div className='Wrapper'>
                    <h1 className='Title'>Search history</h1>

                    <table className='table'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Keyword</th>
                            <th>Type</th>
                            <th>Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            queries.map((query, index) => {
                                const order = (page - 1) * limit + index + 1

                                return <QueryItem order={order} key={query._id} data={query}/>
                            })
                        }
                        </tbody>
                    </table>

                    <QueryPagination page={page} pages={pages} onChangePage={this._handleChangePage}/>
                </div>
            </div>
        )
    }
}

export default SearchHistory
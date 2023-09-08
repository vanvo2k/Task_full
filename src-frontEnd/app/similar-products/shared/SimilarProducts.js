import React, {Component} from "react"
import PropTypes from "prop-types"
import {_getSimilarProducts} from "../../../services/ProductServices"
import Loading from "../../../shared-components/Loading"
import ListSimilarProducts from "../components/ListSimilarProducts"
import PaginationSimilarProducts from "../components/PaginationSimilarProducts"
import {FormattedMessage} from "react-intl"
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"

class SimilarProducts extends Component {
    state = {
        loading: false,
        products: [],
        aggs: {
            alive: 0,
            dead: 0
        },
        meta: {
            page: 1,
            pages: 0,
            limit: 100,
            total: 0
        },
    }

    componentDidMount() {
        this._fetchProducts()
    }

    componentDidUpdate(prevProps, prevState) {
        const {productId} = this.props
        const {meta} = this.state

        if (productId !== prevProps.productId) {
            return this._fetchProducts(1)
        }

        if (meta.page && prevState.meta && prevState.meta.page && meta.page !== prevState.meta.page) {
            return this._fetchProducts()
        }
    }

    _fetchProducts = (forcePage = null) => {
        const {productId} = this.props
        this.setState({
            loading: true
        })

        const {meta} = this.state
        const pageValidated = forcePage || meta.page

        _getSimilarProducts(productId, pageValidated)
            .then(response => {
                const {success, data} = response

                const stateUpdate = {loading: false}
                if (success) {
                    const {docs, page, pages, total, limit, aggs} = data

                    stateUpdate.products = docs
                    stateUpdate.meta = {
                        page,
                        pages,
                        limit,
                        total
                    }

                    if (aggs && typeof aggs === 'object') {
                        stateUpdate.aggs = aggs
                    }
                }

                this.setState(stateUpdate)
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
    }

    _handleChangePage = (page) => {
        const pageValidated = Math.abs(parseInt(page, 10))

        this.setState(({meta}) => ({
            meta: {
                ...meta,
                page: pageValidated
            }
        }))
    }

    render() {
        const {loading, products, meta, aggs} = this.state
        const {page, pages} = meta
        const {withTitle} = this.props

        const aliveCount = aggs.alive || 0
        const deadCount = aggs.dead || 0

        const alivePercent = aliveCount ? (aliveCount / (aliveCount + deadCount) * 100).toFixed(2) : 0
        const deadPercent = (100 - alivePercent).toFixed(2)

        const stats = aliveCount || deadCount ? <span className="Stats">
            <FormattedMessage id="searchItem.header.dead"/>/
            <FormattedMessage id="searchItem.header.alive"/>:
            {" "}
            <span
                className="Number">{formatThousandNumber(deadCount)}/{formatThousandNumber(aliveCount)}
                (<FormattedMessage id="general.products"/>)</span>
            <span className="Percent">{deadPercent}/{alivePercent}(%)</span>
        </span> : ''

        return (
            <div className="SimilarProducts">
                {
                    withTitle &&
                    <h3 className="Title">
                        <FormattedMessage id="similarProducts.title"/> {stats}
                    </h3>
                }

                <Loading loading={loading}/>

                <ListSimilarProducts loading={loading} products={products}/>

                <PaginationSimilarProducts
                    page={page}
                    pages={pages}
                    onChangePage={this._handleChangePage}/>
            </div>
        )
    }
}

SimilarProducts.defaultProps = {
    withTitle: false
}

SimilarProducts.propTypes = {
    productId: PropTypes.string.isRequired,
    withTitle: PropTypes.bool,
}

export default SimilarProducts

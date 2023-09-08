import React, {Component, Fragment} from "react"
import {Button} from "reactstrap"
import {FormattedMessage} from "react-intl"
import FileDownload from "js-file-download"
import ExportPopup from './ExportPopup'
import {_exportProducts} from "../../../../../services/ProductServices";
import moment from "moment";
import parsePastTime from "../../../../../helpers/time/parsePastTime";
import {detectASIN} from "../../../../../helpers/AmazonHelpers";

const _twoDigit = (number) => {
    return number < 10 ? `0${number}` : `${number}`
}

const _getTimeString = () => {
    const now = new Date()
    const year = now.getFullYear().toString();
    const month = _twoDigit(now.getMonth() + 1);
    const date = _twoDigit(now.getDate());
    const hour = _twoDigit(now.getHours());
    const minute = _twoDigit(now.getMinutes());
    const second = _twoDigit(now.getSeconds());

    return year + month + date + '_' + hour + minute + second
}

class ExportButton extends Component {
    state = {
        isOpenPopup: false
    }

    _handleClickExport = (e) => {
        e.preventDefault()
        this.setState({
            isOpenPopup: true
        })
    }

    _handleExport = (numOfItems) => {
        const {metaData, paginationData} = this.props
        const query = metaData.get('query').toJS();
        const status = metaData.get('selectStatus');
        const {page, perPage} = paginationData.toJS();
        const rank = metaData.get('rank');
        const price = metaData.get('price');
        const sortBy = metaData.get('sortBy').toJS();
        const currentRank = rank.get('current').toJS();
        const currentPrice = price.get('current').toJS();
        const type = metaData.get('type');
        const brandType = metaData.get('brandType');
        const market = metaData.get('selectMarket')

        const available = metaData.getIn(['available', 'current']).toJS();
        const {from, to} = available;
        const fromMoment = moment(from, 'DD-MM-YYYY');
        const toMoment = moment(to, 'DD-MM-YYYY');
        const fromPastTime = parsePastTime(from);
        const toPastTime = parsePastTime(to);
        const fromText = fromPastTime ? from : (fromMoment.isValid() ? fromMoment.format('DD/MM/YYYY') : from);
        const toText = toPastTime ? to : (toMoment.isValid() ? toMoment.format('DD/MM/YYYY') : to);
        const category = 'clothing';

        let args = {}

        const {term} = query
        if (detectASIN(term)) {
            args = Object.assign({numOfItems: 1, limit: 10, page: 1, query: {}}, {
                numOfItems,
                page,
                query,
                limit: perPage,
                market
            })
        } else {
            args = Object.assign({numOfItems: 1, limit: 10, page: 1, query: {}}, {
                numOfItems,
                page,
                query,
                limit: perPage,
                rank: {
                    from: currentRank.from ? currentRank.from : 1,
                    to: currentRank.to ? currentRank.to : 0
                },
                price: currentPrice,
                status,
                sortBy,
                type,
                category,
                brandType,
                availableText: {from: fromText, to: toText},
                market
            });
        }

        _exportProducts(args)
            .then(response => {
                const timeString = _getTimeString()
                const fileName = `tamz${timeString}.csv`
                FileDownload(response, fileName)
                this.setState({
                    isOpenPopup: false
                })
            })
    }

    _toggle = () => {
        this.setState({
            isOpenPopup: false
        })
    }

    render() {
        const {isOpenPopup} = this.state

        return (
            <Fragment>
                <Button className="mr-1" onClick={this._handleClickExport}>
                    <FormattedMessage id="searchItem.header.export"/>
                </Button>
                <ExportPopup isOpen={isOpenPopup} onExport={this._handleExport} onTogglePopup={this._toggle}/>
            </Fragment>
        )
    }
}

export default ExportButton

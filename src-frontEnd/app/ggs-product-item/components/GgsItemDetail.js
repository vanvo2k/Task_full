import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import {List} from "immutable";
import timeHuman from "../../../helpers/time/timeHuman";
import classNames from "classnames";
import {getLinkImageBestQuality} from "../../../helpers/AmazonHelpers";
import DocTitle from "../../../shared-components/DocTitle";
import {FormattedMessage} from "react-intl";
import ProductImagePreview from "../../../shared-components/ProductImagePreview";
import withViewport from "../../../shared-components/withViewport";
import TimeAgo from "../../../shared-components/TimeAgo";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import Loading from "../../../shared-components/Loading";
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"
import GgsChartHistoryItem from "./GgsChartHistoryItem";
import SimilarGgsProducts from "../../ggs-product-similar/shared/SimilarGgsProducts";

class GgsItemDetail extends Component {
    state = {
        error: ''
    };

    componentDidMount() {
        this._fetchProductDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this._fetchProductDetails();
        }
    }

    _scrollToTop = () => {
        setTimeout(() => {
            const $header = document.querySelector('.ProductDetails .Header');

            $header && $header.scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    };

    _fetchProductDetails = () => {
        const {id, fetchItemDetail} = this.props;
        fetchItemDetail(id)
            .then(() => {
                this._scrollToTop();
            })
            .catch(e => {
                const {message} = e

                this.setState({
                    error: message
                })
            })
    };

    render() {
        const {props} = this;
        const {item, id, isMobile} = props;
        const {error} = this.state

        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }

        if (!item || !item.size) {
            return <Loading/>;
        }

        const name = item.get('name');
        const brand = item.get('brand');
        const cropped = true;
        const rank = item.get('rank');
        const rankDifference = item.get('rankDifference');
        const alive = item.get('alive');
        const trending = item.get('trending');
        const minPrice = item.get('minPrice')
        const maxPrice = item.get('maxPrice')
        const preview = getLinkImageBestQuality(item.get('preview')) || getLinkImageBestQuality(item.get("thumbnail"));
        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && alive;
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        const _showRankDiff = () => {

            if(rankDifference == null){
                return '-';
            }else if(rankDifference > 0){
                return '+' + rankDifference;
            }else{
                return rankDifference;
            }

        }

        const Brand = brand ?
            <a href={`/a/ggs-products?page=1&term=brand:${item.get('brand')}&sortByField=rank&searchType=match_phrase`}
               target="_blank">{item.get('brand')}</a> :
            'Unknown';

        return (
            <DocTitle title={name || 'Item....'}>
                <div className="container">
                    <div
                        className={classNames("ProductDetails ItemDetail", {dead: alive === false}, {trending: isTrends})}>
                        <Row className="Header">
                            <Col>
                                <div className="TitleItem">
                                    <h1>{name}</h1>
                                </div>

                            </Col>
                        </Row>

                        <Row className="Body">
                            <Col className="text-center Left" sm={4} xs={12}>
                                <div className="WrapperLeft">
                                    <ProductImagePreview
                                        cropped={cropped} name={name} image={preview}
                                        link={item.get('link')}/>
                                </div>
                            </Col>
                            <Col sm={8} xs={12} className="Right">
                                <div className="Rank">
                                    <span><FormattedMessage
                                        id="item.rank"/>:</span> {rank ? formatThousandNumber(rank) : "Not ranked"}
                                        <span className={classNames('rankDifference',{
                                        'rank-plus': rankDifference > 0,
                                        'rank-minus': rankDifference < 0,
                                        })}>(<span>{_showRankDiff()}</span>)</span>
                                </div>

                                {
                                    !!item.get("brand") &&
                                    <div className="Brand">
                                        <span><FormattedMessage id="item.brand"/>: </span>
                                        {Brand}
                                    </div>
                                }

                                {
                                    (!!minPrice && !!maxPrice) &&
                                    <div className="Price">
                                        <span><FormattedMessage id="item.price"/>: </span> {currency}{minPrice} - {currency}{maxPrice}
                                    </div>
                                }

                                    <div className="First-available">
                                    <span><FormattedMessage
                                        id="item.created"/>: </span> {timeHuman(item.get("created"), 'DD/MM/YYYY')}
                                    </div>

                                <div className="Updated-at">
                                    <span><FormattedMessage
                                        id="item.updated_at"/>: </span> <TimeAgo
                                    time={item.get("lastUpdated") || ''}/>
                                </div>
                            </Col>
                        </Row>

                        <div className="Histories">
                            <GgsChartHistoryItem
                                height={isMobile ? 150 : 100}
                                prices={item.get('prices') || List()}
                                ranks={item.get('ranks') || List()}
                            />
                        </div>

                        {
                            !!id &&
                            <CanUseFeatureContainer feature="access-beta" alternative="admin" noAlert>
                                <SimilarGgsProducts withTitle productId={id}/>
                            </CanUseFeatureContainer>
                        }
                    </div>
                </div>
            </DocTitle>
        );
    }
}

GgsItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.object,
    fetchItemDetail: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default withViewport(GgsItemDetail);
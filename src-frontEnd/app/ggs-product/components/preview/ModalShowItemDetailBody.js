import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Col, ModalBody} from "reactstrap";
import {List} from "immutable";
import {Link} from "react-router-dom";
import classNames from "classnames";
import timeHuman from "../../../../helpers/time/timeHuman";
import {FormattedMessage} from "react-intl";
import {filterRank, getLinkImageBestQuality} from "../../../../helpers/AmazonHelpers";
import ProductImagePreview from "../../../../shared-components/ProductImagePreview";
import withViewport from "../../../../shared-components/withViewport";
import TimeAgo from "../../../../shared-components/TimeAgo";
import Loading from "../../../../shared-components/Loading";
import GgsChartRankItem from "../../../ggs-product-item/components/GgsChartRankItem";

class ModalShowItemDetailBody extends Component {
    render() {
        const {item, isMobile} = this.props;
        const {id} = this.props;

        if (!id || !item || !item.size) {
            return <Loading/>;
        }

        const brand = item.get('brand');
        const name = item.get('name');
        const preview = getLinkImageBestQuality(item.get('preview'));
        const loading = !!item.get('loading');

        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        return (
            <ModalBody className={classNames("ModalShowItemDetailBody Body")}>
                <Row>
                    <Col xs={12} sm={4} className="BodyLeft text-center">
                        <div className="WrapperLeft">
                            <ProductImagePreview
                                disableLink={isMobile}
                                image={preview}
                                link={item.get('link')}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={8} className="BodyRight">
                        <div className="WrapperBodyRight">
                            <div className="Title">
                                        <Link to={`/a/ggs-products/${id}`}>
                                            {name}
                                        </Link>
                            </div>
                            <div className="Listed Rank">
                            <span><FormattedMessage
                                id="general.rank"/>:</span> {filterRank(item.get("rank"))}
                            </div>

                            {
                                !!brand &&
                                <div className="Listed Brand">
                                    <span><FormattedMessage id="item.brand"/>: </span>
                                            <a href={`/a/ggs-products?page=1&term=brand:${brand}&sortByField=rank&searchType=match_phrase`}
                                               target="_blank">{brand}</a>
                                </div>
                            }

                            {
                                (!!item.get("minPrice") && !!item.get('maxPrice')) &&
                                <div className="Listed Price">
                                    <span><FormattedMessage id="general.price"/>: </span>{currency}{item.get("minPrice")} - {currency}{item.get('maxPrice')}
                                </div>
                            }

                            <div className="Listed First-available">
                            <span><FormattedMessage
                                id="item.created"/>:</span> {timeHuman(item.get("created"), 'DD/MM/YYYY')}
                            </div>

                            <div className="Listed Updated-at">
                            <span><FormattedMessage
                                id="item.updated_at"/>: </span> <TimeAgo time={item.get("lastUpdated")}/>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="ranks">
                    <GgsChartRankItem filtering loading={loading} historyDays={7} height={80}
                                   ranks={item.get('ranks') || List()}/>
                </div>
            </ModalBody>
        )
    }
}

ModalShowItemDetailBody.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withViewport(ModalShowItemDetailBody);
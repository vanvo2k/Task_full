import React, {Component} from "react";
import PropTypes from "prop-types";
import {Redirect, Route, Switch} from "react-router-dom";
import classNames from "classnames";
import ItemsExplorerContainer from "../../search/components/ItemsExplorerContainer";
import ItemDetailContainer from "../../item/components/ItemDetailContainer";
import TrendItemsContainer from "../../trend/components/TrendItemsContainer";
import KeywordAnalyticsContainer from "../../keyword/components/KeywordAnalyticsContainer";
import SubscribePlanContainer from "../../subscribe-plan/components/SubscribePlanContainer";
import ItemsStatisticContainer from "../../statistic/components/ItemsStatisticContainer";
import MyAnalyticsPageContainer from "../../my-analytics/components/MyAnalyticsPageContainer";
import TrademarkPageContainer from "../../trademark/components/TrademarkPageContainer";
import NicheEventsPage from "../../events/components/NicheEventsPage";
import NicheEventsCalendarPage from "../../events-calendar/components/NicheEventsCalendarPage";
import ResizeImagesPage from "../../resize-images/components/ResizeImagesPage";
import AddToFavoritesContainer from "../../add-favorites/components/AddToFavoritesContainer";
import FavoriteCategoryContainer from "../../favorite-category/components/FavoriteCategoryContainer";
import FavoriteProductsContainer from "../../favorite/components/FavoriteProductsContainer";
import RedirectSimilarProducts from "../../redirect-similar/RedirectSimilarProducts";
import PopupSimilarProductsContainer from "../../similar-products/shared/PopupSimilarProductsContainer";
import HistoricalArchiveContainer from "../../historical-archive/components/HistoricalArchiveContainer";
import AlertSuccessContainer from "../../copy-asin/shared/AlertSuccessContainer";
import SearchHistoryContainer from "../../search-history/components/SearchHistoryContainer";
import GgsProductsContainer from "../../ggs-product/components/GgsProductsContainer";
import GgsItemDetailContainer from "../../ggs-product-item/components/GgsItemDetailContainer";
import PopupSimilarGgsProductsContainer from "../../ggs-product-similar/shared/PopupSimilarGgsProductsContainer";
import LimitedTimeOfferContainer from "../../limited-time-offer/components/LimitedTimeOfferContainer";
import LimitedTimeOfferButton from "../../limited-time-offer/components/LimitedTimeOfferButton";
import { openLimitedOffer,closeLimitedOffer,toggleUpgradePopup  } from "../actions";
import {getProfileData} from "../../../selectors/UserSelectors";
import { connect } from "react-redux";
import StorageServices from "../../../services/StorageServices";
import moment from "moment"
import UpgradePopup from "../../../shared-components/UpgradePopup";
import { openUpgradePopup } from "../selectors";

const userProfile = StorageServices.getUserData().profile;
userProfile.firstShowPromotionTime = moment(
  userProfile.firstShowPromotionTime
).add(14, "days");
const today = new Date();
const isExpiredPromotion =
  moment(userProfile.firstShowPromotionTime).valueOf() <= Date.parse(today) ||
  false;


class MainDashboard extends Component {

    state = {
        limitedOfferStatus: ''
    }
    componentDidMount() {
        const limitedOfferStatus = StorageServices.get('limitedOfferStatus');
        const userProfile = StorageServices.getUserData().profile
        const today= new Date()
        userProfile.firstShowPromotionTime = moment(userProfile.firstShowPromotionTime).add(14, 'days')
        this.setState({limitedOfferStatus})

        if(moment(userProfile.firstShowPromotionTime).valueOf()<=Date.parse(today)){
            closeLimitedOffer()
           return
        }
        if (!limitedOfferStatus) {
            StorageServices.set('limitedOfferStatus', 'opened')
            this.props.openLimitedOffer()
        }
    }

    render() {
        const props=this.props
        const {basePath} = this.props;
        const {limitedOfferStatus} = this.state;
        return (
            <main id="MainDashboard" className={classNames("MainDashboard")}>
                <Switch>
                    <Redirect exact from={basePath} to={`${basePath}/statistic`}/>

                    <Route exact from={basePath + '/statistic'} component={ItemsStatisticContainer}/>
                    <Route exact path={basePath + '/items'} component={ItemsExplorerContainer}/>\
                    <Route exact path={basePath + '/ggs-products'} component={GgsProductsContainer}/>\
                    <Route exact path={basePath + '/keywords'} component={KeywordAnalyticsContainer}/>\
                    <Route exact path={basePath + '/events-calendar'} component={NicheEventsCalendarPage}/>\
                    <Route exact path={basePath + '/items/:itemId'} component={ItemDetailContainer}/>
                    <Route exact path={basePath + '/items/:productId/similar'} component={RedirectSimilarProducts}/>
                    <Route exact path={basePath + '/ggs-products/:itemId'} component={GgsItemDetailContainer}/>
                    <Route exact path={basePath + '/favorites'} component={FavoriteCategoryContainer}/>
                    <Route exact path={basePath + '/favorites/:categoryId'} component={FavoriteProductsContainer}/>
                    <Route exact path={basePath + '/trends'} component={TrendItemsContainer}/>
                    <Route exact path={basePath + '/analytics'} component={MyAnalyticsPageContainer}/>
                    <Route exact path={basePath + '/resizer'} component={ResizeImagesPage}/>
                    <Route exact path={basePath + '/trademark'} component={TrademarkPageContainer}/>
                    <Route exact path={basePath + '/plans/:plan'} component={SubscribePlanContainer}/>
                    <Route exact path={basePath + '/subscribe/:plan'} component={SubscribePlanContainer}/>
                    <Route exact path={basePath + '/history'} component={HistoricalArchiveContainer}/>
                    <Route exact path={basePath + '/search'} component={SearchHistoryContainer}/>
                    <Redirect to="/404"/>
                </Switch>

                <AddToFavoritesContainer/>
                <PopupSimilarProductsContainer/>
                <AlertSuccessContainer/>
                <LimitedTimeOfferContainer />
                {limitedOfferStatus !== 'close' && !isExpiredPromotion && <LimitedTimeOfferButton/>}
            </main>
        );
    }
}

MainDashboard.propTypes = {
    basePath: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
    profile: getProfileData(state),
    openUpgradePopup: openUpgradePopup(state)
});

const mapDispatchToProps = {
    openLimitedOffer,
    toggleUpgradePopup
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);

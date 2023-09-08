import {combineReducers} from "redux-immutable";
import {loadingBarReducer} from 'react-redux-loading-bar'

/**
 * Feature reducers.
 */
import homepage from "../app/homepage";
import login from "../app/login";
import pageNotFound from "../app/page-not-found";
import oauthCallback from "../app/oauth-callback";
import header from "../app/header";

import pricingReducer from "../app/pricing/reducer";
import {NAME as pricingNAME} from "../app/pricing/constants";

import itemReducer from "../app/item/reducer";
import {NAME as itemNAME} from "../app/item/constants";

import notifyReducer from "../app/notify-modal/reducer";
import {NAME as notifyNAME} from "../app/notify-modal/constants";

import searchReducer from "../app/search/reducer";
import {NAME as searchNAME} from "../app/search/constants";

import favoriteReducer from "../app/favorite/reducer";
import {NAME as favoriteNAME} from "../app/favorite/constants";

import ignoreReducer from "../app/ignore-post/reducer";
import {NAME as ignoreNAME} from "../app/ignore-post/constants";

import trendReducer from "../app/trend/reducer";
import {NAME as trendNAME} from "../app/trend/constants";

import dashboardReducer from "../app/dashboard/reducer";
import {NAME as dashboardNAME} from "../app/dashboard/constants";

import keywordReducer from "../app/keyword/reducer";
import {NAME as keywordNAME} from "../app/keyword/constants";

import settingsReducer from "../app/settings/reducer";
import {NAME as settingsNAME} from "../app/settings/constants";

import sPlanReducer from "../app/subscribe-plan/reducer";
import {NAME as sPlanNAME} from "../app/subscribe-plan/constants";

import statisticReducer from "../app/statistic/reducer";
import {NAME as statisticNAME} from "../app/statistic/constants";

import serverErrorReducer from "../app/server-error/reducer";
import {NAME as serverErrorNAME} from "../app/server-error/constants";

import myAnalyticsReducer from "../app/my-analytics/reducer";
import {NAME as myAnalyticsNAME} from "../app/my-analytics/constants";

import trademarkReducer from "../app/trademark/reducer";
import {NAME as trademarkNAME} from "../app/trademark/constants";


import checkoutReducer from "../app/checkout/reducer";
import {NAME as checkoutNAME} from "../app/checkout/constants";

import notificationBarReducer from "../app/notification-bar/reducer";
import {NAME as notificationBarNAME} from "../app/notification-bar/constants";

import addFavoritesReducer from "../app/add-favorites/reducer";
import {NAME as addFavoritesNAME} from "../app/add-favorites/constants";

import similarProuctsReducer from "../app/similar-products/reducer";
import {NAME as similarProuctsNAME} from "../app/similar-products/constants";

import historyReducer from "../app/historical-archive/reducer";
import {NAME as historyName} from "../app/historical-archive/constants";

import alertSuccessReducer from "../app/copy-asin/reducer";
import {NAME as alertSuccessNAME} from "../app/copy-asin/constants";

import announcementReducer from "../app/announcement-bar/reducer";
import {NAME as announcementNAME} from "../app/announcement-bar/constants";

import ggsProductsReducer from "../app/ggs-product/reducer";
import {NAME as ggsProductsNAME} from "../app/ggs-product/constants";

import ggsProductItemReducer from "../app/ggs-product-item/reducer";
import {NAME as ggsProductItemNAME} from "../app/ggs-product-item/constants";

import similarGgsProuctsReducer from "../app/ggs-product-similar/reducer";
import {NAME as similarGgsProuctsNAME} from "../app/ggs-product-similar/constants";

import eventReducer from "../app/events-calendar/reducer";
import {NAME as eventName} from "../app/events-calendar/constants";
/**
 * Global reducers.
 */
import theme from "./theme";
import auth from "./auth";
import user from "./user";
import app from "./app";
import cart, {NAME as cartNAME} from "./cart";

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    auth,
    user,
    theme,
    app,
    [cartNAME]: cart,
    [header.constants.NAME]: header.reducer,
    [oauthCallback.constants.NAME]: oauthCallback.reducer,
    [pageNotFound.constants.NAME]: pageNotFound.reducer,
    [login.constants.NAME]: login.reducer,
    [homepage.constants.NAME]: homepage.reducer,
    [serverErrorNAME]: serverErrorReducer,
    [pricingNAME]: pricingReducer,
    [settingsNAME]: settingsReducer,
    [dashboardNAME]: dashboardReducer,
    [itemNAME]: itemReducer,
    [searchNAME]: searchReducer,
    [notifyNAME]: notifyReducer,
    [favoriteNAME]: favoriteReducer,
    [ignoreNAME]: ignoreReducer,
    [trendNAME]: trendReducer,
    [keywordNAME]: keywordReducer,
    [sPlanNAME]: sPlanReducer,
    [statisticNAME]: statisticReducer,
    [myAnalyticsNAME]: myAnalyticsReducer,
    [trademarkNAME]: trademarkReducer,
    [checkoutNAME]: checkoutReducer,
    [notificationBarNAME]: notificationBarReducer,
    [addFavoritesNAME]: addFavoritesReducer,
    [similarProuctsNAME]: similarProuctsReducer,
    [historyName]: historyReducer,
    [alertSuccessNAME]: alertSuccessReducer,
    [announcementNAME]: announcementReducer,
    [ggsProductsNAME]: ggsProductsReducer,
    [ggsProductItemNAME]: ggsProductItemReducer,
    [similarGgsProuctsNAME]: similarGgsProuctsReducer,
    [eventName]: eventReducer,
});

export default rootReducer;
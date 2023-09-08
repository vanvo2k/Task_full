import { createReducer } from "redux-create-reducer";
import { combineReducers } from "redux-immutable";
import { fromJS, List, Map } from "immutable";

import {
  CHANGE_FIELD_NAME_SORT_BY,
  CHANGE_PAGINATION_ITEMS_CURRENT_PAGE,
  CHANGE_PAGINATION_ITEMS_PER_PAGE,
  CHANGE_QUERY,
  CHANGE_SEARCH_ITEMS_QUERY,
  CHANGE_SELECT_BRAND_TYPE_ITEM,
  CHANGE_SELECT_MARKET_ITEM,
  CHANGE_SELECT_STATUS_ITEMS,
  CHANGE_SELECT_TYPE_ITEM,
  CHANGE_TEMP_FILTER_PRICE,
  CHANGE_TEMP_FILTER_RANK,
  CHANGE_TEMP_FILTER_TIME_AVAILABLE,
  CLOSE_EDITOR_FILTER_PRICE,
  CLOSE_EDITOR_FILTER_RANK,
  CLOSE_EDITOR_FILTER_TIME_AVAILABLE,
  CLOSE_MODAL_ITEM_DETAIL,
  FETCH_ITEM_DETAIL_FAILURE,
  FETCH_ITEM_DETAIL_REQUEST,
  FETCH_ITEM_DETAIL_SUCCESS,
  FETCH_LIST_ITEMS_FAILURE,
  FETCH_LIST_ITEMS_REQUEST,
  FETCH_LIST_ITEMS_SUCCESS,
  FETCH_TOTAL_ITEMS_SUCCESS,
  INIT_SETUP_META,
  OPEN_EDITOR_FILTER_PRICE,
  OPEN_EDITOR_FILTER_RANK,
  OPEN_EDITOR_FILTER_TIME_AVAILABLE,
  SAVE_QUERY_SEARCH_ITEM_FAILURE,
  SAVE_QUERY_SEARCH_ITEM_REQUEST,
  SAVE_QUERY_SEARCH_ITEM_SUCCESS,
  SET_CURRENT_MY_ANALYTIC_ID,
  SHOW_ITEM_DETAIL,
  SUBMIT_FILTER_PRICE,
  SUBMIT_FILTER_RANK,
  SUBMIT_FILTER_TIME_AVAILABLE,
  SWITCH_LAYOUT_PRODUCTS,
  TOGGLE_EDITOR_FILTER_PRICE,
  TOGGLE_EDITOR_FILTER_RANK,
  TOGGLE_EDITOR_FILTER_TIME_AVAILABLE,
  TOGGLE_LIKE_ITEM_SUCCESS,
  TOGGLE_UPGRADE_POPUP,
  SET_TRIAL_QUERY_RANK,
} from "./actionTypes";
import { AUTH_LOGIN_SUCCESS } from "../../constants/ActionTypes";
import { FETCH_REMOVE_MY_ANALYTIC_SUCCESS } from "../my-analytics/actionTypes";

const initItemsState = {
  byIds: {},
  allIds: [],
  loading: false,
  error: "",
  isOpenUpgradePopup: false,
};

const items = createReducer(fromJS(initItemsState), {
  [TOGGLE_UPGRADE_POPUP](state) {
    const current = state.get("isOpenUpgradePopup");
    return state.set("isOpenUpgradePopup", !current);
  },
  [FETCH_LIST_ITEMS_REQUEST](state) {
    return state.set("loading", true).set("error", "");
  },
  [FETCH_LIST_ITEMS_FAILURE](state, action) {
    const { error } = action;
    const message = error.message || error;

    return state
      .set("loading", false)
      .set("error", message)
      .set("allIds", fromJS([]))
      .set("byIds", fromJS({}));
  },
  [FETCH_LIST_ITEMS_SUCCESS](state, action) {
    const { result, merge } = action;
    const { data, success } = result;

    if (!success) {
      return state.set("loading", false);
    }

    const items = data.docs || [];

    let byIds = Map();
    let allIds = List();
    items.forEach((item) => {
      byIds = byIds.set(item._id, fromJS(item));
      allIds = allIds.push(item._id);
    });

    return state
      .set("loading", false)
      .set("byIds", !!merge ? state.get("byIds").merge(byIds) : byIds)
      .set("allIds", !!merge ? state.get("allIds").concat(allIds) : allIds)
      .set("error", "");
  },
  [FETCH_ITEM_DETAIL_REQUEST](state, action) {
    const { productId } = action;

    return state.setIn(["byIds", productId, "loading"], true);
  },
  [FETCH_ITEM_DETAIL_SUCCESS](state, action) {
    const { result } = action;
    const { data, success } = result;

    if (!success) {
      return state;
    }

    const { _id } = data;

    return state.setIn(
      ["byIds", _id],
      fromJS({
        ...data,
        loading: false,
      })
    );
  },
  [FETCH_ITEM_DETAIL_FAILURE](state, action) {
    const { productId } = action;

    return state.setIn(["byIds", productId, "loading"], false);
  },
  [TOGGLE_LIKE_ITEM_SUCCESS](state, action) {
    const { result } = action;
    const { success, data } = result;

    if (!success) {
      return state;
    }

    const { id, liked } = data;

    return state.setIn(["byIds", id, "liked"], liked);
  },
});

const pagination = createReducer(
  Map({
    page: 1,
    totalPage: 0,
    perPage: 36,
    total: 0,
    query: {},
  }),
  {
    [INIT_SETUP_META](state, action) {
      return state.set("page", 1);
    },
    [FETCH_LIST_ITEMS_SUCCESS](state, action) {
      const { result } = action;
      const { data, success } = result;

      if (!success) {
        return state;
      }

      return state.set("totalPage", data.pages).set("total", data.total);
    },
    [CHANGE_PAGINATION_ITEMS_CURRENT_PAGE](state, action) {
      const { page } = action;

      return state.set("page", page);
    },

    [CHANGE_PAGINATION_ITEMS_PER_PAGE](state, action) {
      const { number } = action;

      return state.set("perPage", number);
    },
    [AUTH_LOGIN_SUCCESS](state, action) {
      const { data } = action;
      const { profile } = data;
      const { settings } = profile;

      if (settings) {
        const { showItemsPerPage } = settings;

        if (showItemsPerPage) {
          return state.set("perPage", 36);
        }
      }

      return state;
    },
  }
);

const showItem = createReducer(
  fromJS({
    isOpen: false,
    id: "",
    index: 0,
  }),
  {
    [SHOW_ITEM_DETAIL](state, action) {
      const { data } = action;
      const { id, index } = data;

      return state.set("isOpen", true).set("id", id).set("index", index);
    },
    [CLOSE_MODAL_ITEM_DETAIL](state, action) {
      return state.set("isOpen", false);
    },
  }
);

const initMetaState = {
  total: 0,
  query: {
    term: "",
    excludedKeyword: "",
    searchType: "all_words",
  },
  filter: {},
  selectStatus: "alive",
  selectMarket: "us",
  rank: {
    current: {
      from: 1,
      to: "",
    },
    temp: {
      from: 1,
      to: "",
    },
    isOpen: false,
  },
  price: {
    current: {
      from: 0,
      to: 0,
    },
    temp: {
      from: 0,
      to: 0,
    },
    isOpen: false,
  },
  available: {
    isOpen: false,
    current: {
      from: null,
      to: null,
    },
    temp: {
      from: null,
      to: null,
    },
  },
  sortBy: {
    field: "rank",
  },
  market: "us",
  type: "all",
  brandType: "all",
  layout: "grid",
};

const meta = createReducer(fromJS(initMetaState), {
  [SET_TRIAL_QUERY_RANK](state) {
    return state
      .setIn(
        ["rank", "current"],
        fromJS({
          from: 1,
          to: 20000,
        })
      )
      .setIn(
        ["rank", "temp"],
        fromJS({
          from: 1,
          to: 20000,
        })
      );
  },
  [INIT_SETUP_META](state) {
    const init = fromJS(initMetaState);

    return state.merge(init.remove("layout"));
  },
  [CHANGE_QUERY](state, action) {
    const { data } = action;
    const { search, filter, sort } = data;

    const rank = filter.rank || {};
    const price = filter.price || {};
    const timeAvailable = filter.timeAvailable || {};

    return state
      .set(
        "query",
        fromJS({
          term: search.term || "",
          excludedKeyword: search.excluded || "",
          searchType: search.type || "all_words",
        })
      )
      .set("selectStatus", filter.status || "alive")
      .set("selectMarket", filter.market || "us")
      .set("type", filter.type || "all")
      .setIn(
        ["rank", "current"],
        fromJS({
          from: rank.from,
          to: rank.to,
        })
      )
      .setIn(
        ["available", "current"],
        fromJS({
          from: timeAvailable.from,
          to: timeAvailable.to,
        })
      )
      .setIn(["sortBy", "field"], sort.field || "trending")
      .setIn(
        ["price", "current"],
        fromJS({
          from: price.from || 0,
          to: price.to || 0,
        })
      )
      .set("brandType", filter.brandType || "all");
  },
  [SWITCH_LAYOUT_PRODUCTS](state, action) {
    const { layout } = action;

    return state.set("layout", layout);
  },
  [AUTH_LOGIN_SUCCESS](state, action) {
    const { data } = action;
    const { profile } = data;
    const { settings } = profile;

    if (settings) {
      const { layoutListing } = settings;

      if (layoutListing) {
        return state.set("layout", layoutListing);
      }
    }

    return state;
  },
  [FETCH_TOTAL_ITEMS_SUCCESS](state, action) {
    const { result } = action;
    const { success, data } = result;

    if (!success) {
      return state;
    }

    return state.set("total", data);
  },
  [CHANGE_SEARCH_ITEMS_QUERY](state, action) {
    const { query } = action;
    const query_ = state.get("query");
    const newQuery = Map(query);

    return state.set("query", query_.merge(newQuery));
  },
  [CHANGE_SELECT_STATUS_ITEMS](state, action) {
    const { status } = action;

    return state.set("selectStatus", status);
  },
  [CHANGE_SELECT_MARKET_ITEM](state, action) {
    const { market } = action;

    return state.set("selectMarket", market);
  },
  [TOGGLE_EDITOR_FILTER_RANK](state, action) {
    return state.setIn(["rank", "isOpen"], !state.getIn(["rank", "isOpen"]));
  },
  [OPEN_EDITOR_FILTER_RANK](state, action) {
    return state
      .setIn(["rank", "isOpen"], true)
      .setIn(["rank", "temp"], state.getIn(["rank", "current"]));
  },
  [CLOSE_EDITOR_FILTER_RANK](state, action) {
    return state.setIn(["rank", "isOpen"], false);
  },
  [CHANGE_TEMP_FILTER_RANK](state, action) {
    const { data } = action;
    const { from, to } = data;
    const fromNumber = parseInt(from, 10);
    const toNumber = parseInt(to, 10);

    const fromValidated =
      !fromNumber || fromNumber < 1 || Number.isNaN(fromNumber)
        ? ""
        : fromNumber;
    const toValidated = !toNumber || Number.isNaN(toNumber) ? "" : toNumber;

    return state.setIn(
      ["rank", "temp"],
      fromJS({
        from: fromValidated ? fromValidated : "",
        to: toValidated ? toValidated : "",
      })
    );
  },
  [SUBMIT_FILTER_RANK](state, action) {
    return state
      .setIn(["rank", "current"], state.getIn(["rank", "temp"]))
      .setIn(["rank", "isOpen"], false);
  },
  [OPEN_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
    return state
      .setIn(["available", "isOpen"], true)
      .setIn(["available", "temp"], state.getIn(["available", "current"]));
  },
  [CLOSE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
    return state.setIn(["available", "isOpen"], false);
  },
  [TOGGLE_EDITOR_FILTER_TIME_AVAILABLE](state, action) {
    return state.setIn(
      ["available", "isOpen"],
      !state.getIn(["available", "isOpen"])
    );
  },
  [SUBMIT_FILTER_TIME_AVAILABLE](state, action) {
    return state
      .setIn(["available", "current"], state.getIn(["available", "temp"]))
      .setIn(["available", "isOpen"], false);
  },
  [CHANGE_TEMP_FILTER_TIME_AVAILABLE](state, action) {
    const { data } = action;
    const { from, to } = data;

    return state.setIn(["available", "temp"], fromJS({ from, to }));
  },
  [CHANGE_FIELD_NAME_SORT_BY](state, action) {
    const { field } = action;

    return state.setIn(["sortBy", "field"], field);
  },
  [CHANGE_SELECT_TYPE_ITEM](state, action) {
    const { typeItem } = action;

    return state.set("type", typeItem);
  },
  [CHANGE_SELECT_BRAND_TYPE_ITEM](state, action) {
    const { brandType } = action;

    return state.set("brandType", brandType);
  },
  [TOGGLE_EDITOR_FILTER_PRICE](state, action) {
    return state.setIn(["price", "isOpen"], !state.getIn(["price", "isOpen"]));
  },
  [OPEN_EDITOR_FILTER_PRICE](state, action) {
    return state
      .setIn(["price", "isOpen"], true)
      .setIn(["price", "temp"], state.getIn(["price", "current"]));
  },
  [CLOSE_EDITOR_FILTER_PRICE](state, action) {
    return state.setIn(["price", "isOpen"], false);
  },
  [CHANGE_TEMP_FILTER_PRICE](state, action) {
    const { data } = action;
    const { from, to } = data;
    const fromNumber = parseInt(from, 10);
    const toNumber = parseInt(to, 10);

    const fromValidated =
      !fromNumber || fromNumber < 0 || Number.isNaN(fromNumber)
        ? 0
        : fromNumber;
    const toValidated = !toNumber || Number.isNaN(toNumber) ? 0 : toNumber;

    return state.setIn(
      ["price", "temp"],
      fromJS({
        from: fromValidated ? fromValidated : 0,
        to: toValidated ? toValidated : 0,
      })
    );
  },
  [SUBMIT_FILTER_PRICE](state, action) {
    return state
      .setIn(["price", "current"], state.getIn(["price", "temp"]))
      .setIn(["price", "isOpen"], false);
  },
});

const initStateAnalytic = {
  analyticId: null,
  saving: false,
};

const analytics = createReducer(fromJS(initStateAnalytic), {
  [SAVE_QUERY_SEARCH_ITEM_REQUEST](state, action) {
    return state.set("saving", true);
  },
  [SAVE_QUERY_SEARCH_ITEM_SUCCESS](state, action) {
    const { data } = action.result;
    const { createMyAnalytic } = data;
    const { _id } = createMyAnalytic;

    return state.set("saving", false).set("analyticId", _id);
  },
  [SAVE_QUERY_SEARCH_ITEM_FAILURE](state, action) {
    return state.set("saving", false);
  },
  [SET_CURRENT_MY_ANALYTIC_ID](state, action) {
    const { analyticId } = action;

    return state.set("analyticId", analyticId);
  },
  [FETCH_REMOVE_MY_ANALYTIC_SUCCESS](state, action) {
    return state.set("analyticId", null);
  },
});

export default combineReducers({
  items,
  pagination,
  showItem,
  meta,
  analytics,
});

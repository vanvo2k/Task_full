import {FETCH_PLANS_FAILURE, FETCH_PLANS_REQUEST, FETCH_PLANS_SUCCESS} from "./actionTypes";
import {_getPlans} from "../../services/payments/PlanServices";

export const fetchPlans = () => {
    return {
        types: [FETCH_PLANS_REQUEST, FETCH_PLANS_SUCCESS, FETCH_PLANS_FAILURE],
        promise: _getPlans()
    };
};
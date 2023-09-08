import {combineReducers} from "redux-immutable"

import profileReducer from "./profile/reducer"
import {NAME as profileNAME} from "./profile/constants"

import billingReducer from "./billing/reducer"
import {NAME as billingNAME} from "./billing/constants"

import accountReducer from "./account/reducer"
import {NAME as accountNAME} from "./account/constants"

export default combineReducers({
    [billingNAME]: billingReducer,
    [profileNAME]: profileReducer,
    [accountNAME]: accountReducer,
})

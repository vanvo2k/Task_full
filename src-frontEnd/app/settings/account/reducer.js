import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";

const initState = {};

export default createReducer(fromJS(initState), {});

import {createSelector} from "reselect";
import {NAME} from "./constants";

export const getModule = (state) => state.get(NAME);

export const _getItemsData = createSelector(getModule, state => state.get('event'));

export const _getEventInfo = createSelector(_getItemsData, (state) => state.get('event'));
export const _isOpenModal = createSelector(_getItemsData, (state) => state.get('isOpen'));
export const _getEventId = createSelector(_getItemsData, (state) => state.get('id'));

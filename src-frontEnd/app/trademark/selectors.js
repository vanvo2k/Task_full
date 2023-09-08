import {createSelector} from "reselect"
import {NAME} from "./constants"

export const getModule = (state) => {
    return state.get(NAME)
}
export const getUpgradePopupOpen = createSelector(getModule, state => state.get('isOpenUpgradePopup'))
export const getFormData = createSelector(getModule, state => state.get('form'))
export const getListItems = createSelector(getModule, state => state.get('items'))
export const getMetaData = createSelector(getModule, state => state.get('meta'))
export const getSortData = createSelector(getModule, state => state.get('sort'))
export const getStatisticData = createSelector(getModule, state => state.get('statistic'))
export const getTotalWarnings = createSelector(getModule, state => state.get('totalWarnings'))
export const canAddMoreKeyword = createSelector(getStatisticData, statistic => statistic.get('total') < statistic.get('max'))

export const getPreviewData = createSelector(getModule, state => state.get('preview'))
export const isShowResults = createSelector(getPreviewData, preview => preview.get('isOpen'))
export const getItemPreview = createSelector(getPreviewData, getListItems, (preview, items) => {
    const itemId = preview.get('item')

    if (!itemId) {
        return false
    }

    return items.find(item => item.get('_id') === itemId)
})

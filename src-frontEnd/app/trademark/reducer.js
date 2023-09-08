import { createReducer } from 'redux-create-reducer'
import { fromJS } from 'immutable'
import {
    CHANGE_CURRENT_PAGE,
    CHANGE_INPUT_CREATE_TRADEMARK,
    CHANGE_SORT_BY,
    CREATE_NEW_TRADEMARK_SUCCESS,
    DELETE_TRADEMARK_SUCCESS,
    FETCH_LIST_TRADEMARKS_SUCCESS,
    FETCH_STATISTIC_SUCCESS,
    FETCH_TOTAL_WARNINGS_SUCCESS,
    FETCH_TRADEMARK_DETAIL_SUCCESS,
    HIDE_TRADEMARK_RESULTS,
    MARK_READ_TRADEMARK_SUCCESS,
    REFRESH_TRADEMARK_SUCCESS,
    SHOW_TRADEMARK_RESULTS,
    TOGGLE_UPGRADE_POPUP,
    OPEN_TRADEMARK_RESULTS,
    CHANGE_TOTAL_TRIAL,
    CHANGE_TOTAL_TRADEMARK,
} from './actionTypes'

const initState = {
    totalWarnings: 0,
    meta: {
        page: 1,
        totalPages: 0,
        limit: 20,
        total: 0,
    },
    form: {
        text: '',
    },
    items: [],
    sort: {
        by: 'created',
    },
    statistic: {
        max: 100,
        total: 0,
    },
    preview: {
        isOpen: false,
        item: null,
    },
    isOpenUpgradePopup: false,
}

export default createReducer(fromJS(initState), {
    [TOGGLE_UPGRADE_POPUP](state) {
        const current = state.get('isOpenUpgradePopup')

        return state.set('isOpenUpgradePopup', !current)
    },
    [CHANGE_TOTAL_TRIAL](state) {
        return state.setIn(['statistic', 'max'], 5)
    },
    [CHANGE_TOTAL_TRADEMARK](state) {
        return state.setIn(['statistic', 'max'], 999999)
    },
    [CHANGE_INPUT_CREATE_TRADEMARK](state, action) {
        const { text } = action

        return state.setIn(['form', 'text'], text)
    },
    [CHANGE_INPUT_CREATE_TRADEMARK](state, action) {
        const { text } = action

        return state.setIn(['form', 'text'], text)
    },
    [FETCH_LIST_TRADEMARKS_SUCCESS](state, action) {
        const { result } = action
        const { data, success } = result

        if (!success) {
            return state
        }

        const { docs, pages, page, limit, total } = data

        return state.set('items', fromJS(docs)).set(
            'meta',
            state.get('meta').merge(
                fromJS({
                    totalPages: pages,
                    limit,
                    page,
                    total,
                })
            )
        )
    },
    [CREATE_NEW_TRADEMARK_SUCCESS](state, action) {
        const { result } = action
        const { data, success } = result

        let computed = state.setIn(['form', 'text'], '')
        const limit = state.getIn(['meta', 'limit'])
        const item = { ...data, needRefresh: true }
        if (success) {
            const items = computed.get('items').insert(0, fromJS(item))
            computed = computed.set('items', items)

            if (computed.get('items').size > limit) {
                computed = computed.set('items', items.pop())
            }
        }

        const statistic = computed.get('statistic')
        const currentTotal = statistic.get('total') + 1

        return computed
            .setIn(['statistic', 'total'], currentTotal)
            .setIn(['meta', 'total'], currentTotal)
    },
    [DELETE_TRADEMARK_SUCCESS](state, action) {
        const { result, id } = action
        const { success } = result

        if (!success) {
            return state
        }

        const statistic = state.get('statistic')
        const currentTotal = statistic.get('total') - 1
        const items = state.get('items').filter((item) => item.get('_id') !== id)

        return state
            .set('items', items)
            .setIn(['statistic', 'total'], currentTotal)
            .setIn(['meta', 'total'], currentTotal)
    },
    [REFRESH_TRADEMARK_SUCCESS](state, action) {
        const { result, id } = action
        const { success, data } = result

        if (!success) {
            return state
        }

        const items = state.get('items').map((item) => {
            if (item.get('_id') === id) {
                return fromJS({ ...data, needRefresh: true })
            }

            return item
        })

        return state.set('items', items)
    },
    [CHANGE_CURRENT_PAGE](state, action) {
        const { page } = action

        return state.setIn(['meta', 'page'], page)
    },
    [CHANGE_SORT_BY](state, action) {
        const { by } = action

        return state.setIn(['sort', 'by'], by)
    },
    [FETCH_STATISTIC_SUCCESS](state, action) {
        const { result } = action
        const { success, data } = result

        if (!success) {
            return state
        }

        return state.set('statistic', fromJS(data))
    },
    [FETCH_TOTAL_WARNINGS_SUCCESS](state, action) {
        const { result } = action
        const { success, data } = result

        if (!success) {
            return state
        }

        return state.set('totalWarnings', data)
    },
    [FETCH_TRADEMARK_DETAIL_SUCCESS](state, action) {
        const { result, id } = action
        const { data, success } = result

        if (!success) {
            return state
        }

        const items = state.get('items').map((item) => {
            if (item.get('_id') !== id) {
                return item
            }

            return fromJS(data)
        })

        return state.set('items', items)
    },
    [SHOW_TRADEMARK_RESULTS](state, action) {
        const { id } = action

        const items = state.get('items')
        const item = items.find((item) => item.get('_id') === id)
        if (!item) {
            return state
        }

        const results = item.get('results')
        if (!results.size) {
            return state
        }

        return state.setIn(['preview', 'item'], id).setIn(['preview', 'isOpen'], true)
    },
    [HIDE_TRADEMARK_RESULTS](state, action) {
        return state.setIn(['preview', 'isOpen'], false)
    },
    [OPEN_TRADEMARK_RESULTS](state, action) {
        return state.setIn(['preview', 'isOpen'], true)
    },
    [MARK_READ_TRADEMARK_SUCCESS](state, action) {
        const { id, result } = action
        const { data, success } = result

        if (!success) {
            return state
        }

        const items = state.get('items').map((item) => {
            if (item.get('_id') !== id) {
                return item
            }

            return fromJS(data)
        })

        return state.set('items', items).set('totalWarnings', state.get('totalWarnings') - 1)
    },
})

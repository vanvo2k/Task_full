import {showNotify} from "../app/notify-modal/actions";
import {showLoading, hideLoading} from 'react-redux-loading-bar';

export default function clientMiddleware() {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {type, enableLoadingBar} = action;
            if (type && type.length && enableLoadingBar) {
                if (type.indexOf('REQUEST') !== -1) {
                    dispatch(showLoading());
                }

                if (type.indexOf('SUCCESS') !== -1 || type.indexOf('FAILURE') !== -1) {
                    dispatch(hideLoading());
                }
            }

            const {promise, types, ...rest} = action;

            if (!Array.isArray(types)) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});

            if (enableLoadingBar) {
                dispatch(showLoading());
            }

            return promise.then((result) => {
                    const {notify, message, success, ...res} = result;

                    if (notify === true) {
                        const _message = message || '';
                        const {upgradePlan, contact, contactLink, refresh} = result;
                        showNotify({content: _message, upgradePlan, contact, contactLink, refresh})(dispatch);

                        if (enableLoadingBar) {
                            dispatch(hideLoading());
                        }

                        return Promise.resolve(result);
                    }

                    if (success === false) {
                        return Promise.reject({...res, message, success});
                    }

                    next({...rest, result, type: SUCCESS});

                    if (enableLoadingBar) {
                        dispatch(hideLoading());
                    }

                    return Promise.resolve(result);
                }
            ).catch((error) => {
                next({...rest, error, type: FAILURE});

                if (enableLoadingBar) {
                    dispatch(hideLoading());
                }

                return Promise.reject(error);
            });
        };
    };
}

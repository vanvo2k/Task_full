import {createSelector} from "reselect";
import {Map, List} from "immutable";
import {getState} from "../reducers/user";
export const getUserData = createSelector(getState, user => user);
export const getProfileData = createSelector(getUserData, user => user.get('profile') || Map());

export const getUserScopes = createSelector(getUserData, user => {
    if (!user || !user.size || !user.has('scopes')) {
        return List();
    };
    // const dataScopes=user.get('scopes')._tail.array[1];
    // if(dataScopes=="trademark"){
    //     const data=JSON.parse(localStorage.getItem("com.marketify.tamz.profile"));
    //     console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     console.log(data);
    //    localStorage.setItem("key_lock_feature",dataScopes);
    // };
    return user.get('scopes');
});
export const isAdmin2 = createSelector(getUserScopes, scopes => console.log(scopes.indexOf('admin')));

export const isAdmin = createSelector(getUserScopes, scopes => scopes.indexOf('admin') !== -1);

export const isSuperAdmin = createSelector(getUserScopes, scopes => scopes.indexOf('super-admin') !== -1);

export const getUserSettings = createSelector(getUserData, user => user.get('settings') || Map());

export const getUserRoles = createSelector(getUserData, user => user.get('roles') || List());

export const currentUserHasRole = (role) => createSelector(getUserRoles, roles => roles.indexOf(role) !== -1);
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// console.log("ok------");
import APIService from './APIServices';
import {GET, PATCH } from '../constants/HTTPConstants';

export const _getAnnouncement = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/announcements'
    })
}

export const _markReadAnnouncement = (announcementId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/announcements/${announcementId}/read`
    })
}

export const  _countAnnouncement = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/announcements/count-unread`
    })
}
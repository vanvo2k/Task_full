import getCookie from "../helpers/cookie/getCookie"
import setCookie from "../helpers/cookie/setCookie"

export const getTapId = () => {
    const vid = window.tap ? window.tap['vid'] : ''

    return vid || getCookie('_tap_vid') || ''
}

const _emit = tapId => {
    const event = new CustomEvent('tap_vid_changed', {detail: tapId})
    setTimeout(() => {
        window.dispatchEvent(event)
    }, 0)
}

export const setTapId = (vid) => {
    setCookie('_tap_vid', vid, 45)

    _emit(vid)
}


export const checkStartupTapId = () => {
    const tapId = getTapId()
    tapId && _emit(tapId)
}

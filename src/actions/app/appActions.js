import { SET_PROGRESS } from "./types"

export const setProgress = (val) => dispatch => {
    dispatch({
        type:SET_PROGRESS,
        payload:val
    })
}

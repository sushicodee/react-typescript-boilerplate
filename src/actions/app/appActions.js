import { SET_PROGRESS, TOGGLE_THEME } from "./types"

export const setProgress = (val) => dispatch => {
    dispatch({
        type:SET_PROGRESS,
        payload:val
    })
}
export const toggleTheme = () => dispatch => {
    dispatch({
        type:TOGGLE_THEME
    })
}

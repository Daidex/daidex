import { createAction } from 'src/utils'

export const TOGGLE_LOADING = '@app/TOGGLE_LOADING'
export const CHANGE_VIEW = '@app/CHANGE_VIEW'

const toggleLoadingAction = createAction(TOGGLE_LOADING)
const changeViewAction = createAction(CHANGE_VIEW)

export const toggleLoading = isLoading => toggleLoadingAction({ isLoading })
export const changeView = nextView => changeViewAction({ nextView })

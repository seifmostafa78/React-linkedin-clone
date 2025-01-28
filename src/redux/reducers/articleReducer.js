import * as actions from "../actions/actionTypes"

const initialState = {
    loading: false,
    articles: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.status,
            }
        case actions.GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        default:
            return state
    }
}

export default reducer;
import { SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

const initialState = {
    jobDescriptionModalState: false,
}

export default function AppReducer(state = initialState, action) {

    switch(action.type){
        case SHOW_JOB_DESCRIPTION:
            return {
                ...state,
                jobDescriptionModalState: action.payload
            }

        default:
            return state
    }
}
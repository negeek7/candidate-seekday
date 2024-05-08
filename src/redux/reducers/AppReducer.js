import { FETCH_JOB_DATA, SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

const initialState = {
    jobDescriptionModalState: false,
    jobDescriptionToShow: {},
    jobData: [],
    filterData: [
        {
            name: "Roles",
            type: "multi-dropdown",
            options: ["frontend", "backend", "fullstack", "Ios", "react-native", "android", "tech lead"],
            applied: false
        },
        {
            name: "Minimum Base Pay",
            type: "single-dropdown",
            options: ["10", "20", "30", "40", "50", "60"],
            applied: false
        },
    ],
    filteredjobData: []
    
}

export default function AppReducer(state = initialState, action) {

    switch(action.type){

        case FETCH_JOB_DATA:
            return {
                ...state,
                jobData: [...state.jobData, ...action.payload]
            }
        case SHOW_JOB_DESCRIPTION:
            return {
                ...state,
                jobDescriptionModalState: action.payload.value,
                jobDescriptionToShow: action.payload.jobToShow
            }


        
        default:
            return state
    }
}
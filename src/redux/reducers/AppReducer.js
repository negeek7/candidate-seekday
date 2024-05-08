import { FETCH_JOB_DATA, FILTER_JOB_DATA, SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

const initialState = {
    jobDescriptionModalState: false,
    jobDescriptionToShow: {},
    jobData: [],
    filterData: [
        {
            name: "Roles",
            type: "dropdown",
            options: ["frontend", "backend", "fullstack", "Ios", "react-native", "android", "tech lead"],
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


        case FILTER_JOB_DATA:
            let currentJobData = state.jobData;
            const filteredJobData = currentJobData.filter(job => job.jobRole.toLowerCase() === action.filterData.filterValue.toLowerCase())
            console.log(filteredJobData, "filteredJobData")
            return {
                ...state,
                filteredJobData: filteredJobData
            }
        default:
            return state
    }
}
import { handleMinBasePayFilter, handleRoleFilter, handleRoleRemoveFilter } from "../../util/util";
import { FETCH_JOB_DATA, FETCH_JOB_DATA_END, FILTERS_APPLIED_STATE, FILTER_MIN_BASE_PAY_JOB_DATA, FILTER_ROLE_JOB_DATA, REMOVE_ROLE_FILTER, SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

const initialState = {
    jobDescriptionModalState: false,
    jobDescriptionToShow: {},
    jobData: [],
    filterData: [
        {
            name: "Roles",
            type: "multi-dropdown-roles",
            options: ["frontend", "backend", "fullstack", "Ios", "react-native", "android", "tech lead"]
        },
        {
            name: "Minimum Base Pay",
            type: "single-dropdown",
            options: ["10", "20", "30", "40", "50", "60"],
        },
        {
            name: "Minimum Experience",
            type: "single-dropdown",
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        },
        {
            name: "Remote / On site",
            type: "single-dropdown",
            options: ["remote", "on site", "hybrid"],
        },
        {
            name: "Location",
            type: "text",
        },
        {
            name: "Company Name",
            type: "text",
        },
    ],
    filteredjobData: [],
    filtersApplied: false,
    endOfData: false
}

export default function AppReducer(state = initialState, action) {

    let data;
    switch(action.type){

        case FETCH_JOB_DATA:
            return {
                ...state,
                jobData: [...state.jobData, ...action.payload]
            }
        case FETCH_JOB_DATA_END:
            return {
                ...state,
                endOfData: true
            }
        case SHOW_JOB_DESCRIPTION:
            return {
                ...state,
                jobDescriptionModalState: action.payload.value,
                jobDescriptionToShow: action.payload.jobToShow
            }

        case FILTERS_APPLIED_STATE:
            return {
                ...state,
                filtersApplied: action.payload
            }   
        case FILTER_ROLE_JOB_DATA:
            // data = state.jobData
            // let arg1 = !state.filteredjobData.length ? state.filteredjobData : data
            // const filteredRoleData = handleRoleFilter(arg1, action.filterData)
            // console.log(filteredRoleData, "filteredRoleData")
            return {
                filteredjobData: []
            }

        case REMOVE_ROLE_FILTER:
            const foilterRoleRemovalData = handleRoleRemoveFilter(state.filteredjobData, action.filterData.filterValue)
            return {
                filteredjobData: foilterRoleRemovalData
            }


        case FILTER_MIN_BASE_PAY_JOB_DATA:
            data = state.filteredjobData && state.filteredjobData.length > 0 ? state.filteredjobData : state.jobData 
            let filterMinBasePayFilter = handleMinBasePayFilter(data, action.filterData)
            return {
                ...state,
                filteredjobData: [...state.filteredjobData, ...filterMinBasePayFilter],
                filterMinBasePayData: action.filterData
            }
        
        default:
            return state
    }
}
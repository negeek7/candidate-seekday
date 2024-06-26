import { getSampleJdJSON } from "../../jobData.js"

export const SHOW_JOB_DESCRIPTION = "SHOW_JOB_DESCRIPTION"
export const FETCH_JOB_DATA = "FETCH_JOB_DATA"
export const FETCH_JOB_DATA_END = "FETCH_JOB_DATA_END"
export const FETCH_JOB_DATA_ERROR = "FETCH_JOB_DATA_ERROR"
export const FILTER_ROLE_JOB_DATA = "FILTER_ROLE_JOB_DATA"
export const REMOVE_ROLE_FILTER = "REMOVE_ROLE_FILTER"
export const FILTER_MIN_BASE_PAY_JOB_DATA = "FILTER_MIN_BASE_PAY_JOB_DATA"
export const FILTER_MIN_EXP_JOB_DATA = "FILTER_MIN_EXP_JOB_DATA"
export const FILTER_REMOTE_ONSITE_DATA = "FILTER_REMOTE_ONSITE_DATA"
export const FILTER_LOCATION_DATA = "FILTER_LOCATION_DATA"
export const FILTER_COMPANY_NAME_DATA = "FILTER_COMPANY_NAME_DATA"
export const FILTERS_APPLIED = "FILTERS_APPLIED"
export const REMOVE_APPLIED_FILTERS = "REMOVE_APPLIED_FILTERS"
export const APPLY_FILTER = "APPLY_FILTER"
export const REMOVE_REDUX_FILTERED_DATA = "REMOVE_REDUX_FILTERED_DATA"


// export function fetchJobData(bodyData = {}){
//     return (dispatch) => {

// The API stopped working :((( ~~~~~

//         jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON', bodyData)
//         .then(data => {
//             dispatch({
//                 type: FETCH_JOB_DATA,
//                 payload: data.jdList
//             })
//         })
//         .catch(error => {
//             dispatch({
//                 type: FETCH_JOB_DATA_ERROR,
//                 payload: error
//             })
//         })
//     }
// }

export function fetchJobData(from, to) {
    let data = [...getSampleJdJSON()]
    let displayData = data.slice(from, to)
    return (dispatch, getState) => {

        const app = getState()
        if (displayData < data.length) {
            dispatch({
                type: FETCH_JOB_DATA_END,
                payload: true
            })
        } else {
            dispatch({
                type: FETCH_JOB_DATA,
                payload: displayData
            })
        }
    }
}


export function handleJobDescriptionModal(val, job) {
    return {
        type: SHOW_JOB_DESCRIPTION,
        payload: {
            value: val,
            jobToShow: job
        }
    }
}

export function handleRoleFilterSelection(filterObj) {
    return {
        type: FILTER_ROLE_JOB_DATA,
        filterData: filterObj
    }
}

export function handleRemoveRoleFilter(filterObj) {
    return {
        type: REMOVE_ROLE_FILTER,
        filterData: filterObj
    }
}

export function filtersAppliedAction(data){
    return {
        type: FILTERS_APPLIED,
        data
    }
}


export function removeAppliedFilters(value, bool){
    return {
        type: REMOVE_APPLIED_FILTERS,
        value,
        bool
    }
}

export function applyFilters(appliedFilters){
    return {
        type: APPLY_FILTER,
        data: appliedFilters
    }
}

export function removeReduxFilteredData(){
    return {
        type: REMOVE_REDUX_FILTERED_DATA,
        payload: true
    }
}
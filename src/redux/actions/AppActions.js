import { jobApiCaller } from "../../apiCaller/jobApiCaller"

export const SHOW_JOB_DESCRIPTION = "SHOW_JOB_DESCRIPTION"
export const FETCH_JOB_DATA = "FETCH_JOB_DATA"
export const FETCH_JOB_DATA_ERROR = "FETCH_JOB_DATA_ERROR"
export const FILTER_ROLE_JOB_DATA = "FILTER_ROLE_JOB_DATA"
export const FILTER_MIN_BASE_PAY_JOB_DATA = "FILTER_MIN_BASE_PAY_JOB_DATA"
export const FILTERS_APPLIED_STATE = "FILTERS_APPLIED_STATE"


export function fetchJobData(bodyData = {}){
    return (dispatch) => {
        jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON', bodyData)
        .then(data => {
            dispatch({
                type: FETCH_JOB_DATA,
                payload: data.jdList
            })
        })
        .catch(error => {
            dispatch({
                type: FETCH_JOB_DATA_ERROR,
                payload: error
            })
        })
    }
}


export function handleJobDescriptionModal(val, job){
    return {
        type: SHOW_JOB_DESCRIPTION,
        payload: {
            value: val,
            jobToShow: job
        }
    }
}

export function filtersAppliedState(val){
    return {
        type: FILTERS_APPLIED_STATE,
        payload: val
    }
}

export function handleRoleFilterSelection(filterObj){
    return (dispatch) => {
        dispatch(filtersAppliedState(true))
        dispatch({
            type: FILTER_ROLE_JOB_DATA,
            filterData: filterObj
        })
    }
}

export function handleMinBasePayFilterSelection(filterObj){
    return (dispatch) => {
        dispatch(filtersAppliedState(true))
        dispatch({
            type: FILTER_MIN_BASE_PAY_JOB_DATA,
            filterData: filterObj
        })
    }
}

export const SHOW_JOB_DESCRIPTION = "SHOW_JOB_DESCRIPTION"


export function handleJobDescriptionModal(val){
    return {
        type: SHOW_JOB_DESCRIPTION,
        payload: val
    }
} 
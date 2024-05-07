export const SHOW_JOB_DESCRIPTION = "SHOW_JOB_DESCRIPTION"


export function handleJobDescriptionModal(val, job){
    console.log(val, job)
    return {
        type: SHOW_JOB_DESCRIPTION,
        payload: {
            value: val,
            jobToShow: job
        }
    }
} 
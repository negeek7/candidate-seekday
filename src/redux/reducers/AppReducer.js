import { companyNameFilter, locationFilter, minBasePayFilter, minExperienceFilter, remoteOnSiteFilter } from "../../../constants/filterConstants";
import { handleCompanyNameFilter, handleLocationFilter, handleMinBasePayFilter, handleMinExpFilter, handleRemoteOnsiteFilter, handleRoleFilter, handleRoleRemoveFilter } from "../../util/util";
import { APPLY_FILTER, FETCH_JOB_DATA, FETCH_JOB_DATA_END, FILTERS_APPLIED, FILTER_COMPANY_NAME_DATA, FILTER_LOCATION_DATA, FILTER_MIN_BASE_PAY_JOB_DATA, FILTER_MIN_EXP_JOB_DATA, FILTER_REMOTE_ONSITE_DATA, FILTER_ROLE_JOB_DATA, REMOVE_APPLIED_FILTERS, REMOVE_ROLE_FILTER, SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

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
            uid: minBasePayFilter,
            options: ["10", "20", "30", "40", "50", "60"],
        },
        {
            name: "Minimum Experience",
            uid: minExperienceFilter,
            type: "single-dropdown",
            options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        },
        {
            name: "Remote / On site",
            type: "single-dropdown",
            uid: remoteOnSiteFilter,
            options: ["remote", "on site"],
        },
        {
            name: "Location",
            type: "text",
            uid: locationFilter
        },
        {
            name: "Company Name",
            type: "text",
            uid: companyNameFilter
        },
    ],
    filteredjobData: [],
    filteredRoleData: [],
    filteredRemoteOnsiteData: [],
    filteredMinExpData: [],
    filteredMinBasePayData: [],
    filteredLocationData: [],
    filteredCompanyNameData: [],
    filtersApplied: {},
    endOfData: false,
    reduxFilteredJobData: [],
    removedFilter: false
}

export default function AppReducer(state = initialState, action) {

    let data;
    switch (action.type) {

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
        case FILTER_ROLE_JOB_DATA:
            // data = state.jobData
            // let arg1 = !state.filteredjobData.length ? state.filteredjobData : data
            // const filteredRoleData = handleRoleFilter(arg1, action.filterData)
            return {
                filteredjobData: []
            }

        case REMOVE_ROLE_FILTER:
            const foilterRoleRemovalData = handleRoleRemoveFilter(state.filteredjobData, action.filterData.filterValue)
            return {
                filteredjobData: foilterRoleRemovalData
            }


        // case FILTER_MIN_BASE_PAY_JOB_DATA:
        //     data = state.jobData
        //     let filteredMinBasePay = handleMinBasePayFilter(data, action.filterData)
        //     return {
        //         ...state,
        //         filteredMinBasePayData: [...filteredMinBasePay],
        //         filteredjobData: [...state.filteredjobData, ...state.filteredMinBasePayData],
        //     }

        // case FILTER_MIN_EXP_JOB_DATA:
        //     data = state.jobData
        //     let filteredMinExp = handleMinExpFilter(data, action.filterData)
        //     return {
        //         ...state,
        //         filteredMinExpData: [...filteredMinExp],
        //         filteredjobData: [...state.filteredjobData, ...state.filteredMinBasePayData],
        //     }

        // case FILTER_REMOTE_ONSITE_DATA:
        //     data = state.jobData
        //     let filteredRemoteOnsite = handleRemoteOnsiteFilter(data, action.filterData)
        //     return {
        //         ...state,
        //         filteredRemoteOnsiteData: [...filteredRemoteOnsite],
        //         filteredjobData: [...state.filteredjobData, ...state.filteredMinBasePayData],
        //     }

        case FILTER_LOCATION_DATA:
            data = state.jobData
            let filteredLocation = handleLocationFilter(data, action.filterData)
            return {
                ...state,
                filteredLocationData: [...filteredLocation]
            }

        case FILTER_COMPANY_NAME_DATA:
            data = state.jobData
            let filteredCompanyName = handleCompanyNameFilter(data, action.filterData)
            return {
                ...state,
                filteredCompanyNameData: [...filteredCompanyName]
            }

        case FILTERS_APPLIED:
            let filtersObj = { ...state.filtersApplied }
            filtersObj[action.data.name] = action.data.value
            return {
                ...state,
                filtersApplied: filtersObj
            }

        case REMOVE_APPLIED_FILTERS:
            let obj = { ...state.filtersApplied }
            delete obj[action.value]
            return {
                ...state,
                filtersApplied: obj,
                removedFilter: action.bool
            }

        case APPLY_FILTER:
            if (!Object.keys(action.data).length) {
                return {
                    ...state,
                    reduxFilteredJobData: []
                };
            }

            let filteredData = state.removedFilter ? state.jobData : state.reduxFilteredJobData.length ? state.reduxFilteredJobData : state.jobData;

            console.log(action.data, "action.data")
            console.log(filteredData, "FILTERED DATA BEFORE")


            for (const filterKey in action.data) {
                console.log(filterKey, "filterKey")
                switch (filterKey) {
                    case minBasePayFilter:
                        filteredData = handleMinBasePayFilter(filteredData, action.data[filterKey]);
                        break;
                    case minExperienceFilter:
                        filteredData = handleMinExpFilter(filteredData, action.data[filterKey]);
                        break;
                    case remoteOnSiteFilter:
                        filteredData = handleRemoteOnsiteFilter(filteredData, action.data[filterKey]);
                        break;
                    case locationFilter:
                        filteredData = handleLocationFilter(filteredData, action.data[filterKey]);
                        break;
                    case companyNameFilter:
                        filteredData = handleCompanyNameFilter(filteredData, action.data[filterKey]);
                        break;

                    default:
                        break;
                }
            }

            console.log(state.removedFilter, filteredData, "FILTERED DATA AFTER")

            return {
                ...state,
                reduxFilteredJobData: Array.from(new Set(filteredData))
            };



        default:
            return state
    }
}
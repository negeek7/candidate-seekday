import { companyNameFilter, locationFilter, minBasePayFilter, minExperienceFilter, remoteOnSiteFilter, rolesFilter } from "../../../constants/filterConstants";
import { handleCompanyNameFilter, handleLocationFilter, handleMinBasePayFilter, handleMinExpFilter, handleRemoteOnsiteFilter, handleRoleFilter } from "../../util/util";
import { APPLY_FILTER, FETCH_JOB_DATA, FETCH_JOB_DATA_END, FILTERS_APPLIED, REMOVE_APPLIED_FILTERS, REMOVE_REDUX_FILTERED_DATA, SHOW_JOB_DESCRIPTION } from "../actions/AppActions"

const initialState = {
    jobDescriptionModalState: false,
    jobDescriptionToShow: {},
    jobData: [],
    filterData: [
        {
            name: "Roles",
            type: "multi-dropdown-roles",
            options: ["frontend", "backend", "fullstack", "Ios", "react-native", "android", "tech lead"],
            uid: "roles-filter"
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

            for (const filterKey in action.data) {
                switch (filterKey) {

                    case rolesFilter:
                        filteredData = handleRoleFilter(filteredData, action.data[filterKey])
                        break;
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

            return {
                ...state,
                reduxFilteredJobData: Array.from(new Set(filteredData))
            };

            case REMOVE_REDUX_FILTERED_DATA:
                return {
                    ...state,
                    reduxFilteredJobData: []
                }


        default:
            return state
    }
}
export function processFilterData(jobData, filterObj, appliedFilters){
    let data = jobData;
    let filteredData
    if(filterObj['Roles'] && filterObj['Roles'].length){
        filteredData =  [...handleRoleFilter(data, filterObj['Roles'])]
    }
    if(filterObj['Minimum Base Pay']){
        filteredData = [...handleMinBasePayFilter(data, filterObj['Minimum Base Pay'])]
    }
    return filteredData
}

function handleRoleFilter(data, filterValues){
    return data.filter(item => filterValues.includes(item.jobRole) )
}

function handleMinBasePayFilter(data, filterValue){
    let minBasePayData = data.filter(item => {
        if((filterValue >= item.minJdSalary) && (filterValue < item.maxJdSalary)){
            return item
        }
    })
    return minBasePayData
}

function handleLocationFilter(){

}

function handleCompnayNameFilter(){

}
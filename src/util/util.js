export function handleRoleFilter(data, filterObj){
    let values = filterObj.filterValues
    if(!values.length) return []
    let filteredData = data.filter(item => values.includes(item.jobRole) )
    console.log(filteredData, "ROLE filteredData")
    return filteredData
}

export function handleRoleRemoveFilter(data, filterValue){
    let filteredData = data.filter(item => item.role !== filterValue )
    return filteredData
}

export function handleMinBasePayFilter(data, filterObj){
    let filterValue = filterObj.filterValue 
    let minBasePayData = data.filter(item => {
        if(item.minJdSalary !== null && filterValue >= item.minJdSalary && filterValue < item.maxJdSalary){
            return item
        }
    })
    return minBasePayData
}

export function handleMinExpFilter(data, filterObj){
    let filterValue = filterObj.filterValue 
    let minExpJobData = data.filter(item => {
        if(filterValue <= item.minExp){
            return item
        }
    })
    return minExpJobData
}

export function handleRemoteOnsiteFilter(data, filterObj){
    let filterValue = filterObj.filterValue 
    let remoteOnsiteData = data.filter(item => {
        if(filterValue == "remote" && item.location == "remote"){
            return item
        } else if (filterValue == "on site" && item.location !== "remote") {
            return item
        }
    })
    console.log(remoteOnsiteData, "remoteOnsiteData")
    return remoteOnsiteData
}

export function handleLocationFilter(data, filterObj){
    let filterValue = filterObj.filterValue 
    if(filterValue == '') return data
    let locationData = data.filter(item => {
        return item.location.includes(filterValue)
    })
    
    return locationData
}

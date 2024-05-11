export function handleRoleFilter(data, filterObj) {
    let values = [...filterObj]
    if (!values.length) return []
    console.log(values, "VLAUES")
    let filteredData = data.filter(item => values.includes(item.jobRole))
    console.log(filteredData, "filteredData")
    return filteredData
}

export function handleRoleRemoveFilter(filterValue) {
    let filteredData = data.filter(item => item.role !== filterValue)
    return filteredData
}

export function handleMinBasePayFilter(data, value) {
    console.log("min exp data handler")
    let filterValue = parseInt(value)
    let minBasePayData = data.filter(item => {
        if (item.minJdSalary !== null && filterValue >= item.minJdSalary && filterValue < item.maxJdSalary) {
            return item
        }
    })
    console.log(minBasePayData, "minBasePayData")
    return minBasePayData
}

export function handleMinExpFilter(data, value) {
    let filterValue = parseInt(value)
    let minExpJobData = data.filter(item => {
        if (item.minExp !== null && filterValue >= item.minExp) {
            return item
        }
    })
    return minExpJobData
}

export function handleRemoteOnsiteFilter(data, value) {
    let filterValue = value
    let remoteOnsiteData = data.filter(item => {
        if (filterValue == "remote" && item.location == "remote") {
            return item
        } else if (filterValue == "on site" && item.location !== "remote") {
            return item
        }
    })
    return remoteOnsiteData
}

export function handleLocationFilter(data, value) {
    let filterValue = value
    let locationData = data.filter(item => {
        return item.location.includes(filterValue)
    })

    return locationData
}

export function handleCompanyNameFilter(data, value) {
    let filterValue = value
    let companyNameData = data.filter(item => {
        return item.companyName.toLowerCase().includes(filterValue.toLowerCase())
    })

    return companyNameData
}

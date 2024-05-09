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
        if(item.minJdSalary !== null && (filterValue > item.minJdSalary && filterValue < item.maxJdSalary)){
            return item
        }
    })
    return minBasePayData
}

function handleLocationFilter(){

}

function handleCompnayNameFilter(){

}

export function handleRoleFilter(data, filterObj){
    let values = filterObj.filterValues
    return data.filter(item => values.includes(item.jobRole) )
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
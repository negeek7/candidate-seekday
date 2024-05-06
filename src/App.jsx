import { useEffect } from 'react'
import './App.css'
import { jobApiCaller } from './apiCaller/jobApiCaller'
import JobCard from './components/JobCard'

function App() {

  useEffect(() => {
    jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON')
    .then(data => console.log(data, "JOB DATA"))
    .catch(error => console.log(error, "JOB API ERROR"))
  })

  return (
    <>
      <h1>Candidate Application Portal</h1>
      <JobCard />
    </>
  )
}

export default App


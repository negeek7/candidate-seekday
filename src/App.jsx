import { useEffect, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css'
import { jobApiCaller } from './apiCaller/jobApiCaller'
import JobCard from './components/JobCard'

function App() {

  const [jobData, setJobData] = useState([])

  useEffect(() => {
    jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON')
    .then(data => setJobData(data.jdList))
    .catch(error => console.log(error, "JOB API ERROR"))
  }, [])

  console.log(jobData, "JOB DATAA")

  return (
    <>
      <h1>Candidate Application Portal</h1>
      <div className={styles.jobCardContainer}>
        {
          jobData?.map(job => (
            <JobCard />
          ))
        }
      </div>
    </>
  )
}

export default App


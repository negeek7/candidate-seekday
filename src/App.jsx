import { useEffect, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css'
import { jobApiCaller } from './apiCaller/jobApiCaller'
import JobCard from './components/JobCard'
import JobDescriptionModal from './components/Modals/JobDescriptionModal'

function App() {

  const [jobData, setJobData] = useState([])
  const [showViewJobModal, setShowViewJobModal] = useState(false)

  useEffect(() => {
    jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON')
    .then(data => setJobData(data.jdList))
    .catch(error => console.log(error, "JOB API ERROR"))
  }, [])

  console.log(jobData, "JOB DATAA")
  console.log(showViewJobModal, "JOB DATAA showViewJobModal")

  const handleViewJob = () => {
    setShowViewJobModal(!showViewJobModal)
  }

  return (
    <>
      <h1>Candidate Application Portal</h1>
      <div className={styles.jobCardContainer}>
        {
          jobData?.map(job => (
            <JobCard handleViewJob={handleViewJob}/>
          ))
        }
      </div>
      {
        showViewJobModal && <JobDescriptionModal />
      }
    </>
  )
}

export default App


import { useEffect, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { jobApiCaller } from './apiCaller/jobApiCaller'
import JobCard from './components/JobCard'
import JobDescriptionModal from './components/Modals/JobDescriptionModal'
import { handleJobDescriptionModal } from './redux/actions/AppActions';

function App() {

  const dispatch = useDispatch()
  const [jobData, setJobData] = useState([])

  const jobDescriptionModalState = useSelector(state => state.app.jobDescriptionModalState)

  useEffect(() => {
    jobApiCaller('https://api.weekday.technology/adhoc/getSampleJdJSON')
    .then(data => setJobData(data.jdList))
    .catch(error => console.log(error, "JOB API ERROR"))
  }, [])

  console.log(jobData, "JOB DATAA")

  const handleViewJob = () => {
    dispatch(handleJobDescriptionModal(!jobDescriptionModalState))
  }

  console.log(jobDescriptionModalState, "jobDescriptionModalState")

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
        jobDescriptionModalState && <JobDescriptionModal onClose={handleViewJob}/>
      }
    </>
  )
}

export default App


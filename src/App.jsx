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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("Reached bottom")
    }
  };

  const handleViewJob = (val, job) => {
    console.log(job, "ASDADSASD")
    dispatch(handleJobDescriptionModal(val, job))
  }


  function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

  return (
    <>
      <h1>Candidate Application Portal</h1>
      <div className={styles.jobCardContainer}>
        {
          jobData?.map((job, index) => (
            <JobCard 
              key={index}
              handleViewJob={handleViewJob}
              job={job}
            />
          ))
        }
      </div>
      {
        jobDescriptionModalState && <JobDescriptionModal onClose={() => handleViewJob(false)}/>
      }
    </>
  )
}

export default App


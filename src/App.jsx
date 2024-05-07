import { useEffect, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from './components/JobCard'
import JobDescriptionModal from './components/Modals/JobDescriptionModal'
import { fetchJobData, handleJobDescriptionModal } from './redux/actions/AppActions';

function App() {

  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(0)


  const jobData = useSelector(state => state.app.jobData)
  const jobDescriptionModalState = useSelector(state => state.app.jobDescriptionModalState)

  useEffect(() => {
    dispatch(fetchJobData({
      limit: 10,
      offset: pageNum
    }))

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);


  }, [pageNum])

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

console.log(jobData, "jobData")

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


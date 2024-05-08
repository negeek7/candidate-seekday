import { useEffect, useRef, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from './components/JobCard'
import JobDescriptionModal from './components/Modals/JobDescriptionModal'
import { fetchJobData, handleJobDescriptionModal } from './redux/actions/AppActions';
import Filters from './components/Filters/Filters';

function App() {

  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(0)

  // reference to hold the debounce timeoutId
  const debounceTimeout = useRef(null);


  const jobData = useSelector(state => state.app.jobData)
  const filteredJobData = useSelector(state => state.app.filteredjobData)
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
    if (debounceTimeout.current) {

      // clear timeout to prevent multiple calls on fast scrolling
      clearTimeout(debounceTimeout.current);
    }
    
    // settimeout ensurees that pageNum state changes or api gets called after a specific delay after last scroll, this will prevent mulitple scroll event
    debounceTimeout.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPageNum(prevPageNum => prevPageNum + 1);
      }
      debounceTimeout.current = null;
    }, 600);
  };

  const handleViewJob = (val, job) => {
    dispatch(handleJobDescriptionModal(val, job))
  }

  console.log(filteredJobData, "FILTERED JOB DATA")

  return (
    <div>
      <h1>Candidate Application Portal</h1>
        <Filters />
      <div className={styles.jobCardContainer}>
        {(filteredJobData && filteredJobData.length > 0 ? filteredJobData : jobData).map((job, index) => (
          <JobCard
            key={index}
            handleViewJob={handleViewJob}
            job={job}
          />
        ))}
      </div>
      {
        jobDescriptionModalState && <JobDescriptionModal onClose={() => handleViewJob(false)}/>
      }
    </div>
  )
}

export default App


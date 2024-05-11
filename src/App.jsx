import { useEffect, useRef, useState } from 'react'
import './App.css'
import styles from './styles/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from './components/JobCard'
import JobDescriptionModal from './components/Modals/JobDescriptionModal'
import { applyFilters, fetchJobData, handleJobDescriptionModal, removeAppliedFilters } from './redux/actions/AppActions';
import Filters from './components/Filters/Filters';
import { companyNameFilter, locationFilter } from '../constants/filterConstants';

function App() {

  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(10)
  const [filteredJobData, setFilteredJobData] = useState([])

  // reference to hold the debounce timeoutId
  const debounceTimeout = useRef(null);


  const jobData = useSelector(state => state.app.jobData)
  const endOfData = useSelector(state => state.app.endOfData)
  const jobDescriptionModalState = useSelector(state => state.app.jobDescriptionModalState)
  const filtersApplied = useSelector(state => state.app.filtersApplied)
  const reduxFilteredJobData = useSelector(state => state.app.reduxFilteredJobData)


  useEffect(() => {
    // dispatch(fetchJobData({
    //   limit: 10,
    //   offset: pageNum
    // }))
    dispatch(fetchJobData(jobData.length, pageNum))

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageNum])

  useEffect(() => {
    if (endOfData) {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [endOfData])

  useEffect(() => {
    dispatch(applyFilters(filtersApplied))
  }, [filtersApplied])

  useEffect(() => {
    setFilteredJobData(reduxFilteredJobData)
  }, [reduxFilteredJobData])

  console.log(reduxFilteredJobData, "REDUX JOB DATA")
  console.log(filtersApplied, "FILTERS APPLIED")


  const handleScroll = () => {
    if (endOfData) return;
    if (debounceTimeout.current) {

      // clear timeout to prevent multiple calls on fast scrolling
      clearTimeout(debounceTimeout.current);
    }

    // settimeout ensurees that pageNum state changes or api gets called after a specific delay after last scroll, this will prevent mulitple scroll event
    debounceTimeout.current = setTimeout(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setPageNum(prevPageNum => prevPageNum + 10);
      }
      debounceTimeout.current = null;
    }, 600);
  };

  const handleViewJob = (val, job) => {
    dispatch(handleJobDescriptionModal(val, job))
  }



  const renderJobData = () => {
    if (Object.keys(filtersApplied).length && !filteredJobData.length) {
      return (
        <div>
          No results found.
        </div>
      );
    } 
    if (!filteredJobData.length && jobData.length) {
    return (
        <>
          {jobData.map((job, index) => (
            <JobCard
              key={index}
              handleViewJob={handleViewJob}
              job={job}
            />
          ))}
        </>
      );
    } else if (filteredJobData.length) {
      return (
        <>
          {filteredJobData.map((job, index) => (
            <JobCard
              key={index}
              handleViewJob={handleViewJob}
              job={job}
            />
          ))}
        </>
      );
    }
  };

  return (
    <div>
      <h1>Candidate Application Portal</h1>
      <Filters filtersApplied={filtersApplied} />
      <div className={styles.jobCardContainer}>
        {renderJobData()}
      </div>
      {
        endOfData &&
        <div className={styles.endofdata}>
          No More Data To Show.
        </div>
      }
      {
        jobDescriptionModalState && <JobDescriptionModal onClose={() => handleViewJob(false)} />
      }
    </div>
  )
}

export default App


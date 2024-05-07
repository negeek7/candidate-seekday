import React from 'react';
import styles from '../styles/JobCard.module.css'

function JobCard({ handleViewJob, job }) {
  return (
    <div className={styles.container}>

      <div className={styles.compnayinfoContainer}>
        {job.logoUrl && <img src={job.logoUrl} className={styles.companyLogo} />}
        <div className={styles['company-info']}>
          {job.companyName && <span>{job.companyName}</span>}
          {job.jobRole && <span className={styles.jobRole}>{job.jobRole}</span>}
          {job.location && <span className={styles.location}>{job.location}</span>}
        </div>
      </div>

      <span>Estimated salary: {job.minJdSalary && job.minJdSalary} {(job.minJdSalary && job.maxJdSalary) && ' - '} {job.maxJdSalary && job.maxJdSalary} {job.salaryCurrencyCode ? job.salaryCurrencyCode : "USD"}</span>

      {
        job.jobDetailsFromCompany &&
        <div className={styles.aboutjobContainer}>
          <span>About Company:</span>
          <span>About us</span>
          <p className={styles.jobdescription}>{job.jobDetailsFromCompany}</p>
          <button className={styles.viewjobButton} onClick={() => handleViewJob(true, job)}>View Job</button>
        </div>
      }
      {
        job.minExp &&
        <>
          <p className={styles.minexptext}>Minimum Experience</p>
          <span>{job.minExp}</span>
        </>
      }


      <div className={styles.ctabuttons}>
        <button className={styles.easyapplybutton}>Easy Apply</button>
        <button className={styles.askforrefferal}>Ask for Referral</button>
      </div>


    </div>
  )
}

export default JobCard
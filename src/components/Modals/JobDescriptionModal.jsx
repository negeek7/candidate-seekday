import React, { useEffect } from 'react';
import styles from '../../styles/jobDescriptionModal.module.css'
import { X } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

function JobDescriptionModal({ onClose }) {

  const job = useSelector(state => state.app.jobDescriptionToShow)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.topRow}>
          <h3 className={styles.heading}>Job Description</h3>
          <X size={24} onClick={onClose} style={{cursor: "pointer"}}/>
        </div>

        <div className={styles.content}>
          {
            (job.companyName || job.logoUrl) &&
            <div className={styles.companyNameImage}>
              {job.logoUrl && <img src={job.logoUrl} className={styles.companyLogo} />}
              {job.companyName && <p className={styles.companyName}>{job.companyName}</p>}
            </div>
          }
          {
            job.location &&
            <p className={styles.location}>{job.location}</p>
          }
          {
            job.jobDetailsFromCompany &&
            <>
              <p>About Company:</p>
              <p>{job.jobDetailsFromCompany}</p>
            </>
          }
          {
            job.jobRole &&
            <p>Skills: <span className={styles.jobRoleTag}>{job.jobRole}</span></p>
          }
          {
            (job.minExp || job.maxExp) &&
            <>
              {job.minExp && <p>Min Experience: {job.minExp} years</p>}
              {job.maxExp && <p>Max Experience: {job.maxExp} years</p>}
            </>
          }
          {
            (job.minJdSalary || job.maxJdSalary) &&
            <>
              {job.minJdSalary && <p>Min Salary: {job.minJdSalary} {job.salaryCurrencyCode ? job.salaryCurrencyCode : "USD"}</p>}
              {job.maxJdSalary && <p>Max Salary: {job.maxJdSalary} {job.salaryCurrencyCode ? job.salaryCurrencyCode : "USD"}</p>}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default JobDescriptionModal
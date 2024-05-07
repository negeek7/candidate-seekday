import React, { useEffect } from 'react';
import styles from '../../styles/JobDescriptionModal.module.css'
import { X } from '@phosphor-icons/react';

function JobDescriptionModal({ onClose }) {

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
            <X size={24} onClick={onClose}/>
          </div>
        </div>
    </div>
  )
}

export default JobDescriptionModal
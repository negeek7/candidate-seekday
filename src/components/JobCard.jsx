import React from 'react';
import styles from '../styles/JobCard.module.css'

function JobCard({handleViewJob}) {
  return (
    <div className={styles.container}>
        <div className={styles.postdateContainer}>
            <span>Posted 10 days ago</span>
        </div> 

        <div className={styles.compnayinfoContainer}>
            <span>LOGO</span>
            <div className={styles['company-info']}>
                <span>Company Name</span>
                <span>Position</span>
                <span>Location</span>
            </div>
        </div>

        <span>Estimated salary: 20 - 25 LPA</span>

          <div className={styles.aboutjobContainer}>
              <span>About Company:</span>
              <span>About us</span>
              <p className={styles.jobdescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, lectus nec pulvinar sollicitudin, lectus metus efficitur leo, at tristique mauris enim vel metus. Cras dictum lorem mi, ac elementum urna tincidunt sit amet. Sed nec felis vehicula, eleifend orci sed, aliquam neque. Vestibulum congue hendrerit leo vitae malesuada. Cras placerat tempor nibh id ultrices. Etiam sit amet justo eu diam ultrices rhoncus egestas ac dui. Curabitur quis magna sit amet justo imperdiet varius. Maecenas nec semper sapien, ut lacinia enim. Donec nec massa vitae lorem pretium dignissim vitae eget erat ADADAD AD ASD ASD ASD AD ASD ASD ASD A IABDIADAUDIUAG DOA DOUA DOIA HDOIA HDOUAG OUAD OAHDOA DOAH DO at tristique mauris enim vel metus. Cras dictum lorem mi, ac elementum urna tincidunt sit amet. Sed nec felis vehicula, eleifend orci sed, aliquam neque. Vestibulum congue hendrerit leo vitae malesuada. Cras placerat tempor nibh id ultrices. Etiam sit amet justo eu diam ultrices rhoncus egestas ac dui. Curabitur quis m.</p>
              <button className={styles.viewjobButton} onClick={() => handleViewJob(true)}>View Job</button>
          </div>


          <p className={styles.minexptext}>Minimum Experience</p>
          <span>2 years</span>

          <div className={styles.ctabuttons}>
                <button className={styles.easyapplybutton}>Easy Apply</button>
                <button className={styles.askforrefferal}>Ask for Referral</button>
          </div>


    </div>
  )
}

export default JobCard
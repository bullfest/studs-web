import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const RecruitmentFooter = ({ onClickUrl }) =>
  <div className={styles.recruitmentFooter}>
    <div className={styles.buttonContainer}>
      <p>Vad väntar du på? Sök Studs19 idag!</p>
      <a href={onClickUrl} target='_blank'>
        <button>Ansök nu</button>
      </a>
    </div>
    <div className={styles.applicationInfo}>
      <p>Ansökningsperiod 5 - 19 september</p>
      <p>Intervjuer hålls löpande</p>
    </div>
  </div>


RecruitmentFooter.propTypes = {
  onClickUrl: PropTypes.string.isRequired,
}

export default RecruitmentFooter

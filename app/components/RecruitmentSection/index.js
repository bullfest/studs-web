import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import StudsRecruitmentSectionModel
  from '../../models/StudsRecruitmentSectionModel'
import RecruitmentLeaderSection from '../RecruitmentLeaderSection'

const RecruitmentSection = ({ recruitmentSection }) =>
  <div className={styles.recruitmentSectionContainer}>
    <span className={styles.divider}/>
    {recruitmentSection.intro !== '' ? <p><span className={styles.boldIntro}>{recruitmentSection.shortTitle}</span>{recruitmentSection.intro}</p> : null}
    {recruitmentSection.studsLeaders.map(leader => <RecruitmentLeaderSection key={leader.name} recruitmentLeader={leader}/>)}
  </div>

RecruitmentSection.propTypes = {
  recruitmentSection: PropTypes.PropTypes.instanceOf(StudsRecruitmentSectionModel).isRequired,
}

export default RecruitmentSection

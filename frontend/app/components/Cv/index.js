/**
*
* Cv
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import CvHeader from '../CvHeader';

function renderItem(item, i) {
  return (
    <div key={i} className={styles.item}>
      <div className={styles.when}>{item.when}</div>
      <div className={styles.where}>{item.where}</div>
      <div className={styles.description}>{item.description}</div>
    </div>
  )
}

function renderSection(section) {
  const items = section.items.map((item, i) => renderItem(item, i));
  return (
    <div key={section.title} className={styles.section} >
      <h2>{section.title}</h2>
      {items}
    </div>
  )
}

function Cv(props) {
  let sections = null;
  if(props.cv) {
    sections = props.cv.sections.map(section => renderSection(section));
  }

  return (
    <div className={styles.cv}>
      <div>
      <CvHeader user={props.user} />
      {sections}
      </div>
    </div>
  );
}

Cv.propTypes = {
  user: PropTypes.object.isRequired,
  cv: PropTypes.object
};

export default Cv;

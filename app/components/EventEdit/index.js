import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { sortedUniq } from 'lodash'
import { uploadImage } from 'api'
import messages from './messages'
import styles from './styles.css'
import Textarea from 'react-textarea-autosize'
import Button from 'components/Button'
import EventEditPicture from 'components/EventEditPicture'

const MAX_PICTURE_COUNT = 3
class EventEdit extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange(e) {
    const {
      update,
      addPicture,
      event: { id },
    } = this.props
    const data ={}
    if (e.target.type == 'file') {
      uploadImage(e.target.files[0])
        .then(url => {
          addPicture(url, id)
        })
    } else {
      if (e.target.name === 'date') {
        data[e.target.name] = new Date(e.target.value)
      } else {
        data[e.target.name] = e.target.value
      }
      update(data, id)
    }
  }

  handleSave() {
    const { save, event } = this.props
    if (event.companyName) {
      save(event)
    } else {
      alert('You must select a company before saving.')
    }
  }

  render() {
    const { event, companyUsers, saving, saved, removePicture } = this.props
    const companyOption = companyName => (
      <option key={companyName} value={companyName || ''} >
        {companyName}
      </option>
    )

    const companies = companyUsers &&
      sortedUniq(companyUsers.map(u => u.companyName))

    return (
      <div className={styles.eventEdit}>
        <div className={styles.head}>
          <h2>Event: {event.companyName} -
            {event.date && event.date.toString()}</h2>
          { !saving && !saved &&
            <Button onClick={this.handleSave}
              type='submit'
              className='btn-bright'>
              Save
            </Button>
          }
        </div>
        <div className='input-label'>
          <FormattedMessage {...messages.company} />
        </div>
        <div className={styles.selectContainer}>
          <select
            name='companyName'
            placeholder='Company'
            value={event.companyName || ''}
            onChange={this.handleChange}>
            <option key='none'
              disabled>
              Select company
            </option>
            { companies &&
              companies.map(companyOption)
            }
          </select>
        </div>
        <div className='input-label'>
          <FormattedMessage {...messages.date} />
        </div>
        <input
          name='date'
          type='datetime-local'
          value={moment(event.date).format('YYYY-MM-DDTHH:mm')}
          onChange={this.handleChange} />
        <div className='input-label'>
          <FormattedMessage {...messages.location} />
        </div>
        <input
          name='location'
          placeholder='location'
          value={event.location || ''}
          onChange={this.handleChange} />
        <div className='input-label'>
          <FormattedMessage {...messages.publicDescription} />
        </div>
        <Textarea
          name='publicDescription'
          placeholder='Public Description'
          onChange={this.handleChange}
          value={event.publicDescription || ''} />
        <div className='input-label'>
          <FormattedMessage {...messages.privateDescription} />
        </div>
        <Textarea
          name='privateDescription'
          placeholder='Private text'
          onChange={this.handleChange}
          value={event.privateDescription || ''} />
        <div className='input-label'>
          <FormattedMessage {...messages.beforeSurvey} />
        </div>
        <input
          name='beforeSurveys'
          placeholder='URL'
          value={event.beforeSurvey || ''}
          onChange={this.handleChange} />
        <div className='input-label'>
          <FormattedMessage {...messages.afterSurvey} />
        </div>
        <input
          name='afterSurveys'
          placeholder='URL'
          value={event.afterSurvey || ''}
          onChange={this.handleChange} />
        <div className='input-label'>
          <FormattedMessage {...messages.picture1} />
          &nbsp;({event.pictures.length}/{MAX_PICTURE_COUNT})
        </div>
        <div className={styles.eventPictures}>
          { event.pictures.map((url, i) => (
            <div className={styles.eventPicture}
              key={url + i}>
              <EventEditPicture
                url={url}
                onRemove={() => removePicture(i, event.id)} />
            </div>
          ))
          }
        </div>
        { event.pictures.length < MAX_PICTURE_COUNT &&
          <input
            type='file'
            name='picture'
            onChange={this.handleChange}/>
        }
      </div>
    )
  }
}

EventEdit.propTypes = {
  event: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  addPicture: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  companyUsers: PropTypes.array.isRequired,
  removePicture: PropTypes.func.isRequired,
}

export default EventEdit

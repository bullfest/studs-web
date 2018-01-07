import React from 'react'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'

import styles from './styles.css'
import PublicEvent from '../../components/PublicEvent'
import PublicEventMenu from '../../components/PublicEventMenu'
import * as api from '../../api'
export class PublicEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {events: []}
  }

  componentDidMount() {
    api.fetchEvents().then(data => {
      this.setState({
        events: data.events.filter(e => (!!e.public_text && !!e.picture_1)),
      })
    }).catch(console.log)

    Events.scrollEvent.register('begin')
    Events.scrollEvent.register('end')

    scrollSpy.update()
    animateScroll.scrollTo(1)
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  render() {
    const { events } = this.state

    return (
      <div className={styles.publicEvents}>
        <PublicEventMenu events={events} />
        { events.map(e => <PublicEvent key={e.id} event={e} />)}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(PublicEvents)

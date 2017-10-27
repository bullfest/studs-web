/*
 *
 * Members
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles.css'
import MemberListItem from '../../components/MemberListItem'
import MembersStaticDetail from '../../components/MembersStaticDetail'
import CV from '../../components/Cv'
import MasterDetail from '../../components/MasterDetail'
import * as actions from './actions'

export class Members extends React.Component {
  componentDidMount() {
    this.props.getUsers()
    const id = this.props.params.id
    if (id) {
      this.props.getCv(id)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id && this.props.params.id != nextProps.params.id) {
      this.props.getCv(nextProps.params.id)
    }
  }
  renderMembersList(users) {
    return (
      <div className={styles.memberList}>
        { users.map(user => <MemberListItem key={user.id} user={user}/>) }
      </div>
    )
  }
  render() {
    const users = this.props.users.toJS()
    let detail
    let detailSelected = false
    const id = this.props.params.id
    const user = users.find(u => u.id === id)
    if (user) {
      let cv = null
      if (this.props.cv) {
        cv = this.props.cv.toJS()
      }
      detail = <CV user={user} cv={cv} />
      detailSelected = true
    } else {
      detail = <MembersStaticDetail />
    }
    return (
      <div className={styles.members}>
        <MasterDetail
          master={this.renderMembersList(users)}
          detail={detail}
          detailSelected={detailSelected} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users']),
    cv: state.getIn(['members', 'cv']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)

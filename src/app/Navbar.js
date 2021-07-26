import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotification, selectAllNotifications } from './features/notification/notificationSlice'
import { useTranslation, Trans } from 'react-i18next'

export const Navbar = () => {
  const dispatch = useDispatch()
  const unreadCount = useSelector(state=> state.notifications.filter(n=> !n.read).length)
  const {t, i18n} = useTranslation()
  const [selectedLocale, setSelectedLocale] = useState('en')
  const fetchNotifications = ()=>{
      dispatch(fetchNotification())
  }

  const onChangeLocale=(e)=>{
    console.log(`Selected locale ${e.target.value}`)
    setSelectedLocale(e.target.value) 
    i18n.changeLanguage(e.target.value)
  }
 
  console.log(`count: ${unreadCount}`)
  let unreadNotificationCount = ''
  if(unreadCount > 0) {
    unreadNotificationCount = <span className="badge">{unreadCount}</span>
  }
  return (
    <nav>
      <section>

        <Trans>
        <h1><i>Redux</i> Essentials Example</h1>
        </Trans>
        <select select={selectedLocale} onChange={onChangeLocale}>
          <option value="en">English</option>
          <option value="jp">Japan</option>
          <option value="es">Spanish</option>
        </select>

        

        <div className="navContent">
          <div className="navLinks">
            <Link to='/posts'>Posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>Notifications</Link>
          </div>
        </div>
        <button onClick={fetchNotifications}>
        <Trans i18nKey="RefreshNotification" count={0}>
          Refresh <span className="badge">{{unreadCount}}</span>
        </Trans>
        </button>
      </section>
    </nav>
  )
}

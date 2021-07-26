import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllNotifications, allNotificationRead } from './notificationSlice'
import { userSelector } from '../users/userSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames'
import { useTranslation} from 'react-i18next'

export const NotificationList = ()=>{
    const allNotifications = useSelector(selectAllNotifications)
    console.log(`notification: ${allNotifications.length}`)
    const allUsers = useSelector(userSelector)
    const dispatch = useDispatch()
    const{t, i18n} = useTranslation(['notification'])
    
    useEffect(()=>{
        dispatch(allNotificationRead())
    })
    const newNotificationCount = allNotifications.filter(n=> n.isNew).length

    const renderedElements = allNotifications.map(notification=>{
        const user = allUsers.find(user=> notification.user === user.id) || { name:'Unkown User'}
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const notificationClassname = classNames('notification', {
            new: notification.isNew
        })
        return (
            <div key={notification.id} className={notificationClassname}>
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo}</i>
                </div>
            </div>
        )

    })

    return (
        <section>
            <h2>Notifications</h2>
            <h3>{t('Notification.newNotification_interval',
                {postProcess:'interval',
                count:newNotificationCount})}</h3>
            {renderedElements}
        </section>
    )
}
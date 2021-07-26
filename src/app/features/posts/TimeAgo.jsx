import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({timeStamp})=>{
    let timeAgo =''
    if(timeStamp){
        let date = parseISO(timeStamp)
        let timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} Ago`
    }
    return (
        <span title={timeStamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
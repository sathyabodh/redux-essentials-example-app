import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userSelector } from './userSlice'

const UserList = ()=>{
    const users = useSelector(userSelector)

    return (
        <section>
            <h2>Users</h2>
            <ul>
                {
                    users.map(user=>(
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                {user.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default UserList
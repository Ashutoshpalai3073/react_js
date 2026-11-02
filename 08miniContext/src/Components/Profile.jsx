import {useContext} from 'react'
import UserContext from '../Context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)
    
    if (!user) return <h1 className="profile-message">Not logged in</h1>

    return (
      <h1 className="profile-message">Profile : {user.username}</h1>
    )
}

export default Profile

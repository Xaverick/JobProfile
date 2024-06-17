import { Navigate, Outlet } from 'react-router-dom'

const haveProfile = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let profile = user.profile
    return (
        profile ? <Outlet /> : <Navigate to='/createprofile' />
    )
}

export default haveProfile
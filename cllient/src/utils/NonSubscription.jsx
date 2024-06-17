import { Navigate, Outlet } from 'react-router-dom'

const Subscription = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let plan = user.plan?.toLowerCase()
    return (
        (plan == 'silver'|| plan == 'gold'|| plan == 'diamond') ? <Navigate to='/dashboard' /> : <Outlet /> 
    )
}

export default Subscription
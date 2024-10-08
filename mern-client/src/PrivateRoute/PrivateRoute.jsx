import { Spinner } from 'flowbite-react';
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <div className='text-center'>
                  <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
        </div>
    }

    if (user) {
        return children;
    }

  return (
    <Navigate to="/login" state={{from: location}} replace></Navigate>
  )
}

export default PrivateRoute
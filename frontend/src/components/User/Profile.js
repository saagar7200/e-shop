import React, { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./profile.css"

const Profile = () => {
    const history = useNavigate();

    const {user,loading, isAuthenticated} = useSelector((state) => state.user);

    useEffect(()=>{
        if(isAuthenticated === false){
            history("/login");

        }

    },[history, isAuthenticated]);
    
  return(
      <Fragment>
          {loading ? (<Loader/>
          ):(
            <Fragment>
                <MetaData title={`${user.name}`} />

                <div className='profileContainer' >
                    <div>
                        <h1> My Profile</h1>
                        <img src={user.avatar.url} alt={user.name} />
                        <Link to="/profile/update" > Edit Profile </Link>
                    </div>
                    
                        <div>
                            <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{ String(user.createdAt).substr(0, 10) }</p>
                            </div>
                            
                            
                            <div>
                                <Link className='a' to='/orders'>My Orders</Link>
                                <Link  className='a' to='/password/update'>Change password</Link>

                            </div>
                        </div>
                    </div>
                

            </Fragment>
          )}
      </Fragment>

    )
}

export default Profile
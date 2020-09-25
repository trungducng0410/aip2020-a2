import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import './style.css';
import { Link } from 'react-router-dom';
import {useUserStatus} from '../../hoc/UserContext'

function Header() {
    //retrieve user status from userContext, either logged in or not logged in
    const [user, setUser] = useUserStatus();

    function logout(){
        setUser(false);
    }

    return (
        <nav className="header">
            <Link to="/">
                <div className="header__logo">
                    <HomeIcon />
                </div>
            </Link>
        
            <div className="header__nav">
                {user && (
                    <>
                        <p style={{color: "white"}}>Hello, User!</p>
                        <Link to="/favors" className="header__link">
                            <div className="header__option">
                                <span>Your Favor</span>
                            </div>
                        </Link>
                        <Link to="/debts" className="header__link">
                            <div className="header__option">
                                <span>Your Debts</span>
                            </div>
                        </Link>
                    </>
                )}
                <Link to="/leaderboard" className="header__link">
                    <div className="header__option">
                        <span>Leaderboard</span>
                    </div>
                </Link>
                <Link to={!user && "/login"} className="header__link">
                    <div onClick={logout} className="header__option">
                        <span>{user?"Log Out":"Log In"}</span>
                    </div>
                </Link> 
            </div>
        </nav>
    )
}

export default Header
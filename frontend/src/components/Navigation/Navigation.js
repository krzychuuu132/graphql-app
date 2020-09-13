import React,{ useState,useRef,useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth_context';

import './Navigation.scss';

const Navigation = () => {
    const [activeHamburger,setActiveHamburger] = useState(false);
    const listRef = useRef(null);

    const dataContext = useContext(AuthContext);

    const handleHamburgerClick  = () => {
        setActiveHamburger(!activeHamburger);
    }
    
    return (

        <header className="header">

            <div className="header__logo"><h2>Logo</h2></div>

            <nav className="nav">

            <button className={activeHamburger?"nav__hamburger nav__hamburger--active":"nav__hamburger"} onClick={handleHamburgerClick}>
                        <span className="nav__hamburger-line"></span>
            </button>

            <ul className={activeHamburger?"nav__list nav__list--active":"nav__list"} ref={listRef}>
            {
                dataContext.token && <>
                <li className="nav__item"><NavLink className="nav__link" activeClassName="nav__link--active" to="/events">Events</NavLink></li>
                <li className="nav__item"><NavLink className="nav__link" activeClassName="nav__link--active" to="/bookings">Bookings</NavLink></li>
                <li className="nav__item"><NavLink className="nav__link" activeClassName="nav__link--active" to="/login" onClick={dataContext.logout}>Wyloguj się</NavLink></li>
                </>
            }
                    

            </ul>

            </nav>

        </header>

      );

}
 
export default Navigation;
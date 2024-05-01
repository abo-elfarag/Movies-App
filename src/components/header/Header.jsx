import React from 'react'
import Styles from './Header.module.css'
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../imgs/movix-logo (1).svg'

export default function Header() {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        // setMobileMenu(false);
    };

    function handelSearchOpen(){
        if(showSearch == false){
        setShowSearch(true)
        }else{
            setShowSearch(false)
        }
    }

    function changeBg(){
        setShow(!show);
        if(showSearch == true){
            setShowSearch(false)
        }
    }
    useEffect(() => {
        if (show) {
            document.querySelector(".container-fluid").style.backgroundColor = "#020c1b"; 
        } else {
            document.querySelector(".container-fluid").style.backgroundColor = ""; 
        }
    }, [show]);

    return (
        <>
            <nav className={'navbar' + ' navbar-expand-lg ' + Styles.header}>
            <div className="container-fluid mt-0">
                <div className={'navbar-brand ' + Styles.logo} onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <button className="navbar-toggler border-none px-0" type="button" onClick={handelSearchOpen}>
                    <span className="text-white me-4 fs-4"><HiOutlineSearch/></span>
                </button>

                <button className="navbar-toggler border-none px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={changeBg}>
                    <span className="text-white fs-4"><SlMenu/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className={'nav-item ' + Styles.menuItem} onClick={() => navigationHandler("movie")}>
                            <a className="nav-link text-white active" aria-current="page" >Movies</a>
                        </li>
                        <li className={'nav-item ' + Styles.menuItem} onClick={() => navigationHandler("tv")}>
                            <a className="nav-link text-white" >TV Shows</a>
                        </li>
                        <li className={Styles.searchIcon + ' nav-item ' + Styles.menuItem }>
                            <a className="nav-link text-white" >
                                <HiOutlineSearch onClick={handelSearchOpen}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div>
            {showSearch === true ? <div className={Styles.searchBar}>
                <div className={Styles.searchInput}>
                    <input className={Styles.navInput} type="text" placeholder='Search for a movie or tv show....' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
                    <VscChromeClose onClick={() => setShowSearch(false)}/>
                </div>
            </div> : ""}
        </div>
        </>
    )
}

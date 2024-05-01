import React from 'react'
import Styles from './Footer.module.css'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";

export default function Footer() {
    return (
        <>
            <footer className={Styles.footer}>
            <div className={Styles.contentWrapper}>
                <ul className={Styles.menuItems}>
                    <li className={Styles.menuItem}>Terms Of Use</li>
                    <li className={Styles.menuItem}>Privacy-Policy</li>
                    <li className={Styles.menuItem}>About</li>
                    <li className={Styles.menuItem}>Blog</li>
                    <li className={Styles.menuItem}>FAQ</li>
                </ul>
                <div className={Styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className={Styles.socialIcons}>
                    <span className={Styles.icon}>
                        <FaFacebookF />
                    </span>
                    <span className={Styles.icon}>
                        <FaInstagram />
                    </span>
                    <span className={Styles.icon}>
                        <FaTwitter />
                    </span>
                    <span className={Styles.icon}>
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
        </>
    )
}

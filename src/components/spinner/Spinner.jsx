import React from 'react'
import Styles from './Spinner.module.css';

export default function Spinner({ initial }) {
return (
    <>
        <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
            <svg className={Styles.spinner} viewBox="0 0 50 50">
                <circle
                    className={Styles.path}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    </>
)
}

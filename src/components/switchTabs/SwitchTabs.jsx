import React, { useState } from 'react'
import Styles from './SwitchTabs.module.css'

export default function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) =>{
        const isSmallScreen = window.innerWidth < 400;
        if (isSmallScreen) {
            setLeft(index * 65); 
          } else {
            setLeft(index * 100); 
          }
        // setLeft(index * 100)
        setTimeout(() =>{
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index)
    }
return (
    <>
        <div className={Styles.switchingTabs}>
            <div className={Styles.tabItems}>
                {data.map((tab, index) =>(
                    <span key={index} className={`${Styles.tabItem} ${selectedTab === index ? "activ" : ""}`} onClick={()=> activeTab(tab, index)}>
                        {tab}
                    </span>
                ))}
                <span className={Styles.movingBg} style={{left: left}}></span>
            </div>
        </div>
    </>
)
}

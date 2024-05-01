import React, { useState } from 'react'
import Styles from './Trending.module.css'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/mySlider/MySlider'

export default function Trending() {
    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    }
    
return (
    
    <>
        <div className={Styles.carouselSection}>
            <div className={Styles.contentWrapper}>
                <span className={Styles.carouselTitle}>Trending</span>
                <SwitchTabs data={['Day','Week']} onTabChange={onTabChange}/>
            </div>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    </>
)
}

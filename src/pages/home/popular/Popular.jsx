import React, { useState } from 'react'
import Styles from './Popular.module.css';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/mySlider/MySlider'

export default function Popular() {
    const [endpoint, setEndpoint] = useState("movie");
    const {data, loading} = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movie" ? "movie" : "tv");
    }
return (
    <>
        <div className={Styles.carouselSection}>
            <div className={Styles.contentWrapper}>
                <span className={Styles.carouselTitle}>What's Popular</span>
                <SwitchTabs data={['Movie','TV Shows']} onTabChange={onTabChange}/>
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    </>
)
}

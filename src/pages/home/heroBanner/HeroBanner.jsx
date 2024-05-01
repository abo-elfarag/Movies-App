import React, { useEffect, useState } from 'react'
import Styles from './HeroBanner.module.css'
import {useNavigate} from 'react-router-dom'
import useFetch from '../../../hooks/useFetch';
import {useSelector} from 'react-redux';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

export default function HeroBanner() {

    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const {url} =  useSelector((state)=>state.home);
    const {data, loading} = useFetch('/movie/upcoming');

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    },[data]);

    const searchQueryHandler = (event) => {
        if(event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

return (
    <>
        <div className={Styles.heroBanner}>
            {!loading && (<div className={Styles.backdropImg}>
                <Img src={background} className={Styles.backgroundImg}/>
            </div>)}
            <div className={Styles.opacityLayer}></div>
                <div className={Styles.heroBannerContent}>
                    <span className={Styles.title}>Welcome.</span>
                    <span className={Styles.subTitle}>Millions of movies, TV shows and people to discover.
                        Explore now.</span>
                    <div className={Styles.searchInput}>
                        <input className={Styles.inp} type="text" placeholder='Search for movies or tv show...' onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
                        <button onClick={()=>{navigate(`/search/${query}`)}} className={Styles.searchBtn}>Search</button>
                    </div>
                </div>
        </div>
    </>
)
}

import React from 'react'
import Styles from './Details.module.css'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";




export default function Details() {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
return (
    <>
        <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
        <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <h2 className={Styles.title}>Similar Movies</h2>
            <Similar mediaType={mediaType} id={id} />
            <h2 className={Styles.title}>Recommendations</h2>
            <Recommendation mediaType={mediaType} id={id} />
    </>
)
}

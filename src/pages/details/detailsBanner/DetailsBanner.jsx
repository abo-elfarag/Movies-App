import React from 'react'
import Styles from './DetailsBanner.module.css'
import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";


import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/img";
import PosterFallback from "../../../imgs/no-poster (1).png";
import  PlayIcon  from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

export default function DetailsBanner({ video, crew }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

return (
    <>
        <div className={Styles.detailsBanner}>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className={Styles.backdropImg}>
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className={Styles.opacityLayer}></div>
                            <ContentWrapper>
                                <div className={Styles.content}>
                                    <div className={Styles.left}>
                                        {data.poster_path ? (
                                            <Img className={Styles.posterImg} src={ url.backdrop + data.poster_path }/>
                                        ) : (
                                            <Img className={Styles.posterImg} src={PosterFallback}/>
                                        )}
                                    </div>
                                    <div className={Styles.right}>
                                        <div className={Styles.title}>
                                            {`${ data.name || data.title} (${dayjs( data?.release_date).format("YYYY")})`}
                                        </div>
                                        <div className={Styles.subtitle}>
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className='d-flex align-items-center'>
                                            <div style={{width:'60px',height:'60px',marginRight:'20px'}}>
                                                <CircleRating className={Styles.circleR} rating={data.vote_average.toFixed(1)}/>
                                            </div>
                                            <div className={Styles.playbtn} onClick={() => {setShow(true); setVideoId(video.key);}}>
                                                <PlayIcon />
                                                <span className={Styles.text}>Watch Trailer</span>
                                            </div>
                                        </div>

                                        <div className={Styles.overview}>
                                            <div className={Styles.heading}>
                                                Overview
                                            </div>
                                            <div className={Styles.description}>
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className={Styles.info}>
                                            {data.status && (
                                                <div className={Styles.infoItem}>
                                                    <span className={Styles.infoText + Styles.BO}>
                                                        Status:{" "}
                                                    </span>
                                                    <span className={Styles.infoText}>
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className={Styles.infoItem}>
                                                    <span className={Styles.infoText + Styles.BO}>
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className={Styles.infoText}>
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className={Styles.infoItem}>
                                                    <span className={Styles.infoText + Styles.BO}>
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className={Styles.infoText}>
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className={Styles.info}>
                                                <span className={Styles.infoText + Styles.BO}>
                                                    Director:{" "}
                                                </span>
                                                <span className={Styles.infoText}>
                                                    {director?.map((d, i) => (
                                                        <span key={i} > {d.name} {director.length - 1 !==i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className={Styles.info}>
                                                <span className={Styles.infoText + Styles.BO}>
                                                    Writer:{" "}
                                                </span>
                                                <span className={Styles.infoText}>
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className={Styles.info}>
                                                <span className={Styles.infoText + Styles.BO}>
                                                    Creator:{" "}
                                                </span>
                                                <span className={Styles.infoText}>
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data?.created_by.length - 1 !== i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className={Styles.detailsBannerSkeleton}>
                    <div className={Styles.contentWrapper}>
                        <div className={Styles.skeletonLeft + ' skeleton'}></div>
                        <div className={Styles.skeletonRight}>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                            <div className={Styles.skeletonRow + ' skeleton'}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
)
}

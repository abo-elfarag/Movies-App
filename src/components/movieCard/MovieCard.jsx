import React from 'react'
import Styles from './MovieCard.module.css'
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../imgs/no-poster (1).png";

export default function MovieCard({ data, fromSearch, mediaType }) {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

        console.log()
return (
    <>
        <div className={Styles.movieCard} onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className={Styles.posterBlock}>
                <Img className={Styles.posterImg} src={posterUrl} />
                        <div className={Styles.circleRating}>
                            <CircleRating className='bg-white' rating={data.vote_average.toFixed(1)}/>
                        </div>
                        <div className={Styles.genreContainer}>
                            <Genres data={data.genre_ids.slice(0, 2)} />
                        </div>
                        
            </div>
            <div className={Styles.textBlock}>
                <span className={Styles.title}>{data.title || data.name}</span>
                <span className={Styles.date}>
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    </>
)
}

import React, { useRef } from "react";
import Styles from './Carousel.module.css';
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";



import Img from "../lazyLoadImage/img";
import PosterFallback from "../../imgs/no-poster (1).png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";







export default function Carousel({data , loading , endpoint , title }) {

    // console.log(data[0].genre_ids)

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className={Styles.skeletonItem}>
                <div className={Styles.posterBlockSkeleton}></div>
                <div className={Styles.textBlockSkeleton}>
                    <div className={Styles.titleSkeleton}></div>
                    <div className={Styles.dateSkeleton}></div>
                </div>
            </div>
        );
    };
    
return (
    
    <>
        <div className={Styles.Carousel}>
            <div className={Styles.contentWrapper}>
            {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill className={Styles.carouselLeftNav + ' arrow'} onClick={() => navigation("left")}/>
                <BsFillArrowRightCircleFill className={Styles.carouselRighttNav + ' arrow'}onClick={() => navigation("right")}/>
                {!loading ? (
                    <div className={Styles.carouselItems} ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return (<div key={item.id} className={Styles.carouselItem} onClick={() =>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                <div className={Styles.posterBlock}>
                                    <Img src={posterUrl} alt="" />
                                    <div className={Styles.circleRating}>
                                        <CircleRating className='bg-white' rating={item.vote_average.toFixed(1)}/>
                                    </div>
                                    <Genres data={item.genre_ids.slice(0, 2)}/>
                                </div>
                                <div className={Styles.textBlock}>
                                    <span className={Styles.title}>{item.title || item.name}</span>
                                    <span className={Styles.date}>{dayjs(item.release_Date).format('MMM D, YYYY')}</span>
                                </div>
                            </div>)
                        })}
                    </div>  
                ) : (<div className={Styles.loadingSkeleton}>
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
            </div>)}
            </div>  
        </div>
    </>
)
}

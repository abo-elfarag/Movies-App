import React from 'react'
import Styles from './MySlider.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../imgs/no-poster (1).png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

export default function MySlider({data , loading , endpoint , title}) {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    // const navigation = (dir) => {
    //     const container = carouselContainer.current;

    //     const scrollAmount =
    //         dir === "left"
    //             ? container.scrollLeft - (container.offsetWidth + 20)
    //             : container.scrollLeft + (container.offsetWidth + 20);

    //     container.scrollTo({
    //         left: scrollAmount,
    //         behavior: "smooth",
    //     });
    // };
    
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                initialSlide: 2
              }
            },
            {
              breakpoint: 720,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            },
            {
                breakpoint: 550,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
              }
          ]
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick}>
                <BsFillArrowRightCircleFill className={Styles.arrowRight}/>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div onClick={onClick}>
            <BsFillArrowLeftCircleFill className={Styles.arrowRight} style={{left:'10px'}}/>
        </div>
        );
    }

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
    <div className={Styles.Carousel}>
        <div className={Styles.contentWrapper}>
            {title && <div className={Styles.carouselTitle}>{title}</div>}
            {!loading ? (
                    <Slider {...settings}>
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
                    </Slider>
                ) : (<div className={Styles.loadingSkeleton}>
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
            </div>)}
        </div>
    </div>
    // <div className={Styles.sliderContainer}>
    //     <Slider {...settings}>
    //   <div>
    //     <h3>1</h3>
    //   </div>
    //   <div>
    //     <h3>2</h3>
    //   </div>
    //   <div>
    //     <h3>3</h3>
    //   </div>
    //   <div>
    //     <h3>4</h3>
    //   </div>
    //   <div>
    //     <h3>5</h3>
    //   </div>
    //   <div>
    //     <h3>6</h3>
    //   </div>
    // </Slider>
    // </div>
)
}

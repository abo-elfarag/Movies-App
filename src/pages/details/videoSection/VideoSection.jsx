import React, { useState } from "react";

import Styles from './VideoSection.module.css';

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/img";
import  PlayIcon  from "../PlayBtn";

export default function VideoSection({ data, loading }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
return (
    <>
        <div className={Styles.videosSection}>
            <ContentWrapper>
                <div className={Styles.sectionHeading}>Official Videos</div>
                {!loading ? (
                    <div className={Styles.videos}>
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className={Styles.videoItem}
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className={Styles.videoThumbnail}>
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon className={Styles.PlayIcon}/>
                                </div>
                                <div className={Styles.videoTitle}>{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={Styles.videoSkeleton}>
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    </>
)
}

import React from 'react'
import Styles from './VideoPopup.module.css'
import ReactPlayer from "react-player/youtube";

export default function VideoPopup({ show, setShow, videoId, setVideoId }) {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
return (
    <>
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className={Styles.opacityLayer} onClick={hidePopup}></div>
            <div className={Styles.videoPlayer}>
                <span className={Styles.closeBtn} onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    </>
)
}

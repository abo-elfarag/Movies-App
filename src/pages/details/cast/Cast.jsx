import React from 'react'
import { useSelector } from "react-redux";

import Styles from './Cast.module.css';

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/img";
import avatar from "../../../imgs/avatar (1).png";

export default function Cast({ data, loading }) {
    const { url } = useSelector((state) => state.home);
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
return (
    <>
        <div className={Styles.castSection}>
            <ContentWrapper>
                <div className={Styles.sectionHeading}>Top Cast</div>
                {!loading ? (
                    <div className={Styles.listItems}>
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className={Styles.listItem}>
                                    <div className={Styles.profileImg}>
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className={Styles.name}>{item.name}</div>
                                    <div className={Styles.character}>
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    </>
)
}

import React from "react";

import Styles from './ContentWrapper.module.css'

const ContentWrapper = ({ children }) => {
    return <div className={Styles.contentWrapper}>{children}</div>;
};

export default ContentWrapper;
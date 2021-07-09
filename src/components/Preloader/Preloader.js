import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className={props.isFetching && (!props.loginError) ? "preloader_active" : "preloader"}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader

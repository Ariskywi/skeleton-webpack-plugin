import React from 'react';
import 'index.css'; // 确保路径和文件名正确

const Model = ({ url, type }) => {
    return (
        <div className="model">
            <section className="top">
                <div className="time">
                    <span>12:00</span>
                    <span className="clock">
                        <i></i>
                    </span>
                </div>
                <div className="bang">
                    <span className="dot"></span>
                    <span className="line"></span>
                </div>
                <div className="single">
                    <i className="i1"></i><i className="i2"></i><i className="i3"></i><i className="i4"></i>
                    4G
                    <div className="battery"></div>
                </div>
            </section>
            <section className="body">
                <iframe src={url} frameBorder="0" className={type === 'origin' ? 'origin' : ''}></iframe>
            </section>
            <section className="bottom"></section>
        </div>
    );
};

export default Model;

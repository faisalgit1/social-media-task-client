import React from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
const heroImages =
    "https://i.ibb.co/MCxCRX1/chat-rooms-online-pakistani-chat-rooms.png";

const Hero = () => {
    return (
        <>
            <div className="hero max-w-[90%] mx-auto">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={heroImages} alt="hero" />
                    <div>
                        <h1 className="text-5xl text-primary font-bold">
                            Share your photo with your friends
                        </h1>
                        <p className="py-6 text-2xl font-semibold">
                            This is a social media website. You can post photo and comments. So enjoy our services.
                        </p>

                        <button className="btn btn-primary"><Link to='/media'>Media</Link></button>
                    </div>
                </div>
            </div>
            <Post></Post>
        </>
    );
};

export default Hero;
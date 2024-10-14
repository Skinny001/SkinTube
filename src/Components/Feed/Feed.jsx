import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feed.css';
import { value_converter } from '../../data';
import moment from 'moment';

const Youtube_key = import.meta.env.VITE_YOUTUBE_API_KEY;

const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=NG&videoCategoryId=${category}&key=${Youtube_key}`;
        const response = await fetch(videoList_url);
        const result = await response.json();
        setData(result.items);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const handleVideoClick = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    return (
        <div className="feed">
            {data?.map((item, index) => (
                <div 
                    key={index} 
                    className="card" 
                    onClick={() => handleVideoClick(item.id)}  // Navigate to the PlayVideo component
                >
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </div>
            ))}
        </div>
    );
};

export default Feed;

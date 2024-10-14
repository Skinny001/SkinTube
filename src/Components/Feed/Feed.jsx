import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { value_converter } from '../../data';
import moment from 'moment';

const Youtube_key = import.meta.env.VITE_YOUTUBE_API_KEY;

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=NG&videoCategoryId=${category}&key=${Youtube_key}`;
        const response = await fetch(videoList_url);
        const result = await response.json();
        setData(result.items);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="feed">
            {data?.map((item, index) => (
                <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    );
};



export default Feed;

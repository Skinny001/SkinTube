import React from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { useState,useEffect } from 'react'

const Feed = ({category}) => {
    const [data, setData] =useState([]);

    const fetchData = async () =>{
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
    }
    useEffect(() => {
        fetchData();
        }, [category]);
  return (
    <div className="feed">
        {data.map((item,index)=>{
            return (
            <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <h2>{item.snippet.title}</h2>
                <h3>SkinTube</h3>
                <p>15k views &bull; 2 days ago</p>
            </Link>
            )
        })}

        {/* <div className='card'>
            <img src={thumbnail2} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail3} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail4} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail5} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail6} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail7} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail8} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail1} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail2} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail3} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail4} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail5} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail6} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail7} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div>

        <div className='card'>
            <img src={thumbnail8} alt="" />
            <h2>Best channel to learn coding that help you to be a web developer</h2>
            <h3>SkinTube</h3>
            <p>15k views &bull; 2 days ago</p>
      
        </div> */}

    </div>
  )
}

export default Feed

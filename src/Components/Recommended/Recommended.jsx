import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { value_converter } from '../../data'


const Youtube_key = import.meta.env.VITE_YOUTUBE_API_KEY;

const Recommended = ({categoryId}) => {

  const [apiData,setApiData] = useState([]);

  const fetchData = async () =>{
    const reletedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG&videoCategoryId=${categoryId}&key=${Youtube_key}`;
    await fetch(reletedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items));
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='recommended'>
      {/* {apiData.map((item,index)=>{
        return(
        <div key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{items.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter (item.statistics.viewCount)} Views</p>
            </div>
        </div>
        )
      })} */}

    </div>
  )
}

export default Recommended

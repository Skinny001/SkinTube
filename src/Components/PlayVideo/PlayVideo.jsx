import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { value_converter } from '../../data'
import moment from 'moment'

const Youtube_key = import.meta.env.VITE_YOUTUBE_API_KEY;

const PlayVideo = ({videoId}) => {

    const [apiDate,setApiDate] = useState(null);

    const [channelData,setchannelData] = useState(null);
    const [commentData,setCommentData] = useState([]);

    const fetchVideoData = async () =>{
        // Fetching Video Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${Youtube_key}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=> setApiDate(data.items[0]))
    }

    const fetchOtherData = async ()=>{
        // Fetching Channel Data
        const channelData_url =  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiDate.snippet.channelId}&key=${Youtube_key}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setchannelData(data.items[0]))

        // fetching comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${Youtube_key}`
        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    }

    useEffect(()=>{
        fetchVideoData();
    },[])


    useEffect(()=>{
        fetchOtherData();
    },[])



  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <h3>{apiDate?apiDate.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiDate?value_converter(apiDate.statistics.viewCount):"16k"} Views &bull; {apiDate?moment(apiDate.snippet.publishedAt).fromNow():""}</p>
            <div>
                <span><img src={like} alt="like" />{apiDate?value_converter(apiDate.statistics.likeCount):155}</span>
                <span><img src={dislike} alt="dislike" />2</span>
                <span><img src={share} alt="share" />Share</span>
                <span><img src={save} alt="save" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiDate?apiDate.snippet.channelTitle:""}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1m"} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiDate?apiDate.snippet.description.slice(0,250):"Description Here"}</p>
            <hr />
            <h4>{apiDate?value_converter(apiDate.statistics.commentCount):102} Comments</h4>

            {commentData.map((item,index)=>{
                return(
            <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className='comment-action'>
                        <img src={like} alt="" />
                        <span>244</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>      
                )
            })}
        </div>
      
    </div>
  )
}

export default PlayVideo

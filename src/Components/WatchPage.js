import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchResults, closemenu } from '../utils/appslice';
import {  Link, useSearchParams } from 'react-router-dom';
import { Google_API_KEY, YouTube_API_Sug } from '../utils/Constants';
import Sugesition from './Sugesition';

const WatchPage = () => {
  const [params] = useSearchParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [videos,setvideos]=useState()
  const dispatch = useDispatch();


  const fetchVideo = async () => {
    const videodata = await fetch(YouTube_API_Sug)
    const datasug = await videodata.json()
    setvideos(datasug.items)
  }


  const fetchVideoInfo = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${params.get('v')}&key=${Google_API_KEY}&part=snippet`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setVideoInfo(data.items[0].snippet);
        fetchComments();
      }
    } catch (error) {
      console.error('Error fetching video information:', error);
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${Google_API_KEY}&part=snippet&videoId=${params.get('v')}&maxResults=50`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setComments(data.items);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  useEffect(() => {
    fetchVideo()
    dispatch(closemenu());
    fetchVideoInfo();
  }, []);

  return (
    <div className='flex w-9/12 mx-auto mt-24'>
      <div>
        <iframe
          width="1350"
          height="500"
          src={"https://www.youtube.com/embed/" + params.get('v')}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <p className='font-bold text-lg m-2'>{videoInfo?.title}</p>
        <p className='font-bold text-white cursor-pointer text-lg m-2 w-fit border-2 p-2 bg-red-400 rounded-lg'>{videoInfo?.channelTitle}</p>
        <div>
          <h1 className='font-bold  text-lg m-2'>Comments</h1>
          {comments?.map(comment => (
            <div key={comment.id} className='p-2'>
              <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
      <h1 className='font-bold text-center'>Sugesitions</h1>
      {videos?.map((video) => (
        <Link key={video.id.videoId} to={'/watch?v=' + video.id.videoId}>
          <Sugesition key={video.id.videoId} videoinf={video} />
        </Link>
      ))}
      </div>
    </div>
  )
}

export default WatchPage;

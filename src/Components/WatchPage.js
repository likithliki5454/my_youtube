import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  closemenu } from '../utils/appslice';
import { Link, useSearchParams } from 'react-router-dom';
import { Google_API_KEY, YouTube_API_Sug } from '../utils/Constants';
import Sugesition from './Sugesition';
import profilimg from '../images/profile.png'
import generate from './Helper';
import { generatecomment } from '../utils/commentslice';


const WatchPage = () => {

  const [params] = useSearchParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [videos, setvideos] = useState()
  const [inputcom, setinputcom] = useState([])

  const dispatch = useDispatch();


const menubotton=useSelector(store=>store.app1.ismenuopen)


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

  const commentsresult = useSelector((store) => store.Comment?.cdata)
  console.log(commentsresult);




  useEffect(() => {
    fetchVideo();
    dispatch(closemenu());
    fetchVideoInfo();

    const interval = setInterval(() => {
      const newRandomName = generate();
      dispatch(generatecomment({
        name: newRandomName.name,
        data: newRandomName.data,
      }));
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  const submitform=(e)=>{
    e.preventDefault()
    if(inputcom==='') return null
    dispatch(generatecomment({
      name: 'Likith',
      data: inputcom,
    }));

    setinputcom('')
    
  }

  return (
    <div className='flex   mt-24'>

   
        <div className='w-3/12'>
 {     !menubotton ? <div>
        <h1 className='font-bold text-center '>Live Chat</h1>
        <div className=' border-2 overflow-y-auto flex flex-col-reverse h-[35rem]'>
          {commentsresult && commentsresult.length > 1 && commentsresult.slice(0).reverse().map((c, index) => (
            <div key={index} className='m-2  flex'>
              <img className='h-7 w-6' src={profilimg} />
              <p className='ml-2 font-bold'>{c.name}</p>
              <p className='ml-2'>{c.data}</p>
            </div>
          ))}
        </div>
        <form className='flex ml-2' onSubmit={submitform}>
          <input className='border-2' placeholder='comment...' value={inputcom} onChange={(e)=>setinputcom(e.target.value)}/>
          <button className='bg-lime-300 p-2'>Send</button>
        </form>

        </div>
     :'' }
      </div >







      <div className='w-10/12'>
        <iframe className='w-11/12'
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
      <div className='w-3/12'>
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

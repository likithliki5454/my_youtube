import React, { useEffect, useState } from 'react'
import { YouTube_API } from '../utils/Constants'
import Videocard, { VideocardHoF } from './Videocard'
import { Link } from 'react-router-dom'
import { SearchResults } from '../utils/appslice'
import { useDispatch, useSelector } from 'react-redux'


const VideoContainer = () => {

  useEffect(() => {
    fetchVideo()
  }, [])



  const dispatch = useDispatch();


  const fetchVideo = async () => {
    const videodata = await fetch(YouTube_API)
    const datasug = await videodata.json()
    dispatch(SearchResults(datasug.items))
  }


  const Results = useSelector((state) => state.app1.searchResults);

  return (
    <div className='flex flex-wrap'>
    {Results && <VideocardHoF videoinf={Results[0]}/>}
    {Results && Results.map((video) => (
      <Link key={video.id.videoId} to={'/watch?v=' + video.id.videoId}>
          <Videocard key={video.id.videoId} videoinf={video} />
        </Link>
      ))}
    </div>
  )
}







export default VideoContainer

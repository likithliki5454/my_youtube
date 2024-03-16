import React from 'react'
import { useSelector } from 'react-redux'
import store from '../utils/store'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const issidebaropen=useSelector((store)=>store.app1.ismenuopen)

  if(!issidebaropen) return null
  return (
    <div className='p-5 shadow-lg w-48 fixed mt-24'>
    <ul>
    <Link to='/'><li>Home</li></Link>
    <li>Shorts</li>
    <li>Videos</li>
    <li>Live</li>
    </ul>
    <h1 className='font-bold pt-5'>Subscription</h1>
      <ul>
      <li>Music</li>
      <li>Sports</li>
      <li>Gaming</li>
      <li>Movies</li>
      </ul>
      <h1 className='font-bold pt-5'>Watch Later</h1>
      <ul>
      <li>Music</li>
      <li>Sports</li>
      <li>Gaming</li>
      <li>Movies</li>
      </ul>
      <h1 className='font-bold pt-5'>Faveroites </h1>
      <ul>
      <li>Music</li>
      <li>Sports</li>
      <li>Gaming</li>
      <li>Movies</li>
      </ul>
      <h1 className='font-bold pt-5'>Recents </h1>
      <ul>
      <li>Music</li>
      <li>Sports</li>
      <li>Gaming</li>
      <li>Moviess</li>
      </ul>
    </div>
  )
}

export default Sidebar

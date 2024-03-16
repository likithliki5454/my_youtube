import React, { useEffect, useState } from 'react';
import HamburgerIcon from '../images/Hamburger_icon.svg.png';
import YoutubeLogo from '../images/youtube.png';
import ProfileIcon from '../images/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { togglemenu } from '../utils/appslice';
import { YouTube_API } from '../utils/Constants';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();

  const [stext, setstext] = useState('');
  const [sug, setsug] = useState([]);
  const [sugopen, setsugopen] = useState(false)

  const handleMenuToggle = () => {
    dispatch(togglemenu());
  };


  const Results = useSelector((state) => state.app1.searchResults);
  

const handleChange = (e) => {
  const searchText = e.target.value.toLowerCase();
  setstext(searchText); 

};



useEffect(()=>{
const debounce=setTimeout(() => {
  if (stext === '') {
    setsug([]);
  } else {
    const filteredResults = Results.filter((video) => {
      return video.snippet.title.toLowerCase().includes(stext);
    }).slice(0,10)
    setsug(filteredResults.map(video => ({
      ...video,
      title: video.snippet.title.split('|')[0].trim()
    })));
  }
}, 200);
return()=>{
  clearInterval(debounce)
}

},[handleChange,stext])




const handleClick=()=>{
setsugopen(false)
setstext('')
}

  const handleSearch = () => {
    // Handle search action here
  };

  return (
    <div>
    <div className='grid grid-flow-col p-4  shadow-lg fixed w-full bg-slate-50 m-0'>
      <div className='flex justify-around col-span-1'>
        <img
          onClick={handleMenuToggle}
          className='h-12 w-10 cursor-pointer'
          src={HamburgerIcon}
          alt='Hamburger Menu Icon'
        />
        <img className='h-12' src={YoutubeLogo} alt='YouTube Logo' />
      </div>
      <div className='col-span-10 flex center justify-center '>
        <div className='flex w-full center justify-center'>
          <input
            type='text'
            className='border border-grey rounded-l-full w-1/2 p-4'
            placeholder='Search...'
            onChange={handleChange}
            onFocus={()=>setsugopen(true)}
            // onBlur={()=>setsugopen(false)}
          />
          <button type='button' className='border border-grey rounded-r-full p-4' onClick={handleSearch}>
            Search
          </button>
      
        </div>
    
      </div>
      <div className='col-span-1'>
        <img className='h-10 w-10' src={ProfileIcon} alt='Profile Icon' />
      </div>
  
    </div>
    {   sugopen? <div className=' mt-10 center justify-center absolute'>
    
    <div className='fixed shadow-lg   w-[45rem] bg-slate-100 mt-10 left-[38rem]  rounded-lg ' onClick={handleClick}>
    {sug.length > 0 && sug.map((d) => (
      <Link key={d.id.videoId} to={'/watch?v=' + d.id.videoId}>
      <p key={d.id.videoId} className='p-2 shadow-sm '>{d.snippet.title}</p>
      </Link>
    ))}
    </div>

  </div>
:''}
    </div>
  );
};

export default Header;

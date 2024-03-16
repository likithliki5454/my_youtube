import React from 'react'

const Sugesition = ({videoinf}) => {
    if(videoinf===undefined) return null
    
    const {snippet}=videoinf
    const {channelTitle,title,thumbnails}=snippet

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
      };

  return (
    <div className='p-2 m-2 w-72 shadow-lg' onClick={handleLinkClick}>
      <img className='rounded-lg' src={thumbnails.medium.url}/> 
      <ul>
      <li className='font-bold py-2'>{title}</li>
      <li>{channelTitle}</li>

      </ul>
    </div>
  )
}

export default Sugesition



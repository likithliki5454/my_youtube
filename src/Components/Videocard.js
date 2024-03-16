import React from 'react';
import { Link } from 'react-router-dom';

// Original component
const Videocard = ({ videoinf }) => {


  if (videoinf === undefined) return null;

  const { snippet, statistics } = videoinf;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className='p-2 m-2 w-72 shadow-lg'>
    <img className='rounded-lg' src={thumbnails.medium.url} alt="Video Thumbnail" />
    <ul>
    <li className='font-bold py-2'>{title}</li>
    <li>{channelTitle}</li>
    </ul>
    </div>
  );
};

export default Videocard;



// export const VideocardHoF = (Videocard) => ({ videoinf }) => (
//   <div>
//     <Videocard videoinf={videoinf} />
//   </div>
// );

const withBorder = (Videocard) => ({videoinf}) => (
  <div className='border-2 border-red-300'>
    <Videocard videoinf={videoinf} />
  </div>
);

export const VideocardHoF = withBorder(Videocard);
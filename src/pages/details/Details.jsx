import React from 'react'
import "./style.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Cast from './cast/cast';
import VideosSection from './videosSection/VideosSection';
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const{mediaType,id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const{data:credits,loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  // why??

  const trailers = data?.results?.filter((video)=> video.type === "Trailer")


  return (
    <div>
      <DetailsBanner video={trailers?.length ? trailers[0] : data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details

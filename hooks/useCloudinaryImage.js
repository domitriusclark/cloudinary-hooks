import { useState } from 'react';
import cloudinary from 'cloudinary-core';
import { useQuery } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useCloudinaryImage({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })
  let cloudinaryObject;

  const [tag, setTag] = useState();

  // This request only fires when getImagesbyTag is called
  const { data: taggedImageData, status } = useQuery(tag && ['images', tag], async (key, tag) => {
    /*

     To enable the list type you must:
      1. Go to your account Settings
      2. Click Security 
      3. Inside 'Restricted media types' you will uncheck 'Resource list'

    */
    const url = await cld.url(`${tag}.json`, { type: 'list' })
    const images = await fetch(url);
    return images.json();
  })

  function getImage({ image_name, transform_options }) {
    return cld.url(image_name, { ...transform_options, crop: 'scale' })
  }

  /*
    This function can be used in a useEffect or by firing an action that will set the tag name for us.
    You also need to make sure you add tags on upload or after.
    TODO:
      [x] What happens when the tag doesn't exist? Can we error handle that with react-query?  
          
  */
  function getImagesByTag(tagName) {
    return setTag(tagName);
  }

  cloudinaryObject = {
    getImage,
    getImagesByTag
  }

  return [cloudinaryObject, taggedImageData, status];
}


import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useMedia({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })
  let cloudinaryObject

  const [tag, setTag] = React.useState();

  /*
  
  This request only fires when getImagesbyTag is called
  To enable the list type you must:
    1. Go to your account Settings
    2. Click Security
    3. Inside 'Restricted media types' uncheck 'Resource list'

  */
  const { data: taggedImageData, status: taggedImageStatus, error: taggedImageError } = useQuery(tag && ['images', tag], async (key, tag) => {
    const url = await cld.url(`${tag}.json`, { type: 'list' })
    const images = await fetch(url)
    return images.json()
  })

  function getImage({ public_id, transform_options }) {
    return cld.url(public_id, { ...transform_options, crop: 'scale' })
  }

  function getVideo({ public_id, transform_options }) {
    return cld.video_url(public_id, { ...transform_options })
  }

  function getImagesByTag(tagName) {
    return setTag(tagName)
  }

  function createTransform(options) {
    return fetch('/api/createTransorm', {
      method: "POST",
      body: {
        options
      }
    })
  }

  function getGifFromVideo({ public_id, transform_options }) {
    return cld.video_url(`${public_id}.gif`, {
      videoSampling: transform_options.videoSampling || '',
      delay: transform_options.delay || '',
      flags: "animated",
      fetchFormat: "auto",
      effect: "loop",
      ...transform_options
    })
  }

  function customizeTemplate(type, transform_options) {
    switch (type) {
      case 'opengraph':
        return cld.url(`${type}`, {
          transformation: [
            { border: '4px_solid_black' },
            // generate the title
            {
              overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(60).text(transform_options.text.title || ''),
              gravity: transform_options.gravity || 'center',
            },
            // generate subtext
            {
              overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(24).text(transform_options.text.subtext || ''),
              gravity: transform_options.gravity || 'center',
              y: 50
            },
            // grab and place the logo from cloudinary 
            { overlay: transform_options.logo ? new cloudinary.Layer().publicId('logo') : '' },

          ]
        })
      case 'twitter-banner':
        return cld.url(`${type}`,
          {
            transformation: [
              { border: '4px_solid_black' },
              // generate the title
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(60).text(transform_options.text.title || ''),
                gravity: transform_options.gravity || 'center',
              },
              // generate subtext
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(24).text(transform_options.text.subtext || ''),
                gravity: transform_options.gravity || 'center',
                y: 50
              },
              // grab and place the logo from cloudinary 
              { overlay: transform_options.logo ? new cloudinary.Layer().publicId('logo') : '' },

            ]
          }
        )
      case 'twitch-banner':
        return cld.url(`${type}`,
          {
            transformation: [
              { border: '4px_solid_black' },
              // generate the title
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(60).text(transform_options.text.title || ''),
                gravity: transform_options.gravity || 'center',
              },
              // generate subtext
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(24).text(transform_options.text.subtext || ''),
                gravity: transform_options.gravity || 'center',
                y: 50
              },
              // grab and place the logo from cloudinary 
              { overlay: transform_options.logo ? new cloudinary.Layer().publicId('logo') : '' },

            ]
          }
        )
      case 'instagram-square':
        return cld.url(`${type}`,
          {
            transformation: [
              { border: '4px_solid_black' },
              // generate the title
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(60).text(transform_options.text.title || ''),
                gravity: transform_options.gravity || 'center',
              },
              // generate subtext
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(24).text(transform_options.text.subtext || ''),
                gravity: transform_options.gravity || 'center',
                y: 50
              },
              // grab and place the logo from cloudinary 
              { overlay: transform_options.logo ? new cloudinary.Layer().publicId('logo') : '' },

            ]
          }
        )
      case 'instagram-story':
        return cld.url(`${type}`,
          {
            transformation: [
              { border: '4px_solid_black' },
              // generate the title
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(60).text(transform_options.text.title || ''),
                gravity: transform_options.gravity || 'center',
              },
              // generate subtext
              {
                overlay: new cloudinary.TextLayer().fontFamily("Times").fontSize(24).text(transform_options.text.subtext || ''),
                gravity: transform_options.gravity || 'center',
                y: 50
              },
              // grab and place the logo from cloudinary 
              { overlay: transform_options.logo ? new cloudinary.Layer().publicId('logo') : '' },

            ]
          }
        )
    }
  }

  cloudinaryObject = {
    getImage,
    getVideo,
    getGifFromVideo,
    getImagesByTag: {
      getImagesByTag,
      taggedImageData,
      taggedImageStatus,
      taggedImageError
    },
    search: {
      search,
      searchData,
      searchStatus,
      searchError
    },
    customizeTemplate,
    createTransform
  }

  return [cloudinaryObject]

}

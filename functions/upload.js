const cloudinary = require('cloudinary').v2;
require('dotenv').config();


exports.handler = async event => {
  // const imageParams = event.body().json();


  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

  const res = await cloudinary.uploader.upload(file, {
    public_id,
    resource_type: 'auto'
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(res)
  }
}

// https://api.cloudinary.com/v1_1/<cloud_name>/<resource_type>/upload


/*
  --> Required params for auth
    - cloud_name
    - resource_type (image, raw, video, auto)
    - file
    - api_key
    - timestamp
    - signature

  --> Creating an auth signature
    - create a string with params used in the POST to cloudinary
    - needs
      - timestamp
      - eager for transformations
      - public_id



*/
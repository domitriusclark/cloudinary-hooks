const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export default async function (req) {
  const { name, transforms } = JSON.parse(req.body);

  const res = await cloudinary.createTransform(name, {
    ...transforms
  })

  return {
    status: 200,
    body: JSON.stringify(res)
  }
}
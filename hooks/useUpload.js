import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useUpload({ endpoint }) {
  const [upload, { data: uploadedImage, status: uploadStatus, error: uploadError }] = useMutation(async ({ file, uploadOptions }) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        eager: uploadOptions.eager || {},
        tags: [...uploadOptions.tags],
        public_id: uploadOptions.public_id,
        file
      })
    })

    return res.json()
  }, {
    refetchOnWindowFocus: false
  })

  const [uploadTemplate] = useMutation(async ({ uploadOptions, templateOps }) => {
    const canvas = document.createElement('canvas');
    canvas.width = templateOps.width;
    canvas.height = templateOps.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, templateOps.width, templateOps.height);
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        eager: uploadOptions.eager || {},
        tags: uploadOptions.tags,
        public_id: uploadOptions.public_id,
        file: canvas.toDataURL("img/png")
      })
    })

    return res.json()
  })

  async function createTemplate(social) {
    switch (social) {
      case 'opengraph':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1200,
            height: 630
          }
        })
        break;

      case 'twitter-banner':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1500,
            height: 500
          }
        })
        break;
      case 'twitch-banner':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1200,
            height: 480
          }
        })
        break;
      case 'instagram-square':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1080,
            height: 1080
          }
        })
        break;
      case 'instagram-story':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1080,
            height: 1920
          }
        })
        break;
    }
  }

  const cloudinaryObject = {
    upload,
    createTemplate
  }

  return [cloudinaryObject, uploadedImage, uploadStatus, uploadError]
}
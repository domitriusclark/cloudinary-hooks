import { useMutation } from 'react-query'
import fetch from 'isomorphic-unfetch';

export default function useCloudinaryUpload() {
  const [mutate] = useMutation(async ({ file, uploadOptions, }) => {
    const uploadedImage = await fetch('https://compassionate-mclean-b524a9.netlify.com/.netlify/functions/upload', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
        public_id: uploadOptions.public_id,
        file
      })
    });

    return uploadedImage.json();
  })

  return mutate;
}


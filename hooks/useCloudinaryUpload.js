import { useMutation } from 'react-query'
import fetch from 'isomorphic-unfetch';

export default function useCloudinaryUpload() {
  const [mutate] = useMutation(async ({ file, uploadOptions, }) => {
    const uploadedImage = await fetch('/.netlify/functions/upload', {
      method: 'POST',
      body: JSON.stringify({
        tags: uploadOptions.tags,
        public_id: uploadOptions.public_id,
        file
      })
    });

    return uploadedImage;
  })

  return mutate;
}


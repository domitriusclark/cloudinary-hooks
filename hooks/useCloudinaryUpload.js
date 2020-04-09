import { useState } from 'react';
import { useMutation } from 'react-query'
import fetch from 'isomorphic-unfetch';

export default function useCloudinaryUpload() {
  const [uploadedImageData, setUploadedImageData] = useState();
  const [mutate] = useMutation(async ({ file, uploadOptions, }) => {
    const res = await fetch('/.netlify/functions/upload', {
      method: 'POST',
      body: JSON.stringify({
        tags: uploadOptions.tags,
        public_id: uploadOptions.public_id,
        file
      })
    });

    return res.json();
  }, {
    onSuccess: data => {
      console.log(data);
      return setUploadedImageData(data)
    }
  })

  return [mutate, uploadedImageData];
}


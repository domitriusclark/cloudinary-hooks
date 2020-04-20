import React from 'react';
import { useMedia } from '../hooks/useCloudinary';

export default function Gif({ publicId, options }) {
  const [{ getGifFromVideo }] = useMedia({ cloud_name: "testing-hooks-upload" });

  return <img src={getGifFromVideo({
    public_id: publicId,
    transform_options: {
      ...options
    }
  })} />
}
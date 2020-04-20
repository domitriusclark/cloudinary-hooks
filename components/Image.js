import React from 'react';
import { useMedia } from '../hooks/useCloudinary';

export default function Image({ publicId, options }) {
  const [{ getImage }] = useMedia({ cloud_name: "testing-hooks-upload" });

  return <img
    src={getImage({
      publicId,
      transform_options: {
        ...options
      }
    })}
  />
}
import React from 'react';
import { useMedia } from '../hooks/useCloudinary';

export default function Video({ publicId, options }) {
  const [{ getVideo }] = useMedia({ cloud_name: "testing-hooks-upload" });

  return <video autoPlay>
    <source src={getVideo({
      public_id: publicId,
      transform_options: {
        ...options
      }
    })} />
  </video>
}
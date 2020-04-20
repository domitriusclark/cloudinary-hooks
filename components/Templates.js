import React from 'react';
import { useMedia } from '../hooks/useCloudinary';

export default function Templates() {
  const [{ getImagesByTag }] = useMedia({ cloud_name: "testing-hooks-upload" });
  const { getImagesByTag, data, status, error } = getImagesByTag

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;
  return (
    <Flex justifyContent="space-around">
      {data && data.resources.map(i => (
        <Flex alignItems="center" direction="column">
          <img src={getImage({
            public_id: i.public_id,
            transform_options: {
              width: 0.2,
              border: '3px_solid_black'
            }
          })} />
          <h3>{i.public_id}</h3>
          Width: {i.width} --
          Height: {i.height}
          <Button onClick={() => setTemplate(i.public_id)}>Customize Template</Button>
          {
            template === i.public_id && <img src={customizeTemplate(template, {
              text: {
                title: "Testing the waters",
                subtext: "#does #this #work"
              },
              width: 0.2
            })} />
          }
        </Flex>
      ))}
    </Flex>
  )
}
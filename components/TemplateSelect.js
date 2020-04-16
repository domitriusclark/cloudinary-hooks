import { useState } from 'react';
import { Select, Flex, Button } from '@chakra-ui/core';
import { useUpload } from '../hooks/useCloudinary';

export default function TemplateSelect() {
  const [{ createTemplate }] = useUpload({ endpoint: '/.netlify/functions/upload' })
  const [item, setItem] = useState();
  return (
    <Flex>
      <Select value={item} onChange={(e) => setItem(e.target.value)} placeholder="Select template to generate">
        <option value="opengraph">Open Graph</option>
        <option value="twitter-banner">Twitter Banner</option>
        <option value="twitch-banner">Twitch Banner</option>
        <option value="instagram-square">Instagram Square Photo</option>
        <option value="instagram-story">Instagram Story</option>

      </Select>
      <Button onClick={() => createTemplate(item)}>Generate Template</Button>
    </Flex>

  )
}
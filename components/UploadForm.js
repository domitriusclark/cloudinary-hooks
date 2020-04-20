import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useUpload } from '../hooks/useCloudinary';

import {
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  Flex,
} from '@chakra-ui/core';

export default function UploadForm() {
  const toast = useToast();
  const [{ upload }, data, status, error] = useUpload({ endpoint: '/.netlify/functions/upload' });
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [uploadOptions, setUploadOptions] = React.useState({
    public_id: "",
    tags: []
  });
  const [fileToUpload, setFileToUpload] = React.useState({});
  const [tag, setTag] = React.useState();

  function onDrop(acceptedFiles) {
    console.log(acceptedFiles[0]);
    setFileToUpload(acceptedFiles[0]);
  }

  function onSubmit(file, options) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      upload({
        file: reader.result,
        uploadOptions: {
          ...options,
          type: file.type,
          size: file.size
        }
      })
    })
    reader.readAsDataURL(file)
  }

  function Tags() {
    return uploadOptions.tags.map(t => (
      <Tag size="sm">
        <TagLabel fontSize="8px">{t}</TagLabel>
        <TagCloseButton onClick={() => setUploadOptions(prevData => ({
          ...prevData,
          tags: prevData.tags.filter(p => p !== t)
        }))} />
      </Tag>
    ))
  }

  return (
    <Flex
      rounded="md"
      alignItems="center"
      justifyContent="center"
      direction="column"
      w={400}
      height={300}
    >

      <Text fontSize="xl">Upload to Cloudinary</Text>

      <Stack w="80%" spacing={2}>
        <Input w="92%" size="sm" fontSize="sm" placeholder="Title" onChange={e => setUploadOptions({
          ...uploadOptions,
          public_id: e.target.value
        })} />
        <InputGroup size="sm" >
          <Input placeholder="Tags" onChange={e => setTag(e.target.value)} />
          <InputRightElement size="xs">
            <IconButton size="xs" rounded="full" outline="none" onClick={() => setUploadOptions({
              ...uploadOptions,
              tags: [...uploadOptions.tags, tag]
            })} icon="small-add" />
          </InputRightElement>
        </InputGroup>
        <Stack mt="8px" mb="8px" isInline justifyContent="even" flexWrap="wrap">
          {uploadOptions.tags && <Tags />}
        </Stack>
      </Stack>

      <Flex
        rounded="md"
        border="2px solid black"
        cursor="pointer"
        h="200px"
        width="80%"
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Choose file to upload...</p>
      </Flex>

      <Button
        isLoading={status === "loading"}
        size="lg"
        loadingText="Submitting"
        variantColor="teal"
        variant="outline"
        mt={4}
        onClick={() => onSubmit(fileToUpload, uploadOptions)}
      >
        Upload Photo
      </Button>

      {data && <img src={data.url} alt={`${data.public_id}`} />}

      {status === "success" && toast({
        position: "bottom-right",
        title: "Successfully uploaded 🙌",
        status: "success",
        duration: 3000,
        isClosable: true
      })}

      {status === "error" && toast({
        position: "bottom-right",
        title: "Error uploading 😭",
        description: `${error.message}`,
        status: "warning",
        duration: 3000,
        isClosable: true
      })}

    </Flex>
  );
};
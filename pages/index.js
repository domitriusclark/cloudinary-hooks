import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";
import UploadForm from '../components/UploadForm';
import { useSearch } from '../hooks/useCloudinary';

const Home = () => {
  const [search, data, error, status] = useSearch({ endpoint: '/.netlify/functions/search' });

  console.log(data);
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex direction="column" alignItems="center" justifyContent="space-between">
        <input onChange={e => setInput(e.target.value)} />
        <button onClick={() => search({
          expression: "resource_type:image"
        })}>Search</button>
        <Flex direction="row" flexWrap="wrap">
          {data && data.resources.map(image => <img src={image.url} />)}
        </Flex>
      </Flex >
    </ThemeProvider>
  )
}

export default Home

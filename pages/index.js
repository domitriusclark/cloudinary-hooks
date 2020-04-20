import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";
import UploadForm from '../components/UploadForm';

const Home = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex direction="column" alignItems="center" justifyContent="space-between">
        <UploadForm />
      </Flex >
    </ThemeProvider>
  )
}

export default Home

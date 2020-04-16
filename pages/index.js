import { useImage } from '../hooks/useCloudinary';
import { ThemeProvider, Flex, Button } from "@chakra-ui/core";

import CreateTemplate from '../components/TemplateSelect';

const Home = () => {
  const [cloudinary, images, status] = useImage({ cloud_name: "testing-hooks-upload" });
  const [template, setTemplate] = React.useState()
  React.useEffect(() => {
    cloudinary.getImagesByTag('template');
  }, []);

  if (status === "loading") return <p>Loading...</p>

  console.log(template)

  return (
    <ThemeProvider>
      <Flex direction="column" alignItems="center" justifyContent="space-between">
        <CreateTemplate />
        <Flex justifyContent="space-around">
          {images && images.resources.map(i => (
            <Flex alignItems="center" direction="column">
              <img src={cloudinary.getImage({
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
                template === i.public_id && <img src={cloudinary.customizeTemplate(template, {
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
      </Flex >
    </ThemeProvider>
  )

}

export default Home

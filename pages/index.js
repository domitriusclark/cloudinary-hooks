import useCloudinaryImage from '../hooks/useCloudinaryImage';

import UploadForm from '../components/UploadForm';
const Home = () => {
  const [cloudinary, images, status] = useCloudinaryImage({ cloud_name: "treasureChest" });

  const [input, setInput] = React.useState();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <UploadForm />
      <input onChange={e => setInput(e.target.value)} />
      <button onClick={() => cloudinary.getImagesByTag(input)}>Search</button>
      {images && images.resources.map(i =>
        <img src={cloudinary.getImage(
          {
            image_name: i.public_id,
            transform_options: {
              width: 400,
              height: 400
            }
          }
        )} />
      )}
    </div>
  )

}

export default Home

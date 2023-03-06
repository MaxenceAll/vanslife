import { useOutletContext } from "react-router-dom/dist";

function HostVanPhotos() {

    const [currentVan] = useOutletContext();
  return (
    <>
      <img src={currentVan.imageUrl} className="host-van-detail-image" alt=""/>
    </>
  );
}

export default HostVanPhotos;

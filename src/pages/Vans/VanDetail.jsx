import { Suspense } from "react";
import {
  Await,
  defer,
  Link,
  useLoaderData,
  useLocation,
} from "react-router-dom";
// import { getVans } from "../../api";
import { getVan } from "../../api/firebase";

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

function VanDetail() {
  const location = useLocation();
  const dataPromise = useLoaderData();

  const search = location.state?.search || "";
  // console.log(search);
  const type = location.state?.type || "";
  // console.log(seartypech);

  function renderVan(van) {
    return (
      <>
        <div className="van-detail">
          <img src={van.imageUrl} alt="" />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="van-detail-container">
        <Link to={`..${search}`} className="back-button" relative="path">
          {
            <>
              &larr; <span>Back to all {type} vans</span>
            </>
          }
        </Link>
      </div>
      <Suspense fallback={<h1>Loading !!</h1>}>
        <Await resolve={dataPromise.van}>{renderVan}</Await>
      </Suspense>
    </>
  );
}

export default VanDetail;

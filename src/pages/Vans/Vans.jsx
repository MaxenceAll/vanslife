import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

import { useLoaderData } from "react-router-dom/dist";


export function loader(){
  return getVans()
}

function Vans() {
  // const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  // console.log(typeFilter);
  // console.log(searchParams.toString())
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const vans = useLoaderData()
  // console.log(data);

//   useEffect(() => {
//     async function loadVans() {
//         setLoading(true);
//         try {
//           const data = await getVans()          
//           setVans(data)
//         } catch (error) {
//           // console.error("Error:")
//           // console.error(error)
//           setError(error);
//         }finally{
//           setLoading(false)
//         }
//     }    
//     loadVans()
// }, [])

  // console.log(vans);
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  // console.log(filteredVans);

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }
  if (error) {
    return <h1>There is an error ({error.message})</h1>
  }

  const vanElements = filteredVans.map((van) => {
    return (
      <Link to={van.id} state={{
        search: `?${searchParams.toString()}`,
        type: typeFilter
        }}>
        <div key={van.id} className="van-tile">
          <img src={van.imageUrl} alt="" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div>
      </Link>
    );
  });

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}

return (
    <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
            <button
                onClick={() => handleFilterChange("type", "simple")}
                className={
                    `van-type simple 
                    ${typeFilter === "simple" ? "selected" : ""}`
                }
            >Simple</button>
            <button
                onClick={() => handleFilterChange("type", "luxury")}
                className={
                    `van-type luxury 
                    ${typeFilter === "luxury" ? "selected" : ""}`
                }
            >Luxury</button>
            <button
                onClick={() => handleFilterChange("type", "rugged")}
                className={
                    `van-type rugged 
                    ${typeFilter === "rugged" ? "selected" : ""}`
                }
            >Rugged</button>

            {typeFilter ? (
                <button
                    onClick={() => handleFilterChange("type", null)}
                    className="van-type clear-filters"
                >Clear filter</button>
            ) : null}

        </div>
        <div className="van-list">
            {vanElements}
        </div>
    </div>
  );
}

export default Vans;

import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Vans() {
  const [vans, setVans] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  // console.log(vans);
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  console.log(filteredVans);

  const vanElements = filteredVans.map((van) => {
    return (
      <Link to={`/vans/${van.id}`}>
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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">


          {/* <Link 
          to="?type=simple"
          className="van-type simple"
          >Simple</Link>
          
          <Link 
          to="?type=rugged"
          className="van-type rugged"
          >Rugged</Link>

          <Link 
          to="?type=luxury"
          className="van-type luxury"
          >Luxury</Link>

          <Link 
          to="."
          className="van-type clear-filters"
          >Clear</Link> */}

          <button 
          onClick={()=> setSearchParams({type: "simple"})}
          className="van-type simple"
          >Simple</button>

          <button 
          onClick={()=> setSearchParams({type: "rugged"})}
          className="van-type rugged"
          >Rugged</button>

          <button 
          onClick={()=> setSearchParams({type: "luxury"})}
          className="van-type luxury"
          >Luxury</button>

          <button 
          onClick={()=> setSearchParams({})}
          className="van-type clear-filters"
          >Clear</button>


      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

export default Vans;

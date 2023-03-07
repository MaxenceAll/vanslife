import React, { Suspense } from "react";
import {
  Link,
  NavLink,
  defer,
  useLoaderData,
  Await,
} from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
// import { getHostVans } from "../../api";
import { getVan } from "../../api/firebase";

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

export default function HostVanDetail() {
  const dataPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  function renderHostVanDetail(currentVan) {
    return (
      <>
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} alt="" />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink
            to={`.`}
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>

          <NavLink
            to={`pricing`}
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>

          <NavLink
            to={`photos`}
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>

          <Outlet context={[currentVan]} />
        </nav>
      </>
    );
  }

  return (
    <section>
      <Link to=".." className="back-button" relative="path">
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h1>Loading pog.</h1>}>
        <Await resolve={dataPromise.van}>
          {renderHostVanDetail}
        </Await>
      </Suspense>
    </section>
  );
}

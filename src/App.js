import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

import "./server";
import Vans from "./pages/Vans/Vans.jsx";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./components/NotFound";


import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom/dist";
import { loader as VansLoader } from "./pages/Vans/Vans.jsx"
import Error from "./components/Error";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}  >
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
  <Route path="vans" element={<Vans />} loader={VansLoader} errorElement={<Error/>} />
  <Route path="vans/:id" element={<VanDetail />} />

  <Route path="host" element={<HostLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="income" element={<Income />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="vans" element={<HostVans />} />

    <Route path="vans/:id" element={<HostVanDetail />}>
      <Route index element={<HostVanInfo />} />
      <Route path="pricing" element={<HostVanPricing />} />
      <Route path="photos" element={<HostVanPhotos />} />
    </Route>
  </Route>

  <Route path="*" element={<NotFound />} />

</Route>
))



function App() {
  return (<>


      <RouterProvider router={router} />



{/* sans route api : */}
    {/* <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />

            <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter> */}
  </>);
}

export default App;

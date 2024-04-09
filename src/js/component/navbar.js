import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
  const { store, actions } = useContext(Context);

  // const favoritesItems = () =>{
  //   store.favorites.map((item, index) =>{

  //   })
  // };

  return (
    <>
      {/* fixed-top */}
      <nav class="navbar navbar-light bg-light" mb-2>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Offcanvas navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Favoritos
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                    {store.favorites.map((contenido, index) => {
                      return (
                        <li key={index} className="list-group-item">
                          {contenido}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

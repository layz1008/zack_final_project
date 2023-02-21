import React from "react";
import "./userassets.css";

export default function UserAssets() {
    return(
  <div className="user-assets-card">
    <ul className="user-assets-list">
        <li className="user-asset">Privacy Policy</li> 
        <li className="user-asset"> User Agreement</li>
        <li className="user-asset">Code of Conduct</li>
        <li className="user-asset"> Github Repo</li>
        <li className="user-asset"> Our Devs</li>
    </ul>
  </div>
    )
}

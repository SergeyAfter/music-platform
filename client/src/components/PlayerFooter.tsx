import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faRandom,
  faUndo,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

const PlayerFooter = () => {
  return (
    <div className="player__footer">
      <ul className="list list--footer">
        <li>
          <button className="list__link">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </li>

        <li>
          <button className="list__link">
            <FontAwesomeIcon icon={faRandom} />
          </button>
        </li>

        <li>
          <button className="list__link">
            <FontAwesomeIcon icon={faUndo} />
          </button>
        </li>

        <li>
          <button className="list__link">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </li>
      </ul>
    </div>
  );
};
// #endregion

export default PlayerFooter;

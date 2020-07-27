import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileTop({
  profile: {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
  },
}) {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="Avatar" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} at {company && <span>{company}</span>}
      </p>
      <p>
        {location} at {location && <span>{location}</span>}
      </p>
      <div className="icons my-1">
        {social.website ? (
          <Link to={social.website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </Link>
        ) : null}
        {social.twitter ? (
          <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </Link>
        ) : null}
        {social.facebook ? (
          <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </Link>
        ) : null}
        {social.linkedin ? (
          <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </Link>
        ) : null}
        {social.youtube ? (
          <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </Link>
        ) : null}
        {social.instagram ? (
          <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

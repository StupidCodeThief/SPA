import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProfileItem({ profile }) {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = profile;

  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="Avatar" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} at {company && <span>{company}</span>}
        </p>
        <p>
          {location} at {location && <span>{location}</span>}
        </p>
        <Link to={`/profiles/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 5).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteExperience } from "../../actions/profile";

function Experience({ experiences, deleteExperience }) {
  const experiencesArray = experiences.map((exp) => (
    <div key={exp._id}>
      <h3 className="text-dark">{exp.company}</h3>
      <p>
        <Moment format="YYYY.MM.DD">{exp.from}</Moment>
        {" - "}
        {exp.current ? (
          "current"
        ) : (
          <Moment format="YYYY.MM.DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description}
      </p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => deleteExperience(exp._id)}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experiencesArray}
    </div>
  );
}

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteExperience,
};

export default connect(null, mapDispatchToProps)(Experience);

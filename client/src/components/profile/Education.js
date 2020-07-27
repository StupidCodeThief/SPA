import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEducation } from "../../actions/profile";

function Education({ educations, deleteEducation }) {
  const educationsArray = educations.map((edu) => (
    <div key={edu._id}>
      <h3>{edu.school}</h3>
      <p>
        <Moment format="YYYY.MM.DD">{edu.from}</Moment>
        {" - "}
        {edu.current ? (
          "current"
        ) : (
          <Moment format="YYYY.MM.DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {edu.description}
      </p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => deleteEducation(edu._id)}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {educationsArray}
    </div>
  );
}

Education.propTypes = {
  educations: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteEducation,
};

export default connect(null, mapDispatchToProps)(Education);

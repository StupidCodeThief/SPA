import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addExperience } from "../../actions/profile";

function AddExperience({ addExperience, history }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { company, title, location, from, to, current, description } = formData;

  const [toDateDisabled, toggle] = useState(false);

  const onToggle = (e) => {
    setFormData({ ...formData, current: !current });
    toggle(!toDateDisabled);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Experience</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any developer/programer
        positions that uoy have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={onToggle}
            />{" "}
            Current Job
          </label>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addExperience,
};

export default connect(null, mapDispatchToProps)(AddExperience);

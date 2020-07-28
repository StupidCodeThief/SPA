import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "../profile/Education";
import Experience from "../profile/Experience";
import ProfileAbout from "../profile/ProfileAbout";
import ProfileTop from "../profile/ProfileTop";
import ProfileGithub from "../profile/ProfileGithub";

import { getCurrentProfile } from "../../actions/profile";
import { deleteAccount } from "../../actions/profile";

function Dashboard({
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading },
  auth: { user },
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile === null ? (
        <>
          <p>There is no profile for this user</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          {profile.experience.length > 0 ? (
            <Experience experiences={profile.experience} />
          ) : null}
          {profile.education.length > 0 ? (
            <Education educations={profile.education} />
          ) : null}
          {profile.githubusername ? (
            <ProfileGithub />
          ) : null}
        </>
      )}
      <div className="my-2">
        <button className="btn btn-danger" onClick={deleteAccount}>
          <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

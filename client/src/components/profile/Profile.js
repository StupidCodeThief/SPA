import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import Experience from "./Experience";
import Education from "./Education";
import { getProfileById } from "../../actions/profile";

function Profile({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.loading === false && auth.user._id === profile.user._id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
          ) : null}
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
    </>
  );
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

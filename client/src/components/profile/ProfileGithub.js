import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import { getGithubRepos } from "../../actions/profile";

function ProfileGithub({
  getGithubRepos,
  profile: {
    repos,
    loading,
    profile: { githubusername },
  },
}) {
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos, githubusername]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {loading ? (
        <Spinner />
      ) : repos.length !== 0 ? (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No github repos found!</p>
      )}
    </div>
  );
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchTOProps = {
  getGithubRepos,
};

export default connect(mapStateToProps, mapDispatchTOProps)(ProfileGithub);

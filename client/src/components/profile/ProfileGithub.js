import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../common/Spinner";
import { getGithubRepos } from "../../actions/profile";

function ProfileGithub({ getGithubRepos, githubusername, repos }) {
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos, githubusername]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length === 0 ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div className="repo bg-white p-1 my-1">
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
      )}
    </div>
  );
}

ProfileGithub.propTypes = {
  githubusername: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

const mapDispatchTOProps = {
  getGithubRepos,
};

export default connect(mapStateToProps, mapDispatchTOProps)(ProfileGithub);

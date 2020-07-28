import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addLike, removeLike, deletePost } from "../../actions/post";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  removeLike,
  addLike,
  deletePost,
}) {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${user}`}>
          <img className="round-img" src={avatar} alt="Avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <Moment format="YYYY.MM.DD">{date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => addLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          {likes.length > 0 ? <span>{likes.length}</span> : null}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => removeLike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </Link>
        {user === auth.user._id ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletePost(_id)}
          >
            {" "}
            <i className="fas fa-times"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLike,
  removeLike,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

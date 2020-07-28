import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { removeComment } from "../../actions/post";

function CommentItem({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment,
}) {
  const onClick = () => removeComment(postId, _id);

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
          Posted on <Moment format="YYYY.MM.DD">{date}</Moment>
        </p>
        {auth.user._id === user && (
          <button type="button" className="btn btn-danger" onClick={onClick}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  removeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);

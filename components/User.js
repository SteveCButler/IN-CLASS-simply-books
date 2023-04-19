import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

function User({ userObj }) {
  return (
    <div className="text-light text-center">
      <Image
        className="rounded-circle"
        src={userObj.photoURL}
        alt="Profile"
        width="100px"
        height="100px"
      />
      <h2 className="mb-4">{userObj.displayName}</h2>
      <p>{userObj.email}</p>
      <p>{userObj.metadata.lastSignInTime}</p>
    </div>
  );
}

export default User;

User.propTypes = {
  userObj: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }).isRequired,
  }).isRequired,

};

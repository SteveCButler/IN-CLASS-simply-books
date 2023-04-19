import React from 'react';
import User from '../components/User';
import SignOutButton from '../components/SignOutButton';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="mt-5 w-50 mx-auto">
      <User userObj={user} />
      <div className="text-center mt-5">
        <SignOutButton />
      </div>
    </div>
  );
}

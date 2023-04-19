import { signOut } from '../utils/auth';

export default function SignOutButton() {
  return (
    <button type="button" className="btn btn-sm btn-info" onClick={signOut}>Sign Out</button>
  );
}

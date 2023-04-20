import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';

function Authors() {
  // Set a state for books
  const [authors, setAuthors] = useState([]);

  //  Get user ID using useAuth Hook
  const { user } = useAuth();

  //  Function that makes the API call to get all the books
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // Make the call to the API to get all the books on component render
  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap mt-3">
        {/* map over authors here using AuthorCard component */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
        ))}
      </div>
    </div>

  );
}

export default Authors;

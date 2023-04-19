import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
// import { getSingleAuthor } from '../../api/authorData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-white-50 pt-4">
        <h1>{authorDetails.first_name === undefined ? null : `${authorDetails.first_name} ${authorDetails.last_name}`}</h1>
        <p>{authorDetails.email}</p>
      </div>
      <div className="d-flex flex-wrap">
        {
          authorDetails.books?.map((book) => (
            <>
              <BookCard key={book.firebaseKey} bookObj={book} onUpdate={viewAuthorDetails} />
            </>
          ))
        }

      </div>
    </>
  );
}

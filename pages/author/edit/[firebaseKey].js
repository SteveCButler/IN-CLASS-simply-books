/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSingleAuthor } from '../../../api/authorData';
import AddAuthorForm from '../../../components/forms/AddAuthorForm';

export default function EditAuthor() {
  const [editAuthor, setEditAuthor] = useState({});
  console.warn('EditAuthor: ', editAuthor);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAuthor(firebaseKey).then((response) => setEditAuthor(response));
  }, []);

  return (
    <>
      <AddAuthorForm obj={editAuthor} />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
// import { getAuthors } from '../../api/authorData';
import { createBook, updateBook } from '../../api/bookData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  checked: false,

};

function NewAuthorForm({ obj }) {
  console.warn('newAuthorForm: ', obj);
  const [formInput, setFormInput] = useState(initialState);
  // const [authors, setAuthors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getAuthors(user.uid).then(setAuthors);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBook(formInput).then(() => router.push(`/book/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBook(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* First Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Author First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* Last Name INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Author Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* Email INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control type="email" placeholder="Enter Author Email" name="price" value={formInput.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="checked"
        label="Favorite"
        checked={formInput.checked}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

NewAuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    checked: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

NewAuthorForm.defaultProps = {
  obj: initialState,
};

export default NewAuthorForm;

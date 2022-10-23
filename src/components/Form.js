import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({ createAppointment }) => {
  const [appointment, setAppointment] = useState({
    pet: '',
    owner: '',
    date: '',
    time: '',
    symptoms: '',
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const { pet, owner, date, time, symptoms } = appointment;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (
      pet.trim() === '' ||
      owner.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' ||
      symptoms.trim() === ''
    ) {
      setError(true);
      return;
    }

    // Delete previous message
    setError(false);

    // Assign ID
    appointment.id = uuidv4();

    // Create appointment
    createAppointment(appointment);

    // Reset form
    setAppointment({
      pet: '',
      owner: '',
      date: '',
      time: '',
      symptoms: '',
    });
  };

  return (
    <>
      <h2>Create Appointment</h2>

      {error ? <p className="alert-error">All fields are required</p> : null}

      <form onSubmit={handleSubmit}>
        <label>Pet's Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Pet's Name"
          onChange={handleChange}
          value={pet}
        />

        <label>Owner´s Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Owner´s Name"
          onChange={handleChange}
          value={owner}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={handleChange}
          value={date}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          className="u-full-width"
          onChange={handleChange}
          value={time}
        />

        <label>Symptoms</label>
        <textarea
          className="u-full-width"
          name="symptoms"
          onChange={handleChange}
          value={symptoms}></textarea>

        <button type="submit" className="u-full-width button-primary">
          Add Appointment
        </button>
      </form>
    </>
  );
};

Form.propTypes = {
  createAppointment: PropTypes.func.isRequired,
};

export default Form;

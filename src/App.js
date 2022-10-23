import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {
  // Appointments in local storage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  if (!initialAppointments) {
    initialAppointments = [];
  }

  // Array of appointments
  const [appointments, setAppointments] = useState(initialAppointments);

  //Use effect to perform certain actions when the state changes
  useEffect(() => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
    if (initialAppointments) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } else {
      localStorage.setItem('appointments', JSON.stringify([]));
    }
  }, [appointments]);

  // Function to take current appointments and add the new one
  const createAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  // Function to delete an appointment by its ID
  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(newAppointments);
  };

  // Conditional message
  const title =
    appointments.length === 0 ? 'No Appointments' : 'Manage your appointments';

  return (
    <>
      <h1>Appointment Scheduling</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

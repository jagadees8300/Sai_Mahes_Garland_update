import React, { useState } from "react";

const OrderModal = ({ garland, onSubmit }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="modal">
      <h2>{garland.name}</h2>

      <label>Delivery Date</label>
      <input type="date" onChange={e => setDate(e.target.value)} />

      <label>Delivery Time</label>
      <input type="time" onChange={e => setTime(e.target.value)} />

      <label>Custom Message</label>
      <textarea
        placeholder="Message for garland"
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={() => onSubmit({ date, time, message })}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderModal;

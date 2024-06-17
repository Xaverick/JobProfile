// WhatsAppButton.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css'; // Optional: for styling

const WhatsAppButton = () => {
  const phoneNumber = import.meta.env.VITE_YOUR_PHONE_NUMBER; // Replace with your WhatsApp number
  console.log(phoneNumber);
  const message = 'Hello! I need support.'; // Initial message

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappUrl} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <FaWhatsapp size={40} />
    </a>
  );
};

export default WhatsAppButton;

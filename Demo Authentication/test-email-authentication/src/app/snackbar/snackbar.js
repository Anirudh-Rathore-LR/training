import React, { useEffect } from 'react';
import './snackbar.css'; // We'll define the styles next

const Snackbar = ({ message, isOpen, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after duration
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <div className={`snackbar ${isOpen ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Snackbar;

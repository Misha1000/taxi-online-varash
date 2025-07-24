// src/components/DriverForm.jsx

import React, { useState, useEffect } from 'react';

// Компонент для форми водія
function DriverForm({ onSubmit, defaultPhone = '' }) {
  // Стан для текстових полів
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [number, setNumber] = useState('');
  const [photoFile, setPhotoFile] = useState(null); // Файл фото

  // Автоматично підставляємо номер телефону
  useEffect(() => {
    setPhone(defaultPhone);
  }, [defaultPhone]);

  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();

    // Читаємо файл як base64 (але не показуємо прев’ю)
    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Передаємо дані батьківському компоненту
        onSubmit({
          name,
          phone,
          car,
          number,
          photo: reader.result, // base64-рядок
        });
      };
      reader.readAsDataURL(photoFile);
    } else {
      onSubmit({
        name,
        phone,
        car,
        number,
        photo: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Ім’я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />

      <input
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        readOnly
      /><br />

      <input
        placeholder="Марка авто"
        value={car}
        onChange={(e) => setCar(e.target.value)}
        required
      /><br />

      <input
        placeholder="Номер авто"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      /><br />

      {/* Поле для завантаження фото */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0] || null)}
      /><br />

      <button type="submit">Зареєструватися</button>
    </form>
  );
}

export default DriverForm;

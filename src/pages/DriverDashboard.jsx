import React, { useState, useEffect } from 'react';
import DriverForm from '../components/DriverForm';
import PhoneAuth from '../components/PhoneAuth';

function DriverDashboard() {
  // Чи підтверджений телефон
  const [isVerified, setIsVerified] = useState(false);
  // Телефон після підтвердження
  const [driverPhone, setDriverPhone] = useState('');
  // Дані водія після заповнення форми
  const [driverData, setDriverData] = useState(null);
  // Поточний екран (view): 'verify' | 'form' | 'profile'
  const [view, setView] = useState('verify'); 
  // Прапорець “успішна реєстрація” для плавного переходу
  const [isSubmitted, setIsSubmitted] = useState(false);

  // При завантаженні читаємо localStorage
  useEffect(() => {
    const verified = localStorage.getItem('driverVerified') === 'true';
    const phone = localStorage.getItem('driverPhone') || '';
    const savedData = localStorage.getItem('driverData');

    setIsVerified(verified);
    setDriverPhone(phone);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setDriverData(parsed);
      } catch {}
    }

    // Визначаємо, який екран показувати
    if (!verified) {
      setView('verify');
    } else if (verified && !savedData) {
      setView('form');
    } else {
      setView('profile');
    }
  }, []);

  // Коли користувач успішно підтвердив телефон
  const handleVerified = (phone) => {
    setIsVerified(true);
    setDriverPhone(phone);
    setView('form'); // Переходимо на форму
  };

  // Коли користувач відправив форму водія
  const handleDriverSubmit = (data) => {
    setIsSubmitted(true);

    // Зберігаємо в localStorage (щоб після перезавантаження все лишилося)
    localStorage.setItem('driverData', JSON.stringify(data));

    setTimeout(() => {
      setDriverData(data);
      setView('profile');
    }, 50);
  };

  // Для тестів/скидання (можеш заховати)
  const handleReset = () => {
    localStorage.removeItem('driverVerified');
    localStorage.removeItem('driverPhone');
    localStorage.removeItem('driverData');
    setIsVerified(false);
    setDriverPhone('');
    setDriverData(null);
    setIsSubmitted(false);
    setView('verify');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Кабінет водія</h2>

      <button onClick={handleReset} style={{ marginBottom: 10 }}>
        Скинути все (для тесту)
      </button>

      {/* Кожен екран обгортаємо у <div key=...>, щоб React гарантовано перемонтовував дерево */}
      {view === 'verify' && (
        <div key="verify">
          <PhoneAuth onVerified={handleVerified} />
        </div>
      )}

      {view === 'form' && (
        <div key="form">
          <p>Ваш підтверджений номер: <strong>{driverPhone}</strong></p>

          {isSubmitted ? (
            <p style={{ color: 'green' }}>
              Реєстрація успішна! Завантажую ваш профіль...
            </p>
          ) : (
            <DriverForm
              onSubmit={handleDriverSubmit}
              defaultPhone={driverPhone}
            />
          )}
        </div>
      )}

      {view === 'profile' && driverData && (
        <div key="profile">
          <p><strong>Ім’я:</strong> {driverData.name}</p>
          <p><strong>Телефон:</strong> {driverData.phone}</p>
          <p><strong>Авто:</strong> {driverData.car}</p>
          <p><strong>Номер:</strong> {driverData.number}</p>

          {driverData.photo && (
            <div style={{ margin: '10px 0' }}>
              <img src={driverData.photo} alt="Авто" width="200" />
            </div>
          )}

          <p><strong>Статус:</strong> 🟢 Онлайн</p>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;

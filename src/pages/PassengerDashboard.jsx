// src/pages/PassengerDashboard.jsx

// 1) Імпортуємо React і стани
import React, { useState, useEffect } from 'react';

// 2) Імпортуємо наш компонент авторизації пасажира (default-експорт)
import PhoneAuthPassenger from '../components/PhoneAuthPassenger';

// 3) Оголошуємо компонент — головна сторінка «Кабінет пасажира»
function PassengerDashboard() {
  // 4) Чи підтверджений телефон (читаємо з localStorage)
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem('passengerVerified') === 'true'
  );

  // 5) Імʼя пасажира (запам’ятовуємо)
  const [name, setName] = useState(localStorage.getItem('passengerName') || '');

  // 6) Адреса, яку вводить пасажир
  const [address, setAddress] = useState('');

  // 7) Історія останніх адрес (для підказок)
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('passengerHistory') || '[]')
  );

  // 8) Вибір авто
  const [car, setCar] = useState('bmw');

  // 9) Коли імʼя змінюється — зберігаємо його
  useEffect(() => {
    if (name) localStorage.setItem('passengerName', name);
  }, [name]);

  // 10) Обробник замовлення
  const handleOrder = (e) => {
    e.preventDefault();

    if (!address) {
      alert('Введіть адресу!');
      return;
    }

    // 11) Додаємо адресу в історію (без дублікатів, максимум 5)
    const newHistory = [address, ...history.filter((a) => a !== address)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('passengerHistory', JSON.stringify(newHistory));

    // 12) Тут можна буде відправити у базу, водіям тощо
    alert(`Таксі ${car.toUpperCase()} за адресою: ${address}`);
  };

  // 13) Якщо ще НЕ підтвердили телефон — показуємо авторизацію
  if (!isVerified) {
    return (
      <div style={{ padding: 20 }}>
        <PhoneAuthPassenger onVerified={() => setIsVerified(true)} />
      </div>
    );
  }

  // 14) Якщо телефон підтверджено — показуємо форму замовлення
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Кабінет пасажира</h2>

      <form onSubmit={handleOrder}>
        {/* 15) Імʼя пасажира */}
        <input
          type="text"
          placeholder="Ваше ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
          required
        />

        {/* 16) Поле адреси з підказками (історія) */}
        <input
          type="text"
          placeholder="Адреса подачі"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          list="address-suggestions"
          style={{ width: '100%', marginBottom: 10 }}
          required
        />

        {/* 17) Підказки з історії адрес */}
        <datalist id="address-suggestions">
          {history.map((addr, idx) => (
          <option key={idx} value={addr} />
          ))}
        </datalist>

        {/* 18) Вибір авто */}
        <label>Оберіть авто:</label>
        <select
          value={car}
          onChange={(e) => setCar(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="bmw">BMW</option>
          <option value="audi">Audi</option>
          <option value="merc">Mercedes</option>
        </select>

        {/* 19) Фото вибраного авто (беремо з public/images) */}
        <img
          src={`/images/${car}.jpg`}
          alt={car}
          style={{ width: '100%', marginBottom: 10, borderRadius: 8 }}
        />

        {/* 20) Кнопка замовити */}
        <button type="submit">Замовити</button>
      </form>
    </div>
  );
}

// 21) Експортуємо як default — щоб імпортувати без {}
export default PassengerDashboard;

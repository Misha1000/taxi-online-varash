// src/components/PhoneAuth.jsx

// 1) Імпортуємо React та useState, щоб зберігати стани (телефон, код і т.д.)
import React, { useState } from 'react';

// 2) Приймаємо проп onVerified — це функція, яку ми викличемо, коли користувач успішно введе код
function PhoneAuth({ onVerified }) {
  // 3) Зберігаємо телефон, який вводить користувач
  const [phone, setPhone] = useState('');
  // 4) Зберігаємо код, який “надсилаємо” (насправді просто покажемо через alert)
  const [generatedCode, setGeneratedCode] = useState(null);
  // 5) Зберігаємо те, що користувач вводить як отриманий код
  const [inputCode, setInputCode] = useState('');
  // 6) Стан, що показує — ми вже “надіслали” код і тепер чекаємо на введення
  const [step, setStep] = useState(1); // 1 — вводимо телефон, 2 — вводимо код

  // 7) Коли натискаємо “Надіслати код”
  const handleSendCode = (e) => {
    e.preventDefault(); // 8) Не перезавантажувати сторінку

    // 9) Генеруємо випадковий 4-значний код (наприклад, 1234)
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // 10) Зберігаємо його у стан
    setGeneratedCode(code);

    // 11) Для MVP показуємо код через alert (імітація SMS)
    alert(`Ваш код: ${code}`);

    // 12) Переходимо на крок 2 — ввід коду
    setStep(2);
  };

  // 13) Коли натискаємо “Підтвердити код”
  const handleVerify = (e) => {
    e.preventDefault();

    // 14) Якщо код, який ввели, дорівнює згенерованому — успіх!
    if (inputCode === generatedCode) {
      // 15) Ставимо в localStorage, що цей водій підтвердив телефон
      localStorage.setItem('driverVerified', 'true');
      localStorage.setItem('driverPhone', phone);

      // 16) Викликаємо onVerified(), щоб батьківський компонент знав — можна пускати далі
      onVerified(phone);
    } else {
      // 17) Якщо код неправильний — показуємо помилку
      alert('Невірний код. Спробуйте ще раз.');
    }
  };

  // 18) Рендеримо 2 різні форми — залежно від кроку
  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <h3>Підтвердження телефону (фейкове SMS)</h3>

      {/* 19) Крок 1 — вводимо телефон */}
      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <input
            type="tel"
            placeholder="Ваш номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit">Надіслати код</button>
        </form>
      )}

      {/* 20) Крок 2 — вводимо код, який “прийшов” (ми його показали в alert) */}
      {step === 2 && (
        <form onSubmit={handleVerify}>
          <p>Ми «надіслали» 4-значний код на номер: <strong>{phone}</strong></p>
          <input
          type="text"
          placeholder="Введіть код"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit">Підтвердити</button>
        </form>
      )}
    </div>
  );
}

// 21) Експортуємо компонент, щоб використати його в DriverDashboard
export default PhoneAuth;

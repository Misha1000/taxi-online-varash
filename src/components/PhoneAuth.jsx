import React, { useState, useEffect, useRef } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';

function PhoneAuth({ onVerified }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const confirmationResultRef = useRef(null);

  // Створюємо reCAPTCHA
  useEffect(() => {
    // якщо вже створена — не створюємо повторно
    if (window.recaptchaVerifier) return;

    // ВАЖЛИВО: у модульному SDK порядок аргументів такий:
    // new RecaptchaVerifier(auth, containerId, params)
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );

    // Обов'язково рендеримо, інакше отримаємо auth/argument-error
    window.recaptchaVerifier.render().catch((e) => {
      console.error('reCAPTCHA render error:', e);
    });
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        alert('reCAPTCHA не ініціалізована. Перезавантаж сторінку.');
        return;
      }

      const fullPhone = phone.startsWith('+') ? phone : `+${phone}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );

      confirmationResultRef.current = confirmationResult;
      setSmsSent(true);
      alert('SMS надіслано! Введіть код.');
    } catch (err) {
      console.error(err);
      alert('Помилка надсилання SMS: ' + err.message);

      // Скидуємо reCAPTCHA, щоб можна було спробувати ще раз
      try {
        window.recaptchaVerifier.clear();
      } catch (_) {}
      window.recaptchaVerifier = null;
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResultRef.current.confirm(code);
      const user = result.user;

      localStorage.setItem('driverVerified', 'true');
      localStorage.setItem('driverPhone', user.phoneNumber);

      onVerified(user.phoneNumber);
    } catch (err) {
      console.error(err);
      alert('Невірний код або строк дії минув. Спробуйте ще раз.');
      setSmsSent(false);
      setCode('');
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <h3>Підтвердження телефону (Firebase SMS)</h3>

      {/* Контейнер для reCAPTCHA – обовʼязково в DOM */}
      <div id="recaptcha-container" />

      {!smsSent ? (
        <form onSubmit={handleSendCode}>
          <input
            type="tel"
            placeholder="+380XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit">Надіслати код</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Код із SMS"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button type="submit">Підтвердити</button>
        </form>
      )}
    </div>
  );
}

export default PhoneAuth;

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ru: {
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      persons: 'Персоны',
      news: 'Новости',
      about: 'О нас',
      feedback: 'Обратная связь',
      login: 'Войти',
      profile: 'Профиль',
      admin: 'Админка',
      logout: 'Выйти',
    },
    home: {
      welcome: 'Добро пожаловать в EnergoLib',
      subtitle: 'Электронная библиотека колледжа',
      search: 'Поиск книг...',
      searchButton: 'Найти',
      featuredBooks: 'Избранные книги',
      featuredPersons: 'Известные персоны',
      viewAll: 'Смотреть все',
    },
    catalog: {
      title: 'Каталог книг',
      filterBySpecialty: 'Специальность',
      filterByLanguage: 'Язык',
      filterByTitle: 'Название',
      applyFilters: 'Применить',
      resetFilters: 'Сбросить',
      noBooks: 'Книги не найдены',
    },
    book: {
      read: 'Читать',
      loginToRead: 'Войдите, чтобы читать',
      author: 'Автор',
      year: 'Год издания',
      language: 'Язык',
      description: 'Описание',
      backToCatalog: 'Вернуться к каталогу',
    },
    persons: {
      title: 'Персоны',
      authors: 'Авторы',
      historicalFigures: 'Исторические личности',
      viewDetails: 'Подробнее',
    },
    news: {
      title: 'Новости',
      readMore: 'Читать далее',
      backToNews: 'Вернуться к новостям',
    },
    about: {
      title: 'О библиотеке',
      description: 'EnergoLib — современная электронная библиотека для студентов и преподавателей колледжа.',
      features: 'Возможности',
      feature1: 'Большой выбор учебной литературы',
      feature2: 'Удобный поиск по каталогу',
      feature3: 'Доступ из любой точки мира',
    },
    feedback: {
      title: 'Обратная связь',
      name: 'Ваше имя',
      email: 'Email',
      message: 'Сообщение',
      send: 'Отправить',
      sent: 'Сообщение отправлено',
    },
    auth: {
      login: 'Вход',
      register: 'Регистрация',
      resetPassword: 'Сброс пароля',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      fullName: 'ФИО',
      submit: 'Отправить',
      noAccount: 'Нет аккаунта?',
      haveAccount: 'Есть аккаунт?',
      forgotPassword: 'Забыли пароль?',
      backToLogin: 'Вернуться ко входу',
    },
    profile: {
      title: 'Личный кабинет',
      name: 'ФИО',
      email: 'Email',
      role: 'Роль',
      editProfile: 'Редактировать профиль',
    },
    admin: {
      title: 'Панель администратора',
      books: 'Книги',
      news: 'Новости',
      collections: 'Коллекции',
      persons: 'Персоны',
      createBook: 'Добавить книгу',
      createNews: 'Добавить новость',
      createCollection: 'Добавить коллекцию',
      createPerson: 'Добавить персону',
      edit: 'Редактировать',
      delete: 'Удалить',
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      save: 'Сохранить',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      ru: 'RU',
      kz: 'KZ',
    },
  },
  kz: {
    nav: {
      home: 'Басты бет',
      catalog: 'Каталог',
      persons: 'Тұлғалар',
      news: 'Жаңалықтар',
      about: 'Біз туралы',
      feedback: 'Кері байланыс',
      login: 'Кіру',
      profile: 'Профиль',
      admin: 'Әкімші',
      logout: 'Шығу',
    },
    home: {
      welcome: 'EnergoLib-ге қош келдіңіз',
      subtitle: 'Колледждің электронды кітапханасы',
      search: 'Кітап іздеу...',
      searchButton: 'Іздеу',
      featuredBooks: 'Таңдаулы кітаптар',
      featuredPersons: 'Әйгілі тұлғалар',
      viewAll: 'Барлығын көру',
    },
    catalog: {
      title: 'Кітап каталогы',
      filterBySpecialty: 'Мамандық',
      filterByLanguage: 'Тіл',
      filterByTitle: 'Атауы',
      applyFilters: 'Қолдану',
      resetFilters: 'Тазалау',
      noBooks: 'Кітаптар табылмады',
    },
    book: {
      read: 'Оқу',
      loginToRead: 'Оқу үшін кіріңіз',
      author: 'Авторы',
      year: 'Жылы',
      language: 'Тілі',
      description: 'Сипаттама',
      backToCatalog: 'Каталогқа оралу',
    },
    persons: {
      title: 'Тұлғалар',
      authors: 'Авторлар',
      historicalFigures: 'Тарихи тұлғалар',
      viewDetails: 'Толығырақ',
    },
    news: {
      title: 'Жаңалықтар',
      readMore: 'Толығырақ оқу',
      backToNews: 'Жаңалықтарға оралу',
    },
    about: {
      title: 'Кітапхана туралы',
      description: 'EnergoLib — колледж студенттері мен оқытушыларына арналған заманауи электронды кітапхана.',
      features: 'Мүмкіндіктер',
      feature1: 'Оқу әдебиетінің үлкен таңдауы',
      feature2: 'Каталог бойынша ыңғайлы іздеу',
      feature3: 'Кез келген жерден қол жеткізу',
    },
    feedback: {
      title: 'Кері байланыс',
      name: 'Атыңыз',
      email: 'Email',
      message: 'Хабарлама',
      send: 'Жіберу',
      sent: 'Хабарлама жіберілді',
    },
    auth: {
      login: 'Кіру',
      register: 'Тіркелу',
      resetPassword: 'Құпиясөзді қалпына келтіру',
      email: 'Email',
      password: 'Құпиясөз',
      confirmPassword: 'Құпиясөзді растаңыз',
      fullName: 'Аты-жөні',
      submit: 'Жіберу',
      noAccount: 'Аккаунт жоқ па?',
      haveAccount: 'Аккаунт бар ма?',
      forgotPassword: 'Құпиясөзді ұмыттыңыз ба?',
      backToLogin: 'Кіру бетіне оралу',
    },
    profile: {
      title: 'Жеке кабинет',
      name: 'Аты-жөні',
      email: 'Email',
      role: 'Рөлі',
      editProfile: 'Профильді өңдеу',
    },
    admin: {
      title: 'Әкімші панелі',
      books: 'Кітаптар',
      news: 'Жаңалықтар',
      collections: 'Коллекциялар',
      persons: 'Тұлғалар',
      createBook: 'Кітап қосу',
      createNews: 'Жаңалық қосу',
      createCollection: 'Коллекция қосу',
      createPerson: 'Тұлға қосу',
      edit: 'Өңдеу',
      delete: 'Жою',
    },
    common: {
      loading: 'Жүктелуде...',
      error: 'Қате',
      save: 'Сақтау',
      cancel: 'Болдырмау',
      confirm: 'Растау',
      ru: 'RU',
      kz: 'KZ',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return Cookies.get('language') || 'ru';
  });

  useEffect(() => {
    Cookies.set('language', language, { expires: 365 });
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }
    
    return value;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'kz' : 'ru');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

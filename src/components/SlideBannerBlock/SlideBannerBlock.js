import React, { useState, useEffect } from 'react';
import styles from './SlideBannerBlock.module.css';

const SlideBannerBlock = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Добро пожаловать в EnergoLib',
      subtitle: 'Тысячи книг в одном месте',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      title: 'Учебная литература',
      subtitle: 'Все специальности колледжа',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      title: 'Доступ 24/7',
      subtitle: 'Учитесь в удобное время',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={styles.slide}
            style={{ background: slide.image }}
          >
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideBannerBlock;

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const { t } = useTranslation('home');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    {
      label: t('details.day'),
      value: timeLeft.days,
      color: 'from-rose-400 to-pink-500',
    },
    {
      label: t('details.hours'),
      value: timeLeft.hours,
      color: 'from-purple-400 to-indigo-500',
    },
    {
      label: t('details.minutes'),
      value: timeLeft.minutes,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      label: t('details.seconds'),
      value: timeLeft.seconds,
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50/30"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
            {t('details.countdown-title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            {t('details.countdown-subtitle')}
          </p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: inView ? 1 : 0,
                scale: inView ? 1 : 0.8,
                y: inView ? 0 : 50,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1 + 0.2,
                type: 'spring' as const,
                stiffness: 100,
              }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-2`}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-br ${unit.color} opacity-20 rounded-bl-full rounded-tr-2xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <div className="inline-block bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-md border border-white/40">
            <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
              {timeLeft.days > 0
                ? `${timeLeft.days} ${t('details.days-until')}`
                : timeLeft.hours > 0
                ? `${timeLeft.hours} ${t('details.hours-until')}`
                : timeLeft.minutes > 0
                ? `${timeLeft.minutes} ${t('details.minutes-until')}`
                : t('details.moment-arrived')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

'use client';

import { useTranslate } from '@/locales';
import { motion } from 'motion/react';
import { useCallback } from 'react';

// Language Toggle Button Component
export function LanguageToggle() {
  const { onChangeLang, currentLang } = useTranslate();

  const isIndonesian = currentLang?.value === 'id';

  const handleChangeLang = useCallback(
    (newLang: string) => {
      onChangeLang(newLang);
    },
    [onChangeLang]
  );

  return (
    <motion.button
      onClick={() => handleChangeLang(isIndonesian ? 'en' : 'id')}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer text-gray-600 hover:text-blue-500 hover:bg-blue-50/80"
      title={`Switch to ${isIndonesian ? 'English' : 'Bahasa Indonesia'}`}
    >
      {/* Icon with Flag Animation */}
      <motion.span
        className="text-sm sm:text-base relative z-10"
        animate={{
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        {isIndonesian ? '🇮🇩' : '🇺🇸'}
      </motion.span>

      {/* Language Label */}
      <motion.span
        className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm font-medium"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        {isIndonesian ? 'ID' : 'EN'}
      </motion.span>

      {/* Hover Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at center, #3b82f6 0%, transparent 70%)',
        }}
      />

      {/* Active State Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg sm:rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

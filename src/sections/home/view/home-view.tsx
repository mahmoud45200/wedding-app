'use client';

import { useState, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  RSVP,
  GalleryPreview,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
} from '../components';
import { NAVIGATION_SECTIONS } from '@/constants';
import type { WeddingConfigType } from '@/types/wedding';

export default function HomeView({ weddingConfig }: { weddingConfig: WeddingConfigType }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);

  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  // Show letter animation first
  if (showLetter) {
    return (
      <LetterAnimation
        onOpen={handleLetterOpen}
        coupleName={`${weddingConfig.bride.name} & ${weddingConfig.groom.name}`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={weddingConfig}
          onScrollToSection={scrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction
          bride={weddingConfig.bride}
          groom={weddingConfig.groom}
          isVisible={isLoaded}
        />
      </section>

      {/* Wedding Details */}
      <section id="details" className="relative">
        <WeddingDetailsCard
          date={weddingConfig.date}
          venue={weddingConfig.venue}
        />
        <CountdownTimer targetDate={weddingConfig.date} />
      </section>

      {/* Venue Information */}
      <section id="venue" className="relative">
        <VenueInformation venue={weddingConfig.venue} />
        <EventSchedule />
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="relative">
        <GalleryPreview />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative">
        <RSVP />
      </section>

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={weddingConfig.bride.fullName}
          groom={weddingConfig.groom.fullName}
        />
      </section>

      {/* Music Player */}
      <MusicPlayer />

      {/* Mobile Navigation FAB */}
      <NavigationFAB
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}

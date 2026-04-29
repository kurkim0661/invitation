import { useState } from 'react';
import { invitation } from './data/invitation';
import { useInView } from './hooks/useInView';
import Header from './components/Header';
import Calendar from './components/Calendar';
import FamilyInfo from './components/FamilyInfo';
import ContactModal from './components/ContactModal';
import Rsvp from './components/Rsvp';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Transportation from './components/Transportation';
import GiftMoney from './components/GiftMoney';
import BgmPlayer from './components/BgmPlayer';

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={inView ? 'animate-fade-in-up' : 'opacity-0'}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-background">
      <BgmPlayer />
      <Header
        groomName={invitation.groomName}
        brideName={invitation.brideName}
        greeting={invitation.greeting}
      />
      <Section>
        <Calendar
          weddingDateDisplay={invitation.weddingDateDisplay}
          venueName={invitation.venue.name}
        />
      </Section>
      <Section>
        <FamilyInfo
          families={invitation.families}
          onContactClick={() => setIsContactOpen(true)}
        />
      </Section>
      <Section>
        <Rsvp rsvpFormUrl={invitation.externalLinks.rsvpFormUrl} />
      </Section>
      <Section>
        <Gallery images={invitation.galleryImages} />
      </Section>
      <Section>
        <Location venue={invitation.venue} kakaoMapUrl={invitation.externalLinks.kakaoMapUrl} />
      </Section>
      <Section>
        <Transportation
          transportation={invitation.venue.transportation}
          parking={invitation.venue.parking}
        />
      </Section>
      <Section>
        <GiftMoney
          groomAccounts={invitation.groomAccounts}
          brideAccounts={invitation.brideAccounts}
        />
      </Section>
      <ContactModal
        contacts={invitation.contacts}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;

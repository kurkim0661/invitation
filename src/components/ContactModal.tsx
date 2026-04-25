import { useEffect } from 'react';
import type { Contact } from '../data/types';

interface ContactModalProps {
  contacts: Contact[];
  isOpen: boolean;
  onClose: () => void;
}


function ContactItem({ contact }: { contact: Contact }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div>
        <p className="text-[14px] text-text">{contact.name}</p>
        <p className="text-[12px] text-text-light">{contact.role}</p>
      </div>
      <div className="flex gap-3">
        <a
          href={`tel:${contact.phone}`}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-label={`${contact.name}에게 전화`}
        >
          📞
        </a>
        <a
          href={`sms:${contact.phone}`}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-label={`${contact.name}에게 문자`}
        >
          💬
        </a>
      </div>
    </div>
  );
}

export default function ContactModal({ contacts, isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const groomSide = contacts.filter(c => c.role.includes('신랑'));
  const brideSide = contacts.filter(c => c.role.includes('신부'));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[320px] max-h-[80vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-[15px] font-medium text-text">
            연락하기
          </h3>
          <button
            onClick={onClose}
            className="text-text-light text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* 신랑 측 */}
        <div className="pt-3 pb-1">
          <p className="px-5 text-[12px] text-text-light font-medium mb-1">신랑 측</p>
          {groomSide.map((contact, idx) => (
            <ContactItem key={idx} contact={contact} />
          ))}
        </div>

        <div className="mx-5 border-t border-border" />

        {/* 신부 측 */}
        <div className="pt-3 pb-3">
          <p className="px-5 text-[12px] text-text-light font-medium mb-1">신부 측</p>
          {brideSide.map((contact, idx) => (
            <ContactItem key={idx} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
}

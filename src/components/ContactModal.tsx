import type { Contact } from '../data/types';

interface ContactModalProps {
  contacts: Contact[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ contacts, isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

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
          <h3 className="font-sans text-[15px] font-medium text-text">
            연락하기
          </h3>
          <button
            onClick={onClose}
            className="text-text-light text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="py-2">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p className="font-sans text-[14px] text-text">
                  {contact.name}
                </p>
                <p className="font-sans text-[12px] text-text-light">
                  {contact.role}
                </p>
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
          ))}
        </div>
      </div>
    </div>
  );
}

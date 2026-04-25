import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useClipboard } from '../hooks/useClipboard';

interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

interface GiftMoneyProps {
  groomAccounts: AccountInfo[];
  brideAccounts: AccountInfo[];
}

function AccountModal({ accounts, title, isOpen, onClose }: {
  accounts: AccountInfo[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) {
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="rounded-2xl w-[320px] max-h-[80vh] overflow-y-auto mx-4"
        style={{ backgroundColor: '#F2F2F2' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-[15px] font-medium text-text">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-text-light text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="py-3">
          {accounts.map((acc, idx) => (
            <AccountItem key={idx} account={acc} />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

function AccountItem({ account }: { account: AccountInfo }) {
  const { copy, copied } = useClipboard();
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div>
        <p className="text-[14px] text-text">{account.holder}</p>
        <p className="text-[12px] text-text-light">{account.bank} {account.number}</p>
      </div>
      <button
        onClick={() => copy(account.number)}
        className="px-3 py-1.5 text-[12px] border border-border rounded text-text-light transition-colors"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  );
}

export default function GiftMoney({ groomAccounts, brideAccounts }: GiftMoneyProps) {
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  return (
    <section className="px-8 py-14 text-center" style={{ backgroundColor: '#F2F2F2' }}>
      <h2 className="text-[18px] font-bold text-text mb-4">
        마음 전하기
      </h2>
      <p className="text-[14px] leading-[1.8] text-text-light mb-8">
        신랑, 신부에게 축복의 의미로
        <br />
        축의금을 전달할 수 있는 공간입니다.
      </p>

      <div className="space-y-3 mx-auto" style={{ maxWidth: '200px' }}>
        <button
          onClick={() => setGroomOpen(true)}
          className="w-full text-[16px] text-text-light tracking-wider rounded-[10px] border border-white transition-colors"
          style={{ padding: '14px 0', backgroundColor: 'transparent', boxShadow: '0 3px 10px rgba(0,0,0,0.12)' }}
        >
          신랑 측 계좌번호
        </button>
        <button
          onClick={() => setBrideOpen(true)}
          className="w-full text-[16px] text-text-light tracking-wider rounded-[10px] border border-white transition-colors"
          style={{ padding: '14px 0', backgroundColor: 'transparent', boxShadow: '0 3px 10px rgba(0,0,0,0.12)' }}
        >
          신부 측 계좌번호
        </button>
      </div>

      <AccountModal
        accounts={groomAccounts}
        title="신랑 측 계좌번호"
        isOpen={groomOpen}
        onClose={() => setGroomOpen(false)}
      />
      <AccountModal
        accounts={brideAccounts}
        title="신부 측 계좌번호"
        isOpen={brideOpen}
        onClose={() => setBrideOpen(false)}
      />
    </section>
  );
}

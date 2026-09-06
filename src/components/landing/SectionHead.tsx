import type { ReactNode } from 'react';

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  size?: 'md' | 'sm';
}

// The left-column heading every ledger section opens with: coffee mono eyebrow,
// bold grotesk title, optional standfirst under it.
export default function SectionHead({ eyebrow, title, children, size = 'md' }: SectionHeadProps) {
  return (
    <div data-reveal>
      <p className="meta-label mb-3.5">{eyebrow}</p>
      <h2
        className={`font-bold leading-[1.1] tracking-[-0.02em] text-ink text-balance ${
          size === 'md' ? 'text-[28px] md:text-[34px]' : 'text-[24px] md:text-[28px]'
        }`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

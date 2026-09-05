import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
  /** Force a specific variant instead of following the site theme toggle —
   *  for surfaces that stay one color regardless of theme, like the signup page. */
  forceVariant?: 'light' | 'dark';
}

export function Logo({ className = '', imgClassName = 'h-14 w-auto', onClick, forceVariant }: LogoProps) {
  const showLight = forceVariant !== 'dark';
  const showDark = forceVariant !== 'light';

  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center shrink-0 ${className}`}>
      {showLight && (
        <Image
          src="/images/light-logo.png"
          alt="AbsolutelyDeX"
          width={2172}
          height={724}
          priority
          className={`object-contain ${forceVariant ? '' : 'block dark:hidden'} ${imgClassName}`}
        />
      )}
      {showDark && (
        <Image
          src="/images/dark-logo.png"
          alt="AbsolutelyDeX"
          width={2172}
          height={724}
          priority
          className={`object-contain ${forceVariant ? '' : 'hidden dark:block'} ${imgClassName}`}
        />
      )}
    </Link>
  );
}

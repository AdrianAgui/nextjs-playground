import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Logo({ ...props }) {
  const { width, height } = props;
  const { locale } = useRouter();

  return (
    <Link locale={locale} href='/'>
      <a>
        <Image src='/logo.png' alt='logo-pokegen' width={width} height={height} />
      </a>
    </Link>
  );
}

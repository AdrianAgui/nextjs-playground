import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ ...props }) {
  const { width, height } = props;

  return (
    <Link href='/'>
      <a>
        <Image src='/logo.png' alt='logo-pokegen' width={width} height={height} />
      </a>
    </Link>
  );
}

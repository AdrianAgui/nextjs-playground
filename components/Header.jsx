import Link from 'next/link';
import Image from 'next/image';

import { Container } from '@nextui-org/react';

export default function Header() {
  return (
    <Container className="py-8" display="flex" justify="space-between" alignItems="center" responsive>
      <div style={{ cursor: 'pointer' }}>
        <Image src="https://fontmeme.com/permalink/220307/6ebe5c4201b070a3a0b1390fbba584ac.png" alt="fuente-pokemon" width={190} height={70}></Image>
      </div>

      <div>
        <Link href="/about">About</Link>
      </div>
    </Container>
  );
}

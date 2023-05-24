'use client';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props {
  href: string;
}

function NavBarItem({ href, children }: PropsWithChildren<Props>) {
  const pathName = usePathname();
  const onThisPage = pathName.startsWith(href);

  return (
    <Link href={href}>
      <Button variant={'ghost'} isActive={onThisPage}>
        {children}
      </Button>
    </Link>
  );
}

export default NavBarItem;

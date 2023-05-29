'use client';
import { Button, ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type Props = ButtonProps & {
  href: string;
};

function NavBarItem({ href, children, ...props }: PropsWithChildren<Props>) {
  const pathName = usePathname();
  const onThisPage =
    href === '/' ? href === pathName : pathName.startsWith(href);

  return (
    <Link href={href}>
      <Button variant={'ghost'} size={'lg'} isActive={onThisPage} {...props}>
        {children}
      </Button>
    </Link>
  );
}

export default NavBarItem;

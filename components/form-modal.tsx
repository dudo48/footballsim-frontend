import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type Props = ModalProps & {
  title: string;
};

function FormModal({ title, children, ...props }: PropsWithChildren<Props>) {
  return (
    <Modal size={'3xl'} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FormModal;

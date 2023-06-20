import Team from '@/interfaces/team.interface';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TeamsSelectorTable from './teams-selector-table';

type Props = {
  teams: Team[];
  setFinalSelectedTeams: (value: Team[]) => void;
  count: number;
  isOpen: boolean;
  onClose: () => void;
};

function TeamsSelectorModal({
  teams,
  setFinalSelectedTeams,
  count,
  ...props
}: Props) {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (selectedTeams.length === count) {
      setFinalSelectedTeams(selectedTeams);
      setSelectedTeams([]);
      props.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeams]);

  return (
    <Modal size={'3xl'} {...props}>
      <ModalOverlay />
      <ModalContent bg={'footballsim.700'}>
        <ModalHeader>{`Select ${
          count - selectedTeams.length
        } more team(s).`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TeamsSelectorTable
            teams={teams}
            selectedTeams={selectedTeams}
            setSelectedTeams={setSelectedTeams}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TeamsSelectorModal;

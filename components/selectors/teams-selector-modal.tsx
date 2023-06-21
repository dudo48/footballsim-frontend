import Team from '@/shared/interfaces/team.interface';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { differenceBy, sampleSize } from 'lodash';
import { useEffect, useState } from 'react';
import { BsShuffle } from 'react-icons/bs';
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
      props.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeams]);

  function completeSelectionRandomly() {
    const remaining = count - selectedTeams.length;
    const available = differenceBy(teams, selectedTeams, (t) => t.id);
    const selection = selectedTeams.concat(sampleSize(available, remaining));

    setSelectedTeams(selection);
  }

  return (
    <Modal size={'3xl'} {...props} onCloseComplete={() => setSelectedTeams([])}>
      <ModalOverlay />
      <ModalContent bg={'footballsim.700'}>
        <ModalHeader>
          {`Select ${count} team${count > 1 ? 's' : ''} (${
            selectedTeams.length
          } selected).`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Button
              w={'max-content'}
              variant={'outline'}
              colorScheme={'cyan'}
              leftIcon={<BsShuffle />}
              onClick={completeSelectionRandomly}
            >
              Complete Selection Randomly
            </Button>
            <TeamsSelectorTable
              teams={teams}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TeamsSelectorModal;

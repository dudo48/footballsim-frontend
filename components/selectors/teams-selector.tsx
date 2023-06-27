import Team from '@/shared/interfaces/team.interface';
import { PropsWithChildren } from 'react';
import TeamsSelectorModal from './teams-selector-modal';

interface Props {
  teams: Team[];
  setSelectedTeams: (value: Team[]) => void;
  count?: number;
  isOpen: boolean;
  onClose: () => void;
}

function TeamsSelector({
  teams,
  setSelectedTeams,
  count,
  isOpen,
  onClose,
}: PropsWithChildren<Props>) {
  return (
    <>
      <TeamsSelectorModal
        teams={teams}
        count={count && Math.floor(count) > 0 ? Math.floor(count) : 1}
        isOpen={isOpen}
        onClose={onClose}
        setFinalSelectedTeams={(value: Team[]) => setSelectedTeams(value)}
      />
    </>
  );
}

export default TeamsSelector;

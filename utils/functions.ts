import Team from '@/interfaces/team.interface';

export function getStrength(team: Team) {
  return team.attack + team.defense;
}

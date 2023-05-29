import Team from '@/interfaces/team.interface';

export function getStrength(team: Team) {
  return +((team.attack + team.defense) / 2).toFixed(2);
}

export function getAttackToDefenseRatio(team: Team) {
  return +(team.attack / team.defense).toFixed(2);
}

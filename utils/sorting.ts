import Team from '@/interfaces/team.interface';

export const teamSorts: { [key: string]: (a: Team, b: Team) => number } = {
  lastAdded: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  attack: (a, b) => a.attack - b.attack,
  defense: (a, b) => a.defense - b.defense,
  homeAdvantage: (a, b) => a.homeAdvantage - b.homeAdvantage,
  strength: (a, b) => teamSorts.attack(a, b) + teamSorts.defense(a, b),
};

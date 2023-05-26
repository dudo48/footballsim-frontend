import { colord } from 'colord';
import random from 'random';

interface TeamGenerationParameters {
  names: string[];
  strength: number;
  alpha: number;
}

function generateTeams(data: TeamGenerationParameters) {
  const getRandom = random.pareto(data.alpha);

  const n = 10;
  // multiply by two so that the mean is 1 not 0.5
  const getNoise = () => random.bates(n)() * 2;

  const teams = data.names.map((name) => {
    // attack and defense are related
    const strength = getRandom() * data.strength;
    const attack = Math.max(+(strength * getNoise()).toFixed(1), 0.1);
    const defense = Math.max(+(strength * getNoise()).toFixed(1), 0.1);

    return {
      name,
      attack,
      defense,
      homeAdvantage: 1.2,
      color: colord(
        `hsl(
        ${random.int(0, 255)},
        ${random.int(80, 100)}%,
        ${random.int(0, 100)}%
        )`
      ).toHex(),
    };
  });

  return teams;
}

export default generateTeams;

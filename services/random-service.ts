import { getRequest } from './requests';

const baseUrl = `${process.env.backendUrl}/random`;

export function getTeams(number: number, strength: number, alpha: number) {
  return getRequest(`${baseUrl}/teams`, {
    n: `${number}`,
    k: `${strength}`,
    a: `${alpha}`,
  });
}

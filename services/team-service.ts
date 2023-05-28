import Team from '@/interfaces/team.interface';
import useSWR from 'swr';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const baseUrl = `${process.env.backendUrl}/teams`;

export function useTeams() {
  const { data, error, isLoading, mutate } = useSWR(baseUrl, getRequest);

  return {
    teams: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useTeam(id: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrl}/${id}`,
    getRequest
  );

  return {
    team: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useTeamActions() {
  return {
    createTeam: (payload: Team) => postRequest(baseUrl, payload),
    createTeams: (payload: Team[]) =>
      postRequest(`${baseUrl}/multiple`, payload),
    updateTeam: (id: number, payload: Partial<Team>) =>
      putRequest(`${baseUrl}/${id}`, payload),
    deleteTeam: (id: number) => deleteRequest(`${baseUrl}/${id}`),
    getRandomTeams: (number: number, strength: number, alpha: number) =>
      getRequest(`${baseUrl}/random`, {
        n: `${number}`,
        k: `${strength}`,
        a: `${alpha}`,
      }),
  };
}

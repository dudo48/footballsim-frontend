import useSWR from 'swr';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const baseUrl = `${process.env.backendUrl}/teams`;

export function useTeams() {
  const { data, error, isLoading, mutate } = useSWR(baseUrl, getRequest);

  return {
    teams: data,
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
    createTeam: (payload: { [key: string]: string | number }) =>
      postRequest(baseUrl, payload),
    updateTeam: (id: number, payload: { [key: string]: string | number }) =>
      putRequest(`${baseUrl}/${id}`, payload),
    deleteTeam: (id: number) => deleteRequest(`${baseUrl}/${id}`),
  };
}

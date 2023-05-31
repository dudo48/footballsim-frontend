import Match from '@/interfaces/match.interface';
import MatchResult from '@/interfaces/matchResult.interface';
import Team from '@/interfaces/team.interface';

export function getStrength(team: Team) {
  return +((team.attack + team.defense) / 2).toFixed(2);
}

export function getAttackToDefenseRatio(team: Team) {
  return +(team.attack / team.defense).toFixed(2);
}

// from the vantage point of the home team
export function isWin(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  return result.fullTime.home > result.fullTime.away;
}

export function isDraw(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  return result.fullTime.home === result.fullTime.away;
}

export function isLoss(result?: MatchResult) {
  if (!result) throw new Error('result is undefined');
  return result.fullTime.home < result.fullTime.away;
}

export function getHomeGoals(match: Match) {
  const result = match.result;
  if (!result) return 0;
  return result.fullTime.home;
}

export function getAwayGoals(match: Match) {
  const result = match.result;
  if (!result) return 0;
  return result.fullTime.away;
}

export function getTotalGoals(match: Match) {
  const result = match.result;
  if (!result) return 0;
  return result.fullTime.home + result.fullTime.away;
}

export function getWinner(match: Match) {
  const result = match.result;
  if (!result) throw new Error('result is undefined');

  if (isWin(result)) {
    return match.homeTeam;
  } else if (isLoss(result)) {
    return match.awayTeam;
  }

  return null;
}

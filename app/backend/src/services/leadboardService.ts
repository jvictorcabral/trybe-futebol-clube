import Matches from '../database/models/matches';

interface ExpectedResult {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

const sumGoalsScored = (teamMatches: Matches[]) => {
  let GoalsScored = 0;

  teamMatches.map((team) => {
    GoalsScored += team.homeTeamGoals;
    return GoalsScored;
  });

  return GoalsScored;
};

const sumGoalsConceded = (teamMatches: Matches[]) => {
  let GoalsConceded = 0;

  teamMatches.map((team) => {
    GoalsConceded += team.awayTeamGoals;
    return GoalsConceded;
  });

  return GoalsConceded;
};

const calculateResults = (teamMatches: Matches[]) => {
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let score = 0;

  teamMatches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      wins += 1;
      score += 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
      score += 1;
    } if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });

  return { totalPoints: score, totalVictories: wins, totalDraws: draws, totalLosses: losses };
};

const filterHomeTeams = async (matches: Matches[], id: number, teamName: string) => {
  const finishFilter = matches.filter((match) => match.inProgress === false);

  const filterTeam = finishFilter.filter((match) => match.homeTeam === id);

  const goalsScored = sumGoalsConceded(filterTeam);

  const GoalsConceded = sumGoalsScored(filterTeam);

  const result = calculateResults(filterTeam);

  const efficiency = ((result.totalPoints / (filterTeam.length * 3)) * 100).toFixed(2);

  return {
    name: teamName,
    totalPoints: (result.totalLosses * 3) + (result.totalDraws),
    totalGames: filterTeam.length,
    totalVictories: result.totalLosses,
    totalDraws: result.totalDraws,
    totalLosses: result.totalVictories,
    goalsFavor: goalsScored,
    goalsOwn: GoalsConceded,
    goalsBalance: goalsScored - GoalsConceded,
    efficiency,
  };
};

const filterAwayTeams = async (matches: Matches[], id: number, teamName: string) => {
  const finishFilter = matches.filter((match) => match.inProgress === false);

  const filterTeam = finishFilter.filter((match) => match.awayTeam === id);

  const goalsScored = sumGoalsConceded(filterTeam);

  const GoalsConceded = sumGoalsScored(filterTeam);

  const result = calculateResults(filterTeam);

  const efficiency = ((result.totalPoints / (filterTeam.length * 3)) * 100).toFixed(2);

  return {
    name: teamName,
    totalPoints: (result.totalLosses * 3) + (result.totalDraws),
    totalGames: filterTeam.length,
    totalVictories: result.totalLosses,
    totalDraws: result.totalDraws,
    totalLosses: result.totalVictories,
    goalsFavor: goalsScored,
    goalsOwn: GoalsConceded,
    goalsBalance: goalsScored - GoalsConceded,
    efficiency,
  };
};

const sortTeams = (object: ExpectedResult[]) => {
  const result = object.sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints
  || teamB.totalVictories - teamA.totalVictories
  || teamB.goalsBalance - teamA.goalsBalance
  || teamB.goalsFavor - teamA.goalsFavor
  || teamA.goalsOwn - teamB.goalsOwn);

  return result;
};

export default {
  filterHomeTeams,
  filterAwayTeams,
  sortTeams,
};

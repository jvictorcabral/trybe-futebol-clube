import { Request, Response } from 'express';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import leaderboardService from '../services/leadboardService';

const getHome = async (_req: Request, res: Response) => {
  const matches = await Matches.findAll();

  const teams = await Teams.findAll();

  const homeTeam = await Promise
    .all(teams.map((team) => leaderboardService.filterHomeTeams(matches, team.id, team.teamName)));

  const result = leaderboardService.sortTeams(homeTeam);

  res.status(200).json(result);
};

const getAway = async (_req: Request, res: Response) => {
  const matches = await Matches.findAll();

  const teams = await Teams.findAll();

  const awayTeam = await Promise
    .all(teams.map((team) => leaderboardService.filterAwayTeams(matches, team.id, team.teamName)));

  const result = leaderboardService.sortTeams(awayTeam);

  res.status(200).json(result);
};

export default {
  getHome,
  getAway,
};

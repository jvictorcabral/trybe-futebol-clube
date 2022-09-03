import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const getMatches = async (_req: Request, res: Response) => {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  return res.status(200).json(matches);
};

export default {
  getMatches,
};

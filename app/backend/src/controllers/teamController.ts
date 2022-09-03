import { Request, Response } from 'express';
import Teams from '../database/models/teams';

const getTeams = async (_req: Request, res: Response) => {
  const teams = await Teams.findAll();

  return res.status(200).json(teams);
};

export default {
  getTeams,
};

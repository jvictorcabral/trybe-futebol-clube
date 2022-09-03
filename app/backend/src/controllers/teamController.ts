import { Request, Response } from 'express';
import Teams from '../database/models/teams';

const getTeams = async (_req: Request, res: Response) => {
  const teams = await Teams.findAll();

  return res.status(200).json(teams);
};

const getOneTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  const team = await Teams.findByPk(id);

  return res.status(200).json(team);
};

export default {
  getTeams,
  getOneTeam,
};

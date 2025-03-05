import Company from "../model/Company";
import { Request, Response } from "express";

// get companies tha have agentId in agents array
export const getCompaniesByAgent = async (req: Request, res: Response) => {
  const { agentId } = req.body;
  try {
    const companies = await Company.find({ agents: agentId });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

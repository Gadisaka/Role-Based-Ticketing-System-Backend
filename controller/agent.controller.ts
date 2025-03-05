import { Request, Response } from "express";
import Agent from "../model/Agent";
import Company from "../model/Company";
// import User from "../model/User";
import Customer from "../model/Customer";
import Ticket from "../model/Ticket";

export const getAgents = async (req: Request, res: Response) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAgent = async (req: Request, res: Response) => {
  const data = req.body;
  const email = data.email;
  try {
    const agent = await Agent.findOneAndUpdate({ email }, data, { new: true });
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

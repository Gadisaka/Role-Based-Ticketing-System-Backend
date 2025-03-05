import Company from "../model/Company";
import { Request, Response } from "express";
import Customer from "../model/Customer";
import Ticket from "../model/Ticket";

// title: string;
//   description: string;
//   status: "Open" | "In Progress" | "Resolved" | "Closed";
//   priority: "Low" | "Medium" | "High" | "Critical";
//   company: Types.ObjectId;
//   customer: Types.ObjectId;
//   agent?: Types.ObjectId;
//   history: ITicketHistory[];
//   attachments?: string[];
//   deadline?: Date;
//   tags?: string[];

export const createTicket = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const ticket = await Ticket.create({
      ...data,
      history: [{ action: "created", timestamp: Date.now() }],
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//change ticket status
export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    const ticket = await Ticket.findOneAndUpdate(
      { id: id },
      {
        status: status,
        history: [
          ...existingTicket.history,
          {
            action: "updated",
            user: existingTicket.agent,
            timestamp: Date.now(),
          },
        ],
      },
      { new: true }
    );
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//assign ticket to agent

export const assignTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { agentId } = req.body;
  try {
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    const ticket = await Ticket.findOneAndUpdate(
      { id: id },
      {
        agent: agentId,
        status: "In Progress",
        history: [
          ...existingTicket.history,
          { action: "assigned", user: agentId, timestamp: Date.now() },
        ],
      },
      { new: true }
    );
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

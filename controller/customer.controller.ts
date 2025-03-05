import { Request, Response } from "express";
import Customer from "../model/Customer";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

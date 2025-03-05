import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User";
import AgentSchema from "../model/Agent";
import Company from "../model/Company";
import Customer from "../model/Customer";

// login

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//sign up

export const signup = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    location,
    profession,
    service,
    bankingInfo,
    companyName,
  } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      const role = userExists.role;
      return res
        .status(400)
        .json({ message: `user already exists as ${role}` });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    switch (role) {
      case "company":
        const company = new Company({
          user: user.id,
          companyName: companyName,
          phone: phone,
          email: email,
          service: service,
          location: location,
          bankingInfo: bankingInfo,
        });
        await company.save();
        break;
      case "agent":
        const agent = new AgentSchema({
          user: user.id,
          profession: profession,
          phone: phone,
          bankingInfo: bankingInfo,
        });
        await agent.save();
        break;
      case "customer":
        const customer = new Customer({
          user: user._id,
          phone: phone,
          location: location,
        });
        await customer.save();
        break;
      default:
        throw new Error("Invalid role");
    }

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err: unknown) {
    res.status(500).json({ message: "Server error" });
  }
};

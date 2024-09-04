import { Request, Response } from "express";
import { EmissionService } from "../services/EmissionService";

export class EmissionController {
    static async submitEmission(req: Request, res: Response) {
        const { co2Emission, date } = req.body;
    
        // Ensure user is authenticated
        if (!req.user || typeof req.user.id !== "number") {
          return res.status(401).send("User is not authenticated");
        }
    
        const userId = req.user.id;
    
        if (!co2Emission || !date) {
          return res.status(400).send("CO2 emission and date are required");
        }
    
        try {
          await EmissionService.submitEmission(userId, co2Emission, date);
          res.status(201).send("Emission report submitted");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in submitEmission:", error.message);
            res.status(500).send(error.message);
          } else {
            console.error("Unknown error in submitEmission:", error);
            res.status(500).send("An unexpected error occurred");
          }
        }
      }

  static async getEmissions(req: Request, res: Response) {
    try {
      const emissions = await EmissionService.getEmissions();
      res.json(emissions);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getEmissions:", error.message);
        res.status(500).send(error.message);
      } else {
        console.error("Unknown error in getEmissions:", error);
        res.status(500).send("An unexpected error occurred");
      }
    }
  }

  static async getPredictedEmissions(req: Request, res: Response) {
    try {
      const predictions = await EmissionService.getPredictedEmissions();
      res.json(predictions);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getPredictedEmissions:", error.message);
        res.status(500).send(error.message);
      } else {
        console.error("Unknown error in getPredictedEmissions:", error);
        res.status(500).send("An unexpected error occurred");
      }
    }
  }

  static async getOverallReport(req: Request, res: Response) {
    try {
      const report = await EmissionService.getOverallReport();
      res.json(report);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getOverallReport:", error.message);
        res.status(500).send(error.message);
      } else {
        console.error("Unknown error in getOverallReport:", error);
        res.status(500).send("An unexpected error occurred");
      }
    }
  }
}

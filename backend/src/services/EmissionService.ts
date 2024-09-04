import { AppDataSource } from "../data-source";
import { Emission } from "../entity/Emission";
import { IndustryUser } from "../entity/IndustryUser";
import { BlockchainService } from "./BlockchainService";
import { PredictionService } from "./PredictionService";

export class EmissionService {
    static async submitEmission(industryUserId: number, co2Emission: number, date: string) {
        try {
          const industryUser = await AppDataSource.manager.findOne(IndustryUser, {
            where: { id: industryUserId },
          });
    
          if (!industryUser) {
            throw new Error("Industry user not found");
          }
    
          const emissionDate = new Date(date);
          if (isNaN(emissionDate.getTime())) {
            throw new Error("Invalid date format");
          }
    
          const emission = new Emission();
          emission.industryName = industryUser.companyName;
          emission.co2Emission = co2Emission;
          emission.date = emissionDate.toISOString();
          emission.industryUser = industryUser;
    
          await AppDataSource.manager.save(emission);
    
          await BlockchainService.submitEmission(industryUser.companyName, co2Emission, emissionDate.toISOString());
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in EmissionService.submitEmission:", error.message);
            throw error;
          } else {
            console.error("Unknown error in EmissionService.submitEmission:", error);
            throw new Error("An unexpected error occurred");
          }
        }
      }

  static async getEmissions() {
    try {
      const offChainEmissions = await AppDataSource.manager.find(Emission, { relations: ["industryUser"] });
      const onChainEmissions = await BlockchainService.getEmissions();
      return { offChainEmissions, onChainEmissions };
    } catch (error) {
      console.error("Error fetching emissions:", error);
      throw new Error("Failed to retrieve emissions");
    }
  }

  static async getPredictedEmissions() {
    try {
      return await PredictionService.predictEmissions();
    } catch (error) {
      console.error("Error fetching predicted emissions:", error);
      throw new Error("Failed to retrieve predicted emissions");
    }
  }

  static async getOverallReport() {
    try {
      const offChainEmissions = await AppDataSource.manager.find(Emission);
      const onChainEmissions = await BlockchainService.getEmissions();
      const predictedEmissions = await PredictionService.predictEmissions();

      return {
        offChainEmissions,
        onChainEmissions,
        predictedEmissions
      };
    } catch (error) {
      console.error("Error fetching overall report:", error);
      throw new Error("Failed to retrieve overall report");
    }
  }
}

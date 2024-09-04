// src/services/PredictionService.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import { AppDataSource } from "../data-source";
import { Emission } from "../entity/Emission";

const execAsync = promisify(exec);

export class PredictionService {
  static async predictEmissions() {
    await execAsync('python predict_emission.py');
    const predictedData = require('../../predicted_emission_data.csv');
    return predictedData;
  }
}

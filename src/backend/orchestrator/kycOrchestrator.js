/**
 * KYC Orchestrator Logic
 * Workflow: OCR -> Liveness -> Matching -> Dukcapil
 */
import { cobolBridgeService } from '../../services/cobolBridgeService';

export const KYC_PIPELINE = [
  { stage: 'OCR', critical: false },
  { stage: 'Liveness', critical: true },
  { stage: 'Matching', critical: false },
  { stage: 'Dukcapil', critical: false },
  { stage: 'COBOL_SCORING', critical: true },
];

export const kycOrchestrator = {
  processSubmission: async (submissionData) => {
    const results = {};
    
    for (const step of KYC_PIPELINE) {
      console.log(`Executing stage: ${step.stage}...`);
      
      try {
        const stepResult = await executeStage(step.stage, submissionData, results);
        results[step.stage] = stepResult;

        if (step.critical && !stepResult.success) {
          console.log(`Critical stage ${step.stage} failed. Terminating pipeline.`);
          return {
            status: 'FAILED',
            failedStage: step.stage,
            results: results,
            message: `KYC failed at critical stage: ${step.stage}`
          };
        }
      } catch (error) {
        console.error(`Error in stage ${step.stage}:`, error);
        return {
          status: 'ERROR',
          failedStage: step.stage,
          message: `Unexpected error in ${step.stage}`
        };
      }
    }

    return {
      status: 'COMPLETED',
      results: results,
      message: 'KYC pipeline completed successfully'
    };
  }
};

async function executeStage(stage, data, previousResults) {
  if (stage === 'COBOL_SCORING') {
    const scoring = await cobolBridgeService.calculateScore(data);
    return { 
      success: scoring.grade !== 'C', 
      score: scoring.score, 
      grade: scoring.grade, 
      message: `COBOL Score: ${scoring.score} (${scoring.grade})` 
    };
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      if (stage === 'Liveness' && Math.random() < 0.2) {
        resolve({ success: false, score: 0.4, message: 'Liveness check failed' });
      } else {
        resolve({ success: true, score: 0.95, message: 'Stage passed' });
      }
    }, 100);
  });
}

*> Purpose: Orchestrates the KYC pipeline: OCR -> Liveness -> Matching -> Dukcapil.
*>
*> Pseudocode:
*>   main-logic       - drives the pipeline and manages the flow
*>   0100-ocr         - simulates OCR processing
*>   0200-liveness    - simulates liveness check (critical stage)
*>   0300-matching    - simulates identity matching
*>   0400-dukcapil    - simulates Dukcapil verification
*>   0500-finalize    - determines final status and message

identification division.
program-id. kyc-orchestrator.

environment division.

data division.
working-storage section.
copy "kyc-data.cpy".

01  ws-current-stage    pic x(20).
01  ws-pipeline-failed   pic x(1) value 'N'.

procedure division.
main-logic.
    display "Starting KYC Orchestration..."
    
    move "OCR" to ws-current-stage
    perform 0100-ocr
    
    move "Liveness" to ws-current-stage
    perform 0200-liveness
    if ws-pipeline-failed = 'Y'
        go to 0500-finalize
    end-if
    
    move "Matching" to ws-current-stage
    perform 0300-matching
    
    move "Dukcapil" to ws-current-stage
    perform 0400-dukcapil
    
    perform 0500-finalize.

0100-ocr.
    display "Executing Stage: OCR"
    move 'Y' to stage-success
    move 0.92 to stage-score
    move "OCR passed" to stage-message
    move stage-score to ocr-res.

0200-liveness.
    display "Executing Stage: Liveness"
    *> Simulate critical failure
    if 1 < 2 *> dummy condition
        move 'Y' to stage-success
        move 0.88 to stage-score
        move "Liveness passed" to stage-message
        move stage-score to liveness-res
    else
        move 'N' to stage-success
        move 'Y' to ws-pipeline-failed
        move "Liveness failed" to stage-message
    end-if.

0300-matching.
    display "Executing Stage: Matching"
    move 'Y' to stage-success
    move 0.95 to stage-score
    move "Matching passed" to stage-message
    move stage-score to matching-res.

0400-dukcapil.
    display "Executing Stage: Dukcapil"
    move 'Y' to stage-success
    move 0.99 to stage-score
    move "Dukcapil passed" to stage-message
    move stage-score to dukcapil-res.

0500-finalize.
    if ws-pipeline-failed = 'Y'
        move "FAILED" to res-status
        move "KYC failed at critical stage: Liveness" to final-message
    else
        move "COMPLETED" to res-status
        move "KYC pipeline completed successfully" to final-message
    end-if
    
    display "Final Status: " res-status
    display "Message: " final-message
    stop run.

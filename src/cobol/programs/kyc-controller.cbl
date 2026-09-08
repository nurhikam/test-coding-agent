*> Purpose: Handles B2B KYC submission requests.
*>
*> Pseudocode:
*>   main-logic       - reads input request, calls orchestrator, outputs result
*>   0100-validate    - checks for missing required fields
*>   0200-process     - invokes the kyc-orchestrator logic
*>   0300-format-out   - formats the final response for the API gateway

identification division.
program-id. kyc-controller.

environment division.

data division.
working-storage section.
copy "kyc-data.cpy".

01  ws-validation-error  pic x(50).
01  ws-http-status       pic x(3).

procedure division.
main-logic.
    display "KYC Controller: Receiving Request..."
    
    perform 0100-validate
    if ws-validation-error not = space
        move "400" to ws-http-status
        display "HTTP " ws-http-status " Error: " ws-validation-error
        stop run
    end-if
    
    perform 0200-process
    perform 0300-format-out
    stop run.

0100-validate.
    *> Simulating check for document-image-path and liveness-video-path
    if document-image-path = space or liveness-video-path = space
        move "Missing required payload fields" to ws-validation-error
    end-if.

0200-process.
    display "Calling Orchestrator..."
    *> In a real environment, this would be a CALL "kyc-orchestrator"
    *> For this migration, we simulate the orchestrator's outcome
    move "COMPLETED" to res-status
    move 0.92 to ocr-res
    move 0.88 to liveness-res
    move 0.95 to matching-res
    move 0.99 to dukcapil-res
    move "KYC pipeline completed successfully" to final-message.

0300-format-out.
    move "200" to ws-http-status
    display "HTTP " ws-http-status
    display "Status: " res-status
    display "Message: " final-message
    display "Score: " matching-res.

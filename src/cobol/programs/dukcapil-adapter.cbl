*> Purpose: Implementasi Dukcapil Adapter for NIK validation via BNI Gateway.
*>
*> Pseudocode:
*>   main-logic       - initializes request, calls verification logic, displays result
*>   0100-verify-nik  - simulates HTTP POST call to /internal/dukcapil/verify
*>   0200-handle-err  - processes error codes and maps them to Dukcapil standards

identification division.
program-id. dukcapil-adapter.

environment division.
input-output section.

data division.
working-storage section.
copy "dukcapil-data.cpy".

01  ws-input-nik           pic x(16).
01  ws-simulated-status    pic x(1).
    88  service-up         value 'Y'.
    88  service-down       value 'N'.

procedure division.
main-logic.
    display "--- BNI Dukcapil Adapter ---"
    display "Enter NIK for validation: "
    accept ws-input-nik
    
    move ws-input-nik to req-nik
    
    perform 0100-verify-nik
    
    if res-error-code not = space
        perform 0200-handle-err
    else
        display "Verification Success!"
        display "Status: " res-status
        display "Data  : " res-data
    end-if
    
    stop run.

0100-verify-nik.
    display "Calling BNI Internal API Gateway: POST /internal/dukcapil/verify..."
    
    *> Simulate Gateway availability
    *> In a real system, this would be a CALL to a middleware module (e.g. CICS WEB)
    if ws-input-nik = "0000000000000000"
        set service-down to true
    else
        set service-up to true
    end-if
    
    if service-up
        move "VALID" to res-status
        move "NIK Verified: Name=Budi Santoso, Addr=Jakarta" to res-data
        move space to res-error-code
    else
        move space to res-status
        move space to res-data
        move "ERR-DUK-001" to res-error-code
        move "Service unavailable" to res-error-msg
    end-if.

0200-handle-err.
    display "Verification Failed!"
    display "Error Code: " res-error-code
    display "Message   : " res-error-msg.

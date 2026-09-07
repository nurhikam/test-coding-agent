*> Purpose: Validates NIK length and basic format for eKYC.
*>
*> Pseudocode:
*>   main-logic - reads NIK from input, checks length, displays result
identification division.
program-id. validate-nik.

data division.
working-storage section.
01  ws-nik          pic x(16).
01  ws-result       pic x(10).

procedure division.
main-logic.
    accept ws-nik
    if length of ws-nik = 16
        move "VALID" to ws-result
    else
        move "INVALID" to ws-result
    end-if
    display ws-result
    stop run.

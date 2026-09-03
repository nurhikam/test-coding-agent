identification division.
program-id. hello-sum.

data division.
working-storage section.
01  ws-counter       pic 9(2) value 0.
01  ws-sum           pic 9(4) value 0.
01  ws-max-sum       pic 9(4) value 9999.
01  ws-temp-sum      pic 9(5) value 0.

procedure division.
main-logic.
    perform varying ws-counter from 1 by 1 until ws-counter > 30
        compute ws-temp-sum = ws-sum + ws-counter
        if ws-temp-sum > ws-max-sum
            display "Error: Sum overflow!"
            stop run
        end-if
        add ws-counter to ws-sum
    end-perform.

    display "The sum of numbers from 1 to 30 is: " ws-sum.
    stop run.

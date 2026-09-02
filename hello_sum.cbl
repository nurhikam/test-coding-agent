identification division.
program-id. hello-sum.

data division.
working-storage section.
01  ws-counter       pic 9(2) value 0.
01  ws-sum           pic 9(4) value 0.

procedure division.
main-logic.
    perform varying ws-counter from 1 by 1 until ws-counter > 20
        add ws-counter to ws-sum
    end-perform.

    display "The sum of numbers from 1 to 20 is: " ws-sum.
    stop run.

identification division.
program-id. hello-sum.

data division.
working-storage section.
01  ws-counter       pic 9(3) value 0.
01  ws-sum           pic 9(5) value 0.

procedure division.
main-logic.
    perform varying ws-counter from 1 by 1 until ws-counter > 100
        if function rem(ws-counter, 2) = 0
            add ws-counter to ws-sum
        end-if
    end-perform.

    display "The sum of even numbers from 1 to 100 is: " ws-sum.
    stop run.

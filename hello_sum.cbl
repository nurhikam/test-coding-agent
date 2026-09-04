identification division.
program-id. hello-sum.

data division.
working-storage section.
01  ws-input-limit     pic 9(4) value 0.
01  ws-counter        pic 9(4) value 0.
01  ws-sum-even       pic 9(8) value 0.
01  ws-sum-odd        pic 9(8) value 0.
01  ws-count-even     pic 9(4) value 0.
01  ws-count-odd      pic 9(4) value 0.
01  ws-avg-even       pic 9(4)v99 value 0.
01  ws-avg-odd        pic 9(4)v99 value 0.
01  ws-display-avg-even pic z(4).99.
01  ws-display-avg-odd  pic z(4).99.

procedure division.
main-logic.
    perform get-input
    perform calculate-sums
    perform display-results
    stop run.

get-input.
    display "Enter a limit (1-1000): "
    accept ws-input-limit
    if ws-input-limit < 1 or ws-input-limit > 1000
        display "Invalid input! Please enter a number between 1 and 1000."
        perform get-input
    end-if.

calculate-sums.
    perform varying ws-counter from 1 by 1 until ws-counter > ws-input-limit
        if function rem(ws-counter, 2) = 0
            add ws-counter to ws-sum-even
            add 1 to ws-count-even
        else
            add ws-counter to ws-sum-odd
            add 1 to ws-count-odd
        end-if
    end-perform.

    if ws-count-even > 0
        compute ws-avg-even = ws-sum-even / ws-count-even
    end-if.
    if ws-count-odd > 0
        compute ws-avg-odd = ws-sum-odd / ws-count-odd
    end-if.

display-results.
    move ws-avg-even to ws-display-avg-even.
    move ws-avg-odd to ws-display-avg-odd.
    
    display "--- Results for limit " ws-input-limit " ---"
    display "Sum of Even Numbers: " ws-sum-even
    display "Count of Even Numbers: " ws-count-even
    display "Average of Even Numbers: " ws-display-avg-even
    display " "
    display "Sum of Odd Numbers: " ws-sum-odd
    display "Count of Odd Numbers: " ws-count-odd
    display "Average of Odd Numbers: " ws-display-avg-odd.

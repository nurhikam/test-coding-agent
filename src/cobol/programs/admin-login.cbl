*> Purpose: Validates Admin credentials and MFA code for Dashboard access.
*>
*> Pseudocode:
*>   main-logic       - drives the authentication sequence
*>   0100-auth-user   - validates username and password
*>   0200-verify-mfa  - validates the 6-digit TOTP code
*>   0300-grant-access - outputs the access token and user role

identification division.
program-id. admin-login.

environment division.
configuration section.
special-names.
    decimal-point is comma.

data division.
working-storage section.
01  ws-input-data.
    05 ws-username        pic x(20).
    05 ws-password        pic x(20).
    05 ws-mfa-code        pic x(6).

01  ws-stored-auth.
    05 ws-valid-user      pic x(20) value "admin".
    05 ws-valid-pass      pic x(20) value "password".
    05 ws-valid-mfa       pic x(6)  value "123456".

01  ws-status-flags.
    05 ws-auth-success    pic x value 'N'.
    05 ws-mfa-success     pic x value 'N'.
    05 ws-user-role       pic x(20) value "Super Admin".

procedure division.
main-logic.
    display "--- BNI eKYC ADMIN AUTHENTICATION ---"
    
    display "Enter Username: " with no advancing
    accept ws-username
    display "Enter Password: " with no advancing
    accept ws-password
    
    perform 0100-auth-user
    
    if ws-auth-success = 'Y'
        display "Credentials Valid. Enter TOTP MFA Code: " with no advancing
        accept ws-mfa-code
        perform 0200-verify-mfa
    else
        display "ERROR: Invalid AD BNI Credentials"
        stop run
    end-if
    
    if ws-mfa-success = 'Y'
        perform 0300-grant-access
    else
        display "ERROR: Invalid MFA Code"
        stop run
    end-if
    
    stop run.

0100-auth-user.
    if ws-username = ws-valid-user and ws-password = ws-valid-pass
        move 'Y' to ws-auth-success
    else
        move 'N' to ws-auth-success
    end-if.

0200-verify-mfa.
    if ws-mfa-code = ws-valid-mfa
        move 'Y' to ws-mfa-success
    else
        move 'N' to ws-mfa-success
    end-if.

0300-grant-access.
    display "------------------------------------"
    display "ACCESS GRANTED"
    display "User: " ws-username
    display "Role: " ws-user-role
    display "Token: BNI-JWT-MOCK-2026-TOKEN"
    display "------------------------------------".

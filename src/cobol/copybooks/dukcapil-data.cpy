*> Dukcapil Integration Data Structures
*> Used for NIK verification requests and responses

01  dukcapil-request.
    05  req-nik               pic x(16).

01  dukcapil-response.
    05  res-status            pic x(10).
    05  res-data              pic x(255).
    05  res-error-code        pic x(12).
    05  res-error-msg         pic x(50).

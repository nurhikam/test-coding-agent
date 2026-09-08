*> KYC Data Structures
*> Shared across orchestrator and controller

01  kyc-request.
    05  req-id              pic x(20).
    05  client-id           pic x(20).
    05  document-image-path pic x(100).
    05  liveness-video-path pic x(100).

01  stage-result.
    05  stage-success       pic x(1) value 'N'.
    05  stage-score         pic 9(2)v99.
    05  stage-message       pic x(50).

01  kyc-overall-result.
    05  res-status          pic x(10).
    05  res-request-id      pic x(20).
    05  ocr-res             pic 9(2)v99.
    05  liveness-res        pic 9(2)v99.
    05  matching-res        pic 9(2)v99.
    05  dukcapil-res        pic 9(2)v99.
    05  final-message       pic x(100).

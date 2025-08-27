# Flight Documentation:

## Flight Cancellation:
### ✈️ Cancellation Flow for Ticketed Bookings (Current Scenario):

🔹 Step 1: Get Cancellation Charges (Optional but Recommended)
Use this to show the user how much refund they'll get before proceeding.

API: Cancellation Charges Request Purpose: Fetch cancellation fee and refund amount.

```js
{
 "BookingId": "1583080",
 "RequestType": "2",           // 1 = Full, 2 = Partial
 "BookingMode": "5",           // Usually 5 for ticketed bookings
 "EndUserIp": "192.168.10.23",
 "TokenId": "your_token_here"
}
```

🔹 Step 2: Send Change Request (Actual Cancellation)

Use this to initiate cancellation of ticketed bookings.

✅ For Full Cancellation:
API: SendChangeRequest RequestType: 1 (Full) CancellationType: 3 (Cancel Ticket)

```js
{
  "BookingId": 1907823,
  "RequestType": 1,
  "CancellationType": 3,
  "Remarks": "User requested cancellation",
  "EndUserIp": "192.168.11.23",
  "TokenId": "your_token_here"
}
```
✅ For Partial Cancellation:
RequestType: 2 Include TicketId[] and Sectors[] as needed.

🔹 Step 3: Track Cancellation Status
After sending the change request, you’ll get a ChangeRequestId. Use this to poll the status.

API: GetChangeRequest

```js
{
  "ChangeRequestId": "199350",
  "EndUserIp": "your_ip",
  "TokenId": "your_token_here"
}

```
Status Codes:

1: Initiated

2: In Progress

4: Completed (Cancelled)
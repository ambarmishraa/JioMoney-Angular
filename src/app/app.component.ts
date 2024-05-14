import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // Define the URL you want to make a POST request to for authentication
    const authUrl = 'https://pp-apig.jiomoney.com/jfs/v1/app/authenticate';

    // Define the headers for the authentication request
    const authHeaders = {
      'x-trace-id': '01c570cf-2bdf-49d0-a126-baec7038bbd1',
      'Content-Type': 'application/json'
    };

    // Define the authentication request body
    const authRequestBody = {
      "application": {
        "clientId": "988f2f4e55ec3843fa12d6b8e25338f8"
      },
      "authenticateList": [
        {
          "mode": 22,
          "value": "255aaf0bd759d72de9f916660eb52bd6f610516aa4c63e480e382d5894e0fa30"
        }
      ],
      "scope": "SESSION",
      "purpose": 2
    };

    // Make a POST request for authentication using Axios
    axios.post(authUrl, authRequestBody, { headers: authHeaders })
      .then(authResponse => {
        // Handle successful authentication response
        console.log('Authentication response data:', authResponse.data);

        // Define the URL you want to make a POST request to for payments
        const paymentUrl = 'https://pp-apig.jiomoney.com/payments/jfs/v1/payments/intent';

        // Define the headers for the payment request
        const paymentHeaders = {
          'x-trace-id': '6aa23e8d-c808-4835-8dd5-905ef21985b7APPACCESS',
          'x-app-access-token': '1e662be7-9f46-4660-99b3-a87b89ce5855APPACCESS',
          'x-appid-token': "AW6nGuFcvr9bOsmUJcs4VEIUzL+nmjzIwel5S55MTxkonMckj1FPImL2pn8iUv9Mn7l8MzuJsaXW7q+2HrVqN7pAOrv38WxWzfD01A04o9NePwSSzhNIFxa0oQf84VjqqrmiUwISVnIV52NfoJAAoX8OPXOFHA3QM8aWtEllh/qkcQClm7U8qSXczNERXEp/EF0NTj9iTgdIyfeHwrADm/6/i5hLUOO3nODb8iy4/8QZZZcva+qGMKMXJxyQkziUpYeZSaMy6GsGs2UZrrxI7aqE95nYZ5i/FjPGNNeqHoTd/1J8xdn2ITV/wtCK8fiYp0SDuOj2djoWcGyUP2K/V/JU+taNS8gU3OnAkhcBCcqHkDrm4P3LKkSzW/HmuAnzlTlfIALU6bgJmw0Qxs+km6gPlhZYIx+pkTdluDcVJiLZxUXDAl9pyj1pbAIX/qlGjQuDVCVhYO8puxNOSqJRcHH/8vNOrBlCW9ZW3qC8k21Y7kZ+MUduPuu4hSFd69LVyb99ewc5G8p1TBIpQxdhyi5W1WBdIUg81Rv/plrK3TQ3eRYyMEh3MqN0a8cP2xlRXrgRSWg6P1dHtgmyNzxgZQWCLacPLNweQEpp9Dpmnc6/dpoVjRFvTnVbsxgnJW4gPTkYX9NaFYHOf0gsCFhO5UUQK+a/CHr0rse4SAUqsxV3PS3532/Hl4bLU2IMVJOF/2IevnObXan+lPzcS/n1+hSnOOG8v7GakdcaUFajmqFblaR2PGe+AcWGVmbIfVtv36RyqgKbS3QHpNjAcmh9+37gtN2CVKKMD8Q/FsA7mdZ449cMIkKxzoIblAK/a9rwU3uAJzzaW7fWusO86FSP1eL0gEvnkU14S+3lnd8M4G8VT4p3m26WLl1BRHrjTGX2ME1eehg4klyYwjeyC41U7DhGhKWNuiimyZwrFISVc6Egr5Rg5A18UON1KeaEzbMh",
          'Content-Type': 'application/json'
        };

        // Define the payment request body
        const paymentRequestBody = {
          "transaction": {
            "idempotentKey": this.generateRandomAlphaNumeric(3),
            "invoice": "JIO000" + Date.now().toString().substr(-2),
            "initiatingEntityTimestamp": "2023-04-20T18:17:32.324Z",
            "initiatingEntity": {
              "returnUrl": "https://psp-mandate-merchantsit.jiomoney.com:3003/merchantsimulator/pp/merchantstatus"
            }
          },
          "amount": {
            "netAmount": "1.23"
          },
          "payer": {
            "externalId": "JIO1234",
            "name": "test",
            "email": "user@xyz.com",
            "mobile": {
              "number": "1234567890",
              "countryCode": "91"
            }
          },
          "payee": {
            "merchantId": "100001000233342"
          },
          "checkout": {
            "template": {
              "id": "101"
            },
            "allowed": [
              {
                "rank": "1",
                "methodType": "110",
                "methodSubType": "582",
                "cardType": [110, 130, 131]
              },
              {
                "rank": "2",
                "methodType": "212",
                "methodSubType": "580"
              },
              {
                "rank": "3",
                "methodType": "110",
                "methodSubType": "566"
              },
              {
                "rank": "4",
                "methodType": "110",
                "methodSubType": "581"
              }
            ]
          }
        };

        // Make a POST request for payment using Axios
        axios.post(paymentUrl, paymentRequestBody, { headers: paymentHeaders })
          .then(paymentResponse => {
            // Handle successful payment response
            console.log('Payment response data:', paymentResponse.data);
          })
          .catch(paymentError => {
            // Handle payment error
            console.error('Error making payment:', paymentError);
          });
      })
      .catch(authError => {
        // Handle authentication error
        console.error('Error during authentication:', authError);
      });
  }

  // Function to generate random alphanumeric string of given length
  generateRandomAlphaNumeric(length: any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

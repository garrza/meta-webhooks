Meta Webhook Test Server with NestJS and HTTPS Tunneling
This project sets up a secure webhook test server for Meta using:

NestJS: A powerful Node.js framework for building efficient, scalable server-side applications.
HTTPS Tunneling (Microsoft Tunnel): Exposes your local server over HTTPS, which is required for Meta webhooks.
Features
Webhook Endpoint: Receives and processes webhooks from Meta.
Signature Verification: Ensures webhook authenticity and prevents unauthorized access.
Event Handling: Distinguishes between different Meta event types and routes them to specific handlers.
Error Handling: Includes robust error handling mechanisms for graceful recovery.
Prerequisites
Node.js and npm: Install the latest versions.
NestJS CLI: npm install -g @nestjs/cli
Microsoft Tunnel: Download and install the client from Microsoft's website.
Setup
Clone Repository: git clone <repository-url>
Install Dependencies: npm install
Microsoft Tunnel Configuration:
Follow Microsoft's instructions to set up your tunnel.
Obtain the HTTPS URL provided by the tunnel.
Meta Webhook Configuration:
In your Meta developer dashboard, create a new webhook subscription.
Use the HTTPS URL from your tunnel as the callback URL.
Select the events you want to receive webhooks for.
(Optional) Set a verification token for added security.
Environment Variables:
Create a .env file in the project root directory.
Add your Meta app secret and verification token (if used):
META_APP_SECRET=your_app_secret
META_VERIFY_TOKEN=your_verification_token
Running the Server
Development Mode:

Bash
npm run start:dev
Use code with caution.
content_copy
This will watch for changes and automatically restart the server.

Production Mode:

Bash
npm run start:prod
Use code with caution.
content_copy
Webhook Processing
The /webhook endpoint handles POST requests from Meta.
The WebhookController contains the logic for verifying signatures, extracting event data, and routing it to event-specific handlers.
Implement your custom logic within the event handlers (e.g., handlePageEvent, handleUserEvent).
Contributing
Feel free to submit pull requests or open issues to report bugs or suggest improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

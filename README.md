# Meta Webhook Test Server with NestJS and HTTPS Tunneling

This project sets up a secure webhook test server for Meta using:

- **NestJS**: A powerful Node.js framework for building efficient, scalable server-side applications.
- **HTTPS Tunneling (Microsoft Tunnel)**: Exposes your local server over HTTPS, which is required for Meta webhooks.

## Features

- **Webhook Endpoint**: Receives and processes webhooks from Meta.
- **Signature Verification**: Ensures webhook authenticity and prevents unauthorized access.
- **Event Handling**: Distinguishes between different Meta event types and routes them to specific handlers.
- **Error Handling**: Includes robust error handling mechanisms for graceful recovery.

## Prerequisites

- **Node.js and npm**: Install the latest versions.
- **NestJS CLI**: Install via `npm install -g @nestjs/cli`
- **Microsoft Tunnel**: Download and install the client from Microsoft's website.

## Setup

1. **Clone Repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Microsoft Tunnel Configuration**:

   - Follow Microsoft's instructions to set up your tunnel.
   - Obtain the HTTPS URL provided by the tunnel.

4. **Meta Webhook Configuration**:

   - In your Meta developer dashboard, create a new webhook subscription.
   - Use the HTTPS URL from your tunnel as the callback URL.
   - Select the events you want to receive webhooks for.
   - (Optional) Set a verification token for added security.

5. **Environment Variables**:
   - Create a `.env` file in the project root directory.
   - Add your Meta app secret and verification token (if used):
     ```plaintext
     META_APP_SECRET=your_app_secret
     META_VERIFY_TOKEN=your_verification_token
     ```

## Running the Server

### Development Mode

```bash
npm run start:dev
```

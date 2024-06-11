\documentclass{article}
\usepackage{hyperref} % For clickable links
\usepackage{listings} % For code formatting (if needed)

\title{Meta Webhook Test Server with NestJS and HTTPS Tunneling}

\begin{document}

\maketitle 

This project sets up a secure webhook test server for Meta using:

\begin{itemize}
\item \textbf{NestJS:} A powerful Node.js framework for building efficient, scalable server-side applications.
\item \textbf{HTTPS Tunneling (Microsoft Tunnel): } Exposes your local server over HTTPS, which is required for Meta webhooks.
\end{itemize}

\section{Features}
\begin{itemize}
\item \textbf{Webhook Endpoint:} Receives and processes webhooks from Meta.
\item \textbf{Signature Verification:} Ensures webhook authenticity and prevents unauthorized access.
\item \textbf{Event Handling:} Distinguishes between different Meta event types and routes them to specific handlers.
\item \textbf{Error Handling:} Includes robust error handling mechanisms for graceful recovery.
\end{itemize}

\section{Prerequisites}
\begin{itemize}
\item \textbf{Node.js and npm:} Install the latest versions.
\item \textbf{NestJS CLI:} \texttt{npm install -g @nestjs/cli}
\item \textbf{Microsoft Tunnel:} Download and install the client from Microsoft's website.
\end{itemize}

\section{Setup}

\begin{enumerate}
\item \textbf{Clone Repository:} \texttt{git clone <repository-url>}
\item \textbf{Install Dependencies:} \texttt{npm install}
\item \textbf{Microsoft Tunnel Configuration:}
   \begin{itemize}
   \item Follow Microsoft's instructions to set up your tunnel.
   \item Obtain the HTTPS URL provided by the tunnel.
   \end{itemize}
\item \textbf{Meta Webhook Configuration:}
   \begin{itemize}
   \item In your Meta developer dashboard, create a new webhook subscription.
   \item Use the HTTPS URL from your tunnel as the callback URL.
   \item Select the events you want to receive webhooks for.
   \item (Optional) Set a verification token for added security.
   \end{itemize}
\item \textbf{Environment Variables:}
   \begin{itemize}
   \item Create a \texttt{.env} file in the project root directory.
   \item Add your Meta app secret and verification token (if used):
     \begin{verbatim}
     META_APP_SECRET=your_app_secret
     META_VERIFY_TOKEN=your_verification_token
     \end{verbatim}
   \end{itemize}
\end{enumerate}

\section{Running the Server}

\textbf{Development Mode:}

\texttt{npm run start:dev}

This will watch for changes and automatically restart the server.

\textbf{Production Mode:}

\texttt{npm run start:prod } 



\section{Webhook Processing}
\begin{itemize}
\item The \texttt{/webhook} endpoint handles POST requests from Meta.
\item The \texttt{WebhookController} contains the logic for verifying signatures, extracting event data, and routing it to event-specific handlers.
\item Implement your custom logic within the event handlers (e.g., \texttt{handlePageEvent}, \texttt{handleUserEvent}).
\end{itemize}
 
\section{Contributing}
Feel free to submit pull requests or open issues to report bugs or suggest improvements.

\section{License}
This project is licensed under the MIT License - see the LICENSE file for details.
\end{document}

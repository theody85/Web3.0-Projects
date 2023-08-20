## Secure Digital Payments Server

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized.

This project incoporates Public Key Cryptography by using Elliptic Curve Digital Signatures to ensure that the server only allows transfers that have been signed for by the person who owns the associated address.

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `yarn` to install all the depedencies
3. Run `yarn dev` to start the application
4. Visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `yarn` to install all the depedencies
3. Run `node generate.js` to generate a few private keys & addresses with balances of 200
4. Run `yarn start` to start the server

The application should connect to the default server port (3042) automatically!

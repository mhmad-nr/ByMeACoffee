import { Suspense } from "react";
import AppRoute from "./Route";
import { StoreProvider } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MetaMaskProvider } from "@metamask/sdk-react";

const url =
  "https://api.studio.thegraph.com/query/960/buy-me-coffee/version/latest";
const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          forceInjectProvider: true,
          
          dappMetadata: {
            name: "Example React Dapp",
            url: window.location.href,
          },
        }}
      >
        <StoreProvider>
          <ApolloProvider client={client}>
            <AppRoute />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ApolloProvider>
        </StoreProvider>
      </MetaMaskProvider>
    </Suspense>
  );
}

export default App;

const Loading = () => {
  return <div>Loading...</div>;
};

import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { getLibrary } from 'utils/web3React';
import store from 'state';
import { light } from 'theme';

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <SCThemeProvider theme={light}>{children}</SCThemeProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WebContext = React.createContext();

function WebProvider({ children }) {
  const [searchString, setSearchString] = useState('');

  return (
    <WebContext.Provider
      value={{
        searchString,
        setSearchString
      }}
    >
      {children}
    </WebContext.Provider>
  );
}

const useWebContext = () => {
  const context = React.useContext(WebContext);

  if (context === undefined) {
    throw new Error(
      'useWebContext must be used within a WebProvider'
    );
  }

  return context;
};

WebProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default WebProvider;
export { useWebContext };

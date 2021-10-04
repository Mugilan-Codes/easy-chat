import React, {cloneElement} from 'react';

import ThemeProvider from './ThemeProvider';
import FirebaseProvider from './FirebaseProvider';

const ProviderComposer = ({contexts, children}) => {
  return contexts.reduceRight(
    (kids, parent) => cloneElement(parent, {children: kids}),
    children,
  );
};

const StateProvider = ({children}) => {
  return (
    <ProviderComposer contexts={[<ThemeProvider />, <FirebaseProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export default StateProvider;

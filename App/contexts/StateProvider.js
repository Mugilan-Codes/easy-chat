import React, {cloneElement} from 'react';

import ThemeProvider, {useTheme} from './ThemeProvider';

const ProviderComposer = ({contexts, children}) => {
  return contexts.reduceRight(
    (kids, parent) => cloneElement(parent, {children: kids}),
    children,
  );
};

const StateProvider = ({children}) => {
  return (
    <ProviderComposer contexts={[<ThemeProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export {useTheme};
export default StateProvider;

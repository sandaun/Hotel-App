import React, {createContext, useContext, useState} from 'react';

type HeaderConfig = {
  title: string;
  onFilterPress?: () => void;
  selectedFilter?: string;
  showBackButton: boolean;
};

const HeaderContext = createContext<{
  headerConfig: HeaderConfig;
  setHeaderConfig: React.Dispatch<React.SetStateAction<HeaderConfig>>;
} | null>(null);

export const HeaderProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    title: '',
    showBackButton: false,
  });

  return (
    <HeaderContext.Provider value={{headerConfig, setHeaderConfig}}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};

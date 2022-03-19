import React from 'react';
import { BattleshipContext, DEFAULT_SETTINGS, IBattleshipContext } from './hooks/use-battleship-context';
import { useRoutes } from 'react-router-dom';
import { routes } from './config/routes/setup-routes';
import { getFromStorage, setInStorage } from './utils/storage';
import { STORAGE_KEY } from './constants/application';

interface IOwnProps {}

const App: React.FC<IOwnProps> = () => {
  const RoutesNodes = useRoutes(routes);
  const [settings, setSettings] = React.useState<IBattleshipContext>(DEFAULT_SETTINGS);
  const setter = React.useCallback((settings: Partial<IBattleshipContext>) => {
    setSettings(prevValue => {
      const newValue = {
      ...prevValue,
      ...settings,
    };

    const { setter, ...rest } = newValue;
    setInStorage(STORAGE_KEY, rest);
    return newValue;
  })
  }, []);

  React.useEffect(() => {
    const storage = getFromStorage(STORAGE_KEY, DEFAULT_SETTINGS);
    setSettings(storage);
  }, []);

  return (
    <BattleshipContext.Provider value={{ ...settings, setter }}>
      {RoutesNodes}
    </BattleshipContext.Provider>
  );
};

export default App;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BridgeEvent, BRIDGE_NAVIGATE_TO } from './listeners';

export const useNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateTo = (path: string) => {
      navigate(path);
    };

    BridgeEvent.on(BRIDGE_NAVIGATE_TO, navigateTo);

    return () => {
      BridgeEvent.off(BRIDGE_NAVIGATE_TO, navigateTo);
    };
  }, [navigate]);

  return null;
};

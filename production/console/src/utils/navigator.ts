import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BRIDGE_NAVIGATE_BACK,
  BRIDGE_NAVIGATE_TO,
  BridgeEvent,
} from './listeners';

export const useNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateTo = (path: string) => {
      navigate(path);
    };
    const navigateBack = () => {
      navigate(-1);
    };

    BridgeEvent.on(BRIDGE_NAVIGATE_TO, navigateTo);
    BridgeEvent.on(BRIDGE_NAVIGATE_BACK, navigateBack);

    return () => {
      BridgeEvent.off(BRIDGE_NAVIGATE_TO, navigateTo);
      BridgeEvent.off(BRIDGE_NAVIGATE_BACK, navigateBack);
    };
  }, [navigate]);

  return null;
};

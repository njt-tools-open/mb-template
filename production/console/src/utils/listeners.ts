import { Listener } from '@app-fe/listener';

/** js bridge 事件 */
export const BridgeEvent = new Listener();

export const BRIDGE_NAVIGATE_TO = Symbol('BRIDGE_NAVIGATE_TO');
export const BRIDGE_NAVIGATE_BACK = Symbol('BRIDGE_NAVIGATE_BACK');

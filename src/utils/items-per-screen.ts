import { VirtualListConfig } from '../types';

export const itemsPerScreen = (config:Pick<VirtualListConfig,'container'|'itemHeight'>)=>Math.ceil(config.container.clientHeight/config.itemHeight);

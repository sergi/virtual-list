import { VirtualListConfig } from "../types";

export const itemsPerScript = (config:Pick<VirtualListConfig,"container"|"itemHeight">)=>Math.ceil(config.container.clientHeight/config.itemHeight);
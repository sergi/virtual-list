import { VirtualListConfig } from "../types";

export const itemsPerScript = (config:Pick<VirtualListConfig,"h"|"itemHeight">)=>Math.ceil(config.h/config.itemHeight);
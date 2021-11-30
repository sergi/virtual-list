import { VirtualListConfig } from "../types";

export const itemsPerScript = (config:Pick<VirtualListConfig,"height"|"itemHeight">)=>Math.ceil(config.height/config.itemHeight);
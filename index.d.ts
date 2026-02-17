export type TidPart = string | number;

export type TidConfig = {
  enabled?: boolean;
  attr?: string;
  sep?: string;
  sanitizer?: (value: string) => string;
};

export type TidRuntimeConfig = {
  enabled: boolean;
  attr: string;
  sep: string;
};

export type TidProps = Record<string, unknown>;

export declare function configure(options?: TidConfig): TidRuntimeConfig;

export declare function getConfig(): TidRuntimeConfig;

export declare function isEnabled(): boolean;

export declare function tid(
  id: string | TidPart[],
  extraProps?: Record<string, unknown>
): Record<string, unknown>;

export declare function tidValue(id: string | TidPart[]): string;

export type TidBuilder = {
  (...parts: TidPart[]): string;
  base(): string;
  of(...parts: TidPart[]): string;
  tid(...parts: TidPart[]): Record<string, unknown>;
  value(...parts: TidPart[]): string;
  with(
    parts: TidPart[] | TidPart,
    extraProps?: Record<string, unknown>
  ): Record<string, unknown>;
  child(childNamespace: string): TidBuilder;
  enable(): TidRuntimeConfig;
  disable(): TidRuntimeConfig;
};

export declare function createTid(namespace: string): TidBuilder;

export declare function makeJourneyTid(feature: string, screen: string): TidBuilder;

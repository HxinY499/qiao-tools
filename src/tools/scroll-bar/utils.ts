export interface ConfigType {
  scrollbar: { width: number };
  track: {
    'border-radius': number;
    'border-width': number;
    'background-color': string;
    'border-color': string;
    'border-style': 'solid' | 'dashed' | 'dotted' | 'double';
  };
  thumb: {
    'border-radius': number;
    'border-width': number;
    'background-color': string;
    'border-color': string;
    'border-style': 'solid' | 'dashed' | 'dotted' | 'double';
  };
  corner: { 'background-color': string };
}

export const initConfig: ConfigType = {
  scrollbar: { width: 15 },
  track: {
    'border-radius': 10,
    'border-width': 0,
    'border-style': 'solid',
    'background-color': '#CFCFCF',
    'border-color': '#000000',
  },
  thumb: {
    'border-radius': 10,
    'border-width': 0,
    'border-style': 'solid',
    'background-color': '#FFA116',
    'border-color': '#000000',
  },
  corner: { 'background-color': 'transparent' },
};

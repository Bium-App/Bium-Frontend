declare module '*.svg' {
  import type {FunctionComponent} from 'react';
  import type {SvgProps} from 'react-native-svg';

  const SvgComponent: FunctionComponent<SvgProps>;
  export default SvgComponent;
}

declare module 'react-native-vector-icons/Ionicons' {
  import type {ComponentType} from 'react';
  import type {TextProps} from 'react-native';

  export interface IoniconsProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  const Ionicons: ComponentType<IoniconsProps>;
  export default Ionicons;
}

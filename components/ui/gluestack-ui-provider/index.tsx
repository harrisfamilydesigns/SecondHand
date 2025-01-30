import { useRef, ReactNode } from 'react';
import { config } from './config';
import { ColorSchemeName, useColorScheme, View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { colorScheme as colorSchemeNW } from 'nativewind';

type ModeType = 'light' | 'dark' | 'system';

const getColorSchemeName = (
  colorScheme: ColorSchemeName,
  mode: ModeType
): 'light' | 'dark' => {
  if (mode === 'system') {
    return colorScheme ?? 'light';
  }
  return mode;
};

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: 'light' | 'dark' | 'system';
  children?: ReactNode;
  style?: ViewProps['style'];
}) {
  const prevColorScheme = useRef<null | ColorSchemeName>(null);
  const prevColorSchemeSetAt = useRef<number | null>(null);

  const colorScheme = useColorScheme();
  let nonNullRNColorScheme;
  if (colorScheme === null && prevColorScheme.current !== null && prevColorSchemeSetAt.current !== null && Date.now() - prevColorSchemeSetAt.current < 1000) {
    nonNullRNColorScheme = prevColorScheme.current;
  } else {
    nonNullRNColorScheme = colorScheme;
    prevColorScheme.current = colorScheme;
    prevColorSchemeSetAt.current = Date.now();
  }

  const colorSchemeName = getColorSchemeName(nonNullRNColorScheme, mode);

  colorSchemeNW.set(mode);

  return (
    <View
      style={[
        config[colorSchemeName],
        // eslint-disable-next-line react-native/no-inline-styles
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}

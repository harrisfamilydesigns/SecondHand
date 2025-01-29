import { ComponentProps } from "react";
import { SafeAreaView as _SafeAreaView } from "react-native-safe-area-context";
import classNames from "classnames";

export function SafeAreaView({className, ...props}: ComponentProps<typeof _SafeAreaView>) {
  return (
    <_SafeAreaView
      className={
        classNames(
          'bg-background-0',
          className
        )
      }
      {...props}
    />
  )
}

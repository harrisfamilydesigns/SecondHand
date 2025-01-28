import { ComponentProps, useState } from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

type SearchInputProps = ComponentProps<typeof Input> & {
  value: ComponentProps<typeof InputField>['value'];
  onChangeText: ComponentProps<typeof InputField>['onChangeText'];
};

export default function SearchInput({ onChangeText, value, ...props }: SearchInputProps) {
  return (
    <Input className="bg-gray-200 border-0" variant={'outline'} isInvalid={false} isDisabled={false} {...props}>
      <InputSlot>
        <InputIcon className="ml-3" as={SearchIcon} />
      </InputSlot>
      <InputField
        onChangeText={onChangeText}
        value={value}
        placeholder='Search'
      />
    </Input>
  )
}

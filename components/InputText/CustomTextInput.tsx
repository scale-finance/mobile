import { View, Text, TextInput } from "react-native";
import React from "react";
import { InputProps } from "../../auth-app";
const CustomTextInput: React.FC<InputProps> = ({label,onChangeText,icon,IsSecureText,keyboardType,placeholder,
}) => {
  return (
    <View className="flex justify-start w-full mb-4">
      {label && (
        <Text className="text-[#EFE3C8] mb-2 text-[13px]">{label}</Text>
      )}
      <View className="w-full bg-[#EFE3C8] border-[#EFE3C850] border-[1px] rounded-md h-[57px] p-1 flex justify-center items-center flex-row ">
        {icon && (
          <View className="flex items-center justify-center h-[38px] w-[38px]">
            {icon}
          </View>
        )}
        <TextInput  className="flex flex-1 bg-transparent text-lg text-[#979797] h-[50px] pl-2"
          onChangeText={onChangeText} secureTextEntry={IsSecureText}  keyboardType={keyboardType}   placeholder={placeholder}
          placeholderTextColor={"#979797"}
        />
      </View>
    </View>
  );
};
export default CustomTextInput;
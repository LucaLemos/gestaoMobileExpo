import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder, style }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={style}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;
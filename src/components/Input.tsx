import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../constants/colors';

// Usando StyleSheet para um componente simples
const Input = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor={colors.textSecondary}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});

export default Input;
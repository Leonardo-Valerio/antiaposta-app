// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { colors } from '../constants/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerUser, loginUser } from '../services/storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Novo estado para a senha
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    const user = await loginUser(email, password);
    setLoading(false);
    if (user) {
      navigation.replace('Main', { userId: user.uid });
    } else {
      Alert.alert('Falha no Login', 'E-mail ou senha incorretos.');
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha para criar a conta.');
      return;
    }
    setLoading(true);
    const newUser = await registerUser(email, password);
    setLoading(false);
    if (newUser) {
      Alert.alert('Sucesso!', 'Sua conta foi criada. Faça o login para continuar.');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Erro', 'Este e-mail já está em uso.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Aposta Consciente</Text>
        <Text style={styles.subtitle}>Entenda por que você sempre perde.</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input // Novo campo de senha
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry // Oculta a senha
        />
        <Button title="Entrar" onPress={handleLogin} loading={loading} />
        <Button title="Criar Conta" onPress={handleRegister} loading={loading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default LoginScreen;

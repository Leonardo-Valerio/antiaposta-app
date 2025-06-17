// src/screens/MainScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList, User } from '../types';
import { colors } from '../constants/colors';
import { getUserById, updateUser } from '../services/storage';
import Button from '../components/Button';
import Input from '../components/Input'; // Importando o componente de Input

type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  route: MainScreenRouteProp;
  navigation: MainScreenNavigationProp;
}

const MainScreen = ({ route, navigation }: Props) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [feedback, setFeedback] = useState('Digite um valor e faça sua aposta!');
  const [betAmount, setBetAmount] = useState(''); // Estado para o valor da aposta
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    const userData = await getUserById(userId);
    setUser(userData);
  }, [userId]);
  
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser])
  );

  const handleAposta = async () => {
    if (!user) return;

    const numericBetAmount = parseFloat(betAmount);
    if (isNaN(numericBetAmount) || numericBetAmount <= 0) {
      Alert.alert("Valor Inválido", "Por favor, insira um valor de aposta válido.");
      return;
    }

    if (user.saldoFicticio < numericBetAmount) {
      Alert.alert("Saldo Insuficiente", "Você não tem saldo para esta aposta. Adicione mais ou aposte um valor menor.");
      return;
    }
    
    setLoading(true);

    // Lógica de Probabilidade Dinâmica
    let winChance = 0;
    if (user.primeiraJogada) {
      winChance = 0.90; // 90% na primeira jogada
    } else {
      const baseChance = 0.25; // 25% de chance base
      // Redutor de chance: quanto maior a aposta em relação ao saldo, menor a chance
      const riskFactor = (numericBetAmount / user.saldoFicticio) * 0.5; // Fator de risco de até 50% da chance base
      winChance = Math.max(0.05, baseChance - (baseChance * riskFactor)); // Garante uma chance mínima de 5%
    }
    
    const vitoria = Math.random() < winChance;
    const prizeMultiplier = 2; // Ganhando, o usuário recebe 2x o valor apostado
    const valorGanho = numericBetAmount * prizeMultiplier;

    const novoSaldo = vitoria ? user.saldoFicticio + valorGanho : user.saldoFicticio - numericBetAmount;
    const feedbackMsg = vitoria ? `Parabéns! Você ganhou R$ ${valorGanho.toFixed(2)}!` : `Que pena! Você perdeu R$ ${numericBetAmount.toFixed(2)}.`;

    const userAtualizado: User = { ...user, saldoFicticio: novoSaldo, primeiraJogada: false };
    await updateUser(userAtualizado);
    
    setUser(userAtualizado);
    setFeedback(feedbackMsg);
    setBetAmount(''); // Limpa o campo de aposta
    setLoading(false);
  };

  if (!user) {
    return (
      <View style={styles.container}><Text style={styles.feedbackText}>Carregando...</Text></View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.saldoLabel}>Seu Saldo Fictício</Text>
            <Text style={styles.saldoValor}>R$ {user.saldoFicticio.toFixed(2)}</Text>
        </View>

        <View style={styles.gameArea}>
            <Text style={styles.feedbackText}>{feedback}</Text>
            <Input
              value={betAmount}
              onChangeText={setBetAmount}
              placeholder="Valor da aposta"
              keyboardType="numeric"
              style={styles.inputAposta}
            />
            <Button title={`Apostar R$ ${betAmount || '...'}`} onPress={handleAposta} loading={loading} />
        </View>

        <View style={styles.footer}>
            <Button title="Adicionar Saldo Fictício" onPress={() => navigation.navigate('Investment', { userId })} />
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Algorithm')}>
                <Text style={styles.secondaryButtonText}>Como o Algoritmo Funciona</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 10,
  },
  saldoLabel: { fontSize: 18, color: colors.textSecondary },
  saldoValor: { fontSize: 42, fontWeight: 'bold', color: colors.primary },
  gameArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  feedbackText: { fontSize: 20, color: colors.text, marginBottom: 20, textAlign: 'center', minHeight: 50 },
  inputAposta: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: { 
    alignItems: 'center', 
    width: '100%',
    paddingBottom: 55, 
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default MainScreen;

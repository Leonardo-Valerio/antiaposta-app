// src/screens/InvestmentScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { colors } from '../constants/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import { getUserById, updateUser } from '../services/storage';

type InvestmentScreenRouteProp = RouteProp<RootStackParamList, 'Investment'>;
type InvestmentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Investment'>;

interface Props {
  route: InvestmentScreenRouteProp;
  navigation: InvestmentScreenNavigationProp;
}

// Dados de exemplo para as sugestões de investimento
const investmentSuggestions = [
  { name: 'Tesouro Direto (Selic)', annualRate: 0.105 }, // 10.5% a.a.
  { name: 'CDB 110% do CDI', annualRate: 0.112 }, // 11.2% a.a.
  { name: 'Fundos Imobiliários (FIIs)', annualRate: 0.09 }, // 9% a.a.
];

const InvestmentScreen = ({ route, navigation }: Props) => {
    const { userId } = route.params;
    const [amount, setAmount] = useState('');

    const handleAddSaldo = async () => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            Alert.alert("Valor Inválido", "Por favor, insira um valor numérico maior que zero.");
            return;
        }

        const user = await getUserById(userId);
        if (user) {
            const userAtualizado = {
                ...user,
                saldoFicticio: user.saldoFicticio + numericAmount,
            };
            await updateUser(userAtualizado);
            navigation.goBack();
        }
    }

    const numericAmount = parseFloat(amount) || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Este dinheiro poderia render de verdade!</Text>
        <Text style={styles.description}>
          Qual valor fictício você gostaria de adicionar para jogar?
        </Text>
        
        <Input
          value={amount}
          onChangeText={setAmount}
          placeholder="Ex: 50.00"
          keyboardType="numeric"
        />

        {numericAmount > 0 && (
          <View style={styles.suggestionBox}>
              <Text style={styles.suggestionTitle}>Com R$ {numericAmount.toFixed(2)}, em 1 ano você teria (estimativa):</Text>
              {investmentSuggestions.map(investment => (
                <View key={investment.name} style={styles.suggestionItem}>
                    <Text style={styles.investmentName}>{investment.name}</Text>
                    <Text style={styles.investmentReturn}>
                        R$ {(numericAmount * (1 + investment.annualRate)).toFixed(2)}
                    </Text>
                </View>
              ))}
          </View>
        )}

        <Button title={`Adicionar R$ ${numericAmount > 0 ? numericAmount.toFixed(2) : '...'} de saldo`} onPress={handleAddSaldo} />
        <Button title="Entendi, voltar para o jogo" onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center'
  },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 20 },
  description: { fontSize: 16, color: colors.text, textAlign: 'center', marginBottom: 20, lineHeight: 24 },
  suggestionBox: { backgroundColor: colors.card, borderRadius: 10, padding: 20, marginBottom: 30, width: '100%' },
  suggestionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: 15 },
  suggestionItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.background },
  investmentName: { fontSize: 16, color: colors.text, flex: 1, marginRight: 10 },
  investmentReturn: { fontSize: 16, color: colors.primary, fontWeight: 'bold' }
});

export default InvestmentScreen;

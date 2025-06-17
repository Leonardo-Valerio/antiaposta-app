import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { colors } from '../constants/colors';
import Button from '../components/Button'; // Importando o componente de botão

// Definindo as propriedades de navegação para a tela
type AlgorithmScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Algorithm'>;

interface Props {
  navigation: AlgorithmScreenNavigationProp;
}

const AlgorithmScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Como o Algoritmo Funciona</Text>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. O "Gancho" da Primeira Vitória</Text>
                <Text style={styles.paragraph}>
                    Ao fazer sua primeira aposta, você tem uma probabilidade de vitória de 90%. Isso não é sorte, é uma estratégia de design comum em plataformas de apostas. O objetivo é criar uma falsa sensação de controle e sucesso inicial para te manter engajado.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. A Vantagem Dinâmica da "Casa"</Text>
                <Text style={styles.paragraph}>
                    Após a primeira jogada, sua chance de ganhar é redefinida para uma base de 25%. Essa probabilidade, no entanto, não é fixa. Ela diminui à medida que o valor da sua aposta aumenta em proporção ao seu saldo total.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. O Fator Risco</Text>
                <Text style={styles.paragraph}>
                    Apostar valores mais altos aumenta o risco de forma desproporcional. Neste simulador, quanto maior a aposta, menor sua chance de ganhar. Isso demonstra como tentar recuperar perdas com apostas grandes é a estratégia mais rápida para zerar seu saldo, um princípio fundamental que essas plataformas usam para garantir seu lucro.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. O Objetivo é Educar</Text>
                <Text style={styles.paragraph}>
                    Este aplicativo foi criado para ser transparente e te mostrar, na prática, os mecanismos que levam à perda de dinheiro. O objetivo aqui não é ganhar, mas sim entender o sistema para se proteger de perdas financeiras no mundo real.
                </Text>
            </View>
            
            {/* Botão para voltar para a tela principal */}
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    paddingBottom: 40, // Espaço extra no final para o botão
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  }
});

export default AlgorithmScreen;
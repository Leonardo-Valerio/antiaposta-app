export interface User {
  uid: string;
  email: string;
  password?: string; // Senha é opcional para não quebrar usuários antigos
  saldoFicticio: number;
  primeiraJogada: boolean;
}

/**
 * Define os parâmetros que cada rota na navegação pode receber.
 */
export type RootStackParamList = {
  Login: undefined;
  Main: { userId: string };
  Investment: { userId: string }; // A tela de investimento recebe o userId
  Algorithm: undefined;
};

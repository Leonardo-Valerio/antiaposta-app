// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USERS_KEY = '@ApostaConsciente:users';

/**
 * Busca todos os usuários salvos no AsyncStorage.
 */
const getUsers = async (): Promise<User[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao buscar usuários do armazenamento.', e);
    return [];
  }
};

/**
 * Salva a lista completa de usuários no AsyncStorage.
 */
const saveUsers = async (users: User[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar usuários no armazenamento.', e);
  }
};

/**
 * Simula o registro de um novo usuário com e-mail e senha.
 */
export const registerUser = async (email: string, password: string): Promise<User | null> => {
  if (!email || !password) return null;

  const users = await getUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return null; // E-mail já em uso
  }

  const newUser: User = {
    uid: String(Date.now()),
    email: email.toLowerCase(),
    password: password, // A senha é salva diretamente (em um app real, seria um hash)
    saldoFicticio: 100.00,
    primeiraJogada: true,
  };

  const updatedUsers = [...users, newUser];
  await saveUsers(updatedUsers);
  return newUser;
};

/**
 * Simula o login de um usuário com e-mail e senha.
 */
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  if (!email || !password) return null;

  const users = await getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (user && user.password === password) {
    return user; // Login bem-sucedido
  }

  return null; // Usuário não encontrado ou senha incorreta
};

/**
 * Busca um usuário específico pelo seu ID.
 */
export const getUserById = async (userId: string): Promise<User | null> => {
    const users = await getUsers();
    const user = users.find(u => u.uid === userId);
    return user || null;
}

/**
 * Atualiza os dados de um usuário específico.
 */
export const updateUser = async (updatedUser: User): Promise<void> => {
    const users = await getUsers();
    const userIndex = users.findIndex(u => u.uid === updatedUser.uid);

    if (userIndex > -1) {
        users[userIndex] = updatedUser;
        await saveUsers(users);
    } else {
        console.error("Tentativa de atualizar um usuário que não existe.");
    }
}

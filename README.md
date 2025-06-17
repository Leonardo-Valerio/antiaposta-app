# Aposta Consciente - Simulador Educativo de Apostas

## 🎯 Sobre o Projeto

**Aposta Consciente** é um aplicativo mobile, desenvolvido em React Native, que funciona como uma ferramenta educativa para demonstrar os riscos financeiros associados a jogos de aposta online. Em vez de promover o vício, o aplicativo simula a experiência de uma casa de apostas para provar matematicamente ao usuário que, a longo prazo, as chances estão sempre contra ele.

O objetivo principal é conscientizar sobre o custo de oportunidade do dinheiro, mostrando como os valores que seriam perdidos em apostas poderiam ser aplicados em investimentos reais e gerar retorno.

## ✨ Funcionalidades Principais

* **Autenticação de Usuário:** Sistema de cadastro e login com e-mail e senha, com os dados persistidos localmente no dispositivo usando `AsyncStorage`.
* **Simulador de Apostas Dinâmico:**
    * O usuário pode inserir o valor que deseja apostar em cada rodada.
    * O algoritmo de probabilidade é ajustado dinamicamente:
        * **Primeira Jogada:** 90% de chance de vitória para criar um "gancho" inicial.
        * **Jogadas Seguintes:** A chance de vitória base é de 25%, mas diminui à medida que o valor da aposta aumenta em proporção ao saldo do usuário.
* **Conscientização sobre Investimentos:** Ao tentar adicionar saldo fictício, o aplicativo exibe uma tela educativa que:
    * Permite ao usuário escolher o valor a ser adicionado.
    * Mostra uma estimativa de quanto aquele valor renderia em um ano se aplicado em investimentos reais, como Tesouro Direto e CDBs.
* **Transparência do Algoritmo:** Uma tela dedicada explica em detalhes toda a lógica de probabilidade utilizada no simulador, desmistificando a "sorte" e expondo a vantagem matemática da "casa".

## 🛠️ Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
* **React Navigation:** Biblioteca para gerenciamento de rotas e navegação entre telas.
* **AsyncStorage:** Armazenamento local no dispositivo para persistência dos dados do usuário.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [Android Studio](https://developer.android.com/studio) para acesso ao emulador Android.
* Ambiente de desenvolvimento React Native configurado. Siga o [guia oficial](https://reactnative.dev/docs/environment-setup) se necessário.

### Instalação

1.  **Clone o repositório** (ou descompacte os arquivos do projeto em uma pasta):
    ```bash
    # git clone https://github.com/Leonardo-Valerio/antiaposta-app
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd ApostaConsciente
    ```
3.  **Instale todas as dependências:**
    ```bash
    npm install
    ```

### Execução

1.  **Inicie um emulador Android** através do Android Studio.
2.  **Abra dois terminais** na pasta raiz do projeto.
3.  No **primeiro terminal**, inicie o servidor Metro:
    ```bash
    npx react-native start
    ```
4.  No **segundo terminal**, compile e instale o aplicativo no emulador:
    ```bash
    npx react-native run-android
    ```

Pronto! O aplicativo será instalado e iniciado no seu emulador.

## 📁 Estrutura de Pastas

O projeto está organizado da seguinte forma para garantir escalabilidade e manutenção:

```
/src
  /components     # Componentes reutilizáveis (Button, Input, etc.)
  /constants      # Constantes globais (cores, etc.)
  /navigation     # Configuração da navegação e rotas
  /screens        # Componentes de tela completos
  /services       # Lógica de negócios e comunicação com AsyncStorage
  /types          # Definições de tipos do TypeScript
```
## Imagens do App

* Tela Login
  ![image](https://github.com/user-attachments/assets/2cbfe317-4436-42cc-b598-8397ec72ba98)

* Tela Home
  ![image](https://github.com/user-attachments/assets/061a51e6-13e0-4080-97a9-4eb3b980b820)

* Tela Investimentos
  ![image](https://github.com/user-attachments/assets/96573f3c-7db8-4482-86e3-e84f730352ef)

* Tela Algoritmo
  ![image](https://github.com/user-attachments/assets/842c4da2-a623-4188-94c3-c818c36382ea)







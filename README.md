# Barbearia Afro - Sistema de Agendamento

Sistema de agendamento de serviços para barbearia desenvolvido com **Vue 3** e **Vuetify 3**, com design inspirado na **cultura afro-brasileira**.

## 📋 Descrição do Projeto

Este projeto foi desenvolvido como parte da Avaliação 1 da disciplina de Frameworks Modernos para Desenvolvimento de Sistemas (UNEMAT - TADS). O tema escolhido foi **T4. Agenda de Serviços (Barbearia)**.

A aplicação permite o gerenciamento completo de agendamentos e serviços de uma barbearia, com interface moderna, responsiva e culturalmente significativa, celebrando a estética e os valores da cultura afro.

## 🎨 Design e Cultura Afro

O design da aplicação incorpora elementos visuais que remetem à cultura afro:

- **Paleta de Cores**: Tons terrosos como marrom escuro (#6B4423), dourado (#D4AF37), laranja queimado (#E67E22), verde esmeralda (#27AE60) e azul royal (#3498DB)
- **Tipografia**: Fontes que combinam tradição e modernidade
- **Iconografia**: Ícones do Material Design Icons que representam os serviços e funcionalidades
- **Layout**: Interface limpa e organizada com elementos visuais que celebram a identidade afro

## ✨ Funcionalidades

### Página de Agenda (/)
- Listagem de agendamentos em cards visuais
- Criação de novos agendamentos
- Edição de agendamentos existentes
- Exclusão de agendamentos com confirmação
- Filtros por status (Confirmado, Concluído, Cancelado)
- Visualização de informações do cliente, serviço, data, hora e valor

### Página de Serviços (/servicos)
- CRUD completo de serviços
- Listagem em cards com informações de duração e preço
- Serviços pré-cadastrados: Corte Afro, Barba, Tranças, Dreadlocks, Relaxamento, Corte + Barba

### Página Sobre (/sobre)
- Informações sobre a barbearia
- Horário de funcionamento
- Regras de uso do sistema
- Informações técnicas da aplicação
- Dados de contato

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **Vuetify 3** - Framework de componentes Material Design
- **Vue Router** - Gerenciamento de rotas
- **Vite** - Build tool e dev server
- **localStorage** - Persistência de dados no navegador

## 📦 Requisitos

- **Node.js**: versão 18.x ou superior
- **npm**: versão 9.x ou superior

## 🚀 Como Instalar e Executar

### 1. Clone ou baixe o repositório

```bash
cd agenda-barbearia
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acesse a aplicação

Abra o navegador e acesse: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
agenda-barbearia/
├── src/
│   ├── assets/          # Arquivos estáticos (CSS, imagens)
│   ├── components/      # Componentes reutilizáveis
│   ├── router/          # Configuração de rotas
│   │   └── index.ts     # Definição das rotas
│   ├── views/           # Páginas da aplicação
│   │   ├── AgendaView.vue    # Página principal (CRUD de agendamentos)
│   │   ├── ServicosView.vue  # Página de serviços (CRUD)
│   │   └── SobreView.vue     # Página sobre o sistema
│   ├── App.vue          # Componente raiz com layout Vuetify
│   └── main.ts          # Ponto de entrada da aplicação
├── public/              # Arquivos públicos
├── package.json         # Dependências e scripts
├── vite.config.ts       # Configuração do Vite
└── README.md           # Este arquivo
```

## 🔧 Requisitos Atendidos

### Requisitos Funcionais e Técnicos

- ✅ **R1**: 3 páginas/rotas (Agenda, Serviços, Sobre)
- ✅ **R2**: Roteamento com vue-router
- ✅ **R3**: Componentização com props e comunicação entre componentes
- ✅ **R4**: Uso de diretivas v-for, v-if/v-else, v-bind, v-on, v-model
- ✅ **R5**: UI completa com Vuetify 3 (cards, forms, dialogs, snackbars, etc.)
- ✅ **R6**: Persistência em localStorage com sincronização automática
- ✅ **R7**: CRUD completo de agendamentos e serviços
- ✅ **R8**: Projeto executável com instruções no README

### Diretivas Utilizadas

- **v-for**: Listagem de agendamentos, serviços, horários e regras
- **v-if/v-else**: Renderização condicional de mensagens, status e elementos
- **v-bind**: Binding de atributos dinâmicos (cores, ícones, estilos)
- **v-on**: Manipulação de eventos (cliques, submissão de formulários)
- **v-model**: Two-way binding em formulários

### Componentes Vuetify Utilizados

- v-app, v-app-bar, v-navigation-drawer
- v-main, v-container, v-row, v-col
- v-card, v-card-title, v-card-text, v-card-actions
- v-form, v-text-field, v-select
- v-dialog, v-snackbar
- v-btn, v-icon, v-chip
- v-list, v-list-item
- v-alert, v-divider

## 💾 Persistência de Dados

Os dados são armazenados no **localStorage** do navegador nas seguintes chaves:

- `agendamentos`: Lista de todos os agendamentos
- `servicos`: Lista de serviços oferecidos

Os dados persistem entre recarregamentos da página e são sincronizados automaticamente após cada operação de criação, edição ou exclusão.

## 📝 Observações

- A aplicação é totalmente responsiva e funciona em dispositivos móveis, tablets e desktops
- Feedbacks visuais são fornecidos através de snackbars para todas as operações
- Confirmações são solicitadas antes de ações destrutivas (exclusão)
- O tema de cores foi customizado para refletir a cultura afro
- Serviços padrão são criados automaticamente na primeira execução

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

# Plano de Design e Estrutura da Agenda de Serviços (Cultura Afro)

## 1. Modelo de Dados

Para a agenda de serviços da barbearia, as seguintes entidades e seus atributos serão considerados:

### Cliente
- **id**: Identificador único (gerado automaticamente)
- **nome**: Nome completo do cliente
- **telefone**: Telefone de contato
- **email**: Endereço de e-mail (opcional)

### Serviço
- **id**: Identificador único (gerado automaticamente)
- **nome**: Nome do serviço (ex: Corte de Cabelo, Barba, Relaxamento)
- **duracao**: Duração estimada do serviço em minutos
- **preco**: Preço do serviço

### Agendamento
- **id**: Identificador único (gerado automaticamente)
- **clienteId**: Referência ao ID do cliente
- **servicoId**: Referência ao ID do serviço
- **data**: Data do agendamento
- **hora**: Hora do agendamento
- **status**: Status do agendamento (ex: Confirmado, Concluído, Cancelado)

Todos os dados serão persistidos no `localStorage` do navegador.

## 2. Estrutura de Rotas (mínimo 3 páginas)

Conforme o requisito R1 do documento, a aplicação terá no mínimo 3 páginas/rotas:

- **`/` (Home/Agenda)**: Página principal com a listagem dos próximos agendamentos em formato de cards. Permitirá a criação, edição e remoção de agendamentos.
- **`/servicos` (Serviços)**: Página para gerenciar os serviços oferecidos pela barbearia (CRUD de serviços).
- **`/sobre` (Sobre o Sistema)**: Página com informações sobre a aplicação, horário de funcionamento da barbearia e regras de uso (conforme T4 do documento).

## 3. Componentes Vuetify 3

Serão utilizados os seguintes componentes Vuetify para construir a interface:

- **v-app**: Componente raiz da aplicação.
- **v-app-bar**: Barra superior para navegação e título.
- **v-navigation-drawer**: Menu lateral (opcional, para navegação em telas menores).
- **v-main**: Área principal de conteúdo.
- **v-container**, **v-row**, **v-col**: Para layout responsivo.
- **v-card**: Para exibir agendamentos e serviços de forma visualmente atraente.
- **v-form**, **v-text-field**, **v-select**, **v-textarea**, **v-btn**: Para formulários de CRUD.
- **v-dialog**: Para confirmações e formulários modais.
- **v-snackbar**: Para feedback ao usuário (sucesso/erro).
- **v-data-table**: Para listagem de serviços (alternativa aos cards, se necessário).
- **v-date-picker**, **v-time-picker**: Para seleção de data e hora nos agendamentos.

## 4. Elementos de Design Inspirados na Cultura Afro

O design buscará incorporar elementos visuais que remetam à cultura afro, promovendo uma estética rica e significativa:

-   **Paleta de Cores**: Cores quentes e terrosas, como tons de marrom, dourado, laranja queimado e verde escuro, combinadas com toques de azul vibrante ou vermelho para contraste. Essas cores evocam a riqueza da terra, a energia do sol e a profundidade dos oceanos, presentes em muitas culturas africanas.
    -   Exemplos: `#6B4423` (marrom escuro), `#D4AF37` (dourado), `#E67E22` (laranja queimado), `#27AE60` (verde esmeralda), `#3498DB` (azul royal).

-   **Tipografia**: Fontes que combinem legibilidade com um toque artístico. Uma fonte serifada para títulos que transmita tradição e força, e uma fonte sans-serif limpa para o corpo do texto, garantindo clareza. A escolha de fontes pode remeter a padrões ou caligrafias encontradas em artefatos africanos.
    -   Exemplos de fontes (Google Fonts): `Merriweather` (serifada para títulos), `Open Sans` ou `Lato` (sans-serif para corpo).

-   **Iconografia e Ilustrações**: Utilização de ícones que remetam a símbolos Adinkra (Gana) ou outros padrões geométricos africanos de forma sutil. Ilustrações podem apresentar silhuetas de pessoas negras com penteados característicos (tranças, dreadlocks, black power) ou ferramentas de barbearia estilizadas com um toque étnico.

-   **Padrões e Texturas**: Fundos ou detalhes de componentes podem incorporar padrões geométricos inspirados em tecidos africanos (Kente, Ankara) ou texturas que simulem madeira escura ou argila. Isso adicionará profundidade e autenticidade ao design.

-   **Imagens**: Se houver espaço para imagens, elas devem retratar a diversidade e a beleza da cultura afro, com foco em penteados, barbas e o ambiente de uma barbearia moderna com raízes culturais.

-   **Layout e Espaçamento**: Um layout limpo e organizado, mas com a possibilidade de elementos visuais mais ousados e assimétricos para quebrar a monotonia e adicionar dinamismo, refletindo a vivacidade da cultura.

## 5. Acessibilidade e UX

-   **Contraste de Cores**: Garantir que a paleta de cores escolhida tenha contraste suficiente para atender aos padrões de acessibilidade (WCAG).
-   **Feedback Visual**: Utilizar `v-snackbar` para mensagens de sucesso/erro e `v-dialog` para confirmações antes de ações destrutivas (ex: exclusão de agendamento).
-   **Responsividade**: O layout será totalmente responsivo, adaptando-se a diferentes tamanhos de tela (desktop, tablet, mobile) utilizando o sistema de grid do Vuetify.

Este plano servirá como base para a implementação da aplicação na próxima fase.

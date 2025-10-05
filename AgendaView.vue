<script setup>
import { ref, computed, onMounted } from 'vue'

// Estados
const agendamentos = ref([])
const clientes = ref([])
const servicos = ref([])
const dialog = ref(false)
const dialogDelete = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const editedIndex = ref(-1)

// Formulário
const editedItem = ref({
  id: null,
  clienteNome: '',
  clienteTelefone: '',
  servicoId: null,
  data: '',
  hora: '',
  status: 'Confirmado'
})

const defaultItem = {
  id: null,
  clienteNome: '',
  clienteTelefone: '',
  servicoId: null,
  data: '',
  hora: '',
  status: 'Confirmado'
}

const statusOptions = ['Confirmado', 'Concluído', 'Cancelado']

// Computed
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Novo Agendamento' : 'Editar Agendamento'
})

const proximosAgendamentos = computed(() => {
  return agendamentos.value
    .filter(a => a.status !== 'Cancelado')
    .sort((a, b) => {
      const dateA = new Date(`${a.data}T${a.hora}`)
      const dateB = new Date(`${b.data}T${b.hora}`)
      return dateA - dateB
    })
})

// Métodos
const loadData = () => {
  const storedAgendamentos = localStorage.getItem('agendamentos')
  const storedServicos = localStorage.getItem('servicos')
  
  if (storedAgendamentos) {
    agendamentos.value = JSON.parse(storedAgendamentos)
  }
  
  if (storedServicos) {
    servicos.value = JSON.parse(storedServicos)
  } else {
    // Serviços padrão
    servicos.value = [
      { id: 1, nome: 'Corte Afro', duracao: 60, preco: 50 },
      { id: 2, nome: 'Barba', duracao: 30, preco: 30 },
      { id: 3, nome: 'Tranças', duracao: 120, preco: 120 },
      { id: 4, nome: 'Dreadlocks', duracao: 180, preco: 200 }
    ]
    localStorage.setItem('servicos', JSON.stringify(servicos.value))
  }
}

const saveData = () => {
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos.value))
}

const getServicoNome = (servicoId) => {
  const servico = servicos.value.find(s => s.id === servicoId)
  return servico ? servico.nome : 'N/A'
}

const getServicoPreco = (servicoId) => {
  const servico = servicos.value.find(s => s.id === servicoId)
  return servico ? `R$ ${servico.preco.toFixed(2)}` : 'N/A'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmado': return 'info'
    case 'Concluído': return 'success'
    case 'Cancelado': return 'error'
    default: return 'grey'
  }
}

const formatDate = (date) => {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const editItem = (item) => {
  editedIndex.value = agendamentos.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = agendamentos.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const deleteItemConfirm = () => {
  agendamentos.value.splice(editedIndex.value, 1)
  saveData()
  closeDelete()
  showSnackbar('Agendamento excluído com sucesso!')
}

const close = () => {
  dialog.value = false
  setTimeout(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  }, 300)
}

const closeDelete = () => {
  dialogDelete.value = false
  setTimeout(() => {
    editedItem.value = Object.assign({}, defaultItem)
    editedIndex.value = -1
  }, 300)
}

const save = () => {
  if (!editedItem.value.clienteNome || !editedItem.value.clienteTelefone || 
      !editedItem.value.servicoId || !editedItem.value.data || !editedItem.value.hora) {
    showSnackbar('Por favor, preencha todos os campos obrigatórios!')
    return
  }

  if (editedIndex.value > -1) {
    Object.assign(agendamentos.value[editedIndex.value], editedItem.value)
    showSnackbar('Agendamento atualizado com sucesso!')
  } else {
    editedItem.value.id = Date.now()
    agendamentos.value.push(Object.assign({}, editedItem.value))
    showSnackbar('Agendamento criado com sucesso!')
  }
  
  saveData()
  close()
}

const showSnackbar = (text) => {
  snackbarText.value = text
  snackbar.value = true
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <!-- Cabeçalho -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold" style="color: #6B4423;">
          <v-icon icon="mdi-calendar-clock" size="large" class="mr-2"></v-icon>
          Agenda de Atendimentos
        </h1>
        <p class="text-subtitle-1 mt-2" style="color: #6B4423;">
          Gerencie os agendamentos da barbearia
        </p>
      </v-col>
    </v-row>

    <!-- Botão Novo Agendamento -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn
          color="secondary"
          size="large"
          prepend-icon="mdi-plus"
          @click="dialog = true"
        >
          Novo Agendamento
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cards de Agendamentos -->
    <v-row v-if="proximosAgendamentos.length > 0">
      <v-col
        v-for="agendamento in proximosAgendamentos"
        :key="agendamento.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          elevation="4"
          class="agendamento-card"
          :style="{ borderLeft: `6px solid var(--v-theme-${getStatusColor(agendamento.status)})` }"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">{{ agendamento.clienteNome }}</span>
            <v-chip
              :color="getStatusColor(agendamento.status)"
              size="small"
              label
            >
              {{ agendamento.status }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <div class="mb-2">
              <v-icon icon="mdi-phone" size="small" class="mr-2"></v-icon>
              <strong>Telefone:</strong> {{ agendamento.clienteTelefone }}
            </div>
            <div class="mb-2">
              <v-icon icon="mdi-scissors-cutting" size="small" class="mr-2"></v-icon>
              <strong>Serviço:</strong> {{ getServicoNome(agendamento.servicoId) }}
            </div>
            <div class="mb-2">
              <v-icon icon="mdi-currency-brl" size="small" class="mr-2"></v-icon>
              <strong>Valor:</strong> {{ getServicoPreco(agendamento.servicoId) }}
            </div>
            <div class="mb-2">
              <v-icon icon="mdi-calendar" size="small" class="mr-2"></v-icon>
              <strong>Data:</strong> {{ formatDate(agendamento.data) }}
            </div>
            <div>
              <v-icon icon="mdi-clock-outline" size="small" class="mr-2"></v-icon>
              <strong>Hora:</strong> {{ agendamento.hora }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              icon="mdi-pencil"
              @click="editItem(agendamento)"
            ></v-btn>
            <v-btn
              color="error"
              variant="text"
              icon="mdi-delete"
              @click="deleteItem(agendamento)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mensagem quando não há agendamentos -->
    <v-row v-else>
      <v-col cols="12">
        <v-alert
          type="info"
          variant="tonal"
          icon="mdi-information"
        >
          Nenhum agendamento encontrado. Clique em "Novo Agendamento" para criar um.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Dialog de Edição/Criação -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.clienteNome"
                  label="Nome do Cliente *"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.clienteTelefone"
                  label="Telefone *"
                  prepend-icon="mdi-phone"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.servicoId"
                  :items="servicos"
                  item-title="nome"
                  item-value="id"
                  label="Serviço *"
                  prepend-icon="mdi-scissors-cutting"
                  variant="outlined"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.data"
                  label="Data *"
                  type="date"
                  prepend-icon="mdi-calendar"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.hora"
                  label="Hora *"
                  type="time"
                  prepend-icon="mdi-clock-outline"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="statusOptions"
                  label="Status"
                  prepend-icon="mdi-information"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>* Campos obrigatórios</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="close">Cancelar</v-btn>
          <v-btn color="primary" variant="elevated" @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este agendamento?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeDelete">Cancelar</v-btn>
          <v-btn color="error" variant="elevated" @click="deleteItemConfirm">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
.agendamento-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.agendamento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
}
</style>

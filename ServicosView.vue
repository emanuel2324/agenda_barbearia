<script setup>
import { ref, onMounted } from 'vue'

// Estados
const servicos = ref([])
const dialog = ref(false)
const dialogDelete = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const editedIndex = ref(-1)

// Formulário
const editedItem = ref({
  id: null,
  nome: '',
  duracao: 30,
  preco: 0
})

const defaultItem = {
  id: null,
  nome: '',
  duracao: 30,
  preco: 0
}

// Computed
const formTitle = () => {
  return editedIndex.value === -1 ? 'Novo Serviço' : 'Editar Serviço'
}

// Métodos
const loadData = () => {
  const storedServicos = localStorage.getItem('servicos')
  
  if (storedServicos) {
    servicos.value = JSON.parse(storedServicos)
  } else {
    // Serviços padrão
    servicos.value = [
      { id: 1, nome: 'Corte Afro', duracao: 60, preco: 50 },
      { id: 2, nome: 'Barba', duracao: 30, preco: 30 },
      { id: 3, nome: 'Tranças', duracao: 120, preco: 120 },
      { id: 4, nome: 'Dreadlocks', duracao: 180, preco: 200 },
      { id: 5, nome: 'Relaxamento', duracao: 90, preco: 80 },
      { id: 6, nome: 'Corte + Barba', duracao: 90, preco: 70 }
    ]
    saveData()
  }
}

const saveData = () => {
  localStorage.setItem('servicos', JSON.stringify(servicos.value))
}

const editItem = (item) => {
  editedIndex.value = servicos.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = servicos.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const deleteItemConfirm = () => {
  servicos.value.splice(editedIndex.value, 1)
  saveData()
  closeDelete()
  showSnackbar('Serviço excluído com sucesso!')
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
  if (!editedItem.value.nome || editedItem.value.duracao <= 0 || editedItem.value.preco <= 0) {
    showSnackbar('Por favor, preencha todos os campos corretamente!')
    return
  }

  if (editedIndex.value > -1) {
    Object.assign(servicos.value[editedIndex.value], editedItem.value)
    showSnackbar('Serviço atualizado com sucesso!')
  } else {
    editedItem.value.id = Date.now()
    servicos.value.push(Object.assign({}, editedItem.value))
    showSnackbar('Serviço criado com sucesso!')
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
          <v-icon icon="mdi-scissors-cutting" size="large" class="mr-2"></v-icon>
          Serviços Oferecidos
        </h1>
        <p class="text-subtitle-1 mt-2" style="color: #6B4423;">
          Gerencie os serviços disponíveis na barbearia
        </p>
      </v-col>
    </v-row>

    <!-- Botão Novo Serviço -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn
          color="secondary"
          size="large"
          prepend-icon="mdi-plus"
          @click="dialog = true"
        >
          Novo Serviço
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cards de Serviços -->
    <v-row v-if="servicos.length > 0">
      <v-col
        v-for="servico in servicos"
        :key="servico.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          elevation="4"
          class="servico-card"
          color="surface"
        >
          <v-card-title class="text-h5 text-primary">
            {{ servico.nome }}
          </v-card-title>

          <v-card-text>
            <div class="mb-3">
              <v-icon icon="mdi-clock-outline" size="small" class="mr-2" color="accent"></v-icon>
              <strong>Duração:</strong> {{ servico.duracao }} minutos
            </div>
            <div class="text-h4 text-secondary font-weight-bold">
              R$ {{ servico.preco.toFixed(2) }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              icon="mdi-pencil"
              @click="editItem(servico)"
            ></v-btn>
            <v-btn
              color="error"
              variant="text"
              icon="mdi-delete"
              @click="deleteItem(servico)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mensagem quando não há serviços -->
    <v-row v-else>
      <v-col cols="12">
        <v-alert
          type="info"
          variant="tonal"
          icon="mdi-information"
        >
          Nenhum serviço cadastrado. Clique em "Novo Serviço" para adicionar.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Dialog de Edição/Criação -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <span class="text-h5">{{ formTitle() }}</span>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.nome"
                  label="Nome do Serviço *"
                  prepend-icon="mdi-scissors-cutting"
                  variant="outlined"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.number="editedItem.duracao"
                  label="Duração (minutos) *"
                  type="number"
                  prepend-icon="mdi-clock-outline"
                  variant="outlined"
                  required
                  min="1"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model.number="editedItem.preco"
                  label="Preço (R$) *"
                  type="number"
                  prepend-icon="mdi-currency-brl"
                  variant="outlined"
                  required
                  min="0"
                  step="0.01"
                ></v-text-field>
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
          Tem certeza que deseja excluir este serviço?
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
.servico-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 6px solid #D4AF37;
}

.servico-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
}
</style>

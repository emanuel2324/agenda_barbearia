<script setup>
import { ref } from 'vue'

const horarios = [
  { dia: 'Segunda-feira', horario: '09:00 - 19:00' },
  { dia: 'Terça-feira', horario: '09:00 - 19:00' },
  { dia: 'Quarta-feira', horario: '09:00 - 19:00' },
  { dia: 'Quinta-feira', horario: '09:00 - 19:00' },
  { dia: 'Sexta-feira', horario: '09:00 - 20:00' },
  { dia: 'Sábado', horario: '08:00 - 18:00' },
  { dia: 'Domingo', horario: 'Fechado' }
]

const regras = [
  'Chegue com 5 minutos de antecedência',
  'Cancelamentos devem ser feitos com 2 horas de antecedência',
  'Respeite o horário agendado para melhor atendimento',
  'Menores de 18 anos devem estar acompanhados de responsável',
  'Pagamento pode ser feito em dinheiro, cartão ou PIX'
]
</script>

<template>
  <div>
    <!-- Cabeçalho -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold" style="color: #6B4423;">
          <v-icon icon="mdi-information" size="large" class="mr-2"></v-icon>
          Sobre o Sistema
        </h1>
        <p class="text-subtitle-1 mt-2" style="color: #6B4423;">
          Informações sobre a Barbearia Afro e o sistema de agendamento
        </p>
      </v-col>
    </v-row>

    <!-- Card Principal -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="4" class="mb-4">
          <v-card-title class="bg-primary text-white">
            <v-icon icon="mdi-content-cut" class="mr-2"></v-icon>
            Barbearia Afro
          </v-card-title>
          <v-card-text class="pt-4">
            <p class="text-body-1 mb-4">
              A <strong>Barbearia Afro</strong> é um espaço dedicado à celebração da cultura afro-brasileira através da arte da barbearia. 
              Oferecemos serviços especializados em cortes afro, tranças, dreadlocks e muito mais, sempre valorizando a identidade e 
              a beleza negra.
            </p>
            <p class="text-body-1 mb-4">
              Nossa missão é proporcionar não apenas um corte de cabelo, mas uma experiência cultural que fortalece a autoestima 
              e o orgulho de nossas raízes africanas.
            </p>
            <v-divider class="my-4"></v-divider>
            <div class="mb-2">
              <v-icon icon="mdi-map-marker" color="accent" class="mr-2"></v-icon>
              <strong>Endereço:</strong> Rua da Cultura, 123 - Centro, Cuiabá/MT
            </div>
            <div class="mb-2">
              <v-icon icon="mdi-phone" color="accent" class="mr-2"></v-icon>
              <strong>Telefone:</strong> (65) 99999-9999
            </div>
            <div class="mb-2">
              <v-icon icon="mdi-email" color="accent" class="mr-2"></v-icon>
              <strong>E-mail:</strong> contato@barbearia-afro.com.br
            </div>
            <div>
              <v-icon icon="mdi-instagram" color="accent" class="mr-2"></v-icon>
              <strong>Instagram:</strong> @barbearia.afro
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Horário de Funcionamento -->
      <v-col cols="12" md="6">
        <v-card elevation="4" class="mb-4">
          <v-card-title class="bg-secondary text-white">
            <v-icon icon="mdi-clock-outline" class="mr-2"></v-icon>
            Horário de Funcionamento
          </v-card-title>
          <v-card-text class="pt-4">
            <v-list>
              <v-list-item
                v-for="(item, index) in horarios"
                :key="index"
                :class="{ 'bg-grey-lighten-4': item.horario === 'Fechado' }"
              >
                <template v-slot:prepend>
                  <v-icon 
                    :icon="item.horario === 'Fechado' ? 'mdi-close-circle' : 'mdi-check-circle'" 
                    :color="item.horario === 'Fechado' ? 'error' : 'success'"
                  ></v-icon>
                </template>
                <v-list-item-title>
                  <strong>{{ item.dia }}</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.horario }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Regras de Uso -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="4" class="mb-4">
          <v-card-title class="bg-accent text-white">
            <v-icon icon="mdi-file-document-outline" class="mr-2"></v-icon>
            Regras de Uso do Sistema
          </v-card-title>
          <v-card-text class="pt-4">
            <v-list>
              <v-list-item
                v-for="(regra, index) in regras"
                :key="index"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-check" color="success"></v-icon>
                </template>
                <v-list-item-title>{{ regra }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Informações do Sistema -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="4" class="mb-4" color="info" variant="tonal">
          <v-card-text>
            <div class="text-center">
              <v-icon icon="mdi-information-outline" size="large" color="info" class="mb-2"></v-icon>
              <h3 class="text-h6 mb-2">Sistema de Agendamento</h3>
              <p class="text-body-2">
                <strong>Versão:</strong> 1.0.0 | 
                <strong>Desenvolvido com:</strong> Vue 3 + Vuetify 3 | 
                <strong>Ano:</strong> 2025
              </p>
              <p class="text-body-2 mt-2">
                Este sistema foi desenvolvido para facilitar o gerenciamento de agendamentos e serviços da Barbearia Afro, 
                proporcionando uma experiência moderna e eficiente tanto para os clientes quanto para os profissionais.
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Padrão Decorativo Afro -->
    <v-row>
      <v-col cols="12">
        <v-card 
          elevation="0" 
          class="pattern-card"
          style="background: linear-gradient(135deg, #6B4423 0%, #D4AF37 100%); min-height: 120px;"
        >
          <v-card-text class="text-center text-white">
            <h2 class="text-h4 font-weight-bold mb-2">Celebrando a Cultura Afro</h2>
            <p class="text-h6">Estilo, Identidade e Orgulho</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.pattern-card {
  position: relative;
  overflow: hidden;
}

.pattern-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px);
  pointer-events: none;
}
</style>

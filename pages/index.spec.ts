import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import IndexPage from './index.vue'; 

const mockExecute = vi.fn();
const mockData = ref(null);
const mockPending = ref(false);
const mockError = ref(null);

vi.mock('nuxt/app', () => ({
  useAsyncData: vi.fn(() => ({
    data: mockData,
    pending: mockPending,
    error: mockError,
    execute: mockExecute,
  })),
}));

globalThis.$fetch = vi.fn();

describe('pages/index.vue', () => {

  const mountComponent = () => {
    return mount(IndexPage, {
      global: {
        stubs: {
          HotelCard: true, 
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockData.value = null;
    mockPending.value = false;
    mockError.value = null;
  });

  it('mostra a mensagem de carregamento quando pending é true', () => {
    mockPending.value = true;
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('Carregando...');
  });

  it('mostra a mensagem de erro quando a busca falha', () => {
    mockError.value = { message: 'Falha na conexão' };
    const wrapper = mountComponent();
    
    expect(wrapper.find('h3.text-red-800').text()).toBe('Ocorreu um erro');
    expect(wrapper.find('p.text-red-700').text()).toBe('Falha na conexão');
  });

  it('mostra a mensagem de "nenhum hotel encontrado" quando a busca retorna vazio', () => {
    mockData.value = [];
    const wrapper = mountComponent();
    
    expect(wrapper.find('h3.text-gray-900').text()).toBe('Nenhum hotel encontrado');
    expect(wrapper.find('p.text-gray-500').text()).toBe('Tente outros critérios de busca.');
  });

  it('renderiza os componentes HotelCard quando a busca retorna dados', () => {
    mockData.value = [
      { id: 1, name: 'Hotel A' },
      { id: 2, name: 'Hotel B' },
    ];
    const wrapper = mountComponent();
    
    const hotelCards = wrapper.findAllComponents({ name: 'HotelCard' });
    expect(hotelCards.length).toBe(2);
  });

  it('chama a função "execute" ao submeter o formulário', async () => {
    const wrapper = mountComponent();
    
    await wrapper.find('input#destination').setValue('Recife');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockExecute).toHaveBeenCalledOnce();
  });
});
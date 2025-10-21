import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import HotelCard from './HotelCard.vue';
import { useHotelStore } from '../stores/hotel';

vi.mock('#build/nuxt.config.mjs', () => ({
  default: {},
  app: {}
}));

const mockNavigateTo = vi.fn();

describe('components/HotelCard.vue', () => {
  
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    globalThis.navigateTo = mockNavigateTo;
  });

  const hotelMock = {
    id: 1,
    name: 'Hotel Teste Palace',
    city: 'Rio de Janeiro',
    price: 250,
    rating: 4.8
  };

  const mountComponent = () => mount(HotelCard, {
    props: {
      hotel: hotelMock
    }
  });


  it('deve renderizar todas as informações do hotel', () => {
    const wrapper = mountComponent();
    const text = wrapper.text();
    expect(text).toContain('Hotel Teste Palace');
    expect(text).toContain('R$ 250');
    expect(text).toContain('Rio de Janeiro');
  });

  it('deve chamar o store e o navigateTo ao clicar', async () => {
    const wrapper = mountComponent();
    
    const store = useHotelStore();
    const selectHotelSpy = vi.spyOn(store, 'selectHotel');

    await wrapper.find('div.cursor-pointer').trigger('click');

    expect(selectHotelSpy).toHaveBeenCalledOnce();
    expect(selectHotelSpy).toHaveBeenCalledWith(hotelMock);

    expect(mockNavigateTo).toHaveBeenCalledOnce();
  });
})
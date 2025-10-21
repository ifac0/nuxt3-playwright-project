import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import AppButton from './AppButton.vue';

const NuxtLinkStub = defineComponent({
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
});

describe('AppButton.vue', () => {
  
  const mountComponent = (props = {}, slots = {}) => {
    return mount(AppButton, {
      props,
      slots,
      global: {
        stubs: {
          NuxtLink: NuxtLinkStub,
        },
      },
    });
  };

  it('renderiza como um <button> por padrão', () => {
    const wrapper = mountComponent({}, { default: 'Click Me' });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.text()).toBe('Click Me');
  });

  it('aplica a classe primária (bg-blue-500) por padrão', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').classes()).toContain('bg-blue-500');
  });

  it('aplica a classe secundária (bg-gray-500) quando variant="secondary"', () => {
    const wrapper = mountComponent({ variant: 'secondary' });
    expect(wrapper.find('button').classes()).toContain('bg-gray-500');
  });

  it('renderiza como um NuxtLink (<a>) quando a prop "to" é passada', () => {
    const wrapper = mountComponent({ to: '/home' }, { default: 'Go Home' });

    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.text()).toBe('Go Home');
  });

  it('passa a prop "to" corretamente para o NuxtLink', () => {
    const wrapper = mountComponent({ to: '/profile/123' });
    expect(wrapper.find('a').attributes('href')).toBe('/profile/123');
  });

  it('aplica a classe primária ao NuxtLink por padrão', () => {
    const wrapper = mountComponent({ to: '/' });
    expect(wrapper.find('a').classes()).toContain('bg-blue-500');
  });

  it('aplica a classe secundária ao NuxtLink quando variant="secondary"', () => {
    const wrapper = mountComponent({ to: '/', variant: 'secondary' });
    expect(wrapper.find('a').classes()).toContain('bg-gray-500');
  });
});
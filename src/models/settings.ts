import { useState } from 'react';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';
import { useRequest } from 'umi';
import { configService } from '@/services';

export default () => {
  const [settings, setSettings] = useState(defaultSettings);
  const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
    const root = document.getElementById('root');
    if (root) {
      root.className = colorWeak ? 'colorWeak' : '';
    }
  };

  const changeSetting = (state = defaultSettings, payload) => {
    const { colorWeak, contentWidth } = payload;

    if (state.contentWidth !== contentWidth && window.dispatchEvent) {
      window.dispatchEvent(new Event('resize'));
    }
    updateColorWeak(!!colorWeak);
    setSettings({ ...settings, ...payload });
    return settings;
  };
  return { settings, setSettings, changeSetting };
};

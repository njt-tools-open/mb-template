import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { viteExternalsPlugin } from 'vite-plugin-externals';

import { htmlPlugin } from './vite-plugins/html-plugin';

const isProd = process.env.NODE_ENV === 'production';

const plugins: PluginOption[] = [react(), htmlPlugin()];

if (isProd) {
  plugins.push(
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
      i18next: 'i18next',
      'react-i18next': 'ReactI18next',
      antd: 'antd',
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/<%= name %>/',
  plugins,
});

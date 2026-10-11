// @ts-check
import { defineConfig } from 'astro/config';

// blog.free-router.com 是 free-router.com 平台的博客子域，
// 因此 site 为子域根地址，base 保持默认的 '/'
export default defineConfig({
  site: 'https://blog.free-router.com',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      // 双主题：输出 --shiki-light / --shiki-dark CSS 变量，
      // 由媒体查询自动跟随系统浅色/深色模式切换
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      defaultColor: false,
    },
  },
});

import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "md",
  
  title: "bch docs",
  description: "idk",
  lang: "zh-Hans",
  base: "/bch-docs/",

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
    ],

    sidebar: {
      "/intro": [
        {
          text: "介绍",
          link: '/intro'
        }
      ]
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Bychuhan/bch-docs" }
    ],

    outline: {
      level: [2, 6],
      label: "页面导航"
    },

    editLink: {
      pattern: "https://github.com/Bychuhan/bch-docs/edit/main/md/:path",
      text: "在 GitHub 上编辑此页面"
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium"
      }
    },

    docFooter: {
      prev: "上一页",
      next: "下一页"
    },

    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索"
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "输入",
                  navigateText: "导航",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc"
                }
              }
            }
          }
        }
      }
    }
  }
})

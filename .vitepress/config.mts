import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "bch-docs",
    lang: 'zh',
    titleTemplate: ":title ~ 不出汗的神必小文档 ~",
    lastUpdated: true,
    description: "docsssssssssssssssssssssssssssssssssssss",
    base: "/bch-docs/",

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '家家家', link: '/' },
            { text: '知识', link: '/learning/' }
        ],

        sidebar: [
            {
                text: '知识',
                link: '/learning/',
                items: [
                    { text: 'Phigros 谱面格式', link: '/learning/phichart' },
                    { text: 'Rizline 谱面格式', link: '/learning/rizchart' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Bychuhan/bch-docs' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索',
                                buttonAriaLabel: '搜索'
                            },
                            modal: {
                                noResultsText: '什么也没找到 /(ㄒoㄒ)/~~',
                                resetButtonTitle: '清空搜索',
                                footer: {
                                    selectText: '选择当前结果',
                                    navigateText: '切换结果',
                                    closeText: '关闭搜索'
                                },
                                displayDetails: '显示详情'
                            }
                        }
                    }
                }
            }
        },

        lightModeSwitchTitle: '切换至浅色模式',
        darkModeSwitchTitle: '切换至深色模式',
        outlineTitle: '页面导航',
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        returnToTopLabel: '回到顶端',
        darkModeSwitchLabel: '深色模式',
        sidebarMenuLabel: '侧边栏',

        editLink: {
            pattern: 'https://github.com/Bychuhan/bch-docs/edit/main/:path',
            text: '在 Github 上编辑此页'
        },

        lastUpdated: {
            text: '最后更新于'
        }
    },

    markdown: {
        container: {
            tipLabel: 'Tip',
            warningLabel: 'Warning',
            dangerLabel: 'Danger',
            infoLabel: 'Info',
            detailsLabel: 'Details',
        },
        math: true
    }
})

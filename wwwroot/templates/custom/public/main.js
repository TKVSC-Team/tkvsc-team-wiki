export default {
    defaultTheme: 'dark',
    start: () => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    },
    iconLinks: [
        {
            icon: 'github',
            href: 'https://github.com/TKVSC-Team/totk-vscode',
            title: 'GitHub'
        },
        {
            icon: 'discord',
            href: 'https://discord.gg/vwPnX2uB8s',
            title: 'Discord'
        },
        {
            icon: 'patreon',
            href: 'https://www.patreon.com/tkvsc',
            title: 'Patreon'
        }
    ]
}

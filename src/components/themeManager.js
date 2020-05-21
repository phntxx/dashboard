const defaultTheme = {
    label: 'Classic',
    value: 0,
    mainColor: '#000000',
    accentColor: '#1e272e',
    backgroundColor: '#ffffff'
};

const setTheme = theme => {
    localStorage.setItem('theme', theme);
    window.location.reload();
};

const resetTheme = () => {
    localStorage.removeItem('theme');
};

const getTheme = () => {
    let selectedTheme = defaultTheme;

    if (
        localStorage.getItem('theme') &&
        localStorage.getItem('theme') !== undefined
    ) {
        selectedTheme = JSON.parse(localStorage.getItem('theme'));
    }

    return selectedTheme;
};

const selectedTheme = getTheme();

export { setTheme, resetTheme };

export default selectedTheme;

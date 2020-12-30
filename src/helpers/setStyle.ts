export default function setStyle(
    elem: HTMLElement,
    styles: Record<string, string | number>,
) {
    Object.entries(styles).forEach(([key, value]) => {
        elem.style.setProperty(key, `${value}`);
    });
}

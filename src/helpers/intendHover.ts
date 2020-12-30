export default function intendHover(
    element: HTMLElement,
    listener: (ev: HTMLElementEventMap['mouseenter']) => void,
) {
    let hover = false;
    let id = 0;

    const onHover = (ev: HTMLElementEventMap['mouseenter']) => {
        hover = true;
        id = window.setTimeout(() => {
            if (hover) {
                listener.call(element, ev);
            }
        }, 1000);
    };

    element.addEventListener('mouseenter', onHover);
    element.addEventListener('mouseleave', () => {
        clearTimeout(id);
        hover = false;
    });
}

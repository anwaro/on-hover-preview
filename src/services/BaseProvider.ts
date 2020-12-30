export default abstract class BaseProvider {
    isHTMLAnchorElement<T extends Element>(element: Element): element is T {
        return element instanceof HTMLAnchorElement;
    }

    getLinks(query: string): HTMLAnchorElement[] {
        return [...document.querySelectorAll(query)].reduce((prev, e) => {
            return this.isHTMLAnchorElement<HTMLAnchorElement>(e)
                ? [...prev, e]
                : prev;
        }, [] as HTMLAnchorElement[]);
    }
}

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

    extractId(url: string, match: RegExp): string {
        const result = url.match(match);

        if (result) {
            return result.groups?.id || '';
        }

        return '';
    }
}

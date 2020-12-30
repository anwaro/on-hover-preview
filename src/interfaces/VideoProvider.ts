export interface VideoProvider {
    embeddedVideoUrl(element: HTMLAnchorElement): Promise<string>;

    videoLinks(): HTMLAnchorElement[];
}

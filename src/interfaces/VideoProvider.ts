type VideoConfig = {
    width: number;
    height: number;
};

export interface VideoProvider {
    config: VideoConfig;

    embeddedVideoUrl(element: HTMLAnchorElement): Promise<string>;

    videoLinks(): HTMLAnchorElement[];
}

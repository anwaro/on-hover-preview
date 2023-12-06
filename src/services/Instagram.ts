import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Instagram extends BaseProvider implements VideoProvider {
    public config = {
        width: 300,
        height: 500,
    };

    public async embeddedVideoUrl({href}: HTMLAnchorElement) {
        const id = this.extractId(href, /reel\/(?<id>[^/]+)\//);

        return `https://www.instagram.com/p/${id}/embed/`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        const filter = (href: string) => href.includes('instagram.com/reel');

        return this.getLinks('a[href*="instagram.com"]').filter((element) =>
            filter(element.href),
        );
    }
}

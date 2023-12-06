import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Tiktok extends BaseProvider implements VideoProvider {
    public config = {
        width: 338,
        height: 575,
    };

    public async embeddedVideoUrl({href}: HTMLAnchorElement): Promise<string> {
        const id = this.extractId(href, /video\/(?<id>\d+)/);

        return `https://www.tiktok.com/embed/v2/${id}`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        const filter = (href: string) => /video\/\d+/.test(href);

        return this.getLinks('a[href*="tiktok.com"]').filter((element) =>
            filter(element.href),
        );
    }
}

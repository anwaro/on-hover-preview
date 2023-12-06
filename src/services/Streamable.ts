import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Streamable extends BaseProvider implements VideoProvider {
    public config = {
        width: 500,
        height: 300,
    };

    public async embeddedVideoUrl({href}: HTMLAnchorElement): Promise<string> {
        const id = this.extractId(href, /\.com\/([s|o]\/)?(?<id>[^?/]+).*$/);

        return `https://streamable.com/o/${id}?autoplay=1`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        return this.getLinks('a[href*="streamable.com"]');
    }
}

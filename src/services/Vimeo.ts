import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Vimeo extends BaseProvider implements VideoProvider {
    public config = {
        width: 500,
        height: 300,
    }

    public async embeddedVideoUrl(element: HTMLAnchorElement): Promise<string> {
        let key = '';
        if (/\/\d+(\/.*)?$/.test(element.pathname)) {
            key = element.pathname.replace(/\D+/g, '');
        } else {
            const response = await fetch(
                `https://vimeo.com/api/oembed.json?url=${element.href}`,
            );
            const data = await response.json();
            key = data.video_id;
        }
        return `https://player.vimeo.com/video/${key}?autoplay=1`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        return this.getLinks('a[href*="vimeo.com"]');
    }
}

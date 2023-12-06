import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Facebook extends BaseProvider implements VideoProvider {
    public config = {
        width: 500,
        height: 282,
    };

    public async embeddedVideoUrl(element: HTMLAnchorElement) {
        return `https://www.facebook.com/plugins/video.php?autoplay=true&width=500&show_text=false&height=300&appId&href=${element.href}`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        const filter = (href: string) =>
            /https:\/\/www\.facebook\.com\/[\w\d\-_]+\/videos\//.test(href);

        return this.getLinks('a[href*="facebook.com"]').filter((element) =>
            filter(element.href),
        );
    }
}

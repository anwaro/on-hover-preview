import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Twitter extends BaseProvider implements VideoProvider {
    public config = {
        width: 500,
        height: 500,
    };

    public async embeddedVideoUrl({href}: HTMLAnchorElement) {
        const id = this.extractId(href, /status\/(?<id>[^/]+)\//);

        return `https://platform.twitter.com/embed/Tweet.html?id=${id}&maxWidth=500px`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        const filter = (href: string) =>
            /https:\/\/twitter\.com\/.+\/status\/\d+/.test(href);

        return this.getLinks('a[href*="twitter.com"]').filter((element) =>
            filter(element.href),
        );
    }
}

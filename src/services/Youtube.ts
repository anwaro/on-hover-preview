import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Youtube extends BaseProvider implements VideoProvider {
    public config = {
        width: 500,
        height: 300,
    };

    public async embeddedVideoUrl({
        href,
        search,
    }: HTMLAnchorElement): Promise<string> {
        const urlParams = new URLSearchParams(search);
        let id = urlParams.get('v') || '';
        let time = urlParams.get('t') || '0';

        if (href.includes('//youtu.be/')) {
            id = this.extractId(href, /\.be\/(?<id>[^?/]+).*$/);
        } else if (href.includes('youtube.com/attribution_link')) {
            const url = decodeURIComponent(urlParams.get('u') || `/watch?v=${id}`);
            const attrUrl = new URL(`https://youtube.com${url}`);
            const attrParams = new URLSearchParams(attrUrl.search);
            id = attrParams.get('v') || id;
            time = attrParams.get('t') || time;
        }

        const [hour = '0', minutes = '0', seconds] = time.match(
            /(?:(\d+)h)?(?:(\d+)m)?(\d+)s/,
        ) || ['0', '0', '-1'];
        if (seconds !== '-1') {
            time = `${(Number(hour) * 60 + Number(minutes)) * 60 + seconds}`;
        } else {
            time = '0';
        }

        return `https://www.youtube.com/embed/${id}?fs=1&autoplay=1&enablejsapi=1&start=${time}`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        const filter = (href: string) =>
            href.includes('youtube.com/attribution_link') ||
            href.includes('youtube.com/watch') ||
            href.includes('//youtu.be/');

        return [
            ...this.getLinks('a[href*="youtube.com"]'),
            ...this.getLinks('a[href*="youtu.be"]'),
        ].filter((element) => filter(element.href));
    }
}

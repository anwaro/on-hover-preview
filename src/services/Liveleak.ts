import {VideoProvider} from '../interfaces/VideoProvider';
import BaseProvider from './BaseProvider';

export default class Liveleak extends BaseProvider implements VideoProvider {
    public async embeddedVideoUrl(element: HTMLAnchorElement) {
        const urlParams = new URLSearchParams(element.search);
        return `https://www.liveleak.com/ll_embed?t=${urlParams.get('t')}`;
    }

    public videoLinks(): HTMLAnchorElement[] {
        return this.getLinks('a[href*="liveleak.com/view"]');
    }
}

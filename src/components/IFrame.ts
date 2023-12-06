import setStyle from '../helpers/setStyle';
import {VideoProvider} from '../interfaces/VideoProvider';

export default class IFrame {
    static ID = 'play-on-hover-popup';
    private readonly iframe: HTMLIFrameElement;
    private readonly popup: HTMLDivElement;
    private iframeActive = false;

    constructor() {
        this.iframe = document.createElement('iframe');
        this.popup = document.createElement('div');
        this.setupIframe();
        this.setupPopup();
        this.setupEvent();
    }

    setupIframe() {
        this.iframe.allowFullscreen = true;
        this.iframe.allow =
            'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';

        setStyle(this.iframe, {
            height: '100%',
            width: '100%',
        });
        this.popup.appendChild(this.iframe);
    }

    setupPopup() {
        setStyle(this.popup, {
            background: '#444',
            height: '300px',
            width: '500px',
            position: 'absolute',
            display: 'none',
            'z-index': 9999,
            'box-shadow': 'rgb(218, 218, 218) 1px 1px 5px',
        });
        this.popup.id = IFrame.ID;

        if (!document.querySelector(`#${IFrame.ID}`)) {
            document.body.appendChild(this.popup);
        }
    }

    setupEvent() {
        document.addEventListener('click', this.hidePopup.bind(this));
    }

    showPopup(e: MouseEvent, url: string, service: VideoProvider) {
        if (!this.iframeActive) {
            this.iframeActive = true;
            setStyle(this.popup, {
                display: 'block',
                top: `${e.pageY}px`,
                left: `${e.pageX}px`,
                width: `${service.config.width}px`,
                height: `${service.config.height}px`,
            });
            this.iframe.src = url;
        }
    }

    hidePopup() {
        this.iframeActive = false;
        this.iframe.src = '';
        setStyle(this.popup, {display: 'none'});
    }
}

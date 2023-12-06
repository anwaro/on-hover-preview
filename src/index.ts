import IFrame from './components/IFrame';
import intendHover from './helpers/intendHover';
import {VideoProvider} from './interfaces/VideoProvider';
import Streamable from './services/Streamable';
import Vimeo from './services/Vimeo';
import Youtube from './services/Youtube';
import Facebook from './services/Facebook';
import Tiktok from './services/Tiktok';
import Instagram from './services/Instagram';
import Twitter from './services/Twitter';

const Services: VideoProvider[] = [
    Youtube,
    Vimeo,
    Streamable,
    Facebook,
    Tiktok,
    Instagram,
    Twitter,
].map((Service) => new Service());

const iFrame = new IFrame();

Services.map((service) => {
    service.videoLinks().map((link) => {
        intendHover(link, (e) => {
            service.embeddedVideoUrl(link).then((src) => {
                iFrame.showPopup(e, src, service);
            });
        });
    });
});

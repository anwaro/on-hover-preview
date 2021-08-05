import IFrame from './components/IFrame';
import intendHover from './helpers/intendHover';
import {VideoProvider} from './interfaces/VideoProvider';
import Liveleak from './services/Liveleak';
import Streamable from './services/Streamable';
import Vimeo from './services/Vimeo';
import Youtube from './services/Youtube';

const Services: VideoProvider[] = [
    new Youtube(),
    new Vimeo(),
    new Liveleak(),
    new Streamable(),
];
const iFrame = new IFrame();

Services.map((service) => {
    service.videoLinks().map((link) => {
        intendHover(link, (e) => {
            service.embeddedVideoUrl(link).then((src) => {
                iFrame.showPopup(e, src);
            });
        });
    });
});

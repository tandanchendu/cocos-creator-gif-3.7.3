import { _decorator, Component, find,Node } from "cc";
import CCGIF from "./CCGIF";

const { ccclass, property } = _decorator;

@ccclass
export class CCGIFTest extends Component {
    @property(Node)
    gifImage: Node = null;

    @property(Node)
    btnPlay: Node = null;

    async start() {
        find('Canvas/LabelLoading').active = true;
        this.btnPlay.active = false;
        await Promise.all(this.node.children.map(n =>
            n.getComponent(CCGIF).preload()
        ))
        find('Canvas/LabelLoading').active = false;
        this.btnPlay.active = true;
        console.debug('preload success');
        this.playAll();
    }

    onLoad() {
        let url = "https://n.sinaimg.cn/tech/transform/280/w128h152/20210528/d2fb-kquziih9543861.gif";
        this.gifImage.getComponent(CCGIF).loadUrl(url);
    }
    playAll() {
        this.node.children.forEach(v => v.getComponent(CCGIF).play());
    }
}
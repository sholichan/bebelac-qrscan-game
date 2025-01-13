import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');
        this.cameras.main.setBackgroundColor(0xffac00);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(this.cameras.main.width / 2 - 230, this.cameras.main.height / 2, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
        this.load.on('complete', () => {
            // this.sound.add('music', { loop: true, volume: 0.7 })
        })
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('mulai', 'FOR-TV/mulai.png');
        this.load.image('next', 'FOR-TV/next.png');
        this.load.image('selesai', 'FOR-TV/selesai.png');
        this.load.image('analysis', 'FOR-TV/analysis.png');
        this.load.image('logo', 'logo.png');
        this.load.image('menu', 'FOR-TV/KV-Potrait-Totem.png');
        this.load.image('scan-frame', 'FOR-TV/scan-frame.png');
        this.load.image('scan-kartu', 'FOR-TV/scan-kartu.png');
        this.load.image('bg', 'FOR-TV/background.png');
        this.load.image('footer', 'FOR-TV/footer.png');
        this.load.image('bar', 'FOR-TV/bar.png');
        this.load.image('bintang', 'FOR-TV/bintang.png');
        this.load.image('neon', 'FOR-TV/neon.png');
        this.load.image('bebelac', 'FOR-TV/bebelac.png');

        this.load.image('normal', 'FOR-TV/normal.png');
        this.load.image('tantrum', 'FOR-TV/tantrum.png');
        this.load.image('smile', 'FOR-TV/smile.png');

        this.load.image('txt-tantrum', 'FOR-TV/txt-tantrum.png');
        this.load.image('txt-smile', 'FOR-TV/txt-smile.png');

        this.load.image('apel', 'FOR-TV/apel.png');
        this.load.image('bayam', 'FOR-TV/bayam.png');
        this.load.image('brokoli', 'FOR-TV/brokoli.png');
        this.load.image('jagung', 'FOR-TV/jagung.png');
        this.load.image('pepaya', 'FOR-TV/pepaya.png');
        this.load.image('pisang', 'FOR-TV/pisang.png');
        this.load.image('susu-fiber', 'FOR-TV/susu-fiber.png');
        this.load.image('susu-fosgos', 'FOR-TV/susu-fosgos.png');
        this.load.image('tomat', 'FOR-TV/tomat.png');

        this.load.image('txt-apel', 'FOR-TV/txt-apel.png');
        this.load.image('txt-bayam', 'FOR-TV/txt-bayam.png');
        this.load.image('txt-brokoli', 'FOR-TV/txt-brokoli.png');
        this.load.image('txt-jagung', 'FOR-TV/txt-jagung.png');
        this.load.image('txt-pepaya', 'FOR-TV/txt-pepaya.png');
        this.load.image('txt-pisang', 'FOR-TV/txt-pisang.png');
        this.load.image('txt-susu-fiber', 'FOR-TV/txt-susu-fiber.png');
        this.load.image('txt-susu-fosgos', 'FOR-TV/txt-susu-fosgos.png');
        this.load.image('txt-tomat', 'FOR-TV/txt-tomat.png');

        this.load.image('txt-sumber', 'FOR-TV/txt-sumber.png');

        this.load.audio('music', 'audio/music.mp3')
        this.load.audio('button', 'audio/button.mp3')
        this.load.audio('laugh', 'audio/laugh.mp3')
        this.load.audio('cry', 'audio/cry.mp3')

        this.load.html('nameform', 'html/nameform.html')
    }

    create() {
        this.time.delayedCall(1000, () => {
            this.input.setDefaultCursor('url(assets/FOR-TV/cursor2.png) 16 16, pointer');
            this.scene.start('MainMenu')
        });
    }
}

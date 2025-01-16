import { Scene } from 'phaser';

export class ScanAnalysis extends Scene {
    constructor() {
        super('ScanAnalysis');
        this.anlTxt1
        this.anlTxt2
        this.anlTxt3
        this.score
    }

    getTexture() {
        this.anlTxt1 = localStorage.getItem('anl1')
        this.anlTxt2 = localStorage.getItem('anl2')
        this.anlTxt3 = localStorage.getItem('anl3')
        this.anlTxt4 = localStorage.getItem('anl4')
        this.anlTxt5 = localStorage.getItem('anl5')
        this.score = localStorage.getItem('score')
    }

    create() {
        this.getTexture()
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg').setScale(0.27).setOrigin(0.5, 0.5);
        this.anlHasil = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 50, 'anl-hasil')
            .setScale(0.5).setOrigin(0.5, 0.5)
        this.anlKebutuhan = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 150, 'anl-kebutuhan')
            .setScale(0.3).setOrigin(0.5, 0.5)
        const anl1 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 200, 'anl-apel')
            .setScale(0.3).setOrigin(0.5, 0.5).setVisible(false)
        const anl2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 250, 'anl-apel')
            .setScale(0.3).setOrigin(0.5, 0.5).setVisible(false)
        const anl3 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 300, 'anl-apel')
            .setScale(0.3).setOrigin(0.5, 0.5).setVisible(false)
        const anl4 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 350, 'anl-apel')
            .setScale(0.3).setOrigin(0.5, 0.5).setVisible(false)
        const anl5 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 400, 'anl-apel')
            .setScale(0.3).setOrigin(0.5, 0.5).setVisible(false)
        // const anlToatal = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 450, 'anl-total')
        //     .setScale(0.35).setOrigin(0.5, 0.5).setVisible(true)
        this.score = this.add.text(
            this.cameras.main.width / 2, this.cameras.main.height / 2.9 + 450,
            `Total ${this.score} gram ${this.score<19?`<`:`>`} kebutuhan serat prebiotik anak usia 1-3 tahun`,
            {
                font: '32px Georgia',
                fill: '#2a0377',
                fontStyle: 'bold',
                stroke: '#ffffff',
                strokeThickness: 8,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#ff0000',
                    blur: 2,
                    stroke: true,
                    fill: true
                }
            }
        ).setShadow(1, 1).setDepth(1).setOrigin(0.5).setVisible(false);

        this.time.delayedCall(300, () => {
            anl1.setTexture(this.anlTxt1).setVisible(true)
            anl2.setTexture(this.anlTxt2).setVisible(true)
            anl3.setTexture(this.anlTxt3).setVisible(true)
            anl4.setTexture(this.anlTxt4).setVisible(true)
            anl5.setTexture(this.anlTxt5).setVisible(true)
            // anlToatal.setVisible(true)
            this.score.setVisible(true)
        });


        const nextBtn = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'next')
            .setScale(0.2).setOrigin(0.5, 0.5).setInteractive();

        nextBtn.on('pointerdown', () => {
            anl1.setTexture(this.anlTxt1).setVisible(false)
            anl2.setTexture(this.anlTxt2).setVisible(false)
            anl3.setTexture(this.anlTxt3).setVisible(false)
            anl4.setTexture(this.anlTxt4).setVisible(false)
            anl5.setTexture(this.anlTxt5).setVisible(false)
            // anlToatal.setVisible(false)
            this.scene.start('ResultGame');
        });
    }
}

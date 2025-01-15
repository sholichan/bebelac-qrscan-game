import { Scene } from 'phaser';

export class ResultGame extends Scene {
    constructor() {
        super('ResultGame');
        this.score
        this.percentScore
        this.percentBar
        this.kids
        this.scoreBar
        this.bintang
        this.cryFx
        this.laughFx
    }

    percentCalc() {
        this.score = localStorage.getItem('score')
        this.percentScore = parseInt(this.score) / 19 * 100
        this.percentBar = this.percentScore / 100 * 400
        console.log(this.score);
        console.log(this.percentScore);
        console.log(this.percentBar);
    }

    create() {
        this.percentCalc()
        this.cryFx = this.sound.add('cry', { loop: true })
        this.laughFx = this.sound.add('laugh', { loop: true })
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg').setScale(0.27).setOrigin(0.5, 0.5);
        this.kids = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.2, 'normal')
            .setScale(0.5).setOrigin(0.5, 0.5).setVisible(true)

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'footer').setScale(0.27).setOrigin(0.5, 0.5).setVisible(true)

        this.scoreBar = this.add.image(this.cameras.main.width / 1.2, this.cameras.main.height / 1.7, 'bar')
            .setScale(0.12).setOrigin(0.5, 0.5).setVisible(true)
        this.bintang = this.add.image(this.cameras.main.width / 1.2, this.cameras.main.height / 1.7 + 200, 'bintang')
            .setScale(0.12).setOrigin(0.5, 0.5).setVisible(true)

        const txtResult = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3, 'txt-smile')
            .setScale(0.25).setOrigin(0.5, 0.5).setVisible(false)

        const txtReferensi = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3+200, 'txt-referensi')
            .setScale(0.4).setOrigin(0.5, 0.5).setVisible(false)

        const finishBtn = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.2, 'selesai')
            .setScale(0.2).setOrigin(0.5, 0.5).setInteractive();

        this.tweens.add({
            targets: this.bintang,
            x: this.cameras.main.width / 1.2,
            y: this.cameras.main.height / 1.7 + 200 - this.percentBar,
            duration: 2000,
            ease: 'Power2',
            delay: 500,
            onComplete: () => {
                if (this.percentScore < 100) {
                    this.kids.setTexture('tantrum')
                    txtResult.setTexture('txt-tantrum').setVisible(true)
                    this.cryFx.play()
                    this.tweens.add({
                        targets: this.kids,
                        scaleX: 0.52,
                        scaleY: 0.52,
                        duration: 1000,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut',
                    });
                } else {
                    this.kids.setTexture('smile')
                    txtResult.setTexture('txt-smile').setVisible(true)
                    this.laughFx.play()
                    this.tweens.add({
                        targets: this.kids,
                        scaleX: 0.52,
                        scaleY: 0.52,
                        duration: 1000,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut',
                    });
                }
            }
        });

        finishBtn.on('pointerdown', () => {
            txtResult.setVisible(false)
            localStorage.clear()
            this.cryFx.stop()
            this.laughFx.stop()
            this.scene.start('MainMenu');

        });
    }
}

import { Scene } from 'phaser';

export class TahukahExpert extends Scene {
    constructor() {
        super('TahukahExpert');
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setScale(0.27).setOrigin(0.5, 0.5)
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 4, 'fosgos')
            .setScale(0.5).setOrigin(0.5, 0.5)
        const expert = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'expert')
            .setScale(0.25).setOrigin(0.5, 0.5)
        const finishBtn = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.2, 'selesai')
            .setScale(0.2).setOrigin(0.5, 0.5).setInteractive();

        this.tweens.add({
            targets: expert,
            scaleX: 0.27,
            scaleY: 0.27,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        finishBtn.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }


    create() {
        const bgMusic = this.sound.get('music');
        if (bgMusic) {
            console.log('Music is playing');
        } else {
            console.log('No music is playing');
            this.sound.add('music', { loop: true, volume: 0.7 }).play()
        }
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menu').setScale(0.27).setOrigin(0.5, 0.5);
        const button = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.8, 'scan-kartu').setScale(0.27).setOrigin(0.5, 0.5).setInteractive();
        this.tweens.add({
            targets: button,  
            scaleX: 0.28,     
            scaleY: 0.28,     
            duration: 1000,   
            yoyo: true,      
            repeat: -1,      
            ease: 'Sine.easeInOut', 
        });
        button.on('pointerdown', () => {
            this.scene.start('Analysis');
        });
    }
}

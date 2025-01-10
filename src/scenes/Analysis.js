import { Scene } from 'phaser';

export class Analysis extends Scene {
    constructor() {
        super('Analysis');
    }

    create() {

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'analysis').setScale(0.27).setOrigin(0.5, 0.5);
        const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setScale(0.27).setOrigin(0.5, 0.5).setVisible(false);
        const mulai = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'mulai').setScale(0.2).setOrigin(0.5, 0.5).setInteractive();

        const element = this.add.dom(this.cameras.main.width / 2.1, this.cameras.main.height / 2).createFromCache('nameform').setVisible(false);
        // Tambahkan interaktivitas
        element.addListener('click');

        element.on('click', (event) => {
            if (event.target.name === 'playButton') {
                const inputText = element.getChildByName('nameField');

                // Cek apakah input tidak kosong
                if (inputText.value !== '') {
                    console.log(`Nama yang dimasukkan: ${inputText.value}`);

                    // Hapus listener dan sembunyikan form
                    element.removeListener('click');
                    element.setVisible(false);

                    // Pindah ke scene berikutnya
                    this.scene.start('QrScanner');
                } else {
                    alert('Harap masukkan nama anda!')
                }
            }
        });
        this.tweens.add({
            targets: mulai,
            scaleX: 0.21,
            scaleY: 0.21,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });
        mulai.on('pointerdown', () => {
            bg.setVisible(true)
            element.setVisible(true)
            mulai.setVisible(false)
            // this.scene.start('QrScanner');
        })
    }
}

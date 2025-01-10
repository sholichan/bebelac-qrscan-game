import { Scene } from 'phaser';

export class QrScanner extends Scene {
    constructor() {
        super('QrScanner');
        this.isScanning = true;
        this.countScan = 1;
        this.score = 0;
        this.bg;
        this.food;
        this.txtFood;
        this.scannedData = ''; // Menyimpan karakter yang diterima
        this.scanTimeout = null; // Menyimpan reference timeout
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor(0xffac00);

        // const text = this.add.text(
        //     this.cameras.main.width / 2,
        //     40,
        //     'Waiting for QR Code Scan...',
        //     { font: '32px Courier', fill: '#00ff00' }
        // ).setShadow(1, 1).setDepth(1).setOrigin(0.5);

        // Menangani input dari barcode scanner yang bertindak seperti keyboard
        this.input.keyboard.on('keydown', (event) => {
            // Tambahkan karakter yang diterima ke scannedData
            this.scannedData += event.key;

            // Hapus timeout lama jika ada
            if (this.scanTimeout) {
                clearTimeout(this.scanTimeout);
            }

            // Set timeout untuk memproses data setelah beberapa waktu (misal 500ms)
            this.scanTimeout = setTimeout(() => {
                if (this.scannedData) {
                    // Lakukan pemrosesan pemindaian QR Code
                    this.handleScanResult(this.scannedData);
                    this.scannedData = ''; // Reset scannedData setelah diproses
                }
            }, 500); // Waktu tunggu 500ms
        });

        // Elemen visual lainnya
        this.add.image(this.cameras.main.width / 2,
            this.cameras.main.height / 2, 'scan-frame').setScale(1.2)
        this.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setScale(0.27).setOrigin(0.5, 0.5).setVisible(false).setInteractive();
        this.bg.on('pointerdown', () => {
            this.bg.setVisible(false);
            this.food.setVisible(false);
            this.txtFood.setVisible(false);
            this.isScanning = true;
            if (this.countScan === 3) {
                localStorage.setItem('score', this.score.toString());
                this.countScan = 1;
                this.score = 0;
                this.scene.start('ResultGame');
            } else {
                this.countScan += 1;
            }
            console.log(`countScan = ` + this.countScan);
        });

        this.txtFood = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3, 'txt-apel')
            .setScale(0.25).setOrigin(0.5, 0.5).setVisible(false);
        this.food = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'apel')
            .setScale(1).setOrigin(0.5, 0.5).setVisible(false);
    }

    showFoodInfo(split) {
        this.isScanning = false;
        this.bg.setVisible(true);
        this.food.setTexture(split).setVisible(true);
        this.txtFood.setTexture(`txt-${split}`).setVisible(true);
        this.tweens.add({
            targets: this.food,
            scaleX: 0.95,
            scaleY: 0.95,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });
    }

    handleScanResult(data) {
        // Tampilkan informasi berdasarkan hasil pemindaian
        console.log(`QR Code Detected: ${data.split('Enter')[0]}`);
        const split = data.split('Enter')[0]
        console.log(split);
        if (this.isScanning) {
            switch (split) {
                case "apel":
                    this.score = this.score + 3.3;
                    this.showFoodInfo(split)
                    break;
                case "bayam":
                    this.score = this.score + 0.17;
                    this.showFoodInfo(split)
                    break;
                case "brokoli":
                    this.score = this.score + 5.2;
                    this.showFoodInfo(split)
                    break;
                case "jagung":
                    this.score = this.score + 4.6;
                    this.showFoodInfo(split)
                    break;
                case "pisang":
                    this.score = this.score + 2.6;
                    this.showFoodInfo(split)
                    break;
                case "susu-fiber":
                    this.score = this.score + 6;
                    this.showFoodInfo(split)
                    break;
                case "susu-fosgos":
                    this.score = this.score + 3;
                    this.showFoodInfo(split)
                    break;
                case "tomat":
                    this.score = this.score + 1.5;
                    this.showFoodInfo(split)
                    break;
                case "pepaya":
                    this.score = this.score + 2.5;
                    this.showFoodInfo(split)
                    break;
                default:
                    this.score = this.score + 0;
            }
        }
        console.log(this.score);
    }
}

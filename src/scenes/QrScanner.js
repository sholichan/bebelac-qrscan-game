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
        this.txtSumber;
        this.textScore;
        this.nextBtn;
        this.scannedData = ''; // Menyimpan karakter yang diterima
        this.scanTimeout = null; // Menyimpan reference timeout
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor(0xffac00);

        this.textScore = this.add.text(
            this.cameras.main.width - 100,
            100,
            `${this.countScan}/5`,
            {
                font: '45px Georgia',
                fill: '#2a0377',
                fontStyle: 'bold',
                stroke: '#ffffff',
                strokeThickness: 14,
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

        // this.input.keyboard.on('keydown', (event) => {
        //     if (!this.isScanning) return;

        //     this.scannedData += event.key;

        //     if (this.scanTimeout) {
        //         clearTimeout(this.scanTimeout);
        //     }

        //     this.scanTimeout = setTimeout(() => {
        //         if (this.scannedData.trim()) {
        //             this.handleScanResult(this.scannedData.trim());
        //             this.scannedData = '';
        //         }
        //     }, 100);
        // });

        // Menambahkan input elemen DOM
        const inputElement = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
            .createFromCache('inputScan')
            .setVisible(true);

        // Pastikan inputElement adalah DOM element yang benar
        const input = inputElement.getChildByName('scanField'); // Pastikan 'inputElement' adalah nama yang diberikan pada elemen input

        if (input) {
            input.style.opacity = 0;  // Menyembunyikan input element
            input.style.pointerEvents = 'none';  // Tidak bisa diklik

            // Fokuskan ke input untuk menerima data scanner
            input.focus();

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const scannedValue = input.value.trim();
                    if (scannedValue) {
                        console.log(`Scanned Value: ${scannedValue}`);
                        this.handleScanResult(scannedValue);
                        input.value = ''; // Reset setelah memproses
                    }
                }
            });
        } else {
            console.log("Input element tidak ditemukan.");
        }

        this.add.image(this.cameras.main.width / 2,
            this.cameras.main.height / 1.67, 'bebelac').setScale(1.6)
        const neon = this.add.image(this.cameras.main.width / 2,
            this.cameras.main.height / 1.67 + 220, 'neon').setScale(0.12)
        this.tweens.add({
            targets: neon,
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 1.67 - 220,
            duration: 2000,
            ease: 'Power',
            yoyo: true,
            repeat: -1,
        });
        this.add.image(this.cameras.main.width / 2,
            this.cameras.main.height / 2, 'scan-frame').setScale(1.2)
        this.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setScale(0.27).setOrigin(0.5, 0.5).setVisible(false).setInteractive();


        this.txtFood = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.9, 'txt-apel')
            .setScale(0.25).setOrigin(0.5, 0.5).setVisible(false);
        this.txtSumber = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2.1, 'txt-sumber')
            .setScale(0.2).setOrigin(0.5, 0.5).setVisible(false);
        this.food = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'apel')
            .setScale(1).setOrigin(0.5, 0.5).setVisible(false);
        this.nextBtn = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.2, 'next')
            .setScale(0.2).setOrigin(0.5, 0.5).setInteractive().setVisible(false);

        this.nextBtn.on('pointerdown', () => {
            this.bg.setVisible(false);
            this.food.setVisible(false);
            this.txtFood.setVisible(false);
            this.txtSumber.setVisible(false);
            this.textScore.setVisible(false)
            this.nextBtn.setVisible(false)
            this.isScanning = true;
            if (this.countScan === 5) {

                localStorage.setItem('score', this.score.toFixed(1).toString());
                this.countScan = 1;
                this.score = 0;
                this.scene.start('ScanAnalysis');
            } else {
                this.countScan += 1;
            }
            console.log(`countScan = ` + this.countScan);
        });
    }

    showFoodInfo(split) {
        localStorage.setItem('anl' + this.countScan, `anl-${split}`);

        this.isScanning = false;
        this.bg.setVisible(true);
        this.food.setTexture(split).setVisible(true);
        this.txtFood.setTexture(`txt-${split}`).setVisible(true);
        this.txtSumber.setVisible(true);
        this.textScore.setText(`${this.countScan}/5`).setVisible(true)
        this.nextBtn.setVisible(true)
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
        console.log(`QR Code Detected: ${data.split('Enter')[0]}`);
        const split = data.split('Enter')[0].toLowerCase()
        console.log(split);
        if (this.isScanning) {
            switch (split) {
                case "apel":
                    this.score = this.score + 3.3;
                    this.showFoodInfo(split)
                    break;
                case "bayam":
                    this.score = this.score + 0.7;
                    this.showFoodInfo(split)
                    break;
                case "brokoli":
                    this.score = this.score + 2.6;
                    this.showFoodInfo(split)
                    break;
                case "jagung":
                    this.score = this.score + 2.3;
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
                    this.score = this.score + 2;
                    this.showFoodInfo(split)
                    break;
                case "tomat":
                    this.score = this.score + 1;
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

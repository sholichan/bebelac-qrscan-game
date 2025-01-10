import { Scene } from 'phaser';
import jsQR from 'jsqr';

export class QrScanner extends Scene {
    constructor() {
        super('QrScanner');
        this.isScanning = true
        this.countScan = 1
        this.score = 0
        this.bg
        this.food
        this.txtFood
        this.cameraStream = null
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor(0xffac00);

        this.add.image
        const text = this.add.text(
            this.cameras.main.width / 2,
            40,
            'Connecting to Webcam ...',
            { font: '32px Courier', fill: '#00ff00' }
        ).setShadow(1, 1).setDepth(1).setOrigin(0.5);

        const video = this.add.video(
            this.cameras.main.width / 2,
            this.cameras.main.height / 1.7
        ).setOrigin(0.5).setVisible(false);

        video.on('locked', () => {
            text.setText('Click to unlock video');
        });

        video.on('play', () => {
            text.setVisible(false);
        });

        video.once('created', () => {
            video.setDisplaySize(716 * 2, 504 * 2).setVisible(true);
        });

        // Canvas untuk memproses frame dari video
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                this.cameraStream = stream
                video.loadMediaStream(stream, true);

                video.video.addEventListener('loadedmetadata', () => {
                    console.log('Video metadata loaded:', video.video.videoWidth, video.video.videoHeight);
                    video.play();

                    // Mulai loop pemindaian QR
                    this.scanQR(video, canvas, context, text);
                });
            })
            .catch((err) => {
                text.setText(`Error: ${err}`);
                console.error('Error accessing camera:', err);
            });

        this.add.image(this.cameras.main.width / 2,
            this.cameras.main.height / 2, 'scan-frame').setScale(1.6)
        this.bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
            .setScale(0.27).setOrigin(0.5, 0.5).setVisible(false).setInteractive();
        this.bg.on('pointerdown', () => {
            this.bg.setVisible(false)
            this.food.setVisible(false)
            this.txtFood.setVisible(false)
            this.isScanning = true
            if (this.countScan === 3) {
                localStorage.setItem('score',this.score.toString())
                this.countScan = 1
                this.score = 0
                this.stopCamera()
                this.scene.start('ResultGame')
                
            } else {
                this.countScan += 1
            }
            console.log(`countScan = ` + this.countScan);
        })

        this.txtFood = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 3, 'txt-apel')
            .setScale(0.25).setOrigin(0.5, 0.5).setVisible(false)
        this.food = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'apel')
            .setScale(1).setOrigin(0.5, 0.5).setVisible(false)
    }


    showFoodInfo(data) {
        // text.setText(`QR Code Detected: ${data}`);
        console.log(`QR Code Data: ${data}`);
        this.isScanning = false
        this.bg.setVisible(true)
        this.food.setTexture(data).setVisible(true)
        this.txtFood.setTexture(`txt-${data}`).setVisible(true)
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

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach((track) => track.stop());
            this.cameraStream = null; // Hapus referensi
        }
    }

    scanQR(video, canvas, context, text) {
        const loop = () => {
            if (!this.isScanning) {
                requestAnimationFrame(loop);
                return;
            }

            // Atur ukuran canvas sesuai video
            canvas.width = video.video.videoWidth;
            canvas.height = video.video.videoHeight;

            // Gambar frame video ke canvas
            context.drawImage(video.video, 0, 0, canvas.width, canvas.height);

            // Ambil data gambar dari canvas
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            // Gunakan jsQR untuk memproses data gambar
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {

                switch (code.data) {
                    case "apel":
                        this.score = this.score + 3.3;
                        this.showFoodInfo(code.data)
                        break;
                    case "bayam":
                        this.score = this.score + 0.17;
                        this.showFoodInfo(code.data)
                        break;
                    case "brokoli":
                        this.score = this.score + 5.2;
                        this.showFoodInfo(code.data)
                        break;
                    case "jagung":
                        this.score = this.score + 4.6;
                        this.showFoodInfo(code.data)
                        break;
                    case "pisang":
                        this.score = this.score + 2.6;
                        this.showFoodInfo(code.data)
                        break;
                    case "susu-fiber":
                        this.score = this.score + 6;
                        this.showFoodInfo(code.data)
                        break;
                    case "susu-fosgos":
                        this.score = this.score + 3;
                        this.showFoodInfo(code.data)
                        break;
                    case "tomat":
                        this.score = this.score + 1.5;
                        this.showFoodInfo(code.data)
                        break;
                    case "pepaya":
                        this.score = this.score + 2.5;
                        this.showFoodInfo(code.data)
                        break;
                    default:
                        this.score = this.score + 0;
                }
                console.log(this.score);

            }

            // Lanjutkan loop
            requestAnimationFrame(loop);
        };

        loop();
    }
}

export class SoundService {
    constructor() {
        this.correctSound = new Audio('../assets/sounds/correct.mp3');
        this.incorrectSound = new Audio('../assets/sounds/error-2-36058.mp3');
    }
    static getInstance() {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }
    playCorrectSound() {
        const speakerEnabled = sessionStorage.getItem('speakersEnabled');
        if (speakerEnabled === 'false') {
            return;
        }
        this.correctSound.currentTime = 0;
        this.correctSound.play().catch(error => console.log('Error playing correct sound:', error));
    }
    playIncorrectSound() {
        const speakerEnabled = sessionStorage.getItem('speakersEnabled');
        if (speakerEnabled === 'false') {
            return;
        }
        this.incorrectSound.currentTime = 0;
        this.incorrectSound.play().catch(error => console.log('Error playing incorrect sound:', error));
    }
}

export class SoundService {
    constructor() {
        this.correctSound = new Audio('assets/correct.mp3');
        this.incorrectSound = new Audio('assets/error-2-36058.mp3');
        this.gameOverSound = new Audio('assets/game-over.mp3');
    }

    static isSpeakerEnabled() {
        return sessionStorage.getItem('speakersEnabled') !== 'false';
    }

    playAudio(sound) {
        if (!SoundService.isSpeakerEnabled())
            return;
        sound.currentTime = 0;
        sound.play().catch(error => console.log('Error playing sound:', error));
    }

    playCorrectSound() {
        this.playAudio(this.correctSound);
    }

    playIncorrectSound() {
        this.playAudio(this.incorrectSound);
    }

    playGameOverSound() {
        this.playAudio(this.gameOverSound);
    }
    static getInstance() {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }
}

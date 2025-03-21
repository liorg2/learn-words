export class SoundService {
    private static instance: SoundService;
    private correctSound = new Audio('assets/correct.mp3');
    private incorrectSound = new Audio('assets/error-2-36058.mp3');
    private gameOverSound = new Audio('assets/game-over.mp3');

    private constructor() {
    }

    private static isSpeakerEnabled(): boolean {
        return sessionStorage.getItem('speakersEnabled') !== 'false';
    }

    private playAudio(sound: HTMLAudioElement): void {
        if (!SoundService.isSpeakerEnabled()) return;
        sound.currentTime = 0;
        sound.play().catch(error => console.log('Error playing sound:', error));
    }

    public playCorrectSound(): void {
        this.playAudio(this.correctSound);
    }

    public playIncorrectSound(): void {
        this.playAudio(this.incorrectSound);
    }

    public playGameOverSound(): void {
        this.playAudio(this.gameOverSound);
    }

    public static getInstance(): SoundService {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }
}
export class SoundService {
    private static instance: SoundService;
    private correctSound: HTMLAudioElement;
    private incorrectSound: HTMLAudioElement;

    private constructor() {
        this.correctSound = new Audio('../assets/sounds/correct.mp3');
        this.incorrectSound = new Audio('../assets/sounds/error-2-36058.mp3');
    }

    public static getInstance(): SoundService {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }

    public playCorrectSound(): void {
        this.correctSound.currentTime = 0;
        this.correctSound.play().catch(error => console.log('Error playing correct sound:', error));
    }

    public playIncorrectSound(): void {
        this.incorrectSound.currentTime = 0;
        this.incorrectSound.play().catch(error => console.log('Error playing incorrect sound:', error));
    }
} 
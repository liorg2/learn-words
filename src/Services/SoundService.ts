export class SoundService {
    private static instance: SoundService;
    private correctSound: HTMLAudioElement;
    private incorrectSound: HTMLAudioElement;

    private constructor() {
        this.correctSound = new Audio('./sounds/correct.mp3');
        this.incorrectSound = new Audio('./sounds/error-2-36058.mp3');
    }

    public static getInstance(): SoundService {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }

    public playCorrectSound(): void {
        const speakerEnabled = sessionStorage.getItem('speakersEnabled');
        if (speakerEnabled === 'false') {
            return;
        }
        this.correctSound.currentTime = 0;
        this.correctSound.play().catch(error => console.log('Error playing correct sound:', error));
    }

    public playIncorrectSound(): void {
        const speakerEnabled = sessionStorage.getItem('speakersEnabled');
        if (speakerEnabled === 'false') {
            return;
        }
        this.incorrectSound.currentTime = 0;
        this.incorrectSound.play().catch(error => console.log('Error playing incorrect sound:', error));
    }

    public playGameOverSound(): void {
        const gameOverSound = new Audio('./sounds/game-over.mp3');
        const speakerEnabled = sessionStorage.getItem('speakersEnabled');
        if (speakerEnabled === 'false') {
            return;
        }
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(error => console.log('Error playing game over sound:', error));
    }
} 
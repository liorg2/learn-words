export class SoundService {
    private static instance: SoundService;
    private correctSound: HTMLAudioElement;
    private incorrectSound: HTMLAudioElement;
    private gameOverSound: HTMLAudioElement;
    private audioContext: AudioContext | null = null;
    private soundBuffers: Map<string, AudioBuffer> = new Map();
    private isIOS: boolean = /iPad|iPhone|iPod/.test(navigator.userAgent);

    private constructor() {
        // Initialize audio elements
        this.correctSound = new Audio('assets/correct.mp3');
        this.incorrectSound = new Audio('assets/error-2-36058.mp3');
        this.gameOverSound = new Audio('assets/game-over.mp3');

        // Preload audio for iOS
        if (this.isIOS) {
            this.initAudioContext();
            this.preloadAudio('assets/correct.mp3', 'correct');
            this.preloadAudio('assets/error-2-36058.mp3', 'incorrect');
            this.preloadAudio('assets/game-over.mp3', 'gameOver');
        }

        // Add touch event listener for iOS
        document.addEventListener('touchstart', () => {
            if (this.isIOS && this.audioContext?.state === 'suspended') {
                this.audioContext.resume();
            }
        }, {once: true});
    }

    private initAudioContext() {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (error) {
            console.error('Web Audio API not supported:', error);
        }
    }

    private async preloadAudio(url: string, id: string) {
        if (!this.audioContext) return;

        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.soundBuffers.set(id, audioBuffer);
        } catch (error) {
            console.error(`Error loading sound ${id}:`, error);
        }
    }

    private async playIOSAudio(buffer: AudioBuffer) {
        if (!this.audioContext) return;

        try {
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(0);
        } catch (error) {
            console.error('Error playing iOS audio:', error);
        }
    }

    private static isSpeakerEnabled(): boolean {
        return sessionStorage.getItem('speakersEnabled') !== 'false';
    }

    private async playAudio(sound: HTMLAudioElement, bufferId: string): Promise<void> {
        if (!SoundService.isSpeakerEnabled()) return;

        if (this.isIOS) {
            const buffer = this.soundBuffers.get(bufferId);
            if (buffer) {
                await this.playIOSAudio(buffer);
            }
        } else {
            sound.currentTime = 0;
            try {
                await sound.play();
            } catch (error) {
                console.log('Error playing sound:', error);
            }
        }
    }

    public async playCorrectSound(): Promise<void> {
        await this.playAudio(this.correctSound, 'correct');
    }

    public async playIncorrectSound(): Promise<void> {
        await this.playAudio(this.incorrectSound, 'incorrect');
    }

    public async playGameOverSound(): Promise<void> {
        await this.playAudio(this.gameOverSound, 'gameOver');
    }

    public static getInstance(): SoundService {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }
}
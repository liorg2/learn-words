var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SoundService {
    constructor() {
        this.audioContext = null;
        this.soundBuffers = new Map();
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
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
            var _a;
            if (this.isIOS && ((_a = this.audioContext) === null || _a === void 0 ? void 0 : _a.state) === 'suspended') {
                this.audioContext.resume();
            }
        }, {once: true});
    }

    initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (error) {
            console.error('Web Audio API not supported:', error);
        }
    }

    preloadAudio(url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.audioContext)
                return;
            try {
                const response = yield fetch(url);
                const arrayBuffer = yield response.arrayBuffer();
                const audioBuffer = yield this.audioContext.decodeAudioData(arrayBuffer);
                this.soundBuffers.set(id, audioBuffer);
            } catch (error) {
                console.error(`Error loading sound ${id}:`, error);
            }
        });
    }

    playIOSAudio(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.audioContext)
                return;
            try {
                const source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioContext.destination);
                source.start(0);
            } catch (error) {
                console.error('Error playing iOS audio:', error);
            }
        });
    }
    static isSpeakerEnabled() {
        return sessionStorage.getItem('speakersEnabled') !== 'false';
    }

    playAudio(sound, bufferId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SoundService.isSpeakerEnabled())
                return;
            if (this.isIOS) {
                const buffer = this.soundBuffers.get(bufferId);
                if (buffer) {
                    yield this.playIOSAudio(buffer);
                }
            } else {
                sound.currentTime = 0;
                try {
                    yield sound.play();
                } catch (error) {
                    console.log('Error playing sound:', error);
                }
            }
        });
    }
    playCorrectSound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.playAudio(this.correctSound, 'correct');
        });
    }
    playIncorrectSound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.playAudio(this.incorrectSound, 'incorrect');
        });
    }
    playGameOverSound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.playAudio(this.gameOverSound, 'gameOver');
        });
    }
    static getInstance() {
        if (!SoundService.instance) {
            SoundService.instance = new SoundService();
        }
        return SoundService.instance;
    }
}

import Hotkeys from '@typo3/backend/hotkeys.js';

/**
 * Unicorn Runner - A magical unicorn that runs and jumps across the TYPO3 backend.
 */
class UnicornRunner {
    static GROUND_HEIGHT = 64;
    static UNICORN_SIZE = 64;
    static MIN_SPEED = 0.5;
    static MAX_SPEED = 8;
    static SPEED_STEP = 0.5;
    static JUMP_DURATION_FRAMES = 40;
    static MIN_JUMP_RATIO = 0.05;
    static MAX_JUMP_RATIO = 0.6;
    static JUMP_STEP = 0.05;
    static SPARKLE_INTERVAL = 80;
    static SPARKLE_LIFETIME = 800;
    static SPARKLE_SYMBOLS = ['\u2728', '\u2B50', '\u{1F31F}', '\u{1FA77}', '\u{1F496}'];
    static SPARKLE_COLORS = ['#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bd6', '#c084fc'];

    constructor() {
        this.container = null;
        this.unicorn = null;
        this.x = -UnicornRunner.UNICORN_SIZE;
        this.y = 0;
        this.velocityY = 0;
        this.speed = 2;
        this.isJumping = false;
        this.direction = 1;
        this.animationId = null;
        this.sparkles = [];
        this.lastSparkleTime = 0;
        this.running = false;
        this.paused = false;
        this.jumpHeightRatio = 0.15;
        this.lastUpKeyTime = 0;
        this.upKeyCombo = 0;
        this.upsideDown = false;
        this.#init();
    }

    #jump() {
        if (this.isJumping || !this.running || this.paused) {
            return;
        }
        const jumpHeight = window.innerHeight * this.jumpHeightRatio;
        const frames = UnicornRunner.JUMP_DURATION_FRAMES;
        if (this.upsideDown) {
            // Jump away from ceiling: positive velocity, negative gravity pulls back up
            this.gravity = -((2 * jumpHeight) / (frames / 2) ** 2);
            this.velocityY = (2 * jumpHeight) / (frames / 2);
        } else {
            this.gravity = (2 * jumpHeight) / (frames / 2) ** 2;
            this.velocityY = -(2 * jumpHeight) / (frames / 2);
        }
        this.isJumping = true;
    }

    #init() {
        this.container = document.createElement('div');
        Object.assign(this.container.style, {
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '9999',
            overflow: 'hidden',
        });

        this.unicorn = document.createElement('typo3-backend-icon');
        this.unicorn.setAttribute('identifier', 'unicorn-icon');
        this.unicorn.setAttribute('size', 'mega');
        Object.assign(this.unicorn.style, {
            position: 'absolute',
            bottom: '0',
            left: '-' + UnicornRunner.UNICORN_SIZE + 'px',
            width: UnicornRunner.UNICORN_SIZE + 'px',
            height: UnicornRunner.UNICORN_SIZE + 'px',
            transition: 'none',
            userSelect: 'none',
        });

        this.container.appendChild(this.unicorn);
        document.body.appendChild(this.container);
        this.container.style.display = 'none';

        this.x = -UnicornRunner.UNICORN_SIZE;

        // Cmd/Ctrl+U: toggle unicorn visibility (works across frames via Hotkey API)
        Hotkeys.register(
            [Hotkeys.normalizedCtrlModifierKey, 'u'],
            (e) => {
                e.preventDefault();
                this.#toggle();
            },
            { scope: 'all' }
        );

        // Cmd/Ctrl+.: pause/resume (works across frames via Hotkey API)
        Hotkeys.register(
            [Hotkeys.normalizedCtrlModifierKey, '.'],
            (e) => {
                if (this.running) { e.preventDefault(); }
                this.#togglePause();
            },
            { scope: 'all' }
        );

        // Arrow keys for jump/speed control (bound to top.document for cross-frame support)
        top.document.addEventListener('keydown', (e) => {
            // Prevent scrolling while unicorn is visible
            if (this.running && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
            }
            if (!this.running || this.paused) {
                return;
            }
            if (e.key === 'ArrowUp') {
                const pressTime = performance.now();
                if (pressTime - this.lastUpKeyTime < 400) {
                    this.upKeyCombo++;
                } else {
                    this.upKeyCombo = 1;
                }
                this.lastUpKeyTime = pressTime;
                this.jumpHeightRatio = Math.min(
                    UnicornRunner.MAX_JUMP_RATIO,
                    this.jumpHeightRatio + UnicornRunner.JUMP_STEP
                );
                this.#jump();
                if (this.upKeyCombo === 2) {
                    this.upKeyCombo = 0;
                    this.#triggerStarShower(pressTime);
                }
            }
            if (e.key === 'ArrowDown') {
                this.upsideDown = !this.upsideDown;
                this.isJumping = false;
                this.y = 0;
                this.velocityY = 0;
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const isFaster = (e.key === 'ArrowRight') === (this.direction === 1);
                const delta = isFaster ? UnicornRunner.SPEED_STEP : -UnicornRunner.SPEED_STEP;
                this.speed = Math.max(UnicornRunner.MIN_SPEED, Math.min(UnicornRunner.MAX_SPEED, this.speed + delta));
            }
        });
    }

    #toggle() {
        this.running = !this.running;
        if (this.running) {
            this.paused = false;
            this.container.style.display = '';
            this.#loop();
        } else {
            this.paused = false;
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            this.container.style.display = 'none';
            // Clean up sparkles
            for (const s of this.sparkles) {
                s.el.remove();
            }
            this.sparkles = [];
        }
    }

    #togglePause() {
        if (!this.running) {
            return;
        }
        this.paused = !this.paused;
        if (this.paused) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        } else {
            this.#loop();
        }
    }

    #spawnSparkle(now) {
        const symbols = UnicornRunner.SPARKLE_SYMBOLS;
        const colors = UnicornRunner.SPARKLE_COLORS;
        const el = document.createElement('span');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        // scaleX(-1) when direction=1, so visual rear is on the right side
        const behindOffset = this.direction === 1
            ? (UnicornRunner.UNICORN_SIZE - 128)
            : (UnicornRunner.UNICORN_SIZE - 78);
        Object.assign(el.style, {
            position: 'absolute',
            bottom: '0',
            left: '0',
            fontSize: (8 + Math.random() * 10) + 'px',
            lineHeight: '1',
            pointerEvents: 'none',
            filter: `drop-shadow(0 0 3px ${colors[Math.floor(Math.random() * colors.length)]})`,
            transition: 'none',
        });
        const topY = -(window.innerHeight - UnicornRunner.UNICORN_SIZE);
        const spawnY = this.upsideDown
            ? topY + this.y + 16
            : this.y + (UnicornRunner.UNICORN_SIZE - 84);
        const spawnVy = this.upsideDown ? (1 + Math.random() * 2) : -(1 + Math.random() * 2);
        this.container.appendChild(el);
        this.sparkles.push({
            el,
            x: this.x + behindOffset,
            y: spawnY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: spawnVy,
            born: now,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            gravity: this.upsideDown ? -0.05 : undefined,
        });
    }

    #updateSparkles(now) {
        for (let i = this.sparkles.length - 1; i >= 0; i--) {
            const s = this.sparkles[i];
            const lifetime = s.lifetime ?? UnicornRunner.SPARKLE_LIFETIME;
            const age = now - s.born;
            if (age > lifetime) {
                s.el.remove();
                this.sparkles.splice(i, 1);
                continue;
            }
            s.x += s.vx;
            s.y += s.vy;
            s.vy += s.gravity ?? 0.05;
            s.rotation += s.rotationSpeed;
            const opacity = 1 - age / lifetime;
            const scale = 0.5 + opacity * 0.5;
            s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg) scale(${scale})`;
            s.el.style.opacity = String(opacity);
        }
    }

    #triggerStarShower(now) {
        const symbols = UnicornRunner.SPARKLE_SYMBOLS;
        const fragment = document.createDocumentFragment();

        // 5 random bursts spread across the viewport
        for (let b = 0; b < 5; b++) {
            const burstX = Math.random() * window.innerWidth;
            const burstY = -(window.innerHeight * (0.1 + Math.random() * 0.8));

            for (let i = 0; i < 12; i++) {
                const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
                const speed = 2 + Math.random() * 4;
                const el = document.createElement('span');
                el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                Object.assign(el.style, {
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    fontSize: (14 + Math.random() * 14) + 'px',
                    lineHeight: '1',
                    pointerEvents: 'none',
                    willChange: 'transform, opacity',
                    transition: 'none',
                });
                fragment.appendChild(el);
                this.sparkles.push({
                    el,
                    x: burstX,
                    y: burstY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1.5,
                    born: now,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 12,
                    lifetime: 1400,
                    gravity: 0.08,
                });
            }
        }

        // Radial explosion burst from the unicorn's current position
        const topY = -(window.innerHeight - UnicornRunner.UNICORN_SIZE);
        const explosionX = this.x + UnicornRunner.UNICORN_SIZE / 2;
        const explosionY = (this.upsideDown ? topY + this.y : this.y) - UnicornRunner.UNICORN_SIZE / 2;
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.3;
            const speed = 3 + Math.random() * 8;
            const el = document.createElement('span');
            el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            Object.assign(el.style, {
                position: 'absolute',
                bottom: '0',
                left: '0',
                fontSize: (18 + Math.random() * 22) + 'px',
                lineHeight: '1',
                pointerEvents: 'none',
                willChange: 'transform, opacity',
                transition: 'none',
            });
            fragment.appendChild(el);
            this.sparkles.push({
                el,
                x: explosionX,
                y: explosionY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                born: now,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 15,
                lifetime: 2000,
                gravity: 0.1,
            });
        }

        this.container.appendChild(fragment); // single DOM insertion
    }

    #loop() {
        const now = performance.now();
        const viewportWidth = window.innerWidth;

        // Move horizontally
        this.x += this.speed * this.direction;

        // Handle direction change when hitting edges
        if (this.direction === 1 && this.x > viewportWidth + UnicornRunner.UNICORN_SIZE) {
            this.direction = -1;
            this.x = viewportWidth + UnicornRunner.UNICORN_SIZE;
        } else if (this.direction === -1 && this.x < -UnicornRunner.UNICORN_SIZE * 2) {
            this.direction = 1;
            this.x = -UnicornRunner.UNICORN_SIZE;
        }

        // Apply gravity when jumping
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;

            const landed = this.upsideDown ? this.y <= 0 : this.y >= 0;
            if (landed) {
                this.y = 0;
                this.velocityY = 0;
                this.isJumping = false;
            }
        }

        // Apply position
        const scaleX = this.direction === 1 ? -1 : 1;
        if (this.upsideDown) {
            const topY = -(window.innerHeight - UnicornRunner.UNICORN_SIZE);
            const bob = this.isJumping ? 0 : Math.sin(now * 0.01) * 2;
            this.unicorn.style.transform = `translateX(${this.x}px) translateY(${topY + this.y - bob}px) scaleX(${scaleX}) scaleY(-1)`;
        } else {
            this.unicorn.style.transform = `translateX(${this.x}px) translateY(${this.y}px) scaleX(${scaleX})`;
            // Bobbing animation while running (only when on ground)
            const bob = this.isJumping ? 0 : Math.sin(now * 0.01) * 2;
            this.unicorn.style.transform += ` translateY(${bob}px)`;
        }

        // Poop sparkles behind the unicorn
        if (now - this.lastSparkleTime > UnicornRunner.SPARKLE_INTERVAL) {
            this.#spawnSparkle(now);
            this.lastSparkleTime = now;
        }
        this.#updateSparkles(now);

        if (this.running) {
            this.animationId = requestAnimationFrame(() => this.#loop());
        }
    }
}

// Start the unicorn when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new UnicornRunner());
} else {
    new UnicornRunner();
}

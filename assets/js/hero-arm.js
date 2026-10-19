// Header animation: a flow field of particles with a robot arm on top.
// The arm follows the cursor with FABRIK inverse kinematics and stirs the flow with its gripper.
// Pauses when the header is off screen or the tab is hidden; draws one still frame for reduced motion.
// Adapted directly from clthegoat.github.io for https://nicknam.tech
(() => {
    const root = document.documentElement;
    const stage = document.getElementById('hero');
    if (!stage) return;
    const cvB = document.getElementById('hero-flow');
    const cvF = document.getElementById('hero-arm');
    if (!cvB || !cvF) return;
    const bg = cvB.getContext('2d');
    const fg = cvF.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const sysDark = matchMedia('(prefers-color-scheme: dark)');

    let W = 0, H = 0, running = false, gen = 0, last = 0, inView = true;
    const pointer = { x: 0, y: 0, active: false, down: false, seen: -1e9 };
    let C = {};

    function readColors() {
        const cs = getComputedStyle(root);
        const g = n => cs.getPropertyValue(n).trim();
        const isDark = root.getAttribute('data-theme') === 'dark' ||
                       (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        C = {
            fg: g('--fg') || (isDark ? '#e4e8ef' : '#18202c'),
            muted: g('--muted') || (isDark ? '#97a1b1' : '#596273'),
            surface: g('--surface') || (isDark ? '#161c25' : '#ffffff'),
            accent: g('--accent') || (isDark ? '#83a9ff' : '#2453c4'),
            accent2: g('--accent-2') || (isDark ? '#f0a058' : '#d3741f')
        };
    }

    function rgba(hex, a) {
        if (!hex || hex[0] !== '#') return `rgba(128, 128, 128, ${a})`;
        let h = hex.slice(1);
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        const n = parseInt(h, 16);
        if (isNaN(n)) return `rgba(128, 128, 128, ${a})`;
        return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    }

    // ---------- value noise ----------
    function hash(i, j, k) {
        let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 1440662683)) | 0;
        h = Math.imul(h ^ (h >>> 13), 1274126177);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    }

    function noise3(x, y, z) {
        const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        const xf = x - xi, yf = y - yi, zf = z - zi;
        const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
        const L = (a, b, t) => a + (b - a) * t;
        return L(
            L(L(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), L(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
            L(L(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), L(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
            w);
    }

    // ---------- flow field ----------
    const Flow = {
        L: 19,  // trail length in frames
        B: 3,   // alpha bands along each trail
        ps: [],
        reset() {
            const n = Math.round(Math.max(260, Math.min(900, (W * H) / 1000)));
            this.ps = [];
            for (let i = 0; i < n; i++) {
                const p = { hx: new Float32Array(this.L), hy: new Float32Array(this.L), head: 0, life: 0, max: 0, c: 0 };
                this.spawn(p, true);
                this.ps.push(p);
            }
        },
        spawn(p, initial) {
            const x = Math.random() * W, y = Math.random() * H;
            p.hx.fill(x);
            p.hy.fill(y);
            p.head = 0;
            p.max = 240 + Math.random() * 360;
            p.life = initial ? Math.random() * p.max : 0;
            p.c = Math.random() < 0.8 ? 0 : 1;
        },
        step(dt, t, stirs) {
            const s = 0.0024, z = t * 0.00004, k = dt / 16.67, R = 150;
            for (const p of this.ps) {
                const x = p.hx[p.head], y = p.hy[p.head];
                const n = noise3(x * s, y * s, z) * 0.7 + noise3(x * s * 2.3, y * s * 2.3, z + 7.1) * 0.3;
                const a = n * Math.PI * 4;
                let vx = Math.cos(a), vy = Math.sin(a);
                for (const st of stirs) {
                    const dx = x - st.x, dy = y - st.y, d2 = dx * dx + dy * dy;
                    if (d2 < R * R) {
                        const d = Math.sqrt(d2) || 1, f = 1 - d / R;
                        vx += (-dy / d * 1.8 + dx / d * 0.5) * f;
                        vy += (dx / d * 1.8 + dy / d * 0.5) * f;
                    }
                }
                const sp = 1.05 * k, nx = x + vx * sp, ny = y + vy * sp;
                p.life += k;
                if (nx < -2 || nx > W + 2 || ny < -2 || ny > H + 2 || p.life > p.max) {
                    this.spawn(p, false);
                    continue;
                }
                p.head = (p.head + 1) % this.L;
                p.hx[p.head] = nx;
                p.hy[p.head] = ny;
            }
        },
        draw() {
            const L = this.L, B = this.B, seg = Math.floor((L - 1) / B);
            bg.clearRect(0, 0, W, H);
            bg.lineWidth = 1.1;
            bg.lineCap = 'butt';
            bg.lineJoin = 'round';
            for (let c = 0; c < 2; c++) {
                const col = c ? C.accent2 : C.accent, base = c ? 0.6 : 0.5;
                for (let b = 0; b < B; b++) {
                    bg.strokeStyle = rgba(col, base * (1 - b / B));
                    bg.beginPath();
                    for (const p of this.ps) {
                        if (p.c !== c) continue;
                        let idx = (p.head - b * seg + L * 4) % L;
                        bg.moveTo(p.hx[idx], p.hy[idx]);
                        for (let j = 0; j < seg; j++) {
                            idx = (idx - 1 + L) % L;
                            bg.lineTo(p.hx[idx], p.hy[idx]);
                        }
                    }
                    bg.stroke();
                }
            }
        }
    };

    // ---------- robot arm ----------
    const Arm = {
        n: 4,
        ratios: [0.34, 0.3, 0.22, 0.14],
        lens: [], P: [], base: { x: 0, y: 0 }, s: { x: 0, y: 0 },
        grip: 0, reach: 0, sc: 1, u: { x: 0, y: -1 },
        reset() {
            this.reach = Math.max(140, Math.min(W * 0.42, H * 0.9, 440));
            this.sc = Math.max(0.55, Math.min(1, this.reach / 360));
            this.lens = this.ratios.map(r => r * this.reach);
            this.base = { x: W - Math.max(64, Math.min(W * 0.16, 190)), y: H - 20 * this.sc };
            this.P = [{ x: this.base.x, y: this.base.y }];
            let ang = -Math.PI / 2 - 0.25;
            for (let i = 0; i < this.n; i++) {
                const p = this.P[i];
                this.P.push({ x: p.x + Math.cos(ang) * this.lens[i], y: p.y + Math.sin(ang) * this.lens[i] });
                ang -= 0.45;
            }
            const e = this.P[this.n];
            this.s = { x: e.x, y: e.y };
        },
        tip() {
            const e = this.P[this.n];
            return { x: e.x + this.u.x * 18 * this.sc, y: e.y + this.u.y * 18 * this.sc };
        },
        idleTarget(t) {
            const b = this.base, r = this.reach;
            return {
                x: b.x - r * 0.42 + Math.cos(t * 0.00055) * r * 0.3,
                y: b.y - r * 0.6 + Math.sin(t * 0.0011) * r * 0.22
            };
        },
        // Forward pass from the base with joint limits, so the arm never folds back on itself.
        // The first joint stays within 80° of vertical, the others within 120° of the previous link.
        forward() {
            const P = this.P, L = this.lens, b = this.base;
            P[0].x = b.x;
            P[0].y = b.y;
            let prev = -Math.PI / 2;
            for (let i = 0; i < this.n; i++) {
                let rel = Math.atan2(P[i + 1].y - P[i].y, P[i + 1].x - P[i].x) - prev;
                while (rel > Math.PI) rel -= 2 * Math.PI;
                while (rel < -Math.PI) rel += 2 * Math.PI;
                const lim = i === 0 ? 1.4 : 2.1;
                const ang = prev + Math.max(-lim, Math.min(lim, rel));
                P[i + 1].x = P[i].x + Math.cos(ang) * L[i];
                P[i + 1].y = P[i].y + Math.sin(ang) * L[i];
                prev = ang;
            }
        },
        solve(tx, ty) {
            const P = this.P, L = this.lens, n = this.n, b = this.base;
            const total = L.reduce((a, c) => a + c, 0);
            if (Math.hypot(tx - b.x, ty - b.y) >= total * 0.999) {
                // out of reach: point straight at the target
                P[0].x = b.x;
                P[0].y = b.y;
                for (let i = 0; i < n; i++) {
                    const ex = tx - P[i].x, ey = ty - P[i].y, d = Math.hypot(ex, ey) || 1;
                    P[i + 1].x = P[i].x + ex / d * L[i];
                    P[i + 1].y = P[i].y + ey / d * L[i];
                }
                this.forward();
                return;
            }
            for (let it = 0; it < 12; it++) {
                P[n].x = tx;
                P[n].y = ty;
                for (let i = n - 1; i >= 0; i--) {
                    const ex = P[i].x - P[i + 1].x, ey = P[i].y - P[i + 1].y, d = Math.hypot(ex, ey) || 1;
                    P[i].x = P[i + 1].x + ex / d * L[i];
                    P[i].y = P[i + 1].y + ey / d * L[i];
                }
                this.forward();
                if (Math.hypot(P[n].x - tx, P[n].y - ty) < 0.3) break;
            }
        },
        frame(dt, t) {
            const idle = !pointer.active || t - pointer.seen > 4000;
            const tg = idle ? this.idleTarget(t) : { x: pointer.x, y: Math.min(pointer.y, H - 24) };
            // aim the wrist so the fingertips, not the wrist, land on the target
            const wx = tg.x - this.u.x * 16 * this.sc, wy = tg.y - this.u.y * 16 * this.sc;
            const a = 1 - Math.exp(-dt / 140);
            this.s.x += (wx - this.s.x) * a;
            this.s.y += (wy - this.s.y) * a;
            this.solve(this.s.x, this.s.y);
            const e = this.P[this.n], p = this.P[this.n - 1], d = Math.hypot(e.x - p.x, e.y - p.y) || 1;
            this.u = { x: (e.x - p.x) / d, y: (e.y - p.y) / d };
            const want = idle ? (Math.sin(t * 0.0016) > 0.55 ? 1 : 0) : (pointer.down ? 1 : 0);
            this.grip += (want - this.grip) * (1 - Math.exp(-dt / 90));
            this.draw(idle ? null : tg);
        },
        draw(tg) {
            const P = this.P, sc = this.sc, b = this.base, ctx = fg, n = this.n;
            ctx.save();
            ctx.globalAlpha = W < 720 ? 0.6 : 1;

            // base plate
            ctx.beginPath();
            ctx.moveTo(b.x - 40 * sc, H + 1);
            ctx.lineTo(b.x - 26 * sc, b.y);
            ctx.lineTo(b.x + 26 * sc, b.y);
            ctx.lineTo(b.x + 40 * sc, H + 1);
            ctx.closePath();
            ctx.fillStyle = C.surface;
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = rgba(C.fg, 0.7);
            ctx.stroke();

            // target crosshair and tracking line
            const e = P[n];
            if (tg) {
                ctx.setLineDash([3, 4]);
                ctx.lineWidth = 1;
                ctx.strokeStyle = rgba(C.muted, 0.7);
                ctx.beginPath();
                ctx.moveTo(e.x, e.y);
                ctx.lineTo(tg.x, tg.y);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.strokeStyle = rgba(C.accent, 0.9);
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(tg.x, tg.y, 7, 0, Math.PI * 2);
                ctx.moveTo(tg.x - 13, tg.y); ctx.lineTo(tg.x - 4, tg.y);
                ctx.moveTo(tg.x + 4, tg.y); ctx.lineTo(tg.x + 13, tg.y);
                ctx.moveTo(tg.x, tg.y - 13); ctx.lineTo(tg.x, tg.y - 4);
                ctx.moveTo(tg.x, tg.y + 4); ctx.lineTo(tg.x, tg.y + 13);
                ctx.stroke();
            }

            // links
            const widths = [14, 11, 8.5, 6.5].map(w => w * sc);
            ctx.lineCap = 'round';
            for (let i = 0; i < n; i++) {
                const a = P[i], c = P[i + 1];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(c.x, c.y);
                ctx.strokeStyle = rgba(C.fg, 0.75);
                ctx.lineWidth = widths[i] + 3;
                ctx.stroke();
                ctx.strokeStyle = C.surface;
                ctx.lineWidth = widths[i];
                ctx.stroke();
                ctx.strokeStyle = rgba(C.accent, 0.55);
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            // gripper
            const u = this.u, nx = -u.y, ny = u.x;
            const open = (1 - this.grip) * 10 * sc + 3 * sc, fl = 20 * sc;
            ctx.lineWidth = 3 * sc + 0.5;
            ctx.strokeStyle = rgba(C.fg, 0.8);
            ctx.lineJoin = 'round';
            for (const sg of [-1, 1]) {
                const tipOff = Math.max(1.5, open - 5 * sc);
                ctx.beginPath();
                ctx.moveTo(e.x + nx * sg * 4 * sc, e.y + ny * sg * 4 * sc);
                ctx.lineTo(e.x + u.x * fl * 0.5 + nx * sg * open, e.y + u.y * fl * 0.5 + ny * sg * open);
                ctx.lineTo(e.x + u.x * fl + nx * sg * tipOff, e.y + u.y * fl + ny * sg * tipOff);
                ctx.stroke();
            }

            // joints
            for (let i = 0; i <= n; i++) {
                const p = P[i], r = (widths[Math.min(i, n - 1)] / 2 + 4) * (i === n ? 0.8 : 1);
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fillStyle = C.surface;
                ctx.fill();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = rgba(C.fg, 0.75);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.2 * sc + 0.6, 0, Math.PI * 2);
                ctx.fillStyle = C.accent;
                ctx.fill();
            }

            // joint-angle readout
            if (W >= 480) {
                const q = [];
                let prev = -Math.PI / 2;
                for (let i = 0; i < n; i++) {
                    const ang = Math.atan2(P[i + 1].y - P[i].y, P[i + 1].x - P[i].x);
                    let r = ang - prev;
                    while (r > Math.PI) r -= 2 * Math.PI;
                    while (r < -Math.PI) r += 2 * Math.PI;
                    q.push(r);
                    prev = ang;
                }
                const txt = 'q = [' + q.map(r => {
                    const d = Math.round(-r * 180 / Math.PI);
                    return ((d >= 0 ? '+' : '−') + Math.abs(d) + '°').padStart(5, ' ');
                }).join(' ') + ' ]';
                ctx.font = '500 11px "IBM Plex Mono", ui-monospace, Menlo, monospace';
                ctx.fillStyle = rgba(C.muted, 0.95);
                ctx.textAlign = 'right';
                ctx.textBaseline = 'alphabetic';
                ctx.fillText(txt, b.x - 50 * sc, H - 9);
            }
            ctx.restore();
        }
    };

    // ---------- loop ----------
    function tick(dt, t) {
        const stirs = [Arm.tip()];
        if (pointer.active) stirs.push(pointer);
        Flow.step(dt, t, stirs);
        Flow.draw();
        fg.clearRect(0, 0, W, H);
        Arm.frame(dt, t);
    }

    function still() {
        const t0 = 20000;
        for (let i = 0; i < 40; i++) Flow.step(16.67, t0, []);
        Flow.draw();
        for (let i = 0; i < 40; i++) {
            fg.clearRect(0, 0, W, H);
            Arm.frame(16.67, t0);
        }
    }

    function start() {
        const my = ++gen;
        last = performance.now();
        const f = t => {
            if (my !== gen) return;
            const dt = Math.min(50, Math.max(0, t - last));
            last = t;
            tick(dt, t);
            requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    }

    function sync() {
        const go = inView && !document.hidden && !reduce.matches;
        if (go && !running) { running = true; start(); }
        else if (!go && running) { running = false; gen++; }
    }

    function reset() {
        bg.clearRect(0, 0, W, H);
        fg.clearRect(0, 0, W, H);
        Flow.reset();
        Arm.reset();
        if (reduce.matches) still();
    }

    function resize() {
        const r = stage.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        W = Math.max(1, Math.round(r.width));
        H = Math.max(1, Math.round(r.height));
        for (const [cv, ctx] of [[cvB, bg], [cvF, fg]]) {
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        reset();
    }

    // ---------- events ----------
    function setPointer(e) {
        const r = stage.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
        pointer.active = true;
        pointer.seen = performance.now();
    }
    stage.addEventListener('pointermove', setPointer);
    stage.addEventListener('pointerdown', e => { setPointer(e); pointer.down = true; });
    stage.addEventListener('pointerleave', () => { pointer.active = false; pointer.down = false; });
    window.addEventListener('pointerup', () => { pointer.down = false; });

    function onTheme() {
        readColors();
        if (reduce.matches) still();
    }
    new MutationObserver(onTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    sysDark.addEventListener('change', onTheme);

    reduce.addEventListener('change', () => { reset(); sync(); });
    document.addEventListener('visibilitychange', sync);
    new IntersectionObserver(es => { inView = es[0].isIntersecting; sync(); }).observe(stage);
    new ResizeObserver(resize).observe(stage);

    // fade the animation out as the header scrolls away
    window.addEventListener('scroll', () => {
        const o = Math.max(0, 1 - window.scrollY / (stage.offsetHeight * 0.85));
        cvB.style.opacity = o;
        cvF.style.opacity = o;
    }, { passive: true });

    readColors();
    resize();
    sync();
})();

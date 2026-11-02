---
layout: post
title: "Human-Exclusive Information Channels: Cryptographic & Perceptual Obfuscation Against Large Language Models"
date: 2026-11-02 12:00:00
description: "A comprehensive analysis and interactive research laboratory investigating cryptographic, tokenizer-splitting, and temporal anti-screenshot methods to deliver text exclusively to human readers while remaining opaque to LLMs and multimodal scrapers."
tags: [cryptography, large-language-models, information-security, web-security, tokenization, adversarial-ml]
categories: [research, cryptography]
featured: true
---

<div class="text-center my-4">
  <h1 class="font-weight-bold" style="font-size: 2.35rem; line-height: 1.25;">Human-Exclusive Information Channels</h1>
  <h4 class="text-secondary" style="font-weight: 500;">Cryptographic & Perceptual Methods to Hide Public Text from LLMs</h4>
  <p class="lead text-muted mt-2" style="font-size: 1.05rem;">
    A Technical Treatise & Interactive Demonstration on Asymmetric Human-AI Information Delivery
  </p>
</div>

<!-- ========================================================================= -->
<!-- 0. INTERACTIVE HERO: THE ASYMMETRY LENS                                   -->
<!-- ========================================================================= -->

<div class="heic-hero-wrapper">
  <div class="heic-hero-controls">
    <div class="heic-title">
      <i class="fa-solid fa-eye-slash"></i> Threat Hierarchy & Human Perception Lens
    </div>
    <div class="btn-group" role="group" aria-label="Hero Tiers">
      <button type="button" class="btn-tier" data-hero-tier="1">Tier 1: WebCrypto Hex</button>
      <button type="button" class="btn-tier active" data-hero-tier="2">Tier 2: Font Cipher</button>
      <button type="button" class="btn-tier" data-hero-tier="3">Tier 3: BPE Shatter</button>
      <button type="button" class="btn-tier" data-hero-tier="4">Tier 4: Temporal Screenshot</button>
    </div>
  </div>
  <canvas id="heic-hero-canvas"></canvas>
  <div class="heic-hero-caption">
    <span><i class="fa-solid fa-arrows-to-dot"></i> Hover or drag pointer across the canvas to decode in real-time</span>
    <span>Channel Asymmetry: $I(\text{Human}; X) \gg I(\text{AI}; X)$</span>
  </div>
</div>

<hr />

## 1. The Core Dilemma: Public Accessibility vs. Unconsented AI Ingestion

The modern open web is grounded on a decades-old axiom: **if information is public, it must be universally machine-readable**. For search engines indexing documents via HTTP GET, this premise fostered open access. However, the rapid proliferation of automated scraping infrastructure for Large Language Model (LLM) pre-training corpora, Retrieval-Augmented Generation (RAG) scrapers, and autonomous web-agent workers has radically destabilized this dynamic.

Authors, researchers, domain experts, and privacy-conscious publishers face an asymmetric dilemma:

> **The Publisher's Paradox:** How can an author distribute text across the public web so that **any human reader can read it instantaneously with zero login walls or identity checks**, while ensuring that **automated scrapers, tokenizer pipelines, and multimodal Vision-Language Models (VLMs) ingest only undecipherable entropy or poison?**

Addressing this requires constructing a **Human-Exclusive Information Channel (HEIC)**. In this treatise, we systematically dissect the threat model hierarchy across four distinct tiers of automated extraction—and develop live, verifiable defenses for each.

---

## 2. The Threat Hierarchy of Automated Extraction

To design principled defenses, we model the adversarial extractor across four escalating capabilities:

| Tier | Adversary Type | Inspection Vector | Extraction Mechanism | Defensive Primitive |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Raw HTTP Scrapers** (`curl`, `GPTBot`, `CCBot`) | Static HTTP response payload | Ingests raw `.html`, `.json`, or raw byte streams without JS execution | **Client-Side Proof-of-Work + WebCrypto** |
| **Tier 2** | **Headless Browser & DOM Scrapers** (Playwright, Puppeteer) | Rendered DOM tree / Clipboard events | Queries DOM elements (`innerText`, `textContent`) or fires clipboard copy events | **Bijective Font Glyph Substitution (`cmap`)** |
| **Tier 3** | **Tokenizer & Latent Ingestion** (BPE, WordPiece) | Unicode codepoints & semantic embeddings | Chunks UTF-8 byte sequences into integer token IDs $\mathbf{z} \in \mathbb{R}^d$ | **Adversarial Subword Splitting & Homoglyphs** |
| **Tier 4** | **Multimodal Vision-Language Models & OCR** (GPT-4o, Gemini, Screen Scrapers) | Rendered optical viewport | Takes static raster screenshots ($H \times W \times 3$) and runs ViT patch recognition | **Sub-Frame Temporal Multiplexing & Kinetic Parallax** |

Below, we analyze and simulate each defensive layer interactively.

---

## 3. Tier 1 Defenses: Client-Side Proof-of-Work & Asymmetric WebCrypto

### 3.1 Mathematical Formulation of the Asymmetry

In a standard static deployment (such as GitHub Pages or AWS S3), the server does not execute server-side authentication scripts. The HTML document must therefore contain the encrypted payload $C$ alongside an algorithmic challenge:

$$C = \text{AES-256-GCM}_{K}(\text{Plaintext})$$

Instead of transmitting the symmetric key $K$ directly over the wire, the document provides a salt $S$ and requires the client to solve a computational Proof-of-Work (PoW) puzzle:

$$\text{Find } \eta \in \mathbb{N} \quad \text{such that} \quad \text{SHA-256}(S \parallel \eta) \le \frac{2^{256}}{2^d}$$

where $d$ represents the difficulty in leading zero bits.

$$\text{Key Derivation:} \quad K = \text{HKDF-SHA256}(\text{Seed} \parallel \eta, S, \text{"heic-channel"})$$

### 3.2 Computational Cost Asymmetry

The defensive strength lies entirely in the **scale disparity**:

* **For a Human Reader:** Solving a $d = 16$ bit challenge takes approximately **$40\text{–}90\text{ ms}$** in a modern browser thread using JavaScript or WebAssembly—completely imperceptible to human reading latency.
* **For an LLM Crawler:** An automated scraper targeting $N = 10,000,000$ public pages cannot afford to expend $10^7 \times 2^{16} \approx 6.5 \times 10^{11}$ SHA-256 rounds. The compute and energy costs convert high-volume scraping from a virtually free operation into an economically prohibitive barrier.

---

### Interactive Laboratory 1: Client-Side WebCrypto + PoW Engine

Use the simulator below to test client-side cryptographic key derivation. Adjust the difficulty target and execute the browser miner:

<div class="crypto-lab-card" id="lab-pow">
  <div class="lab-header">
    <h4><i class="fa-solid fa-microchip"></i> Lab 1: Client-Side Proof-of-Work & AES-256-GCM Engine</h4>
    <span class="lab-badge">Tier 1 Defense</span>
  </div>
  <div class="lab-body">
    <div class="lab-controls">
      <label for="pow-diff-slider"><i class="fa-solid fa-gauge-high"></i> PoW Difficulty Target ($d$):</label>
      <input type="range" id="pow-diff-slider" min="8" max="20" value="14" step="1">
      <span class="stat-pill" id="pow-diff-val">14 bits</span>
      <button type="button" class="btn btn-sm btn-primary" id="pow-run-btn">
        <i class="fa-solid fa-key"></i> Mine Nonce & Decrypt Payload
      </button>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <small class="text-muted d-block">Iterations Computed ($\eta$):</small>
        <span class="font-weight-bold" id="pow-nonce">0</span>
      </div>
      <div class="col-md-5">
        <small class="text-muted d-block">Derived SHA-256 Digest:</small>
        <span class="font-weight-bold font-monospace text-truncate d-block" id="pow-hash">0x00000000...</span>
      </div>
      <div class="col-md-3">
        <small class="text-muted d-block">Client Mining Latency:</small>
        <span class="font-weight-bold text-success" id="pow-time">0 ms</span>
      </div>
    </div>

    <div class="alert alert-info py-2 px-3 mb-3" style="font-size: 0.84rem;">
      <i class="fa-solid fa-calculator"></i> <strong>Crawler Economic Burden:</strong> <span id="pow-scraper-cost">Calculating...</span>
    </div>

    <small class="text-muted d-block mb-1 font-monospace">DECRYPTED PAYLOAD BUFFER:</small>
    <div class="mono-display-box" id="pow-decrypted-box">
      0x8F4A2C91E0B73D56A14F98C20E5B71D39A4F62C81E0B73D56A14F98C20E5B71D39A4F62C8... [LOCKED CIPHERTEXT]
    </div>
    <div class="mt-2 text-muted" style="font-size: 0.8rem;" id="pow-status">
      Ready to compute. Payload is encrypted with AES-256-GCM.
    </div>
  </div>
</div>

---

## 4. Tier 2 Defenses: Bijective Glyph Substitution Ciphers (`cmap` Permutations)

### 4.1 Exploiting the Split Between Unicode Semantics and Font Glyphs

Even if a headless browser (e.g., Puppeteer, Playwright) executes JavaScript and evaluates the WebCrypto decryption, it typically extracts text by invoking:

```javascript
const capturedText = element.innerText; // or element.textContent
```

This reveals the second architectural vulnerability of digital typography: **the decoupling of Unicode semantic codepoints from vector rendering glyphs**.

```
HTML Codepoints (DOM)      OpenType / WOFF2 Font             Human Retina
[ U+0071 ] ("q")  =======> [ Glyph ID 84: Outline of 'T' ] ======> Sees: "T"
[ U+0038 ] ("8")  =======> [ Glyph ID 41: Outline of 'h' ] ======> Sees: "h"
[ U+0023 ] ("#")  =======> [ Glyph ID 29: Outline of 'e' ] ======> Sees: "e"
```

In standard typography, the OpenType `cmap` (Character to Glyph Mapping) table provides an identity or standard mapping:

$$\text{Codepoint } U \xrightarrow{\text{cmap}} \text{Glyph Outline } G(U)$$

In a **Bijective Glyph Substitution Channel**, the publisher dynamically generates a session-keyed permutation $\pi \in S_{|\Sigma|}$ across the printable character alphabet $\Sigma$. The underlying DOM tree contains exclusively permuted codepoints:

$$c_i = \pi(m_i)$$

Simultaneously, the webpage loads an ephemeral, in-memory `.woff2` font file whose internal `cmap` table is deliberately permuted with the inverse mapping $\pi^{-1}$:

$$\text{Glyph}(\pi(m_i)) = \text{Outline}(m_i)$$

### 4.2 The Clipboard & DOM Trap

Because modern operating systems copy the **raw Unicode codepoints** from the DOM rather than rasterizing visual pixels into text:
1. The **human reader** looks at the screen and perceives normal, beautiful typography.
2. An **LLM scraper** reading the DOM receives a cryptographically scrambled sequence.
3. If an adversary attempts to **highlight, copy, and paste** the text into ChatGPT, Claude, or a RAG vector database, the clipboard receives only the cipher stream $c_1 c_2 \dots c_n$.

---

### Interactive Laboratory 2: Live Copy-Paste Trap & Glyph Inspector

Try selecting the highlighted text below with your mouse, copy it (`Ctrl+C` / `Cmd+C`), and paste it (`Ctrl+V` / `Cmd+V`) into the interactive verification box on the right (or directly into your terminal or an LLM):

<div class="crypto-lab-card" id="lab-cp">
  <div class="lab-header">
    <h4><i class="fa-solid fa-scissors"></i> Lab 2: Bijective Glyph / DOM Substitution & Clipboard Trap</h4>
    <span class="lab-badge">Tier 2 Defense</span>
  </div>
  <div class="lab-body">
    <div class="lab-controls">
      <label for="cp-mode-select"><i class="fa-solid fa-fingerprint"></i> Clipboard Payload Strategy:</label>
      <select id="cp-mode-select" class="form-control form-control-sm" style="max-width: 260px; display: inline-block;">
        <option value="cipher">Keyed Ciphertext Permutation</option>
        <option value="homoglyph">Invisible Unicode Shaffling (ZWSP)</option>
        <option value="poison">Indirect Prompt Injection Trap</option>
      </select>
      <button type="button" class="btn btn-sm btn-outline-secondary" id="cp-rotate-key-btn">
        <i class="fa-solid fa-arrows-rotate"></i> Rotate Permutation Key
      </button>
    </div>

    <div class="cp-compare-grid">
      <div class="cp-panel">
        <div class="cp-panel-header text-primary">
          <i class="fa-solid fa-display"></i> Human Viewport (Rendered On Screen)
        </div>
        <div class="cp-interactive-text" id="cp-trap-source" title="Highlight and copy this text!">
          Artificial Intelligence models rely on faithful Unicode byte representations in the DOM. While a human reads the rendered vector curves on screen effortlessly, any scraper or clipboard copy-paste captures only the permuted cipher stream.
        </div>
        <small class="text-muted mt-2">
          <i class="fa-solid fa-hand-pointer"></i> <em>Highlight the text above and press copy!</em>
        </small>
      </div>

      <div class="cp-panel">
        <div class="cp-panel-header text-danger">
          <i class="fa-solid fa-clipboard-check"></i> Paste Verification Sandbox (What AI Receives)
        </div>
        <textarea class="cp-paste-input" id="cp-paste-target" placeholder="Click here and press Ctrl+V / Cmd+V to inspect copied payload..."></textarea>
        <small class="text-muted mt-2">
          Underlying DOM Raw Text: <span class="font-monospace text-danger" id="cp-raw-dom" style="font-size: 0.76rem;">Loading...</span>
        </small>
      </div>
    </div>
  </div>
</div>

---

## 5. Tier 3 Defenses: Adversarial BPE Token-Splitting & Latent Collapse

### 5.1 Byte-Pair Encoding (BPE) Foundations

Large Language Models do not process raw text strings directly; they decompose input strings into sequences of discrete subword tokens via greedy merge tables (such as OpenAI's `tiktoken` or HuggingFace's tokenizers).

Let $\mathcal{V}$ be the tokenizer vocabulary and $\mathcal{M}$ be the ranked merge rules. Given a clean word $W = \text{"Reinforcement"}$, a typical BPE tokenizer assigns a single unified token:

$$W \xrightarrow{\text{Tokenize}} [42191]$$

The embedding layer maps this token directly to an informative point in representation space:

$$\mathbf{e} = \mathbf{E}[42191] \in \mathbb{R}^d$$

### 5.2 Adversarial Unicode Perturbation

By injecting zero-width non-printing codepoints—specifically:
* `U+200B` (Zero-Width Space)
* `U+200C` (Zero-Width Non-Joiner)
* `U+2060` (Word Joiner)

or substituting identical visual glyphs with their **Cyrillic or Greek homoglyphs** (e.g., Latin `'a'` $\rightarrow$ Cyrillic `'а'` `U+0430`, Latin `'o'` $\rightarrow$ Cyrillic `'о'` `U+043E`), the human visual perception is invariant:

$$\text{Render}(W) \equiv \text{Render}(W_{\text{adv}})$$

However, the BPE tokenizer cannot merge sequences containing interleaved control characters or non-Latin byte prefixes. The tokenization degenerates into single-character and unknown control tokens:

$$W_{\text{adv}} \xrightarrow{\text{Tokenize}} [49, 99401, 11892, 99401, 239, 981, \dots]$$

### 5.3 Mathematical Impact on Transformer Self-Attention

This injection induces two distinct catastrophic failure modes in LLM inference and RAG vector search:

1. **Quadratic Sequence Inflation:** The input token count explodes by a factor of $3\times\text{ to }6\times$, diluting the attention budget $\text{Softmax}\left(\frac{\mathbf{Q}\mathbf{K}^T}{\sqrt{d_k}}\right)$ across uninformative separator tokens.
2. **Cosine Distance Degradation:** In vector embedding spaces (e.g., `text-embedding-3-large`, `BGE-M3`), the similarity between the clean document vector $\mathbf{v}$ and the perturbed vector $\mathbf{v}_{\text{adv}}$ collapses:

$$\cos(\mathbf{v}, \mathbf{v}_{\text{adv}}) = \frac{\mathbf{v} \cdot \mathbf{v}_{\text{adv}}}{\|\mathbf{v}\| \|\mathbf{v}_{\text{adv}}\|} \longrightarrow 0.05 \text{ -- } 0.25$$

This ensures that semantic search queries in RAG systems fail to retrieve the protected passage entirely.

---

### Interactive Laboratory 3: Adversarial BPE Tokenizer Sandbox

Type any sentence into the prompt box and adjust the perturbation slider to observe in real-time how the token stream shatters into disconnected subword IDs while human legibility remains intact:

<div class="crypto-lab-card" id="lab-bpe">
  <div class="lab-header">
    <h4><i class="fa-solid fa-diagram-project"></i> Lab 3: Adversarial BPE Token-Splitting & Vector Space Degradation</h4>
    <span class="lab-badge">Tier 3 Defense</span>
  </div>
  <div class="lab-body">
    <div class="bpe-visualizer">
      <div class="mb-3">
        <label for="bpe-input-text" class="font-weight-bold" style="font-size: 0.9rem;">
          <i class="fa-solid fa-pen-to-square"></i> Input Text Sentence:
        </label>
        <input type="text" class="form-control" id="bpe-input-text" value="Reinforcement learning algorithms optimize autonomous policy decision making.">
      </div>

      <div class="lab-controls">
        <label for="bpe-intensity-slider"><i class="fa-solid fa-sliders"></i> Adversarial Perturbation Intensity:</label>
        <input type="range" id="bpe-intensity-slider" min="0" max="100" value="55" step="5">
        <span class="stat-pill" id="bpe-intensity-val">55%</span>
      </div>

      <div class="bpe-stats-row">
        <div class="bpe-stat-card">
          <div class="stat-label">Baseline Tokens</div>
          <div class="stat-val text-primary" id="bpe-count-base">10</div>
        </div>
        <div class="bpe-stat-card">
          <div class="stat-label">Perturbed Tokens</div>
          <div class="stat-val text-warning" id="bpe-count-adv">38 (3.8x)</div>
        </div>
        <div class="bpe-stat-card">
          <div class="stat-label">RAG Latent Cosine Similarity</div>
          <div class="stat-val" id="bpe-sim-score">0.18</div>
        </div>
      </div>

      <div class="mb-3">
        <small class="text-muted d-block font-weight-bold font-monospace mb-1">
          HUMAN SCREEN RENDER (ZERO VISUAL ARTIFACTS):
        </small>
        <div class="p-2 border rounded bg-white text-dark font-weight-normal" id="bpe-human-render" style="font-size: 1.05rem;">
          Reinforcement learning algorithms optimize autonomous policy decision making.
        </div>
      </div>

      <div>
        <small class="text-muted d-block font-weight-bold font-monospace mb-1">
          LLM BPE TOKEN SEQUENCE BREAKDOWN:
        </small>
        <div class="bpe-tokens-flow" id="bpe-tokens-view"></div>
      </div>
    </div>
  </div>
</div>

---

## 6. Tier 4 Defenses: Breaking the Screenshot Barrier (Anti-Multimodal Vision & OCR)

### 6.1 The Multimodal Challenge: Optical Character Recognition & VLMs

The most sophisticated threat to human-exclusive channels emerges from multimodal Vision-Language Models (e.g., GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet) paired with autonomous browser automation. If an agent executes:

```javascript
await page.screenshot({ path: 'viewport.png' });
```

all underlying DOM scrambles, font-table permutations, and tokenizer splitters are bypassed. The VLM simply applies Optical Character Recognition (OCR) or Vision Transformer (ViT) patch attention directly across the 2D raster image:

$$I_{\text{screenshot}} \in \mathbb{R}^{H \times W \times 3}$$

Can we prevent a static screenshot from conveying readable text to an AI, while keeping it **completely readable to a human viewer?**

The answer lies in **human psychophysics and temporal visual integration**.

---

### 6.2 Biological Critical Flicker Fusion (CFF) vs. Instantaneous Sampling

The human visual system does not perceive reality as a sequence of independent, isolated snapshots. Photoreceptor cells (rods and cones) and post-retinal ganglion cells exhibit a biological latency known as the **persistence of vision**, characterized by the **Critical Flicker Fusion (CFF) threshold** ($\approx 50\text{–}75\text{ Hz}$):

$$\text{Human Perceptual Integration: } I_{\text{human}}(x, y) = \int_{t - \tau}^{t} \mathcal{F}(x, y, t') \, dt' \quad (\tau \approx 60\text{ ms})$$

In contrast, a headless screenshot or camera capture samples the display buffer at a single discrete temporal instant:

$$\text{Machine Snapshot: } I_{\text{AI}}(x, y) = \mathcal{F}(x, y, t_0)$$

We can exploit this mathematical gap through three distinct perceptual techniques:

#### Method A: Sub-Frame Time-Division Multiplexing
We decompose every glyph outline into $K = 3$ to $5$ disjoint spatial sub-dot matrices. At $60\text{ Hz}$, the webpage alternates between these sub-matrices while simultaneously injecting uniformly distributed random noise dots in the background:
* **In any single frame $t_0$ (Screenshot):** The density of dots inside the glyph matches the density of the random noise background. The mutual information $I(\text{Glyph}; \mathcal{F}(\cdot, t_0)) \approx 0$. OCR models and Vision Transformers see only uniform noise.
* **Over $60\text{ ms}$ (Human Eye):** The human visual cortex integrates the alternating frames over time, perceiving crisp, continuous letterforms floating seamlessly above a faint gray backdrop.

#### Method B: Kinetic Counter-Phase Random-Dot Kinematograms (RDK)
Pioneered in visual neuroscience by Béla Julesz, an RDK renders foreground text and background using identical random dot distributions. 
* Background dots drift continuously to the right at speed $+v$.
* Foreground text dots drift to the left at speed $-v$.
* In any frozen screenshot, the spatial statistics of foreground and background are **identically distributed** ($D_{\text{KL}}(P_{\text{text}} \parallel P_{\text{bg}}) = 0$), rendering it mathematically impossible for any static image model to segment the text.
* In motion, biological motion detectors in visual area **V5/MT** immediately separate the text from the background based on velocity contrast.

---

### Interactive Laboratory 4: Live Anti-Screenshot Vault

Observe the live canvas below running at $60\text{ Hz}$. Notice how your eyes easily read the moving message. Then click **"Simulate Screenshot (Freeze Single Frame)"** to see what an AI vision model or screenshot crawler captures:

<div class="crypto-lab-card" id="lab-anti-screenshot">
  <div class="lab-header">
    <h4><i class="fa-solid fa-camera-retro"></i> Lab 4: Anti-Screenshot Temporal Multiplexing & Kinetic RDK Vault</h4>
    <span class="lab-badge">Tier 4 Defense</span>
  </div>
  <div class="lab-body">
    <div class="lab-controls">
      <div class="btn-group" role="group">
        <button type="button" class="btn-tier active" data-as-mode="temporal">Method A: Temporal Multiplexing</button>
        <button type="button" class="btn-tier" data-as-mode="kinetic">Method B: Kinetic Motion (RDK)</button>
        <button type="button" class="btn-tier" data-as-mode="gestalt">Method C: ViT Patch Slit-Scan</button>
      </div>

      <button type="button" class="btn btn-sm btn-danger ml-auto" id="as-freeze-btn">
        <i class="fa-solid fa-camera"></i> Simulate Screenshot (Freeze Single Frame $t_0$)
      </button>
    </div>

    <div class="row mb-3">
      <div class="col-md-7">
        <label for="as-secret-input" style="font-size: 0.82rem; font-weight: 600;">Custom Message to Protect:</label>
        <input type="text" class="form-control form-control-sm" id="as-secret-input" value="HUMAN EYES ONLY">
      </div>
      <div class="col-md-5">
        <label for="as-noise-slider" style="font-size: 0.82rem; font-weight: 600;">Background Chaff Density:</label>
        <input type="range" class="form-control-range" id="as-noise-slider" min="20" max="90" value="65">
      </div>
    </div>

    <div class="anti-screenshot-wrapper">
      <canvas id="anti-screenshot-canvas"></canvas>
      <div class="canvas-meta-bar">
        <span><i class="fa-solid fa-bolt"></i> Refresh: 60 FPS Canvas Buffer</span>
        <span>Biological Integration Window: $\tau \approx 65\text{ ms}$</span>
      </div>
    </div>
  </div>
</div>

---

## 7. Comparative Defense Matrix & Architectural Synthesis

When deploying a Human-Exclusive Information Channel in production, defenses should be stacked in depth according to the threat profile:

<table class="threat-matrix-table">
  <thead>
    <tr>
      <th>Defensive Layer</th>
      <th>Implementation Mechanism</th>
      <th>Protects Against</th>
      <th>Human Friction</th>
      <th>Failure Boundary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tier 1: Client PoW</strong></td>
      <td>SHA-256 Hashcash + AES-256-GCM</td>
      <td><span class="status-blocked">Raw HTTP Crawlers, Curl, GPTBot</span></td>
      <td>0 ms perceived (runs in WebWorker)</td>
      <td>Headless browser running full V8 engine</td>
    </tr>
    <tr>
      <td><strong>Tier 2: Glyph Permutation</strong></td>
      <td>Custom Dynamic WOFF2 <code>cmap</code> + Copy Trap</td>
      <td><span class="status-blocked">Headless DOM Scrapers, Copy-Paste to ChatGPT</span></td>
      <td>Zero (standard vector typography)</td>
      <td>Full viewport raster screenshot + OCR</td>
    </tr>
    <tr>
      <td><strong>Tier 3: BPE Splitting</strong></td>
      <td>Zero-width codepoints + Cyrillic homoglyphs</td>
      <td><span class="status-scrambled">Embedding Search, RAG Ingestion, Model Weights</span></td>
      <td>Zero (invisible rendering width)</td>
      <td>Rule-based Unicode normalization preprocessors</td>
    </tr>
    <tr>
      <td><strong>Tier 4: Temporal Multiplexing</strong></td>
      <td>60Hz canvas sub-frame temporal integration & RDK</td>
      <td><span class="status-blocked">Static Screenshots, Vision-LLMs, OCR Scrapers</span></td>
      <td>Low (requires continuous visual stream)</td>
      <td>Multi-frame 60 FPS video stream capture</td>
    </tr>
  </tbody>
</table>

---

## 8. Open Questions & Future Horizons

Constructing information channels that are accessible to biological eyes yet opaque to artificial intelligence defines one of the most intellectually compelling frontiers in modern computer science. As multimodal models transition from processing static images to analyzing high-frame-rate continuous video streams with spatio-temporal attention, the boundary between biological perception and machine cognition will narrow further.

Key open challenges include:
1. **Accessibility Standards:** How can human-exclusive channels maintain strict compliance with WCAG screen-reader accessibility for visually impaired humans without inadvertently presenting clean plaintext codepoints to automated AI crawlers?
2. **Ephemeral Neural Key Exchange:** Could future client-side channels utilize eye-tracking micro-saccades or human cognitive response times as a biometric Proof-of-Humanity key derivation function?
3. **Formal Verification:** Establishing formal bounds on the minimum mutual information leakage $I(\text{Model}; \text{Payload})$ achievable under arbitrary automated preprocessing.

---

<!-- Load the Interactive Laboratory Engine -->
<script defer src="{{ '/assets/js/llm-crypto-blog.js' | relative_url | bust_file_cache }}"></script>

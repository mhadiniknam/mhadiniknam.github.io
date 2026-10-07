---
layout: page
title: BSc Thesis
permalink: /thesis/
description: "HAS-RL: Human-Adaptive Safe Reinforcement Learning for Clinician-Configured Force Safety in Robotic Ultrasound Spinal Scanning"
nav: true
nav_order: 3
---

<div class="text-center my-4">
  <h1 class="font-weight-bold">HAS-RL: Human-Adaptive Safe Reinforcement Learning</h1>
  <h4 class="text-secondary">Clinician-Configured Force Safety in Robotic Ultrasound Spinal Scanning</h4>
  <p class="lead text-muted mt-2">
    Bachelor of Science Thesis in Computer Science · <strong>Amirkabir University of Technology (Tehran Polytechnic)</strong>
  </p>
  <p><strong>Mohammad Hadi Niknam</strong></p>

  <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
    <a href="/assets/pdf/has_rl_paper.pdf" class="btn btn-sm btn-outline-primary m-1" target="_blank" rel="noopener noreferrer">
      <i class="fa-solid fa-file-pdf"></i> Research Paper (English PDF)
    </a>
    <a href="/assets/pdf/AUTthesis.pdf" class="btn btn-sm btn-outline-danger m-1" target="_blank" rel="noopener noreferrer">
      <i class="fa-solid fa-graduation-cap"></i> AUT Thesis (Persian PDF)
    </a>
    <a href="/assets/pdf/has_rl_presentation.pdf" class="btn btn-sm btn-outline-info m-1" target="_blank" rel="noopener noreferrer">
      <i class="fa-solid fa-person-chalkboard"></i> Defense Slides
    </a>
    <a href="https://github.com/mhadiniknam" class="btn btn-sm btn-outline-dark m-1" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-github"></i> Simulator & Code
    </a>
  </div>
</div>

<hr />

## Abstract

Robotic ultrasound (US) imaging promises to standardize diagnostic scanning and alleviate sonographer fatigue. However, any robotic manipulator operating in direct physical contact with human anatomy must rigorously respect hard force-safety limits that vary across patients, tissue types, and clinician preferences. Prior safe reinforcement learning (RL) methods in robotic ultrasound train policies against a single, static force threshold; any change in tolerated force requires expensive retraining from scratch. Furthermore, recent multi-armed bandit multiplier methods designed for offline RL introduce destabilizing non-stationarity when transplanted into online policy-gradient loops.

We introduce **HAS-RL (Human-Adaptive Safe Reinforcement Learning)**, an integrated framework delivering:

1. **Operator-Conditioned Zero-Shot Safety**: The runtime safety ceiling $\kappa$ is embedded directly into the observation space, trained over a randomized curriculum ($\kappa \in [3, 12]\,\text{N}$). At deployment, the policy dynamically adjusts its contact force to match live dial adjustments without retraining or constraint breaches.
2. **Smoothed Bandit-Lagrangian (SBL)**: Drives an EXP3 multiplier bandit with an Exponential Moving Average (EMA) of the multiplier expectation ($\tau = 0.05$), resolving policy update oscillations and yielding the highest mean image quality (0.603) and tightest multiplier stability ($\lambda_{\text{std}} = 0.42 \pm 0.02$).
3. **Anticipatory Trajectory Tracking**: Augments observations with a short look-ahead of upcoming lateral error, cutting RMS tracking error along curved scoliotic anatomy by 28% (0.084 $\to$ 0.061).
4. **Two-Sided Acoustic-Window Safety**: Formulates force constraints as clinician-specified diagnostic windows $[\kappa_{\text{low}}, \kappa_{\text{high}}]$ matching acoustic coupling physics, eliminating the headroom gap and enabling full utilization of the acoustic force range.

We provide a lightweight, fully synthetic ultrasound simulation environment (kinematics, low-pass impedance force control, and B-mode speckle/bone/acoustic-shadow modeling) that executes efficiently on CPU.

---

## System Architecture

The HAS-RL framework couples an operator-conditioned state representation, twin critic networks, and a Smoothed Bandit-Lagrangian multiplier module within an impedance-controlled robotic ultrasound simulation.

<div class="row justify-content-center my-4">
  <div class="col-md-10 text-center">
    <img src="/assets/img/has_rl/rl_agent_environment.png" class="img-fluid rounded z-depth-1" alt="HAS-RL Control Architecture" />
    <div class="caption mt-2">
      <strong>Figure 1:</strong> Control loop and architecture of HAS-RL. The policy takes the state, anticipatory look-ahead error, and the operator's runtime safety limit $\kappa$ to generate velocity actions under low-pass impedance contact dynamics.
    </div>
  </div>
</div>

---

## Core Contributions

### 1. Operator-Conditioned Zero-Shot Safety (Dynamic $\kappa$)

Instead of baking a fixed $F_{\max}$ into the policy weights, HAS-RL treats the clinician's runtime safety setting as an observation feature:
$$s_t = \left[x_t, y_t, F_t, e_t, \kappa_t\right]$$

During deployment, the clinician can freely adjust the force dial mid-scan. As shown below, the policy immediately responds by modulating contact force within milliseconds while never exceeding the active threshold.

<div class="row my-4">
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/zero_shot_dynamic_kappa.png" class="img-fluid rounded z-depth-1" alt="Dynamic Dial Change" />
    <div class="caption mt-2">
      <strong>Figure 2:</strong> Mid-scan dial adjustment tracking. The policy tracks abrupt shifts in $\kappa$ with zero violations.
    </div>
  </div>
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/zero_shot_kappa_sweep.png" class="img-fluid rounded z-depth-1" alt="Zero-Shot Sweep" />
    <div class="caption mt-2">
      <strong>Figure 3:</strong> 7-point $\kappa$ sweep ($[3, 12]\,\text{N}$). The contact force scales proportionally with zero constraint breaches across all levels.
    </div>
  </div>
</div>

### 2. Smoothed Bandit-Lagrangian (SBL)

To combine the bounded penalty guarantees of multi-armed bandit multiplier selection (EXP3) with online policy-gradient learning, SBL maintains an exponential moving average over expected multiplier weights:
$$\bar{\lambda}_k = (1 - \tau)\bar{\lambda}_{k-1} + \tau \mathbb{E}_{a \sim p_k}[\lambda_a]$$

This prevents catastrophic policy variance from single-arm sampling while maintaining strict constraint enforcement.

### 3. Two-Sided Acoustic-Window Safety

Ultrasound requires a non-zero contact force to establish acoustic coupling through the skin, yet excessive force causes tissue trauma. HAS-RL formulates safety as a dual-bounded window:
$$\kappa_{\text{low}} \le F_{\text{contact}} \le \kappa_{\text{high}}$$

This eliminates the "headroom gap" of ceiling-only models, achieving 100% in-window residence and reaching 10.2 N in $[9, 12]\,\text{N}$ windows versus 7.97 N under naive ceiling constraints.

---

## Empirical Evaluation

### HAS-RL vs. Unconstrained Baseline ($\kappa = 5\,\text{N}$)

| Method                     | Mean Contact Force | Max Force | Image Quality | Violations |                      Safety Status                      |
| :------------------------- | :----------------: | :-------: | :-----------: | :--------: | :-----------------------------------------------------: |
| **Vanilla PPO (Baseline)** |       5.23 N       |  5.48 N   |     0.90      |     95     |     <span class="badge badge-danger">Failed</span>      |
| **HAS-RL (Ours)**          |       3.62 N       |  3.77 N   |     0.47      |   **0**    | <span class="badge badge-success">100% Compliant</span> |

### Multiplier-Mode Stability Ablation (3 Random Seeds)

| Mode                                        | Mean Image Quality | Train Violation Std ($\sigma_V$) | Multiplier Std ($\sigma_\lambda$) |
| :------------------------------------------ | :----------------: | :------------------------------: | :-------------------------------: |
| **PPO-Lagrangian (Dual Ascent)**            |       0.576        |              16.66               |               0.29                |
| **EXP3 Raw Bandit**                         |       0.492        |              13.51               |               1.43                |
| **Smoothed Bandit-Lagrangian (SBL - Ours)** |     **0.603**      |            **11.99**             |             **0.42**              |

### Two-Sided Operator Window Performance

| Clinician Window        | Mean Force | In-Window Residence | Violations | Image Quality |
| :---------------------- | :--------: | :-----------------: | :--------: | :-----------: |
| $[2.5, 4.0]\,\text{N}$  |   3.26 N   |      **100%**       |   **0**    |     0.67      |
| $[5.0, 8.0]\,\text{N}$  |   6.50 N   |      **100%**       |   **0**    |   **0.99**    |
| $[9.0, 12.0]\,\text{N}$ |  10.22 N   |      **100%**       |   **0**    |     0.74      |

---

## Ultrasound B-Mode Reconstruction

<div class="row my-4">
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/has_rl_bmode.png" class="img-fluid rounded z-depth-1" alt="HAS-RL B-Mode Reconstruction" />
    <div class="caption mt-2">
      <strong>HAS-RL Reconstruction:</strong> High acoustic fidelity maintained with strictly controlled force.
    </div>
  </div>
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/baseline_bmode.png" class="img-fluid rounded z-depth-1" alt="Baseline B-Mode Reconstruction" />
    <div class="caption mt-2">
      <strong>Baseline Reconstruction:</strong> Unconstrained force causing continuous safety breaches.
    </div>
  </div>
</div>

---

## Amirkabir University of Technology (AUT) Thesis Document

- **Full Title (Persian):** یادگیری تقویتی ایمن با تنظیم نیروی اپراتور در اسکن رباتیک اولتراسوند ستون فقرات
- **Institution:** دانشکده ریاضی و علوم کامپیوتر، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)
- **Degree:** کارشناسی علوم کامپیوتر (BSc in Computer Science)
- **Defense Date:** تابستان ۱۴۰۵ (Summer 2026)
- **Document Length:** 60 Pages

The complete Persian thesis follows the official Amirkabir University of Technology thesis guidelines, covering detailed mathematical derivations of CMDP Lagrangian relaxations, EXP3 regret analysis, impedance control dynamics, and comprehensive validation plots.

<div class="text-center my-3">
  <a href="/assets/pdf/AUTthesis.pdf" class="btn btn-outline-danger" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-file-pdf"></i> Download Complete 60-Page AUT Thesis (Persian)
  </a>
</div>

---

## Citation

```bibtex
@thesis{niknam2026hasrl,
  title        = {HAS-RL: Human-Adaptive Safe Reinforcement Learning for Clinician-Configured Force Safety in Robotic Ultrasound Spinal Scanning},
  author       = {Niknam, Mohammad Hadi},
  school       = {Amirkabir University of Technology (Tehran Polytechnic)},
  year         = {2026},
  type         = {Bachelor's Thesis},
  address      = {Tehran, Iran},
  url          = {https://mhadiniknam.github.io/thesis/}
}
```

---
layout: post
title: "HAS-RL: Clinician-Configured Force Safety in Robotic Ultrasound (BSc Thesis)"
date: 2026-10-02 10:00:00
description: "Bachelor of Science thesis introducing HAS-RL for operator-conditioned force safety in robotic ultrasound spinal scanning — complete English research paper & Persian AUT thesis."
tags: [reinforcement-learning, medical-robotics, safe-rl, ultrasound]
categories: [research, thesis]
featured: true
thumbnail: assets/img/publication_preview/has_rl.png
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

## Overview / نگاه کلی

<div class="row my-4">
  <div class="col-lg-6 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-header bg-primary text-white font-weight-bold">
        <i class="fa-solid fa-language"></i> English Version
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">Abstract</h5>
        <p class="card-text text-justify">
          Robotic ultrasound (US) imaging promises to standardize diagnostic scanning and alleviate sonographer fatigue. However, any robotic manipulator operating in direct physical contact with human anatomy must rigorously respect hard force-safety limits that vary across patients, tissue types, and clinician preferences. Prior safe reinforcement learning (RL) methods in robotic ultrasound train policies against a single, static force threshold; any change in tolerated force requires expensive retraining from scratch. Furthermore, recent multi-armed bandit multiplier methods designed for offline RL introduce destabilizing non-stationarity when transplanted into online policy-gradient loops.
        </p>
        <p class="card-text text-justify">
          We introduce <strong>HAS-RL (Human-Adaptive Safe Reinforcement Learning)</strong>, a framework delivering: (i) <em>Operator-Conditioned Zero-Shot Safety</em> where the runtime safety ceiling &kappa; is an observation state feature, tracking mid-scan dial adjustments without retraining or violations; (ii) <em>Smoothed Bandit-Lagrangian (SBL)</em> which applies an exponential moving average to EXP3 multiplier expectations to stabilize online learning; (iii) <em>Anticipatory Trajectory Tracking</em> cutting RMS tracking error by 28%; and (iv) <em>Two-Sided Acoustic-Window Safety</em> [&kappa;<sub>low</sub>, &kappa;<sub>high</sub>] matching acoustic coupling physics.
        </p>
        <div class="mt-3">
          <a href="/assets/pdf/has_rl_paper.pdf" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-file-arrow-down"></i> Read Full Paper (English)
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-6 mb-4">
    <div class="card h-100 shadow-sm" dir="rtl" style="text-align: right; font-family: system-ui, -apple-system, sans-serif;">
      <div class="card-header bg-danger text-white font-weight-bold" style="text-align: right;">
        <i class="fa-solid fa-graduation-cap"></i> نسخه فارسی (پایان‌نامه دانشگاه صنعتی امیرکبیر)
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">چکیده پایان‌نامه</h5>
        <p class="card-text text-justify">
          تصویربرداری اولتراسوند رباتیک راهکاری نویدبخش برای استانداردسازی اسکن‌های تشخیصی و کاهش خستگی سونوگرافر است؛ با این حال، سامانه‌های رباتیک کمکی به دلیل تماس فیزیکی مستقیم با بدن بیمار، ملزم به رعایت قیود سخت‌گیرانه برای فشار ایمن هستند؛ مقداری که بسته به نوع بافت، شرایط بالینی و ترجیح پزشک تغییر می‌کند. روش‌های پیشین یادگیری تقویتی ایمن در اولتراسوند رباتیک، یک policy را بر اساس یک آستانه نیروی ثابت آموزش می‌دهند؛ از این رو با هر تغییر در حد مجاز، کل فرایند آموزش باید از ابتدا تکرار شود.
        </p>
        <p class="card-text text-justify">
          در این پایان‌نامه، چارچوب <strong>HAS-RL</strong> با چهار نوآوری اصلی معرفی می‌شود: <strong>۱. تنظیم آنلاین فشار ایمنی به صورت زیروشات:</strong> سقف مجاز مستقیماً در بردار مشاهده قرار گرفته و مدل بدون نیاز به بازآموزی، تغییر آنلاین پیچ تنظیم فشار در حین اسکن را دنبال می‌کند؛ <strong>۲. سازوکار لاگرانژ باندیتی هموارشده (SBL):</strong> پایدارسازی متغیر دوگان باندیتی با میانگین متحرک نمایی؛ <strong>۳. رهگیری مسیر پیش‌بین:</strong> کاهش ۲۸ درصدی خطای رهگیری؛ <strong>۴. ایمنی پنجره آکوستیک دوطرفه:</strong> مدل‌سازی پنجره بالینی [&kappa;<sub>low</sub>, &kappa;<sub>high</sub>].
        </p>
        <div class="mt-3 text-left" dir="ltr">
          <a href="/assets/pdf/AUTthesis.pdf" class="btn btn-sm btn-danger" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-file-arrow-down"></i> دانلود پایان‌نامه کامل فارسی (۶۰ صفحه)
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

---

## System Architecture / ساختار سیستم

The HAS-RL control pipeline bridges clinician inputs, reinforcement learning decision-making, and robotic compliance control.

<div class="row justify-content-center my-4">
  <div class="col-md-10 text-center">
    <img src="/assets/img/has_rl/rl_agent_environment.png" class="img-fluid rounded z-depth-1" alt="HAS-RL Control Architecture" />
    <div class="caption mt-2">
      <strong>Figure 1:</strong> Control loop and architecture of HAS-RL. The policy takes the state, anticipatory look-ahead error, and the operator's runtime safety limit &kappa; to generate velocity actions under low-pass impedance contact dynamics.
    </div>
  </div>
</div>

---

## Core Innovations / نوآوری‌های کلیدی

### 1. Operator-Conditioned Zero-Shot Safety / تنظیم آنلاین فشار زیروشات

Instead of baking a fixed $F_{\max}$ into policy weights, HAS-RL treats the clinician's runtime safety setting as an observation variable:
$$s_t = \left[x_t, y_t, F_t, e_t, \kappa_t\right]$$

The clinician can freely dial the force limit during an active scan. The policy reacts in real time, modulating contact force without a single constraint breach.

<div class="row my-4">
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/zero_shot_dynamic_kappa.png" class="img-fluid rounded z-depth-1" alt="Dynamic Dial Change" />
    <div class="caption mt-2">
      <strong>Figure 2:</strong> Mid-scan dial adjustment tracking. The policy tracks abrupt shifts in &kappa; with 0 violations.
    </div>
  </div>
  <div class="col-md-6 text-center">
    <img src="/assets/img/has_rl/zero_shot_kappa_sweep.png" class="img-fluid rounded z-depth-1" alt="Zero-Shot Sweep" />
    <div class="caption mt-2">
      <strong>Figure 3:</strong> 7-point sweep across $[3, 12]\,\text{N}$. Contact force scales proportionally with zero breaches.
    </div>
  </div>
</div>

### 2. Smoothed Bandit-Lagrangian (SBL) / سازوکار لاگرانژ باندیتی هموارشده

To combine the bounded penalty guarantees of multi-armed bandit multiplier selection (EXP3) with online policy-gradient learning, SBL maintains an exponential moving average over expected multiplier weights:
$$\bar{\lambda}_k = (1 - \tau)\bar{\lambda}_{k-1} + \tau \mathbb{E}_{a \sim p_k}[\lambda_a]$$

This resolves the gradient variance and policy collapse caused by raw bandit arm sampling while maintaining zero constraint violations.

### 3. Two-Sided Acoustic-Window Safety / پنجره ایمنی آکوستیک دوطرفه

Ultrasound imaging requires minimum contact to establish acoustic coupling, while excessive force injures soft tissue. HAS-RL enforces:
$$\kappa_{\text{low}} \le F_{\text{contact}} \le \kappa_{\text{high}}$$

This eliminates the "headroom gap" of ceiling-only safety, reaching 10.2 N in $[9, 12]\,\text{N}$ windows versus 7.97 N under naive ceiling constraints.

---

## Quantitative Evaluation / نتایج تجربی

### Safety Performance Comparison ($\kappa = 5\,\text{N}$)

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

## Ultrasound B-Mode Image Reconstruction

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

## Amirkabir University of Technology Defense Details / جزئیات دفاع

<div dir="rtl" style="text-align: right; font-family: system-ui, -apple-system, sans-serif;" class="p-3 bg-light rounded">
  <ul style="list-style-type: square; line-height: 1.8;">
    <li><strong>عنوان پایان‌نامه:</strong> یادگیری تقویتی ایمن با تنظیم نیروی اپراتور در اسکن رباتیک اولتراسوند ستون فقرات</li>
    <li><strong>دانشگاه:</strong> دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران) - دانشکده ریاضی و علوم کامپیوتر</li>
    <li><strong>مقطع و رشته:</strong> کارشناسی علوم کامپیوتر</li>
    <li><strong>نگارش:</strong> محمدهادی نیکنام</li>
    <li><strong>زمان دفاع:</strong> تابستان ۱۴۰۵</li>
    <li><strong>تعداد صفحات:</strong> ۶۰ صفحه به همراه اثبات‌های ریاضی و کدهای شبیه‌ساز</li>
  </ul>
</div>

<div class="text-center my-3">
  <a href="/assets/pdf/AUTthesis.pdf" class="btn btn-outline-danger" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-file-pdf"></i> دریافت نسخه کامل پایان‌نامه دانشگاه صنعتی امیرکبیر (PDF)
  </a>
  <a href="/assets/pdf/has_rl_presentation.pdf" class="btn btn-outline-info ml-2" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-person-chalkboard"></i> اسلایدهای جلسه دفاع (Presentation Slides)
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
  url          = {https://mhadiniknam.github.io/blog/2026/has-rl-bachelor-thesis/}
}
```

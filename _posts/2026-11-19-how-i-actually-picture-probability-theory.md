---
layout: post
title: "How I Actually Picture Probability Theory"
date: 2026-11-19 15:00:00
description: "A visual, intuitive way to picture measure-theoretic probability—from the outcome alphabet Ω and σ-algebra F, splitting into probability measure P and random variable X, down to pushforward measure P_X and Radon-Nikodym density f = dP_X / dλ."
tags: [probability, measure-theory, mathematics, reinforcement-learning]
categories: [mathematics, computer-science]
math: true
featured: false
---

{% include figure.liquid loading="eager" path="assets/img/probability_schematic.jpg" class="img-fluid rounded z-depth-1" zoomable=true caption="Handwritten schematic: two parallel lines branching from Ω into measure P and random variable X." %}

Whenever I think about measure-theoretic probability, I just picture two parallel lines starting from the same root: $\Omega$.

$\Omega$ is basically the alphabet of your problem. Depending on how you define the experiment, it holds every single atomic outcome that can happen. For a coin flip, it is just $\{H, T\}$, or for two coin flips it is $\{HH, HT, TH, TT\}$.

Our mindset in probability is that we want to work with subsets of that alphabet (for example, asking what the chance is of getting one $H$ in two coin flips), and that is the reason we define $\mathcal{F}$. $\mathcal{F}$ is simply the collection of subsets that are legally allowed to have a probability:

- **Discrete spaces** (like a coin flip): $\mathcal{F}$ is just the full power set, because we are defining our problem over every possible subset of outcomes.
- **Continuous spaces** (like $\mathbb{R}$): The full power set includes mathematically broken subsets that cannot be assigned a consistent probability. So instead of taking all subsets, we build $\mathcal{F}$ from simple open intervals and their combinations—these are the **Borel sets**. They are the clean building blocks used in place of the full power set of $\mathbb{R}$.

Formally, $\mathcal{F}$ has to satisfy three $\sigma$-algebra conditions: (1) containing $\Omega$, (2) being closed under complements, and (3) being closed under countable unions. In everyday probability, we almost never stop to check those three conditions because they are already handled in the background—any event you can actually write down in practice is already safely inside the power set or the Borel sets.

You should think of $\mathcal{F}$ like memory management or a compiler's type system: it sits quietly under the hood making sure limits, complements, and integrals don't break, so you don't have to think about it. It is essentially the collection of valid events we are allowed to pass into a measure.

The one place where $\mathcal{F}$ suddenly stops being background plumbing and becomes the main character is **information over time** (stochastic processes, finance, or reinforcement learning). There, you use a growing sequence of $\sigma$-algebras

$$\mathcal{F}_1 \subset \mathcal{F}_2 \subset \dots \subset \mathcal{F}_t$$

(a **filtration**) to formally track what is known at time $t$ versus what is still in the future.

From $\Omega$, the whole thing splits into two lines:

- **On the left**, you have the measure line ($P$), which takes events from $\mathcal{F}$ and maps them to $[0, 1]$.
- **On the right**, you have the random variable ($X$), which is a function that maps our abstract alphabet $\Omega$ into $\mathbb{R}$ so we actually have numbers to work with.

The interesting part is how these two lines talk to each other. When we write $P(X = 5)$, $P$ isn't actually acting on the number $5$. Instead, we use the inverse image $X^{-1}$, which pulls the Borel set $\{5\}$ back into $\mathcal{F}$ (so $X^{-1}(\{5\}) \in \mathcal{F}$), and $P$ measures it there. Doing that gives us a new measure living directly on $\mathbb{R}$, called the pushforward measure $P_X$:

$$P_X = P \circ X^{-1}$$

Then there is $f$, which is the tricky one. To get a density, we bring in a second measure on $\mathbb{R}$: the **Lebesgue measure** ($\lambda$), which just tells us how big a set is. The first measure was the probability measure—which, as shown in the schematic, maps from $\mathcal{F}$ to $[0, 1]$. From there, $f$ is simply the rate between the two:

$$f = \frac{dP_X}{d\lambda}$$

If you look at its units, $f$ is literally just $\frac{\text{Probability}}{\text{measure}}$—how much probability is packed into a given amount of size.

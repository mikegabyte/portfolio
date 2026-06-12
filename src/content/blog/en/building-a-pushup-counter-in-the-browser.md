---
title: "I built a push-up counter that runs entirely in your browser"
description: "Pose detection with TensorFlow.js and MoveNet — no backend, no video upload, no account. The hard part wasn't the ML; it was bundling TF.js with Vite."
date: 2026-05-20
tags: ["Vue", "TensorFlow.js", "PWA", "side-project"]
---

I wanted to know how far browser-side ML had actually come, so I built the most embarrassing demo I could think of: a thing that watches you do push-ups through your webcam and counts the reps. It runs at [mikegabyte.github.io/pushup-counter](https://mikegabyte.github.io/pushup-counter/) — drop your phone on the floor, hit start, and start counting.

The whole thing runs on-device. There is no server. The camera stream never leaves the browser, because there's nowhere for it to go.

## The ML part is the easy part

TensorFlow.js ships [MoveNet](https://www.tensorflow.org/hub/tutorials/movenet) through the `@tensorflow-models/pose-detection` package. It estimates 17 body keypoints per frame on WebGL, fast enough for real time on a mid-range phone. Counting reps from there is just geometry: track the elbow angle (shoulder–elbow–wrist), and count one rep per full down-and-up cycle. I added hysteresis so a half-rep or a jitter at the bottom doesn't double-count.

The genuinely annoying bug was **counting reps when no one was doing push-ups**. Walk past the camera, wave at it, adjust your shirt — keypoints appear, the angle changes, the counter ticks up. So before counting starts, the app checks that enough of your body is actually in frame and roughly in a plank-ish orientation. "Strict body-in-frame detection" sounds fancy; in practice it's a guard clause that refuses to count until the pose looks real.

## The actual hard part: shipping TF.js through Vite

This is where the time went. `pose-detection.esm.js` has **static imports** for `@mediapipe/pose` and `@tensorflow/tfjs-backend-webgpu` — even when you only use MoveNet on the WebGL backend and never touch either package at runtime. Vite sees the static imports and tries to bundle them, and the build falls over.

The fix is to alias both to local stub modules:

```ts
resolve: {
  alias: {
    '@mediapipe/pose': fileURLToPath(new URL('./src/mocks/mediapipe-pose.ts', import.meta.url)),
    '@tensorflow/tfjs-backend-webgpu': fileURLToPath(new URL('./src/mocks/tfjs-backend-webgpu.ts', import.meta.url)),
  },
},
```

The call sites for these are all guarded by runtime checks (`backend instanceof WebGPUBackend`, BlazePose-only branches), so the stubs are never actually reached. They just stop the bundler from chasing imports into packages that aren't installed.

The second trap: TF.js's ESM bundles must be **excluded** from Vite's dependency pre-bundling, because esbuild can't handle their dynamic `require()` calls and produces "Duplicate backend" errors. But their pure-CommonJS dependencies (`long`, `seedrandom`) must be **force-included** so the browser gets proper ES modules:

```ts
optimizeDeps: {
  exclude: ['@tensorflow/tfjs', '@tensorflow-models/pose-detection'],
  include: ['long', 'seedrandom'],
},
```

Once those two knobs are set, everything works. But there's no error message that points you here — you just get cryptic backend failures until you understand which packages are bundled when, and why.

## Making it a PWA

The models and the TF.js runtime are a few MB, so I cached them with `vite-plugin-pwa` (CacheFirst for the model CDNs). After the first load it's installable and works offline — which is the right shape for a thing you use at the gym where the wifi is bad and you don't want to think about it.

## What I took away

The ML ecosystem in the browser is genuinely good now — the model "just works." The friction has moved entirely into the build toolchain: making a package that was written for one set of assumptions (Node, webpack, every backend installed) behave inside another (browser, Vite, one backend). That's a very 2026 kind of problem, and worth knowing how to debug.

Code's on [GitHub](https://github.com/mikegabyte/pushup-counter). Stack: Vue 3, TypeScript, `@tensorflow-models/pose-detection`, `vite-plugin-pwa`, Tailwind.

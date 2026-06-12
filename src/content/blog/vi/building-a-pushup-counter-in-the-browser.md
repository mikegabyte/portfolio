---
title: "Mình làm app đếm hít đất chạy hoàn toàn trong trình duyệt"
description: "Pose detection với TensorFlow.js và MoveNet — không backend, không upload video, không cần tài khoản. Phần khó không phải ML, mà là bundle TF.js với Vite."
date: 2026-05-20
tags: ["Vue", "TensorFlow.js", "PWA", "side-project"]
---

Mình muốn biết ML chạy phía trình duyệt giờ đã tiến xa tới đâu, nên làm một demo ngớ ngẩn nhất có thể nghĩ ra: một thứ nhìn bạn hít đất qua webcam rồi đếm số lần. Nó chạy ở [mikegabyte.github.io/pushup-counter](https://mikegabyte.github.io/pushup-counter/) — đặt điện thoại xuống sàn, bấm bắt đầu, và hít đất thôi.

Toàn bộ chạy trên máy bạn. Không có server. Luồng camera không bao giờ rời khỏi trình duyệt, đơn giản vì chẳng có chỗ nào để gửi đi.

## Phần ML lại là phần dễ

TensorFlow.js cung cấp [MoveNet](https://www.tensorflow.org/hub/tutorials/movenet) qua gói `@tensorflow-models/pose-detection`. Nó ước lượng 17 điểm khớp cơ thể mỗi khung hình trên WebGL, đủ nhanh để chạy real-time trên điện thoại tầm trung. Đếm số lần từ đó chỉ là hình học: theo dõi góc khuỷu tay (vai–khuỷu–cổ tay), và đếm một lần cho mỗi chu kỳ xuống-lên hoàn chỉnh. Mình thêm hysteresis để nửa nhịp hoặc rung lắc ở điểm thấp không bị đếm thành hai.

Lỗi thật sự khó chịu lại là **đếm số lần khi chẳng ai đang hít đất**. Đi ngang camera, vẫy tay, chỉnh áo — điểm khớp xuất hiện, góc thay đổi, bộ đếm nhảy số. Nên trước khi bắt đầu đếm, app kiểm tra rằng đủ phần cơ thể thực sự nằm trong khung hình và ở tư thế tựa-tựa plank. "Strict body-in-frame detection" nghe màu mè, nhưng thực ra chỉ là một câu lệnh guard từ chối đếm cho tới khi tư thế trông có vẻ thật.

## Phần khó thật sự: ship TF.js qua Vite

Đây mới là chỗ ngốn thời gian. `pose-detection.esm.js` có **static import** cho `@mediapipe/pose` và `@tensorflow/tfjs-backend-webgpu` — kể cả khi bạn chỉ dùng MoveNet trên backend WebGL và không bao giờ đụng tới hai gói đó lúc chạy. Vite thấy static import là cố bundle chúng, và build sập.

Cách sửa là alias cả hai sang module stub cục bộ:

```ts
resolve: {
  alias: {
    '@mediapipe/pose': fileURLToPath(new URL('./src/mocks/mediapipe-pose.ts', import.meta.url)),
    '@tensorflow/tfjs-backend-webgpu': fileURLToPath(new URL('./src/mocks/tfjs-backend-webgpu.ts', import.meta.url)),
  },
},
```

Các call site của chúng đều được bọc bởi kiểm tra lúc chạy (`backend instanceof WebGPUBackend`, nhánh chỉ-dành-cho-BlazePose), nên stub không bao giờ thực sự bị gọi tới. Chúng chỉ chặn bundler đuổi theo các import vào những gói chưa được cài.

Cái bẫy thứ hai: các bundle ESM của TF.js phải bị **loại** khỏi dependency pre-bundling của Vite, vì esbuild không xử lý được lời gọi `require()` động của chúng và sinh ra lỗi "Duplicate backend". Nhưng các dependency thuần CommonJS của chúng (`long`, `seedrandom`) phải bị **ép include** để trình duyệt nhận được ES module đúng chuẩn:

```ts
optimizeDeps: {
  exclude: ['@tensorflow/tfjs', '@tensorflow-models/pose-detection'],
  include: ['long', 'seedrandom'],
},
```

Chỉnh xong hai nút đó là mọi thứ chạy. Nhưng chẳng có thông báo lỗi nào chỉ bạn tới đây — bạn chỉ nhận được những lỗi backend khó hiểu cho tới khi hiểu được gói nào bị bundle lúc nào, và vì sao.

## Biến nó thành PWA

Model và runtime TF.js nặng vài MB, nên mình cache chúng bằng `vite-plugin-pwa` (CacheFirst cho CDN model). Sau lần load đầu, app cài được và chạy offline — đúng hình hài cho một thứ bạn dùng ở phòng gym nơi wifi yếu và bạn không muốn phải bận tâm.

## Điều rút ra

Hệ sinh thái ML trong trình duyệt giờ thật sự tốt — model "cứ thế mà chạy". Ma sát đã dời hẳn vào build toolchain: làm cho một gói được viết theo một bộ giả định (Node, webpack, cài đủ mọi backend) chịu chạy bên trong một bộ khác (trình duyệt, Vite, một backend duy nhất). Đó là kiểu vấn đề rất 2026, và đáng để biết cách debug.

Code ở [GitHub](https://github.com/mikegabyte/pushup-counter). Stack: Vue 3, TypeScript, `@tensorflow-models/pose-detection`, `vite-plugin-pwa`, Tailwind.

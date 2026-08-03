import type { Lang } from '../i18n/translations';

export interface Project {
  title: string;
  description: Record<Lang, string>;
  stack: string[];
  status: 'shipped' | 'in-progress' | 'planned' | 'professional';
  link?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'Casaly',
    description: {
      en: 'A multi-tenant property-management SaaS for homestays: bookings, channel/calendar sync, and Vietnam-style billing. Build log on the blog — security audit included.',
      vi: 'SaaS quản lý lưu trú multi-tenant cho homestay: đặt phòng, đồng bộ lịch/kênh bán, thanh toán kiểu Việt Nam. Build log trên blog — kèm cả phần tự audit security.',
    },
    stack: ['React', 'Refine', 'Node.js', 'MongoDB'],
    status: 'shipped',
    link: 'https://casaly.vn',
    featured: true,
  },
  {
    title: 'SEO Audit AI',
    description: {
      en: 'Paste a URL, get an AI-scored on-page SEO report — title, meta, heading structure, readability — with concrete fixes, streamed live to the UI.',
      vi: 'Dán một URL, nhận báo cáo SEO on-page do AI chấm điểm — title, meta, cấu trúc heading, độ dễ đọc — kèm gợi ý sửa cụ thể, stream trực tiếp ra UI.',
    },
    stack: ['Vue 3', 'TypeScript', 'AI APIs', 'Node.js'],
    status: 'shipped',
    link: 'https://github.com/mikegabyte/seo-audit-ai',
    featured: true,
  },
  {
    title: 'AI Push-up Counter',
    description: {
      en: 'Count push-ups with your camera — TensorFlow.js pose detection running fully in-browser. PWA, offline-capable, and your video never leaves the device.',
      vi: 'Đếm hít đất bằng camera — pose detection TensorFlow.js chạy hoàn toàn trong trình duyệt. PWA, dùng offline được, video không bao giờ rời khỏi máy.',
    },
    stack: ['Vue 3', 'TypeScript', 'TensorFlow.js', 'PWA'],
    status: 'shipped',
    link: 'https://mikegabyte.github.io/pushup-counter/',
    featured: true,
  },
  {
    title: 'WP Marketing Toolkit',
    description: {
      en: 'WordPress plugins & themes built end-to-end at work: REST API integrations, shortcode rendering, and Vue-built bundles embedded into WP admin and frontend UIs.',
      vi: 'WordPress plugin & theme xây từ đầu đến cuối trong công việc: tích hợp REST API, render bằng shortcode, nhúng bundle Vue vào UI admin lẫn frontend của WP.',
    },
    stack: ['WordPress', 'PHP', 'Vue 3', 'REST API'],
    status: 'professional',
    featured: true,
  },
];

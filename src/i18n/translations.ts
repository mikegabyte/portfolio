export type Lang = 'en' | 'vi';

export const langs: Lang[] = ['en', 'vi'];

/** Prefix a root-relative path for the given language. */
export function localizePath(lang: Lang, path: string): string {
  return lang === 'vi' ? (path === '/' ? '/vi/' : `/vi${path}`) : path;
}

export const t = {
  en: {
    meta: {
      title: 'Lê Minh Ý — Frontend Developer',
      description:
        'Frontend developer (Vue, React, TypeScript) building web tools for marketing & content. Former tour guide — now I guide users through UIs.',
    },
    nav: { home: 'home', projects: 'projects', tour: 'the tour', blog: 'blog', cv: 'cv ↓' },
    footer: {
      email: 'email',
      github: 'github',
      tips: 'tips are appreciated, reviews are better ⭐⭐⭐⭐⭐',
    },
    status: {
      shipped: 'shipped',
      'in-progress': 'in progress',
      planned: 'planned',
      professional: 'professional work',
    },
    home: {
      kicker: '// frontend developer — vue · react · typescript',
      titleHtml: 'I build web tools for <span class="text-amber-600">marketing &amp; content</span>.',
      intro:
        'Former international tour guide turned developer. 6+ years shipping UIs — lately WordPress plugins built end-to-end, ad tech, and AI-assisted workflows. I used to guide people through cities; now I guide them through interfaces.',
      ctaProjects: 'see projects',
      ctaTour: 'take the tour 🧭',
      scrollHint: 'scroll to rewind the story',
      soundHint: '🔊 tap anywhere first — so the bell can ring on the way down',
      qcCmd: '$ npm run test:e2e',
      qcLines: [
        '✓ booking form — pass',
        '✓ search filters — pass',
        '✓ checkout flow — pass',
        '✗ payment edge case — bug found',
      ],
      qcNote: '// watching the devs fix it was the best part',
      timeline: {
        projects: {
          label: 'chapter 04 — now',
          title: 'Things I ship',
          text: 'Side projects built end-to-end — source on GitHub, dead ends documented on the blog — next to the professional work that taught me how traffic and content actually move.',
        },
        qc: {
          label: '⏪ chapter 03 — the pivot',
          title: 'The QC room',
          text: 'The pandemic cancelled tourism overnight. I retrained and got paid to break software — until watching developers fix my bugs became more interesting than finding them. So I taught myself to code: nights, weekends, every spare hour.',
        },
        tour: {
          label: '⏪ chapter 02 — on the road',
          title: 'The tour bus',
          text: 'International tour guide in Da Nang: forty strangers, one microphone, zero room for boring. Storytelling under pressure, in English, every day — the hardest soft-skills bootcamp there is.',
          roadFrom: 'da nang',
          roadTo: 'hoi an',
        },
        hotel: {
          label: '⏪ chapter 01 — first job',
          title: 'The hotel lobby',
          text: 'First job out of university: hotel receptionist. Reading people fast, staying calm in chaos, and the ancient art of saying "no" so politely it sounds like "yes".',
          bellHint: 'ring for service',
          greet: 'Hi there — how can I help? 👋',
        },
        origin: {
          label: '⏮ where it starts',
          title: 'Same job, different interface.',
          text: 'I used to guide people through cities; now I guide them through interfaces. Everything in between was just learning new tools. The unabridged version has six stops and a gift shop.',
          cta: 'take the full tour 🧭',
        },
      },
      contact: 'contact',
      contactText:
        'Open to frontend roles (Vue/React) — remote or Da Nang — and interesting problems at the intersection of web, marketing and AI.',
    },
    projects: {
      title: 'Projects — mikegabyte',
      kicker: '// projects',
      heading: "Things I'm building",
      introHtml:
        'A mix of side projects and professional work. Side projects ship with source on GitHub and a build log on the <a href="/blog" class="text-amber-700 underline-offset-4 hover:underline">blog</a> — including the dead ends.',
    },
    about: {
      title: 'The Tour — mikegabyte',
      description:
        'The guided tour through my unusual path into software: hotel lobby → tour bus → QC → frontend → martech.',
      kicker: '// the tour',
      heading: "Welcome aboard. I'll be your guide today.",
      intro:
        "I used to do this for a living — guiding visitors through central Vietnam. Today's itinerary is shorter: six stops through how a hotel receptionist ended up shipping software. Keep your arms inside the viewport at all times.",
      stops: [
        {
          emoji: '🛎️',
          name: 'Stop 1 — The Hotel Lobby',
          story:
            'First job out of university: hotel receptionist. A foreign-language degree, no master plan, and a front desk where something is always slightly on fire. What it actually taught me: reading people fast, staying calm in chaos, and the ancient art of saying "no" so politely it sounds like "yes".',
        },
        {
          emoji: '🚌',
          name: 'Stop 2 — The Tour Bus',
          story:
            'Then I became an international tour guide in Da Nang. Forty strangers, a microphone, and zero room for boring. Storytelling on demand, English under pressure, improvising when the itinerary falls apart — turns out that is 80% of what people call "soft skills", learned the hard way.',
        },
        {
          emoji: '🔍',
          name: 'Stop 3 — The QC Room',
          story:
            'The pandemic cancelled tourism overnight. I took a QC course and got a job breaking software for a living. Plot twist: watching developers fix the bugs I found was more interesting than finding them. So I started teaching myself to code — nights, weekends, every spare hour.',
        },
        {
          emoji: '💻',
          name: 'Stop 4 — Crossing Into Code',
          story:
            'Two years of self-study later, I was a frontend developer. React first, then Vue. Offshore teams, EU partners, code reviews in English. The receptionist who picked a degree because it was "easy to get into" had become an engineer — by choosing something hard, on purpose, for the first time.',
        },
        {
          emoji: '📈',
          name: 'Stop 5 — The Marketing Machine',
          story:
            'Then I went deep into marketing tech: WordPress plugins and themes built end-to-end, an ad server, campaign automation, Vue apps embedded everywhere. I learned how traffic actually works — how content gets found, tracked and converted. Most developers never see this side. It changed how I build.',
        },
        {
          emoji: '🧭',
          name: 'Final Stop — Where the Map Ends',
          story:
            'Now I am pointing all of it — Vue, React, WordPress, the marketing instincts, and a growing obsession with AI tooling — at one direction: building tools that help people create and distribute content. The tour ends here. The interesting part starts here too.',
        },
      ],
      giftTitle: 'end of tour — gift shop',
      giftHtml:
        'No fridge magnets, sorry. But you can grab <a href="/cv.pdf" class="text-amber-700 underline underline-offset-4">my CV</a>, browse <a href="/projects" class="text-amber-700 underline underline-offset-4">the projects</a>, or <a href="mailto:le.minh.y.95@gmail.com" class="text-amber-700 underline underline-offset-4">email the guide</a> directly. Five-star reviews also accepted.',
    },
    blog: {
      title: 'Blog — mikegabyte',
      kicker: '// blog',
      heading: 'Build logs',
      introHtml:
        "Notes from building things — what worked, what didn't, and what the AI confidently got wrong.",
      empty: 'nothing here yet — the tour guide is still typing ✍️',
      part: 'Part',
      backToBlog: '← all posts',
    },
  },
  vi: {
    meta: {
      title: 'Lê Minh Ý — Lập trình viên Frontend',
      description:
        'Lập trình viên frontend (Vue, React, TypeScript) xây công cụ web cho marketing & content. Cựu hướng dẫn viên du lịch — giờ dẫn người dùng đi qua giao diện.',
    },
    nav: { home: 'trang chủ', projects: 'dự án', tour: 'chuyến tour', blog: 'blog', cv: 'cv ↓' },
    footer: {
      email: 'email',
      github: 'github',
      tips: 'tip thì quý, review 5 sao còn quý hơn ⭐⭐⭐⭐⭐',
    },
    status: {
      shipped: 'đã ra mắt',
      'in-progress': 'đang làm',
      planned: 'kế hoạch',
      professional: 'dự án công ty',
    },
    home: {
      kicker: '// lập trình viên frontend — vue · react · typescript',
      titleHtml: 'Tôi xây công cụ web cho <span class="text-amber-600">marketing &amp; content</span>.',
      intro:
        'Cựu hướng dẫn viên du lịch quốc tế chuyển nghề lập trình. Hơn 6 năm làm UI — gần đây là WordPress plugin xây từ đầu đến cuối, ad tech và quy trình làm việc cùng AI. Ngày xưa tôi dẫn khách đi tham quan thành phố; giờ tôi dẫn người dùng đi qua giao diện.',
      ctaProjects: 'xem dự án',
      ctaTour: 'làm một tour 🧭',
      scrollHint: 'cuộn để tua ngược câu chuyện',
      soundHint: '🔊 bấm vào trang một cái — để chút nữa nghe được chuông',
      qcCmd: '$ npm run test:e2e',
      qcLines: [
        '✓ form đặt phòng — pass',
        '✓ bộ lọc tìm kiếm — pass',
        '✓ luồng thanh toán — pass',
        '✗ edge case thanh toán — dính bug',
      ],
      qcNote: '// xem dev sửa bug mới là phần hay nhất',
      timeline: {
        projects: {
          label: 'chương 04 — hiện tại',
          title: 'Những thứ tôi ship',
          text: 'Side project xây từ đầu đến cuối — source trên GitHub, ngõ cụt ghi lại trên blog — bên cạnh công việc chuyên môn dạy tôi cách traffic và content thật sự vận hành.',
        },
        qc: {
          label: '⏪ chương 03 — cú rẽ',
          title: 'Phòng QC',
          text: 'Đại dịch xoá sổ ngành du lịch sau một đêm. Tôi học lại từ đầu và kiếm sống bằng nghề "phá" phần mềm — cho đến khi nhìn dev sửa những bug tôi tìm ra còn thú vị hơn việc tìm ra chúng. Thế là tôi tự học code: buổi tối, cuối tuần, mọi giờ rảnh.',
        },
        tour: {
          label: '⏪ chương 02 — trên những cung đường',
          title: 'Chuyến xe tour',
          text: 'Hướng dẫn viên du lịch quốc tế ở Đà Nẵng: bốn mươi người lạ, một chiếc micro, và không có chỗ cho sự nhàm chán. Kể chuyện dưới áp lực, bằng tiếng Anh, mỗi ngày — trại huấn luyện kỹ năng mềm khắc nghiệt nhất.',
          roadFrom: 'đà nẵng',
          roadTo: 'hội an',
        },
        hotel: {
          label: '⏪ chương 01 — việc đầu tiên',
          title: 'Sảnh khách sạn',
          text: 'Công việc đầu tiên sau đại học: lễ tân khách sạn. Đọc vị con người thật nhanh, giữ bình tĩnh giữa hỗn loạn, và nghệ thuật cổ xưa của việc nói "không" lịch sự đến mức nghe như "có".',
          bellHint: 'bấm chuông gọi lễ tân',
          greet: 'Xin chào, mình giúp gì được ạ? 👋',
        },
        origin: {
          label: '⏮ nơi mọi thứ bắt đầu',
          title: 'Vẫn nghề cũ, chỉ đổi giao diện.',
          text: 'Ngày xưa tôi dẫn khách đi qua thành phố; giờ tôi dẫn người dùng đi qua giao diện. Mọi thứ ở giữa chỉ là học công cụ mới. Bản đầy đủ có sáu điểm dừng và một quầy lưu niệm.',
          cta: 'làm tour đầy đủ 🧭',
        },
      },
      contact: 'liên hệ',
      contactText:
        'Đang mở với các vị trí frontend (Vue/React) — remote hoặc tại Đà Nẵng — và những bài toán thú vị ở giao điểm web, marketing và AI.',
    },
    projects: {
      title: 'Dự án — mikegabyte',
      kicker: '// dự án',
      heading: 'Những thứ tôi đang xây',
      introHtml:
        'Trộn giữa side project và công việc chuyên môn. Side project nào cũng có source trên GitHub và build log trên <a href="/vi/blog" class="text-amber-700 underline-offset-4 hover:underline">blog</a> — kể cả những ngõ cụt.',
    },
    about: {
      title: 'Chuyến tour — mikegabyte',
      description:
        'Tour có hướng dẫn qua con đường khác thường vào nghề phần mềm: sảnh khách sạn → xe tour → QC → frontend → martech.',
      kicker: '// chuyến tour',
      heading: 'Chào mừng lên xe. Hôm nay tôi là hướng dẫn viên của bạn.',
      intro:
        'Ngày xưa tôi làm nghề này thật — dẫn khách tham quan miền Trung. Lịch trình hôm nay ngắn hơn: sáu điểm dừng kể chuyện một cậu lễ tân khách sạn trở thành người làm phần mềm như thế nào. Vui lòng giữ tay trong viewport suốt chuyến đi.',
      stops: [
        {
          emoji: '🛎️',
          name: 'Điểm 1 — Sảnh khách sạn',
          story:
            'Công việc đầu tiên sau đại học: lễ tân khách sạn. Một tấm bằng ngoại ngữ, không kế hoạch lớn lao nào, và một quầy lễ tân nơi lúc nào cũng có thứ gì đó đang "cháy" nhè nhẹ. Thứ nó thật sự dạy tôi: đọc vị con người thật nhanh, giữ bình tĩnh giữa hỗn loạn, và nghệ thuật cổ xưa của việc nói "không" lịch sự đến mức nghe như "có".',
        },
        {
          emoji: '🚌',
          name: 'Điểm 2 — Chuyến xe tour',
          story:
            'Rồi tôi thành hướng dẫn viên du lịch quốc tế ở Đà Nẵng. Bốn mươi người lạ, một chiếc micro, và không có chỗ cho sự nhàm chán. Kể chuyện theo yêu cầu, nói tiếng Anh dưới áp lực, ứng biến khi lịch trình vỡ trận — hoá ra đó là 80% thứ người ta gọi là "kỹ năng mềm", học theo cách khó nhất.',
        },
        {
          emoji: '🔍',
          name: 'Điểm 3 — Phòng QC',
          story:
            'Đại dịch xoá sổ ngành du lịch sau một đêm. Tôi học một khoá QC rồi đi làm nghề "phá" phần mềm kiếm sống. Plot twist: nhìn dev sửa những bug tôi tìm ra còn thú vị hơn việc tìm ra chúng. Thế là tôi bắt đầu tự học code — buổi tối, cuối tuần, mọi giờ rảnh.',
        },
        {
          emoji: '💻',
          name: 'Điểm 4 — Bước vào thế giới code',
          story:
            'Hai năm tự học sau đó, tôi thành lập trình viên frontend. React trước, rồi Vue. Team offshore, đối tác EU, code review bằng tiếng Anh. Cậu lễ tân từng chọn ngành đại học vì "dễ đậu" đã trở thành kỹ sư — lần đầu tiên trong đời chủ động chọn một thứ khó.',
        },
        {
          emoji: '📈',
          name: 'Điểm 5 — Cỗ máy marketing',
          story:
            'Rồi tôi đi sâu vào marketing tech: WordPress plugin và theme xây từ đầu đến cuối, một ad server, automation chiến dịch, app Vue nhúng khắp nơi. Tôi học được cách traffic thật sự vận hành — content được tìm thấy, theo dõi và chuyển đổi ra sao. Phần lớn dev không bao giờ thấy mặt này. Nó thay đổi cách tôi build.',
        },
        {
          emoji: '🧭',
          name: 'Điểm cuối — Nơi tấm bản đồ kết thúc',
          story:
            'Giờ tôi hướng tất cả — Vue, React, WordPress, trực giác marketing, và niềm đam mê ngày càng lớn với công cụ AI — về một hướng: xây những công cụ giúp con người tạo và phân phối nội dung. Tour kết thúc ở đây. Phần thú vị cũng bắt đầu từ đây.',
        },
      ],
      giftTitle: 'cuối tour — quầy lưu niệm',
      giftHtml:
        'Không có nam châm tủ lạnh, xin lỗi nhé. Nhưng bạn có thể lấy <a href="/cv.pdf" class="text-amber-700 underline underline-offset-4">CV của tôi</a>, xem <a href="/vi/projects" class="text-amber-700 underline underline-offset-4">các dự án</a>, hoặc <a href="mailto:le.minh.y.95@gmail.com" class="text-amber-700 underline underline-offset-4">email thẳng cho hướng dẫn viên</a>. Nhận cả review 5 sao.',
    },
    blog: {
      title: 'Blog — mikegabyte',
      kicker: '// blog',
      heading: 'Nhật ký build',
      introHtml:
        'Ghi chép từ những thứ tôi build — cái gì chạy, cái gì không, và AI đã tự tin sai ở đâu.',
      empty: 'chưa có gì ở đây — hướng dẫn viên vẫn đang gõ phím ✍️',
      part: 'Phần',
      backToBlog: '← tất cả bài viết',
    },
  },
} as const;

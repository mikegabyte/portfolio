---
title: "Xây một PMS SaaS, Phần 2: những lỗ hổng bảo mật trong chính POC của mình"
description: "Khoảnh khắc bạn nhìn một bản demo như một sản phẩm, các lỗi đổi hình dạng. Đây là bảy vấn đề bảo mật mình tìm thấy khi audit code của chính mình — gồm một lỗ cho phép bất kỳ ai đăng ký làm admin."
date: 2026-06-12
tags: ["SaaS", "security", "Node"]
series: "Building a PMS SaaS"
seriesPart: 2
---

Ở [Phần 1](/blog/building-a-pms-saas-part-1-the-decision) mình quyết định biến một POC khách hàng đã xếp xó thành một sản phẩm mình sở hữu. Bước kỹ thuật thực sự đầu tiên không phải một tính năng — mà là đọc code của chính mình bằng con mắt của kẻ tấn công, vì một POC cho một doanh nghiệp đáng tin và một SaaS giữ dữ liệu của nhiều doanh nghiệp không phải cùng một chương trình.

Mình tìm thấy bảy thứ. Hai trong số đó tệ. Đây là danh sách thật thà.

## 1. Ai cũng đăng ký làm admin được

Endpoint đăng ký nhận một mảng `permissions` từ body request và lưu thẳng lên user mới:

```ts
const { email, password, firstName, lastName, permissions } = req.body;
const user = new User({ email, password, firstName, lastName, permissions });
```

Vậy nên `POST /api/auth/register` với `"permissions": ["admin"]` tạo ra một admin. Chiếm trọn quyền, từ chính form đăng ký công khai. Trong một app một người-thuê bạn tin mọi người có tài khoản; trong một sản phẩm, đăng ký là cửa trước cho người lạ. Giờ tài khoản mới bắt đầu với `permissions: []` và admin cấp quyền sau.

## 2. Cả một resource không có auth gì cả

Các route properties được mount mà không có middleware nào:

```ts
router.get('/', getProperties);
router.post('/', createProperty);
// ...không authMiddleware, không kiểm tra quyền
```

Bất kỳ ai trên internet đều đọc, tạo, sửa, xóa properties được. Route rooms và bookings được bảo vệ đúng — chỉ properties bị sót, và trong một demo nơi bạn chỉ truy cập qua UI đã đăng nhập, bạn không bao giờ để ý. Giờ nó có `authMiddleware` cộng kiểm tra quyền `properties:*` như mọi thứ khác. Route transactions có auth nhưng thiếu lớp quyền — sửa y vậy.

## 3. JWT secret có fallback hardcode — và đang thực sự bị dùng

```ts
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
```

Hai vấn đề. Một, fallback là một chuỗi ai cũng biết, có thể giả mạo bất kỳ token nào. Hai — và đây là cái tinh vi — controllers đọc `JWT_SECRET` lúc module load, xảy ra *trước khi* `dotenv.config()` chạy ở file khởi động server. Nên kể cả khi có secret thật trong `.env`, cái fallback yếu vẫn có thể là cái đang được dùng.

Cách sửa là một file `config.ts` duy nhất load env trước và **từ chối khởi động** nếu thiếu `JWT_SECRET` — fail nhanh và rõ, không bao giờ rơi về thứ gì kém an toàn:

```ts
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`FATAL: missing required env var ${name}`);
  return v;
}
export const JWT_SECRET = required('JWT_SECRET');
```

## 4. Một webhook công khai, không xác thực

Webhook của channel manager nhận mọi POST và kích một lần đồng bộ. Ai biết URL đều có thể spam đồng bộ và làm ngập bảng log. Giờ nó yêu cầu một secret token trong URL (`?token=...`), so sánh theo thời gian hằng số, và endpoint giữ trạng thái tắt (503) cho tới khi secret được cấu hình — fail đóng, không phải mở.

## 5. Cùng một mật khẩu admin ở mọi lần deploy

Logic seed tạo `admin@example.com` / `password123` ở lần chạy đầu. Ổn cho dev cục bộ, thảm họa nếu lên production. Giờ thông tin đăng nhập lấy từ env, và nếu không đặt mật khẩu, một mật khẩu ngẫu nhiên được sinh ra và in đúng một lần.

## 6. Không có chống brute-force

Endpoint đăng nhập vui vẻ nhận đoán mật khẩu không giới hạn. Đã thêm rate limit (20 lần mỗi 15 phút) cho các endpoint thông tin đăng nhập — và *chỉ* chúng, để một dashboard đang poll hồ sơ người dùng không bao giờ bị chặn.

## 7. Một điều kiện quyền bị lặp che giấu một lỗ thật

Khi đọc permission middleware mình thấy một lỗi copy-paste — `bookings:all` bị kiểm tra hai lần trong một chuỗi OR, trong khi trường hợp thực sự thiếu (một người sửa phòng cần *đọc* properties, vì form phòng có dropdown chọn property) lại không được xử lý. Đã sửa logic và thêm grant chéo resource.

## Rồi mình viết test để chúng không quay lại được

Một bản sửa mà bạn không chứng minh được vẫn còn đúng thì sẽ tái phát. Mình tách Express app ra khỏi phần khởi động server để mount được trong test, và viết 26 integration test (Vitest + supertest) chạy với MongoDB thật trên một database tách biệt. Các test bảo mật là chốt chặn tái phát — có một test đăng ký với `"permissions": ["admin"]` và khẳng định user được lưu có `[]`. Nếu ai đó từng tái hiện lại lỗi đó, bộ test sẽ đỏ.

## Bài học

Không cái nào trong số này là kỳ lạ. Chúng là những lớp lỗi buồn tẻ, ai cũng biết — thiếu kiểm tra phân quyền, secret yếu, không rate limit. Chúng sống sót chính *vì* app chạy hoàn hảo như một bản demo. Các lỗi chỉ trở nên thấy được khi mô hình mối đe dọa đổi từ "bạn mình dùng cái này" sang "người lạ trên internet dùng cái này." Cú dịch chuyển góc nhìn đó mới là công việc thật; các bản vá thì dễ một khi mình đã nhìn đúng thứ cần tìm.

Phần tiếp theo: multi-tenancy — phần nặng thật sự, nơi một app học cách phục vụ nhiều doanh nghiệp mà không bao giờ rò rỉ dữ liệu của bên này sang bên kia.

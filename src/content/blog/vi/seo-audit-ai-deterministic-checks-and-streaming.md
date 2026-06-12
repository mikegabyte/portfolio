---
title: "SEO Audit AI: vì sao mình đặt một engine tất định trước LLM"
description: "Một tool audit SEO on-page chấm điểm bằng code trước, rồi stream báo cáo của chuyên gia AI. Kèm adapter AI đa nhà cung cấp và output song ngữ."
date: 2026-06-08
tags: ["Vue", "Node", "AI", "side-project"]
---

[SEO Audit AI](https://github.com/mikegabyte/seo-audit-ai) nhận một URL và trả về hai thứ: một checklist lỗi SEO on-page có chấm điểm hiện ngay lập tức, và báo cáo của một chuyên gia AI stream sống động bên dưới. Quyết định thiết kế thú vị nhất lại là việc quyết định AI **không nên** làm gì.

## Hai tầng, có chủ đích

Cám dỗ với mọi thứ dính dáng tới LLM là giao trọn việc cho model: "đây là một trang, nói cho tôi biết SEO của nó sai chỗ nào." Cách đó chạy ngon trong demo và gây thất vọng khi lên production — chậm, tốn một lượt gọi token mỗi lần, và cùng một trang có thể ra điểm khác nhau giữa hai lần chạy.

Nên app làm phần buồn tẻ một cách tất định. Server fetch trang, trích xuất dữ liệu on-page bằng cheerio, và chạy **13 mục kiểm tra cố định** — độ dài title, meta description, một H1 duy nhất, cấu trúc heading, độ phủ alt ảnh, canonical, thuộc tính lang, viewport mobile, Open Graph, HTTPS, độ dài nội dung, khả năng index — ra một điểm số có trọng số. Phần này tức thì, lặp lại được, và miễn phí. Nếu AI sập, bạn vẫn có một bản audit hữu ích.

Rồi AI làm phần mà một checklist **không thể**: phán đoán. Nó đọc dữ liệu trích xuất cộng kết quả các mục kiểm tra rồi viết báo cáo kiểu tư vấn — một nhận định chung, 3–5 việc cần sửa có tác động lớn nhất xếp theo mức độ, và **title cùng meta description viết lại cụ thể dựa trên nội dung thật của trang**. Đó mới là phần đáng bỏ tiền gọi token.

## Stream báo cáo

Báo cáo stream từng token một qua Server-Sent Events. Server tiêu thụ luồng của model và chuyển tiếp các delta text; client render thành Markdown khi chúng tới. Một thứ nhỏ thôi nhưng đổi hẳn cảm giác dùng tool — thay vì một spinner rồi một bức tường chữ, bạn nhìn một chuyên gia suy nghĩ thành lời.

## Adapter AI đa nhà cung cấp

Mình không muốn bị khóa vào một nhà cung cấp model (hay một hóa đơn). Tầng AI là một hàm `streamAnalysis()` đứng sau một công tắc env:

```
AI_PROVIDER = gemini | groq | openrouter | mistral | anthropic
```

Mọi nhà cung cấp trừ Anthropic đều nói chuẩn chat API tương thích OpenAI, nên chúng dùng chung một code path với `baseURL` khác nhau. Anthropic đi nhánh riêng vì dùng SDK khác. Thêm một nhà cung cấp là thêm một dòng vào map. Lúc dev mình chạy trên free tier của Gemini; chuyển sang Claude sau này là hai dòng trong `.env`.

Còn có chế độ `MOCK_AI=1` stream một báo cáo giả lập dựng từ kết quả các mục kiểm tra tất định — nhờ vậy toàn bộ trải nghiệm streaming có thể được dev và demo mà không cần API key hay tốn một xu.

## Song ngữ xuyên suốt

UI có nút chuyển EN/VI, và ngôn ngữ chảy suốt cả hệ thống: 13 nhãn kiểm tra được localize phía server, và AI nhận một system prompt khác theo mỗi ngôn ngữ để báo cáo trả về đúng ngôn ngữ đã chọn — *bất kể trang được audit là ngôn ngữ gì*. Audit một trang tiếng Anh với UI tiếng Việt sẽ ra báo cáo tiếng Việt.

## Những phần buồn-tẻ-mà-quan-trọng

- **SSRF guard** ở bước fetch: chỉ http/https, chặn host private và loopback, timeout cứng, chỉ HTML. Một tool fetch URL tùy ý do người dùng nhập là một lỗ hổng SSRF nếu không khóa lại.
- **Retry với backoff** khi nhà cung cấp lỗi tạm thời (429/503), kèm thông báo thân thiện đúng ngôn ngữ và nút thử lại thay vì để lộ một dòng `503 status code` trần trụi cho người dùng.
- Một **cache** ngắn để lời gọi AI dùng lại trang mà bản audit đã fetch.

## Vì sao bài này nằm trong portfolio của mình

Nó nhỏ, nhưng thể hiện điều mình thật sự tin về việc build với LLM: model là một thành phần, không phải kiến trúc. Đặt code tất định ở chỗ cần đúng và lặp lại được, dùng model ở chỗ cần phán đoán, và thiết kế đường nối giữa chúng một cách có chủ đích.

Stack: Vue 3, TypeScript, Tailwind ở phía trước; Express, cheerio, và adapter nhà cung cấp AI ở phía sau.

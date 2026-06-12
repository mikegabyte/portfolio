---
title: "Xây một PMS SaaS, Phần 1: từ dự án khách hàng đổ bể tới sản phẩm của riêng mình"
description: "Một người bạn nhờ mình làm phần mềm quản lý lưu trú, hai bên không chốt được, họ ở lại với công cụ cũ. Đây là lý do mình lấy code đó biến thành sản phẩm mình sở hữu 100%."
date: 2026-06-11
tags: ["SaaS", "MERN", "product"]
series: "Building a PMS SaaS"
seriesPart: 1
---

Đây là bài đầu trong loạt bài mình viết khi biến một dự án khách hàng đã xếp xó thành một sản phẩm SaaS thực thụ, độc lập. Mình viết phần để nghĩ cho rõ, phần để build được ghi lại công khai, và phần vì phiên bản thật thà của "một sản phẩm bắt đầu thế nào" hữu ích hơn phiên bản đánh bóng.

## Bối cảnh

Một thời gian trước, một người bạn đang vận hành vài cơ sở lưu trú ngắn ngày nhờ mình làm một web app riêng để quản lý công việc — đặt phòng, phòng, khách, tiền nong. Họ đang xoay xở với một channel manager và vài dịch vụ trả phí khác, và muốn một thứ vừa vặn với cách *họ* thực sự làm.

Mình làm một bản proof of concept. Một bản thật: hệ thống quản lý lưu trú stack MERN với lịch đặt phòng, cơ sở dữ liệu khách, sổ thu chi tự sinh, phân quyền chi tiết, và đồng bộ hai chiều với channel manager họ đang dùng. Nó chạy được.

## Cú "đấu thầu" không chốt được

Rồi nó chẳng đi tới đâu.

Hai bên trao đổi và không tìm được điều khoản hợp lý cho cả đôi bên. Xây và bảo trì phần mềm riêng là một chi phí thật, kéo dài, và với quy mô của họ, tiếp tục trả tiền cho dịch vụ có sẵn là lựa chọn hợp lý. Thế là họ ở lại với cái đang có, còn mình ngừng đụng tới dự án.

Đó không phải câu chuyện thất bại, dù nó có dáng dấp của một thất bại. Một cú chào hàng không chốt được chỉ là thông tin. Thứ mình có ở cuối quá trình là một PMS hoàn chỉnh, chạy được, giải quyết một vấn đề thật — và không ai dùng.

## Điều nhận ra

Thứ làm mình đổi ý về việc xếp xó nó là nhận ra ba sự thật nằm cạnh nhau:

1. **Code đã vững.** Không phải bản prototype dán băng keo — mà một app MERN sạch sẽ, gõ kiểu đầy đủ, với bộ tính năng thực thụ. Phần lớn người muốn khởi động một sản phẩm như thế này sẽ mất ba tháng để tới được chỗ mà cái này đã đứng sẵn.
2. **Thị trường có trả tiền.** Bạn mình — và cả phân khúc các chủ Airbnb/homestay nhỏ mà họ là một phần trong đó — *đang trả tiền hằng tháng* cho công cụ làm đúng việc này. Mình không cần làm khảo sát để chứng minh sẵn-lòng-chi-trả; hóa đơn đã tồn tại.
3. **Làm-riêng-cho-một-người là một cái bẫy; làm-sản-phẩm-cho-nhiều-người là đòn bẩy.** Xây phần mềm riêng cho một doanh nghiệp là một công việc. Xây một lần rồi bán cho nhiều người là một sản phẩm. Cùng một code, kinh tế hoàn toàn khác — và lần này mình sở hữu tất cả.

Vậy nên quyết định: lấy bản POC và xây lại thành một SaaS đa người-thuê (multi-tenant) mà mình sở hữu 100%. Nếu nó lên được và thật sự rẻ hơn cái bạn mình đang trả, khả năng cao họ là khách hàng đầu tiên. Nhưng lần này mình không xây *cho* họ — mình xây một sản phẩm, và họ là một khách hàng.

## "Sở hữu nó" thực ra nghĩa là gì

Việc đầu tiên mình làm là làm rõ những thứ buồn tẻ, vì đây đúng chỗ những người làm một mình hay bị bỏng:

- **IP sạch.** Bản POC là thứ mình làm để demo; không ai trả tiền cho nó và không có thỏa thuận nào chuyển giao quyền sở hữu. Code là của mình. (Nếu bạn từng ở tình huống tương tự: xác nhận điều này *trước* khi xây cả một doanh nghiệp lên trên nó, đừng để sau.)
- **Dữ liệu thật của khách phải đi ra.** Trước khi cái này thành sản phẩm, database dev đầy listing thật của một doanh nghiệp và thông tin cá nhân của hàng trăm khách thật sẽ được export, lưu trữ offline, và thay bằng dữ liệu demo tổng hợp. Bạn không xây một sản phẩm thương mại lên trên PII của khách hàng của người khác.

## Chặng đường phía trước

Khoảng cách giữa "app một người-thuê chạy được" và "SaaS người ta trả tiền" chủ yếu là ba thứ, và mình sẽ viết một bài cho mỗi cái khi build tới:

- **Multi-tenancy** — biến một app cho một doanh nghiệp thành một app phục vụ an toàn cho nhiều doanh nghiệp, nơi khách A không bao giờ thấy dữ liệu của khách B. Đây là phần nặng nhất.
- **Thoát khỏi sự phụ thuộc channel manager** — bản POC được xây quanh API của một channel manager cụ thể. Một sản phẩm thật không thể ép mọi khách hàng đăng ký dịch vụ đó. Kế hoạch là chiến lược ba tầng: phục vụ trước những cơ sở nhận khách trực tiếp (không cần tích hợp gì cả), rồi thêm đồng bộ iCal miễn phí cho lịch Airbnb/Booking.com, và giữ lại tích hợp gốc như một connector tùy chọn cho người dùng cao cấp.
- **Lớp vỏ SaaS** — thanh toán (theo kiểu Việt Nam: chuyển khoản QR + đối soát ngân hàng, không phải Stripe-trước-tiên), gói và giới hạn, onboarding, và deploy một thứ mà mình sẵn lòng đặt dữ liệu của các doanh nghiệp khác lên.

Còn một phần mình ít thoải mái nhất và phải thành thật: mình là lập trình viên, không phải dân sale, và ý nghĩ đi chào hàng người lạ làm mình muốn trốn. Nên kế hoạch tiếp cận thị trường được dựng có chủ đích quanh việc *không* làm thế — nghiên cứu tại bàn thay vì khảo sát, content kéo khách (inbound) thay vì đi gõ cửa, và sản phẩm tự phục vụ thay vì gọi điện chào bán. Bàn kỹ hơn ở bài sau.

Bài tiếp theo: làm cho codebase an toàn để xây lên trên — những lỗ hổng bảo mật mình tìm thấy trong chính bản POC của mình ngay khi nhìn nó như một sản phẩm thay vì một bản demo.

*Loạt bài này ghi lại một sản phẩm thật đang được xây theo thời gian thực. Không tên khách hàng, không dữ liệu khách thật — chỉ có kỹ thuật và các quyết định.*

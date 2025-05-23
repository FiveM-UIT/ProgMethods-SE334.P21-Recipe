# ProgMethods-SE334.P21-Recipe
Repository cho phần ứng dụng bài tập thực hành 2 - môn Các phương pháp lập trình - SE334.P21 của thầy Nguyễn Duy Khánh.
## Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

- [Docker](https://www.docker.com/products/docker-desktop/) (phiên bản mới nhất)
- [Git](https://git-scm.com/downloads) (phiên bản mới nhất)

## Cài đặt và Chạy

### 1. Khởi động Docker Desktop

⚠️ **Quan trọng**: Trước khi bắt đầu, hãy đảm bảo:
- Đã khởi động Docker Desktop
- Đợi Docker Desktop khởi động hoàn tất (biểu tượng Docker ở taskbar đã ngừng quay)
- Kiểm tra Docker Desktop đang chạy bằng cách mở Terminal và gõ: `docker --version`

### 2. Clone dự án

```bash
git clone https://github.com/FiveM-UIT/ProgMethods-SE334.P21-Recipe.git
cd ProgMethods-SE334.P21-Recipe
```

### 3. Khởi động hệ thống

Sử dụng Docker Compose để khởi động toàn bộ hệ thống:

```bash
docker-compose up -d --build
```

Lệnh này sẽ:
- Build và khởi động backend
- Build và khởi động frontend React

### 4. Truy cập các services

Sau khi tất cả các services đã khởi động thành công, bạn có thể truy cập: http://localhost:3000

## Các lệnh hữu ích

### Dừng hệ thống
```bash
docker-compose down
```

### Xem logs
```bash
# Xem logs của tất cả các services
docker-compose logs

# Xem logs của một service cụ thể
docker-compose logs [service_name]  # ví dụ: docker-compose logs app
```

### Khởi động lại một service
```bash
docker-compose restart [service_name]  # ví dụ: docker-compose restart app
```

### Xóa tất cả data và rebuild
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

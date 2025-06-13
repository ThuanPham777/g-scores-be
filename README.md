# 🎓 G-Scores Backend
## 🚀 Hướng dẫn chạy ứng dụng trên môi trường local

#### 1. Clone dự án
```bash
git clone https://github.com/ThuanPham777/g-scores-be.git
cd g-scores-be
```

#### 2. Cài đặt các phụ thuộc
```bash
npm install
```

#### 3. Tạo file cấu hình môi trường (.env)
Tạo một file `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/student
PORT=5000
```

#### 4. Khởi động PostgreSQL bằng Docker
```bash
docker-compose up -d
```
#### 5. Cấu hình Prisma và migrate cơ sở dữ liệu
```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### 6. Khởi động ứng dụng
```bash
npm run start:dev
```
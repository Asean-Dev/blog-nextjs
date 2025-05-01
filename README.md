## 🚀 Getting Started

## หลังจาก clone โปรเจ็คเรียบร้อย

### 1. ติดตั้งโปรเจ็ค

```
npm install
```

### 2. ทำ .env

```
NEXT_PUBLIC_API_URL=http://localhost:3441/
# NEXT_PUBLIC_API_URL=https://api-test-production-5d16.up.railway.app/
NEXT_PUBLIC_JWT_SECRET=TestKey
```

### 3. ถ้าใช้ supabase

```
npm run dev
```

### 4. ถ้าใช้ Local

##### 🚀 เปิด comment local ใน .env setup postgresql ให้เรียบร้อย เเล้วรันคำสั่งตามนี้

```
npx prisma generate

npx prisma db push

```

### 5. ทำการ Seed Data เบื้องต้น

```
npx prisma db seed

npm run start:dev
```

### จะได้รับ Username : testUser มา จะมี Blog เบื่องต้นมาให้ด้วย

### เริ่มรัน project next.js ได้เลย

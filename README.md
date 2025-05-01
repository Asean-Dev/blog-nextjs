# 🧠 NestJS API with Prisma + Supabase or PostgreSQL local

## 📦 Tech Stack

- **NestJS** – Scalable server-side framework
- **Prisma** – Type-safe ORM with PostgreSQL
- **Supabase** – Database hosting (PostgreSQL)
- **TypeScript** – Typed JavaScript
- **PostgreSQL Local** – Database hosting (PostgreSQL)

---

## 🚀 Getting Started

## หลังจาก clone โปรเจ็คเรียบร้อย

### 1. ติดตั้งโปรเจ็ค

```
npm install
```

### 2. ทำ .env

```
#supabase
DATABASE_URL="postgresql://postgres.wivlegpyvkeqqobzvlod:P@ssw0rd@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
#หรือ Local
#DATABASE_URL="postgresql://[your_username]:[your_pass]@localhost:9000?schema=public"
PORT=3441
JWT_SECRET=TestKey
JWT_EXPIRES_IN=1h
```

### 3. ถ้าใช้ supabase

```
npm run start:dev
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

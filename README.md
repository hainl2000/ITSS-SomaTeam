## Yêu cầu hệ thống
- PHP 7.3
- nodejs v16
- Composer
- Mysql

## Set up

### Backend

##### Di chuyển vào thư mục backend
```bash
cd api/
```
##### Cài dependencies
- Ở lần đầu chạy thì xóa composer.lock trước khi chạy

```bash
composer install
```

##### Tạo file .env
```bash
cp .env.example .env
```

##### Tạo app key
```bash
php artisan key:generate
```

##### Tạo jwt key
```bash
php artisan jwt:secret
```

##### Tạo database mysql rồi thay đổi các biến trong .env

-   DB_DATABASE
-   DB_USERNAME
-   DB_PASSWORD

#### Chạy lệnh migrate database

```bash
php artisan migrate --seed
```
- Nếu sau này có thay đổi database thì chạy
```bash
php artisan migrate:refresh --seed
```

### Frontend

##### Di chuyển vào thư mục frontend

```bash
cd web/
```

##### Cài dependencies
```bash
npm install
```
## Serve

### Backend

```bash
cd api/
```
```bash
php artisan serv
```

### Frontend

```bash
cd web/
```
```bash
npm start
```

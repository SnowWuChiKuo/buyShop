## 介紹
- 以 AC示範案子 規格發想的簡易 商品評論 專案。  
- 前端使用 Bootstrap 與 expresshandle 打造前端使用者介面，後端使用 Node.js 搭配 Express 框架建構，使用關聯式資料庫 MySQL 做為 database。  
- 使用者在此專案可以在商品中留言、商品按讚、賣家追蹤，而管理者能在後台管理所有產品以及發言。  
- 本專案為後端開發之專案。  
## 產品功能
1. 使用者可以註冊個人帳號，並使用個人帳號登入，編輯個人資料。  
2. 使用者可以發布自己的評論訊息。  
3. 使用者可以瀏覽其他商品或取消追蹤。  
4. 使用者可以追蹤其他賣家或取消追蹤。  
5. 使用者可以瀏覽其他產品介紹頁面，瀏覽顧客的歷史評論、追蹤中的使用者及追蹤該名使用者的清單。  
6. 後台管理者可以瀏覽所有使用者以及所有產品的，並且管理者能夠刪除評論。  
7. 所有使用者的帳號密碼經過雜湊處理存入資料庫，以提高安全性。  
## 專案開發人員
[Snow](https://github.com/SnowWuChiKuo)  

## 專案本地安裝流程
1. 請確認電腦已經安裝 Node.js 、 npm 與 Mysql Workbench  
2. 打開終端機，輸入以下指令將此專案 clone 到本地  
```
git clone https://github.com/SnowWuChiKuo/buyShop 
``` 
1. 終端機移動至專案資料夾，輸入指令安裝套件  
```
cd 專案資料夾  
npm install  
```
1. 安裝完畢後，請開啟 Mysql Workbench
```  
CREATE DATABASE buyShop;  
```
1. 打開 config 資料夾內的 config.json 檔案，確認 development 資料庫環境設定與本機資料相符 
``` 
"development": {  
    "username": "資料庫使用者帳號",  
    "password": "資料庫密碼",  
    "database": "buyShop",  
    // ...  
  },
```  
1. 在終端機輸入以下內容，建立相關資料表以及種子資料  
```
npx sequelize db:migrate  
npx sequelize db:seed:all  
```
1. 新增 .env 檔案，根據 .env.example 補足所需變數設定  
```
JWT_SECRET=
IMGUR_CLIENT_ID=
```
1. 當種子資料建立完畢後，請依照使用的電腦系統輸入以下內容啟動後端伺服器  
```
Mac: npm run dev  
windows: npm run dev  
```
1. 若跑出以下內容，代表後端伺服器已經成功運行了
```  
App is running on http://localhost:3000 
```
1.  使用帳號登入  
```
前台測試帳號
account: user1
email: user1@example.com
password: 12345678

account: user2
email: user2@example.com
password: 12345678
```
``
```
後台測試帳號
account: root
email: root@example.com
password: 12345678 
```
## 後端開發工具
bcrypt-nodejs: v0.0.3  
bcryptjs: v2.4.3  
body-parser: v1.18.3  
chai: v4.2.0  
connect-flash: v0.1.1  
cors: v2.8.5  
dotenv: v16.0.1  
express: v4.16.4  
express-session: v1.15.6  
faker: v4.1.0  
jsonwebtoken": v8.5.1  
method-override: v3.0.0  
mysql2: v1.6.4  
passport: v0.4.0  
passport-jwt: v4.0.0  
passport-local: v1.0.0  
sequelize: v6.18.0  
sequelize-cli": v5.5.0  

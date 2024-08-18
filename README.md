# ASP.NET & REACT API UYGULAMASI

## Açıklama
Bu uygulama, kullanıcıların giriş yaparak kimlik doğrulaması gerçekleştirmesine ve ardından sayfalar arasında gezinmesine olanak tanır. Kullanıcılar gezdikleri yerleri ekleyebilir, düzenleyebilir, silebilir ve detaylı adres bilgilerini güncelleyebilir.
- **`http://localhost:5084/client-app/`**: Frontend URL
- **`http://localhost:5084/index.html`**: Swagger URL


**Giriş Bilgileri:**
- **Kullanıcı Adı:** admin
- **Şifre:** admin

## Kullanılan Teknolojiler
- **Database:** MSSQL
- **Backend:** ASP.NET
- **Frontend:** React, Axios, Tailwind CSS

## API Bilgileri
- **`/api/Auth/login`**: Kullanıcı giriş işlemi
- **`/api/Auth/logout`**: Kullanıcı çıkış işlemi
- **`/api/Places`**: Tüm ziyaret edilen yerleri ve detaylarını getirir
- **`/api/Places/{id}`**: Verilen ID ile ziyaret edilen yeri ve detaylarını getirir
- **`/api/Places/delete/{id}`**: Verilen ID ile ziyaret edilen yeri siler
- **`/api/Places/update/{id}`**: Verilen ID ile ziyaret edilen yeri günceller


## Kurulum
#### Projeyi indirin;
```bash
git clone https://github.com/fatihkurtl/asp_net_app.git
```
#### Projey dizinine gidin;
```bash
cd asp_net_app
```
#### Projede gerekli bağımlılıkları yüklemek için, terminal veya komut istemcisinde proje dizininde aşağıdaki komutu çalıştırın;
```bash
dotnet restore
```
#### Veritabanı migrasyonlarını uygulayın;
```bash
dotnet ef database update
```

## Kullanım
#### Yukarıdaki tüm işlemleri bitirdikten sonra projeyi çalıştırın;
```bash
dotnet run
```

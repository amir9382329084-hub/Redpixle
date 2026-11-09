بسته اتصال پنل مدیریت REDPIXEL
================================

فایل‌ها:
- index.html / style.css / java.js : نسخه آماده‌شده سایت
- admin.html / admin.css / admin.js : صفحه ورود و داشبورد مدیر
- supabase-config.js : آدرس پروژه و کلید عمومی (Publishable)
- storage-setup.sql : ساخت فضای آپلود تصویر و سیاست‌های امنیتی

مراحل نصب:
1) قبل از هر تغییری از فایل‌های فعلی سایتت یک نسخه پشتیبان نگه دار.
2) فایل‌های داخل این بسته را در ریشه مخزن GitHub یعنی همان جایی که index.html قرار دارد آپلود/جایگزین کن.
3) در Supabase > SQL Editor یک New query باز کن، محتوای storage-setup.sql را اجرا کن.
4) مطمئن شو در Authentication > Users فقط حساب مدیر خودت وجود دارد و گزینه Allow new users to sign up خاموش است.
5) سایت را باز کن و برای پنل به این مسیر برو:
   https://amir9382329084-hub.github.io/Redpixle/admin.html
6) با همان ایمیل و رمزی که در Supabase Auth ساخته‌ای وارد شو.

امنیت:
- فقط کلید Publishable در supabase-config.js قرار گرفته است.
- هرگز sb_secret یا service_role را در فایل‌های سایت قرار نده.
- سیاست‌های RLS جدول‌ها و UID مدیر در دیتابیس باید فعال باشند.
- برای Storage، فایل storage-setup.sql را اجرا کن.
- اگر صفحه ورود باز شد اما عملیات دیتابیس خطا داد، قبل از انتشار عمومی باید خطا و policyها بررسی شوند.

نکته:
فرم سفارش و تماس پیام‌ها را در جدول messages ذخیره می‌کنند. سفارش، شماره تماس و نوع خدمت را در فیلد subject قرار می‌دهد؛ توضیحات پروژه در message ذخیره می‌شود.

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");
const languageSelect = document.getElementById("languageSelect");
const cookieOverlay = document.getElementById("cookieOverlay");
const acceptCookies = document.getElementById("acceptCookies");
const declineCookies = document.getElementById("declineCookies");

const savedTheme = localStorage.getItem("theme") || "dark";
const savedLang = localStorage.getItem("lang") || "en";
const cookies = localStorage.getItem("cookies");

body.className = savedTheme;
icon.className = savedTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
languageSelect.value = savedLang;

if (cookies) cookieOverlay.classList.add("hidden");

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
});

const translations = {
    en:{home:"Home",about:"About",servers:"Trading Servers",footer:"© 2026 MM2T. All rights reserved.",cookieTitle:"Cookie Preferences",cookieDesc:"We use cookies to save your preferences, language, and theme settings.",accept:"Accept",decline:"Decline"},
    de:{home:"Startseite",about:"Über uns",servers:"Handelsserver",footer:"© 2026 MM2T. Alle Rechte vorbehalten.",cookieTitle:"Cookie-Einstellungen",cookieDesc:"Wir verwenden Cookies, um Einstellungen zu speichern.",accept:"Akzeptieren",decline:"Ablehnen"},
    ar:{home:"الرئيسية",about:"حول",servers:"سيرفرات التداول",footer:"© 2026 MM2T. جميع الحقوق محفوظة.",cookieTitle:"إعدادات ملفات تعريف الارتباط",cookieDesc:"نستخدم ملفات تعريف الارتباط لحفظ التفضيلات.",accept:"قبول",decline:"رفض"},
    pl:{home:"Strona główna",about:"O nas",servers:"Serwery handlowe",footer:"© 2026 MM2T. Wszelkie prawa zastrzeżone.",cookieTitle:"Preferencje plików cookie",cookieDesc:"Używamy plików cookie do zapisywania ustawień.",accept:"Akceptuj",decline:"Odrzuć"},
    vi:{home:"Trang chủ",about:"Giới thiệu",servers:"Máy chủ giao dịch",footer:"© 2026 MM2T. Đã đăng ký bản quyền.",cookieTitle:"Tùy chọn Cookie",cookieDesc:"Chúng tôi sử dụng cookie để lưu cài đặt.",accept:"Chấp nhận",decline:"Từ chối"}
};

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = translations[lang][e.dataset.i18n]);
    localStorage.setItem("lang", lang);
}

applyLanguage(savedLang);
languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));

acceptCookies.onclick = declineCookies.onclick = e => {
    localStorage.setItem("cookies", e.target.id === "acceptCookies" ? "accepted" : "declined");
    cookieOverlay.classList.add("hidden");
};

// Open server links in new tab
document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        if (url) window.open(url, '_blank');
    });
});

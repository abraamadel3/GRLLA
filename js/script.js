// Language switching functionality
let currentLang = 'en';

const translations = {
    en: {
        home: 'home',
        successStories: 'Success Stories',
        customerReviews: 'Customer reviews',
        aboutUs: 'about us',
        packages: 'Packages',
        faq: 'Faq',
        langSwitcher: 'العربية',
        joinNow: 'JOIN NOW',
        packagesWeOffer: 'Packages we offer',
        transformTitle: 'Transform Your Fitness<br>Journey with Expert Guidance.',
        tickerText: ['Live Healthy •', 'Train Smart •', 'Your Path to Strength and Confidence Starts Here •', 'Stay Strong •']
    },
    ar: {
        home: 'الرئيسية',
        successStories: 'قصص النجاح',
        customerReviews: 'آراء العملاء',
        aboutUs: 'من نحن',
        packages: 'الباقات',
        faq: 'الأسئلة الشائعة',
        langSwitcher: 'English',
        joinNow: 'انضم الآن',
        packagesWeOffer: 'الباقات المتاحة',
        transformTitle: 'حول رحلة اللياقة الخاصة بك<br>مع التوجيه المتخصص.',
        tickerText: ['عش بصحة •', 'تدرب بذكاء •', 'طريقك إلى القوة والثقة يبدأ هنا •', 'ابق قويًا •']
    }
};

function toggleLanguage(event) {
    event.preventDefault();
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    
    const wrapper = document.querySelector('.language-wrapper');
    wrapper.classList.toggle('ar');
    wrapper.classList.toggle('en');
    wrapper.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const content = el.getAttribute(`data-${currentLang}`);
        if (content) {
            el.innerHTML = content;
        }
    });
    
    // Update lang switcher text
    document.querySelectorAll('.lang-text').forEach(el => {
        el.textContent = translations[currentLang].langSwitcher;
    });
    
    // Update section headlines
    // updateSectionHeadlines(); // Commented out - now using text headings
    
    // Re-render packages and FAQ with new language
    document.getElementById('oneMonthPackages').innerHTML = '';
    document.getElementById('threeMonthPackages').innerHTML = '';
    document.getElementById('faqContainer').innerHTML = '';
    
    renderPackages(oneMonthPackages, 'oneMonthPackages');
    renderPackages(threeMonthPackages, 'threeMonthPackages');
    renderFAQ();
    setPromoPlaceholder();
}

// Update section headline background images based on language
function updateSectionHeadlines() {
    const lang = currentLang === 'en' ? 'en' : 'ar';
    
    const headlines = {
        'success-headline': `assets/images/headlines/sucsess-${lang}.png`,
        'review-headline': `assets/images/headlines/review-${lang}.png`,
        'aboutus-headline': `assets/images/headlines/aboutus-${lang}.png`,
        'package-headline': `assets/images/headlines/package-${lang}.png`,
        'vip-headline': `assets/images/headlines/vip-${lang}.png`
    };
    
    Object.entries(headlines).forEach(([className, imagePath]) => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            element.style.backgroundImage = `url('${imagePath}')`;
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Success Stories Slider
const successImages = [
    '1-1.png','1-2.png',  '1-3.png', '1-4.png', '1-5.png', '1-6.png', '1-7.png', '1-8.png', '1-9.png'
];

function initSuccessSlider() {
    const container = document.getElementById('successSlides');
    successImages.forEach(img => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.backgroundImage = `url('assets/images/Trans/${img}')`;
        
        // Create duration label overlay
        const durationLabel = document.createElement('div');
        durationLabel.className = 'transformation-duration';
        durationLabel.innerHTML = `
            <span class="duration-text" data-en="2 MONTHS TRANSFORMATION" data-ar="تحول شهرين">2 MONTHS TRANSFORMATION</span>
        `;
        
        slide.appendChild(durationLabel);
        container.appendChild(slide);
    });
    
    new Swiper('.success-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            968: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

// Review Slider
function initReviewSlider() {
    new Swiper('.review-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Package data - 1 Month and 3 Month packages
const oneMonthPackages = [
    {
        name: 'GRLLA GOLD',
        title: { en: 'GRLLA GOLD PACKAGE', ar: 'باقة GRLLA GOLD' },
        duration: { en: '1 MONTH', ar: 'شهر واحد' },
        price: '1800 EGP',
        compareAtPrice: '2500 EGP',
        popular: false,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Follow-up for 4 days on all inquiries through Whatsapp', ar: 'متابعة لمدة 4 أيام على جميع الاستفسارات عبر واتساب' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'Changing the diet plan to suit your goal every 15 days', ar: 'تغيير خطة النظام الغذائي لتناسب هدفك كل 15 يومًا' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy Food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on nutritional supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات الغذائية للوصول إلى هدفك (اختياري)' }
            }
        ],
        link: 'https://checkouts.kashier.io/en/paymentpage?ppLink=PP-841576504,live'
    },
    {
        name: 'GRLLA PLATINUM',
        title: { en: 'GRLLA PLATINUM PACKAGE', ar: 'باقة GRLLA PLATINUM' },
        duration: { en: '1 MONTH', ar: 'شهر واحد' },
        price: '3200 EGP',
        compareAtPrice: '4000 EGP',
        popular: true,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Daily follow-up on all inquiries through Whatsapp', ar: 'متابعة يومية على جميع الاستفسارات عبر واتساب' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'Changing the diet plan to suit your goal every 10 days', ar: 'تغيير خطة النظام الغذائي لتناسب هدفك كل 10 أيام' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات للوصول إلى هدفك (اختياري)' }
            },
            { 
                icon: '📞',
                title: { en: 'Customer Service', ar: 'خدمة العملاء' },
                description: { en: 'Question from customer service 4 times a month (by phone)', ar: 'استفسار من خدمة العملاء 4 مرات شهريًا (عبر الهاتف)' }
            },
            { 
                icon: '⚕️',
                title: { en: 'Medical Team', ar: 'الفريق الطبي' },
                description: { en: 'Follow-up with a medical team, whether for injury rehabilitation or disease treatment', ar: 'متابعة مع فريق طبي، سواء لإعادة تأهيل الإصابات أو علاج الأمراض' }
            },
            { 
                icon: '❄️',
                title: { en: 'Freeze Option', ar: 'خيار التجميد' },
                description: { en: 'This package includes the option to freeze the subscription for 15 days', ar: 'تتضمن هذه الباقة خيار تجميد الاشتراك لمدة 15 يومًا' }
            }
        ],
        link: 'https://merchant.kashier.io/en/paypage/PP-841576501?mode=live'
    },
    {
        name: 'GRLLA ELITE',
        title: { en: 'GRLLA ELITE PACKAGE', ar: 'باقة GRLLA ELITE' },
        duration: { en: '1 MONTH', ar: 'شهر واحد' },
        price: '4300 EGP',
        compareAtPrice: '6000 EGP',
        popular: false,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Daily follow-up on all inquiries', ar: 'متابعة يومية على جميع الاستفسارات' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'A weekly change in the diet plan to suit your goal', ar: 'تغيير أسبوعي في خطة النظام الغذائي لتناسب هدفك' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy Food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on nutritional supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات الغذائية للوصول إلى هدفك (اختياري)' }
            },
            { 
                icon: '📞',
                title: { en: 'Customer Service', ar: 'خدمة العملاء' },
                description: { en: 'Question from customer service 6 times a month', ar: 'استفسار من خدمة العملاء 6 مرات شهريًا' }
            },
            { 
                icon: '⚕️',
                title: { en: 'Medical Team', ar: 'الفريق الطبي' },
                description: { en: 'Follow-up with a medical team, whether for injury rehabilitation or disease treatment', ar: 'متابعة مع فريق طبي، سواء لإعادة تأهيل الإصابات أو علاج الأمراض' }
            },
            { 
                icon: '👤',
                title: { en: 'Customer Service Responsible', ar: 'مسؤول خدمة العملاء' },
                description: { en: 'A number of a person from customer service responsible for maintaining the quality of follow-up during the subscription period', ar: 'رقم شخص من خدمة العملاء مسؤول عن الحفاظ على جودة المتابعة خلال فترة الاشتراك' }
            },
            { 
                icon: '🦍',
                title: { en: 'Captain GRLLA', ar: 'كابتن جريلا' },
                description: { en: 'Captain GRLLA\'s personal number for any urgent inquiries', ar: 'رقم كابتن جريلا الشخصي لأي استفسارات عاجلة' }
            },
            { 
                icon: '💻',
                title: { en: 'Zoom Meeting', ar: 'اجتماع زووم' },
                description: { en: '4 Zoom meetings during the month (30 minutes)', ar: '4 اجتماعات زووم خلال الشهر (30 دقيقة)' }
            },
            { 
                icon: '🏋️',
                title: { en: 'Workout With Captain', ar: 'تمرين مع الكابتن' },
                description: { en: 'A workout with Captain GRLLA during your training period', ar: 'تمرين مع كابتن جريلا خلال فترة تدريبك' }
            },
            { 
                icon: '🏆',
                title: { en: 'Competition Prep', ar: 'التحضير للمسابقات' },
                description: { en: 'Preparing for tournaments and training on positions', ar: 'التحضير للبطولات والتدريب على الأوضاع' }
            },
            { 
                icon: '❄️',
                title: { en: 'Freeze Option', ar: 'خيار التجميد' },
                description: { en: 'This package includes the option to freeze the subscription for 15 days', ar: 'تتضمن هذه الباقة خيار تجميد الاشتراك لمدة 15 يومًا' }
            }
        ],
        link: 'https://merchant.kashier.io/en/paypage/PP-841576502?mode=live'
    }
];

const threeMonthPackages = [
    {
        name: 'GRLLA GOLD',
        title: { en: 'GRLLA GOLD PACKAGE', ar: 'باقة GRLLA GOLD' },
        duration: { en: '3 MONTHS', ar: '3 أشهر' },
        price: '4000 EGP',
        compareAtPrice: '6000 EGP',
        popular: false,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Follow-up for 4 days on all inquiries through Whatsapp', ar: 'متابعة لمدة 4 أيام على جميع الاستفسارات عبر واتساب' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos, changing every 45 days', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو، يتغير كل 45 يومًا' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'Changing the diet plan to suit your goal every 15 days', ar: 'تغيير خطة النظام الغذائي لتناسب هدفك كل 15 يومًا' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy Food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on nutritional supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات الغذائية للوصول إلى هدفك (اختياري)' }
            }
        ],
        link: 'https://checkouts.kashier.io/en/paymentpage?ppLink=PP-841576504,live'
    },
    {
        name: 'GRLLA PLATINUM',
        title: { en: 'GRLLA PLATINUM PACKAGE', ar: 'باقة GRLLA PLATINUM' },
        duration: { en: '3 MONTHS', ar: '3 أشهر' },
        price: '6500 EGP',
        compareAtPrice: '10000 EGP',
        popular: true,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Daily follow-up on all inquiries through Whatsapp', ar: 'متابعة يومية على جميع الاستفسارات عبر واتساب' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos, changing monthly', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو، يتغير شهريًا' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'Changing the diet plan to suit your goal every 10 days', ar: 'تغيير خطة النظام الغذائي لتناسب هدفك كل 10 أيام' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات للوصول إلى هدفك (اختياري)' }
            },
            { 
                icon: '📞',
                title: { en: 'Customer Service', ar: 'خدمة العملاء' },
                description: { en: 'Question from customer service 4 times a month (by phone)', ar: 'استفسار من خدمة العملاء 4 مرات شهريًا (عبر الهاتف)' }
            },
            { 
                icon: '⚕️',
                title: { en: 'Medical Team', ar: 'الفريق الطبي' },
                description: { en: 'Follow-up with a medical team, whether for injury rehabilitation or disease treatment', ar: 'متابعة مع فريق طبي، سواء لإعادة تأهيل الإصابات أو علاج الأمراض' }
            },
            { 
                icon: '❄️',
                title: { en: 'Freeze Option', ar: 'خيار التجميد' },
                description: { en: 'This package includes the option to freeze the subscription for 15 days', ar: 'تتضمن هذه الباقة خيار تجميد الاشتراك لمدة 15 يومًا' }
            }
        ],
        link: 'https://merchant.kashier.io/en/paypage/PP-841576501?mode=live'
    },
    {
        name: 'GRLLA ELITE',
        title: { en: 'GRLLA ELITE PACKAGE', ar: 'باقة GRLLA ELITE' },
        duration: { en: '3 MONTHS', ar: '3 أشهر' },
        price: '10000 EGP',
        compareAtPrice: '15000 EGP',
        popular: false,
        features: [
            { 
                icon: '💬',
                title: { en: 'Follow-up', ar: 'المتابعة' },
                description: { en: 'Daily follow-up on all inquiries', ar: 'متابعة يومية على جميع الاستفسارات' }
            },
            { 
                icon: '💪',
                title: { en: 'Training Program', ar: 'برنامج التدريب' },
                description: { en: 'A customized training program for exercising in the gym or at home explained in videos, changing every 3 weeks', ar: 'برنامج تدريب مخصص للتمرين في الصالة الرياضية أو المنزل موضح بالفيديو، يتغير كل 3 أسابيع' }
            },
            { 
                icon: '🥗',
                title: { en: 'Diet Plan', ar: 'خطة النظام الغذائي' },
                description: { en: 'A weekly change in the diet plan to suit your goal', ar: 'تغيير أسبوعي في خطة النظام الغذائي لتناسب هدفك' }
            },
            { 
                icon: '🍽️',
                title: { en: 'Healthy Food', ar: 'طعام صحي' },
                description: { en: 'Healthy Food recipes explained in videos', ar: 'وصفات طعام صحي موضحة بالفيديو' }
            },
            { 
                icon: '💊',
                title: { en: 'Nutritional Supplements', ar: 'المكملات الغذائية' },
                description: { en: 'Recommendation and discount on nutritional supplements to reach your goal (optional)', ar: 'توصية وخصم على المكملات الغذائية للوصول إلى هدفك (اختياري)' }
            },
            { 
                icon: '📞',
                title: { en: 'Customer Service', ar: 'خدمة العملاء' },
                description: { en: 'Question from customer service 6 times a month', ar: 'استفسار من خدمة العملاء 6 مرات شهريًا' }
            },
            { 
                icon: '⚕️',
                title: { en: 'Medical Team', ar: 'الفريق الطبي' },
                description: { en: 'Follow-up with a medical team, whether for injury rehabilitation or disease treatment', ar: 'متابعة مع فريق طبي، سواء لإعادة تأهيل الإصابات أو علاج الأمراض' }
            },
            { 
                icon: '👤',
                title: { en: 'Customer Service Responsible', ar: 'مسؤول خدمة العملاء' },
                description: { en: 'A number of a person from customer service responsible for maintaining the quality of follow-up during the subscription period', ar: 'رقم شخص من خدمة العملاء مسؤول عن الحفاظ على جودة المتابعة خلال فترة الاشتراك' }
            },
            { 
                icon: '🦍',
                title: { en: 'Captain GRLLA', ar: 'كابتن جريلا' },
                description: { en: 'Captain GRLLA\'s personal number for any urgent inquiries', ar: 'رقم كابتن جريلا الشخصي لأي استفسارات عاجلة' }
            },
            { 
                icon: '💻',
                title: { en: 'Zoom Meeting', ar: 'اجتماع زووم' },
                description: { en: '4 Zoom meetings during the month (30 minutes)', ar: '4 اجتماعات زووم خلال الشهر (30 دقيقة)' }
            },
            { 
                icon: '🏋️',
                title: { en: 'Workout With Captain', ar: 'تمرين مع الكابتن' },
                description: { en: 'A workout with Captain GRLLA during your training period', ar: 'تمرين مع كابتن جريلا خلال فترة تدريبك' }
            },
            { 
                icon: '🏆',
                title: { en: 'Competition Prep', ar: 'التحضير للمسابقات' },
                description: { en: 'Preparing for tournaments and training on positions', ar: 'التحضير للبطولات والتدريب على الأوضاع' }
            },
            { 
                icon: '❄️',
                title: { en: 'Freeze Option', ar: 'خيار التجميد' },
                description: { en: 'This package includes the option to freeze the subscription for 15 days', ar: 'تتضمن هذه الباقة خيار تجميد الاشتراك لمدة 15 يومًا' }
            }
        ],
        link: 'https://merchant.kashier.io/en/paypage/PP-841576502?mode=live'
    }
];

// Combine all packages for rendering
const packages = [...oneMonthPackages, ...threeMonthPackages];

// Promo code: Maro15 = 15% off; offer ends 12 Feb 2026 11:59 PM
const PROMO_CODE = 'Maro15';
const PROMO_DISCOUNT = 15;
const PROMO_STORAGE_KEY = 'grlla_promo';
// 12/2/2026 11:59 PM (Feb 12, 2026)
const PROMO_END_DATE = new Date(2026, 1, 12, 23, 59, 0).getTime();

function getPromoState() {
  const now = Date.now();
  if (now >= PROMO_END_DATE) {
    try { localStorage.removeItem(PROMO_STORAGE_KEY); } catch (_) {}
    return { active: false, endTime: null };
  }
  let applied = false;
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      applied = !!data.applied;
    }
  } catch (_) {}
  return { active: applied, endTime: PROMO_END_DATE };
}

function setPromoActive() {
  localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({ applied: true }));
}

function clearPromo() {
  localStorage.removeItem(PROMO_STORAGE_KEY);
}

function parsePrice(priceStr) {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  const num = parseInt(priceStr.replace(/\D/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

function formatPrice(amount) {
  return Math.round(amount) + ' EGP';
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const errorEl = document.getElementById('promoError');
  const code = (input && input.value || '').trim();
  errorEl.textContent = '';
  if (!code) {
    errorEl.textContent = currentLang === 'en' ? 'Please enter a promo code.' : 'يرجى إدخال كود الخصم.';
    return;
  }
  if (code.toLowerCase() !== PROMO_CODE.toLowerCase()) {
    errorEl.textContent = currentLang === 'en' ? 'Invalid promo code.' : 'كود الخصم غير صحيح.';
    return;
  }
  setPromoActive();
  updatePromoUI(true);
  startPromoCountdown();
  document.getElementById('oneMonthPackages').innerHTML = '';
  document.getElementById('threeMonthPackages').innerHTML = '';
  renderPackages(oneMonthPackages, 'oneMonthPackages');
  renderPackages(threeMonthPackages, 'threeMonthPackages');
}

function updatePromoUI(promoActive) {
  const inputWrap = document.getElementById('promoInputWrap');
  const successEl = document.getElementById('promoSuccess');
  if (promoActive) {
    if (inputWrap) inputWrap.style.display = 'none';
    if (successEl) {
      successEl.removeAttribute('hidden');
      successEl.style.display = 'block';
    }
  } else {
    if (inputWrap) inputWrap.style.display = 'block';
    if (successEl) {
      successEl.setAttribute('hidden', '');
      successEl.style.display = 'none';
    }
  }
}

// Show countdown section when before end date (FOMO); hide when expired
function updatePromoCountdownVisibility(show) {
  const section = document.getElementById('promoCountdownSection');
  if (section) {
    section.style.display = show ? 'block' : 'none';
  }
}

function setPromoPlaceholder() {
  const input = document.getElementById('promoInput');
  if (!input) return;
  input.placeholder = currentLang === 'en'
    ? (input.getAttribute('data-placeholder-en') || 'Enter code')
    : (input.getAttribute('data-placeholder-ar') || 'أدخل الكود');
}

let promoCountdownInterval = null;

function startPromoCountdown() {
  function tick() {
    const state = getPromoState();
    const now = Date.now();
    if (!state.endTime || now >= state.endTime) {
      if (promoCountdownInterval) clearInterval(promoCountdownInterval);
      promoCountdownInterval = null;
      clearPromo();
      updatePromoCountdownVisibility(false);
      updatePromoUI(false);
      document.getElementById('oneMonthPackages').innerHTML = '';
      document.getElementById('threeMonthPackages').innerHTML = '';
      renderPackages(oneMonthPackages, 'oneMonthPackages');
      renderPackages(threeMonthPackages, 'threeMonthPackages');
      return;
    }
    const left = Math.max(0, state.endTime - now);
    const days = Math.floor(left / (24 * 60 * 60 * 1000));
    const hours = Math.floor((left % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((left % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((left % (60 * 1000)) / 1000);
    const el = (id) => document.getElementById(id);
    if (el('promoDays')) el('promoDays').textContent = days;
    if (el('promoHours')) el('promoHours').textContent = String(hours).padStart(2, '0');
    if (el('promoMins')) el('promoMins').textContent = String(mins).padStart(2, '0');
    if (el('promoSecs')) el('promoSecs').textContent = String(secs).padStart(2, '0');
  }
  if (promoCountdownInterval) clearInterval(promoCountdownInterval);
  updatePromoCountdownVisibility(true);
  tick();
  promoCountdownInterval = setInterval(tick, 1000);
}

const checkIcon = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_193_2889)"><path d="M18.2467 10.0489L13.4347 15.8203L11.7502 13.8007C11.5927 13.6117 11.3995 13.4556 11.1816 13.3412C10.9638 13.2269 10.7256 13.1566 10.4806 13.1343C10.2355 13.112 9.98854 13.1382 9.75366 13.2114C9.51877 13.2846 9.3006 13.4033 9.1116 13.5608C8.92259 13.7183 8.76647 13.9115 8.65212 14.1293C8.53778 14.3472 8.46747 14.5854 8.44519 14.8304C8.42292 15.0754 8.44912 15.3224 8.52231 15.5573C8.59549 15.7922 8.71422 16.0104 8.87172 16.1994L11.9955 19.9494C12.1711 20.1606 12.391 20.3307 12.6396 20.4475C12.8883 20.5642 13.1596 20.6248 13.4343 20.625C13.709 20.6252 13.9804 20.5649 14.2292 20.4485C14.478 20.332 14.6981 20.1623 14.8739 19.9512L21.1252 12.4512C21.284 12.2624 21.4041 12.044 21.4784 11.8086C21.5526 11.5733 21.5797 11.3256 21.558 11.0797C21.5364 10.8339 21.4664 10.5947 21.352 10.376C21.2377 10.1573 21.0813 9.96328 20.8918 9.80515C20.7024 9.64701 20.4835 9.52784 20.2479 9.45448C20.0122 9.38112 19.7644 9.35501 19.5187 9.37766C19.2729 9.4003 19.034 9.47125 18.8158 9.58643C18.5975 9.70162 18.4041 9.85877 18.2467 10.0489Z" fill="white"></path><path d="M14.9981 0C12.0313 0 9.13124 0.879735 6.6645 2.52796C4.19776 4.17618 2.27518 6.51886 1.13986 9.25975C0.00454617 12.0006 -0.292504 15.0166 0.286274 17.9264C0.865053 20.8361 2.29366 23.5088 4.39145 25.6066C6.48924 27.7044 9.16198 29.133 12.0717 29.7118C14.9814 30.2906 17.9974 29.9935 20.7383 28.8582C23.4792 27.7229 25.8219 25.8003 27.4701 23.3336C29.1183 20.8668 29.9981 17.9667 29.9981 15C29.9938 11.0231 28.4121 7.2102 25.6 4.39808C22.7878 1.58595 18.975 0.0042353 14.9981 0ZM14.9981 26.25C12.773 26.25 10.5979 25.5902 8.74789 24.354C6.89784 23.1179 5.45589 21.3609 4.60441 19.3052C3.75292 17.2495 3.53014 14.9875 3.96422 12.8052C4.3983 10.6229 5.46976 8.61839 7.0431 7.04505C8.61644 5.47171 10.621 4.40025 12.8033 3.96617C14.9856 3.53208 17.2476 3.75487 19.3032 4.60636C21.3589 5.45784 23.1159 6.89978 24.3521 8.74984C25.5883 10.5999 26.2481 12.775 26.2481 15C26.2448 17.9827 25.0585 20.8423 22.9494 22.9514C20.8403 25.0604 17.9807 26.2467 14.9981 26.25Z" fill="white"></path></g><defs><clipPath id="clip0_193_2889"><rect width="30" height="30" fill="white"></rect></clipPath></defs></svg>`;

function renderPackages(pkgs, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'items';
    const promo = getPromoState();
    const useDiscount = promo.active && promo.endTime && promo.endTime > Date.now();
    
    pkgs.forEach(pkg => {
        const item = document.createElement('div');
        item.className = `item ${pkg.popular ? 'popular' : ''} ${pkg.name.toLowerCase()}-package`;
        
        let displayPrice = pkg.price;
        let comparePrice = pkg.compareAtPrice || '';
        if (useDiscount) {
            const original = parsePrice(pkg.price);
            const discounted = Math.round(original * (1 - PROMO_DISCOUNT / 100));
            displayPrice = formatPrice(discounted);
            comparePrice = pkg.price;
        }
        
        let html = '<div class="headline">';
        if (pkg.popular) {
            html += `<div class="populartag" data-en="Most Popular" data-ar="الأكثر شعبية">Most Popular</div>`;
        }
        html += `<div class="package-name" data-en="${pkg.name}" data-ar="${pkg.name}">${pkg.name}</div>`;
        html += `<h2 data-en="${pkg.title.en}" data-ar="${pkg.title.ar}">${pkg.title[currentLang]}</h2>`;
        html += `<div class="duration" data-en="PER / ${pkg.duration.en}" data-ar="لكل / ${pkg.duration.ar}">PER / ${pkg.duration[currentLang]}</div>`;
        html += '<div class="price-container">';
        if (comparePrice) {
            html += `<div class="compare-price">${comparePrice}</div>`;
        }
        html += `<h3 class="actual-price">${displayPrice}</h3>`;
        html += '</div>';
        html += '</div>';
        html += '<ul class="features-list">';
        
        pkg.features.forEach(feature => {
            html += `<li class="feature-item">`;
            html += `<div class="feature-icon">${feature.icon}</div>`;
            html += `<div class="feature-content">`;
            html += `<div class="feature-title" data-en="${feature.title.en}" data-ar="${feature.title.ar}">${feature.title[currentLang]}</div>`;
            html += `<div class="feature-description" data-en="${feature.description.en}" data-ar="${feature.description.ar}">${feature.description[currentLang]}</div>`;
            html += `</div>`;
            html += `</li>`;
        });
        
        html += '</ul>';
        const durationLabel = pkg.duration[currentLang];
        html += `<button class="booknow" onclick="showPaymentPopup('${pkg.name}', '${displayPrice}', '${durationLabel}')" data-en="Subscribe Now" data-ar="اشترك الآن">Subscribe Now</button>`;
        
        item.innerHTML = html;
        itemsDiv.appendChild(item);
    });
    
    container.appendChild(itemsDiv);
}

// FAQ data
const faqData = [
    {
        question: { en: 'What is included in the training program?', ar: 'ما الذي يتضمنه برنامج التدريب؟' },
        answer: { en: 'The program includes customized nutrition plans, workout routines, cardio and abs exercises, and continuous follow-up support.', ar: 'يتضمن البرنامج خطط تغذية مخصصة، روتين تمارين، تمارين كارديو وبطن، ودعم متابعة مستمر.' }
    },
    {
        question: { en: 'How often will my plan be updated?', ar: 'كم مرة سيتم تحديث خطتي؟' },
        answer: { en: 'Your plan will be updated every 10-15 days based on your progress and results.', ar: 'سيتم تحديث خطتك كل 10-15 يومًا بناءً على تقدمك ونتائجك.' }
    },
    {
        question: { en: 'Can I train at home or do I need a gym?', ar: 'هل يمكنني التدريب في المنزل أم أحتاج إلى صالة رياضية؟' },
        answer: { en: 'The program can be customized for both home and gym training based on your preference and available equipment.', ar: 'يمكن تخصيص البرنامج للتدريب في المنزل أو الصالة الرياضية بناءً على تفضيلاتك والمعدات المتاحة.' }
    },
    {
        question: { en: 'What is the difference between standard and VIP packages?', ar: 'ما الفرق بين الباقات القياسية وباقات VIP؟' },
        answer: { en: 'VIP packages include direct phone access, daily calls, and weekly video check-ins for more personalized support.', ar: 'تتضمن باقات VIP الوصول المباشر عبر الهاتف، مكالمات يومية، وفحوصات فيديو أسبوعية لدعم أكثر تخصيصًا.' }
    }
];

function renderFAQ() {
    const container = document.getElementById('faqContainer');
    
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <span data-en="${item.question.en}" data-ar="${item.question.ar}">${item.question[currentLang]}</span>
                <span class="faq-icon" id="faq-icon-${index}">▼</span>
            </div>
            <div class="faq-answer" id="faq-answer-${index}">
                <p data-en="${item.answer.en}" data-ar="${item.answer.ar}">${item.answer[currentLang]}</p>
            </div>
        `;
        
        container.appendChild(faqItem);
    });
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    answer.classList.toggle('active');
    icon.classList.toggle('active');
}

// Smooth scroll
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Load random products for home page
async function loadHomeProducts() {
    try {
        const response = await fetch('data/nbs_supplements.json');
        const data = await response.json();
        
        // Get 4 random products
        const randomProducts = data.products
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        
        const container = document.getElementById('homeProductsShowcase');
        if (!container) return;
        
        container.innerHTML = randomProducts.map(product => `
            <div class="product-showcase-card" onclick="window.location.href='supplement-detail.html?product=${encodeURIComponent(product.url)}'">
                <div class="product-showcase-image">
                    ${product.images && product.images.length > 0 
                        ? `<img src="${product.images[0]}" alt="${product.name}">` 
                        : '<div class="placeholder">💊</div>'}
                </div>
                <div class="product-showcase-info">
                    <h3 class="product-showcase-name">${product.name}</h3>
                    <p class="product-showcase-description">${product.short_description || product.description.substring(0, 80) + '...'}</p>
                    <div class="product-showcase-price">${product.price.toFixed(2)} <small>EGP</small></div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load random products for home page
    loadHomeProducts();
    
    // Initialize other features
    // updateSectionHeadlines(); // Commented out - now using text headings
    initSuccessSlider();
    initReviewSlider();
    
    // Promo code: countdown shown first (FOMO), then input or success badge
    const promo = getPromoState();
    if (promo.endTime) {
      updatePromoCountdownVisibility(true);
      startPromoCountdown();
    } else {
      updatePromoCountdownVisibility(false);
    }
    updatePromoUI(promo.active);
    setPromoPlaceholder();
    
    renderPackages(oneMonthPackages, 'oneMonthPackages');
    renderPackages(threeMonthPackages, 'threeMonthPackages');
    renderFAQ();
    
    // Promo Apply button and Enter key
    const promoApplyBtn = document.getElementById('promoApplyBtn');
    const promoInput = document.getElementById('promoInput');
    if (promoApplyBtn) promoApplyBtn.addEventListener('click', applyPromoCode);
    if (promoInput) {
        promoInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); applyPromoCode(); }
        });
    }
    
    // Duplicate ticker for infinite scroll effect
    document.querySelectorAll('.ticker').forEach(ticker => {
        const content = ticker.innerHTML;
        ticker.innerHTML = content + content;
    });
});


// Fitness Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fitnessForm = document.getElementById('fitnessCalculatorForm');
    
    if (fitnessForm) {
        fitnessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateFitness();
        });
    }
});

function calculateFitness() {
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = document.getElementById('activity').value;
    const bodyFatInput = document.getElementById('bodyfat').value;
    const bodyFat = bodyFatInput ? parseFloat(bodyFatInput) : null;
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determine BMI category
    let bmiCategory = '';
    let bmicategoryClass = '';
    if (bmi < 18.5) {
        bmiCategory = currentLang === 'en' ? 'Underweight' : 'نقص الوزن';
        bmicategoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = currentLang === 'en' ? 'Normal Weight' : 'وزن طبيعي';
        bmicategoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = currentLang === 'en' ? 'Overweight' : 'زيادة في الوزن';
        bmicategoryClass = 'overweight';
    } else {
        bmiCategory = currentLang === 'en' ? 'Obese' : 'سمنة';
        bmicategoryClass = 'obese';
    }
    
    // Calculate BMR
    let bmr;
    let formulaUsed = '';
    
    if (bodyFat !== null) {
        // Katch-McArdle Formula (most accurate when body fat is known)
        const leanBodyMass = weight * (1 - bodyFat / 100);
        bmr = 370 + (21.6 * leanBodyMass);
        formulaUsed = currentLang === 'en' ? 'Katch-McArdle Formula' : 'معادلة كاتش-ماكاردل';
    } else {
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        formulaUsed = currentLang === 'en' ? 'Mifflin-St Jeor Formula' : 'معادلة ميفلين-سانت جيور';
    }
    
    // Calculate all activity level multipliers
    const activityLevels = {
        bmr: { multiplier: 1.0, label: { en: 'Basal Metabolic Rate', ar: 'معدل الأيض الأساسي' } },
        sedentary: { multiplier: 1.2, label: { en: 'Sedentary', ar: 'قليل النشاط' } },
        light: { multiplier: 1.375, label: { en: 'Light Exercise', ar: 'نشاط خفيف' } },
        moderate: { multiplier: 1.55, label: { en: 'Moderate Exercise', ar: 'نشاط متوسط' } },
        very: { multiplier: 1.725, label: { en: 'Heavy Exercise', ar: 'نشاط عالي' } },
        extra: { multiplier: 1.9, label: { en: 'Athlete', ar: 'رياضي' } }
    };
    
    // Calculate TDEE for selected activity level
    const tdee = Math.round(bmr * activityLevels[activity].multiplier);
    const weeklyCalories = tdee * 7;
    
    // Calculate ideal weight using 4 different formulas
    const heightInInches = height / 2.54;
    const inchesOver5Feet = heightInInches - 60;
    
    const idealWeights = {
        hamwi: gender === 'male' 
            ? 48 + (2.7 * inchesOver5Feet)
            : 45.5 + (2.2 * inchesOver5Feet),
        devine: gender === 'male'
            ? 50 + (2.3 * inchesOver5Feet)
            : 45.5 + (2.3 * inchesOver5Feet),
        robinson: gender === 'male'
            ? 52 + (1.9 * inchesOver5Feet)
            : 49 + (1.7 * inchesOver5Feet),
        miller: gender === 'male'
            ? 56.2 + (1.41 * inchesOver5Feet)
            : 53.1 + (1.36 * inchesOver5Feet)
    };
    
    const minIdealWeight = Math.min(...Object.values(idealWeights));
    const maxIdealWeight = Math.max(...Object.values(idealWeights));
    const idealWeightRange = `${minIdealWeight.toFixed(0)}-${maxIdealWeight.toFixed(0)} kg`;
    
    // Calculate maximum muscular potential (Martin Berkhan's formula)
    const maxWeight5Percent = height - 100;
    const maxWeight10Percent = maxWeight5Percent * 1.05;
    const maxWeight15Percent = maxWeight5Percent * 1.10;
    
    // Calculate macronutrients for maintenance calories
    const macros = {
        moderate: {
            protein: Math.round((tdee * 0.30) / 4),
            fats: Math.round((tdee * 0.35) / 9),
            carbs: Math.round((tdee * 0.35) / 4)
        },
        lower: {
            protein: Math.round((tdee * 0.40) / 4),
            fats: Math.round((tdee * 0.40) / 9),
            carbs: Math.round((tdee * 0.20) / 4)
        },
        higher: {
            protein: Math.round((tdee * 0.30) / 4),
            fats: Math.round((tdee * 0.20) / 9),
            carbs: Math.round((tdee * 0.50) / 4)
        }
    };
    
    // Generate recommendation
    let recommendation = '';
    if (bmi < 18.5) {
        recommendation = currentLang === 'en' 
            ? 'You are underweight. Focus on a calorie surplus with strength training to build healthy muscle mass. Consider our programs for personalized guidance.'
            : 'أنت تعاني من نقص الوزن. ركز على زيادة السعرات الحرارية مع تمارين القوة لبناء كتلة عضلية صحية. فكر في برامجنا للحصول على إرشادات مخصصة.';
    } else if (bmi >= 18.5 && bmi < 25) {
        recommendation = currentLang === 'en'
            ? 'Great! You have a healthy weight. Maintain your current lifestyle with regular exercise and balanced nutrition. Our programs can help you optimize your fitness further.'
            : 'رائع! لديك وزن صحي. حافظ على نمط حياتك الحالي مع ممارسة الرياضة بانتظام والتغذية المتوازنة. يمكن لبرامجنا مساعدتك في تحسين لياقتك بشكل أكبر.';
    } else if (bmi >= 25 && bmi < 30) {
        recommendation = currentLang === 'en'
            ? 'You are slightly overweight. A combination of cardio, strength training, and a calorie deficit can help you reach your ideal weight. Check out our tailored programs!'
            : 'لديك زيادة طفيفة في الوزن. يمكن أن يساعدك الجمع بين تمارين الكارديو وتمارين القوة ونقص السعرات الحرارية في الوصول إلى وزنك المثالي. تحقق من برامجنا المخصصة!';
    } else {
        recommendation = currentLang === 'en'
            ? 'You are in the obese category. We strongly recommend consulting with our professional trainers for a comprehensive fitness and nutrition plan to improve your health safely.'
            : 'أنت في فئة السمنة. نوصي بشدة بالتشاور مع مدربينا المحترفين للحصول على خطة شاملة للياقة البدنية والتغذية لتحسين صحتك بأمان.';
    }
    
    // Display results in modal
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = bmiCategory;
    document.getElementById('bmiCategory').className = `result-category ${bmicategoryClass}`;
    document.getElementById('caloriesValue').textContent = tdee.toLocaleString();
    document.getElementById('caloriesFormula').textContent = formulaUsed;
    document.getElementById('idealWeightValue').textContent = idealWeightRange;
    document.getElementById('recommendationText').textContent = recommendation;
    
    // Display all activity levels
    displayActivityLevels(bmr, activityLevels, activity, weeklyCalories);
    
    // Display ideal weight formulas
    displayIdealWeightFormulas(idealWeights);
    
    // Display maximum muscular potential (only for males)
    if (gender === 'male') {
        displayMuscularPotential(maxWeight5Percent, maxWeight10Percent, maxWeight15Percent);
        document.getElementById('muscularPotentialSection').style.display = 'block';
    } else {
        document.getElementById('muscularPotentialSection').style.display = 'none';
    }
    
    // Display macronutrients (default to moderate)
    displayMacros('moderate', macros, tdee);
    
    // Store macros for tab switching
    window.currentMacros = macros;
    window.currentTdee = tdee;
    
    // Show modal
    openResultsModal();
}

function openResultsModal() {
    const modal = document.getElementById('resultsModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeResultsModal() {
    const modal = document.getElementById('resultsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeResultsModal();
        closePaymentPopup();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeResultsModal();
        closePaymentPopup();
    }
});

// Payment Popup Functions
function showPaymentPopup(packageName, price, duration) {
    const modal = document.getElementById('paymentModal');
    
    // Update modal content
    document.getElementById('paymentPackageName').textContent = packageName;
    document.getElementById('paymentPrice').textContent = price;
    document.getElementById('paymentDuration').textContent = duration;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePaymentPopup() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show a brief confirmation
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'en' ? 'Copied!' : 'تم النسخ!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Display all activity levels
function displayActivityLevels(bmr, activityLevels, selectedActivity, weeklyCalories) {
    const container = document.getElementById('activityLevelsGrid');
    let html = '';
    
    for (const [key, data] of Object.entries(activityLevels)) {
        const calories = Math.round(bmr * data.multiplier);
        const isSelected = key === selectedActivity;
        html += `
            <div class="activity-level-item ${isSelected ? 'selected' : ''}">
                <div class="activity-label">${data.label[currentLang]}</div>
                <div class="activity-calories">${calories.toLocaleString()} ${currentLang === 'en' ? 'cal/day' : 'سعرة/يوم'}</div>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Display weekly calories
    const weeklyContainer = document.getElementById('weeklyCalories');
    weeklyContainer.innerHTML = `
        <div class="weekly-calories-box">
            <strong>${currentLang === 'en' ? 'Weekly Calories:' : 'السعرات الأسبوعية:'}</strong>
            <span class="weekly-value">${weeklyCalories.toLocaleString()} ${currentLang === 'en' ? 'calories per week' : 'سعرة في الأسبوع'}</span>
        </div>
    `;
}

// Display ideal weight formulas
function displayIdealWeightFormulas(idealWeights) {
    const container = document.getElementById('idealWeightFormulas');
    const formulas = {
        hamwi: { name: 'G.J. Hamwi Formula (1964)', nameAr: 'معادلة هامي (1964)' },
        devine: { name: 'B.J. Devine Formula (1974)', nameAr: 'معادلة ديفاين (1974)' },
        robinson: { name: 'J.D. Robinson Formula (1983)', nameAr: 'معادلة روبنسون (1983)' },
        miller: { name: 'D.R. Miller Formula (1983)', nameAr: 'معادلة ميلر (1983)' }
    };
    
    let html = '';
    for (const [key, weight] of Object.entries(idealWeights)) {
        html += `
            <div class="formula-item">
                <div class="formula-name">${currentLang === 'en' ? formulas[key].name : formulas[key].nameAr}</div>
                <div class="formula-weight">${weight.toFixed(1)} kg</div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Display maximum muscular potential
function displayMuscularPotential(weight5, weight10, weight15) {
    const container = document.getElementById('muscularPotentialGrid');
    const html = `
        <div class="potential-item">
            <div class="potential-label">${currentLang === 'en' ? 'At 5% Body Fat' : 'عند 5% دهون'}</div>
            <div class="potential-weight">${weight5.toFixed(1)} kg</div>
        </div>
        <div class="potential-item">
            <div class="potential-label">${currentLang === 'en' ? 'At 10% Body Fat' : 'عند 10% دهون'}</div>
            <div class="potential-weight">${weight10.toFixed(1)} kg</div>
        </div>
        <div class="potential-item">
            <div class="potential-label">${currentLang === 'en' ? 'At 15% Body Fat' : 'عند 15% دهون'}</div>
            <div class="potential-weight">${weight15.toFixed(1)} kg</div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Display macronutrients
function displayMacros(type, macros, tdee) {
    const container = document.getElementById('macrosContent');
    const macro = macros[type];
    
    const labels = {
        moderate: { en: 'Moderate Carb (30/35/35)', ar: 'كارب متوسط (30/35/35)' },
        lower: { en: 'Lower Carb (40/40/20)', ar: 'كارب منخفض (40/40/20)' },
        higher: { en: 'Higher Carb (30/20/50)', ar: 'كارب عالي (30/20/50)' }
    };
    
    const html = `
        <div class="macros-display">
            <div class="macro-item">
                <div class="macro-icon">🥩</div>
                <div class="macro-info">
                    <div class="macro-label">${currentLang === 'en' ? 'Protein' : 'بروتين'}</div>
                    <div class="macro-value">${macro.protein}g</div>
                </div>
            </div>
            <div class="macro-item">
                <div class="macro-icon">🥑</div>
                <div class="macro-info">
                    <div class="macro-label">${currentLang === 'en' ? 'Fats' : 'دهون'}</div>
                    <div class="macro-value">${macro.fats}g</div>
                </div>
            </div>
            <div class="macro-item">
                <div class="macro-icon">🍞</div>
                <div class="macro-info">
                    <div class="macro-label">${currentLang === 'en' ? 'Carbs' : 'كربوهيدرات'}</div>
                    <div class="macro-value">${macro.carbs}g</div>
                </div>
            </div>
        </div>
        <div class="macro-note">
            ${currentLang === 'en' 
                ? '4 calories per gram of protein and carbs, 9 calories per gram of fats' 
                : '4 سعرات حرارية لكل جرام من البروتين والكربوهيدرات، 9 سعرات حرارية لكل جرام من الدهون'}
        </div>
    `;
    
    container.innerHTML = html;
}

// Switch macro tab
function switchMacroTab(type) {
    // Update active tab
    document.querySelectorAll('.macro-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Display selected macros
    displayMacros(type, window.currentMacros, window.currentTdee);
}

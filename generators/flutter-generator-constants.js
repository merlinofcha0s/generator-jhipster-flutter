const MIN_SDK_VERSION = '18';
const TARGET_SDK_VERSION = '28';
const MAIN_SRC_DIR = 'lib/';
const ANDROID_SRC_DIR = 'android/';

const LANGUAGES = [
    {
        name: 'Albanian',
        dispName: 'Shqip',
        value: 'al',
        momentLocaleId: 'sq'
    },
    {
        name: 'Arabic (Libya)',
        dispName: 'العربية',
        value: 'ar-ly',
        rtl: true,
        skipForLocale: true
    },
    {
        name: 'Armenian',
        dispName: 'Հայերեն',
        value: 'hy',
        momentLocaleId: 'hy-am'
    },
    {
        name: 'Belarusian',
        dispName: 'Беларускі',
        value: 'by',
        momentLocaleId: 'be-by'
    },
    {
        name: 'Bengali',
        dispName: 'বাংলা',
        value: 'bn',
        momentLocaleId: 'bn-bd'
    },
    {
        name: 'Catalan',
        dispName: 'Català',
        value: 'ca'
    },
    {
        name: 'Chinese (Simplified)',
        dispName: '中文（简体）',
        value: 'zh-cn',
        localeId: 'zh-Hans'
    },
    {
        name: 'Chinese (Traditional)',
        dispName: '繁體中文',
        value: 'zh-tw',
        localeId: 'zh-Hant'
    },
    { name: 'Czech', dispName: 'Český', value: 'cs' },
    { name: 'Danish', dispName: 'Dansk', value: 'da' },
    { name: 'Dutch', dispName: 'Nederlands', value: 'nl' },
    { name: 'English', dispName: 'English', value: 'en' },
    { name: 'Estonian', dispName: 'Eesti', value: 'et' },
    {
        name: 'Farsi',
        dispName: 'فارسی',
        value: 'fa',
        rtl: true
    },
    { name: 'Finnish', dispName: 'Suomi', value: 'fi' },
    { name: 'French', dispName: 'Français', value: 'fr' },
    { name: 'Galician', dispName: 'Galego', value: 'gl' },
    { name: 'German', dispName: 'Deutsch', value: 'de' },
    { name: 'Greek', dispName: 'Ελληνικά', value: 'el' },
    { name: 'Hindi', dispName: 'हिंदी', value: 'hi' },
    { name: 'Hungarian', dispName: 'Magyar', value: 'hu' },
    {
        name: 'Indonesian',
        dispName: 'Bahasa Indonesia',
        /*
           To fix a nasty bug in the JDK ("Indonesian Locale does not comply with ISO 639")
           The locale is set to "in" for Indonesia
           See https://bugs.openjdk.java.net/browse/JDK-6457127
           And https://github.com/jhipster/generator-jhipster/issues/9494
        */
        value: 'in',
        localeId: 'id',
        momentLocaleId: 'id'
    },
    { name: 'Italian', dispName: 'Italiano', value: 'it' },
    { name: 'Japanese', dispName: '日本語', value: 'ja' },
    { name: 'Korean', dispName: '한국어', value: 'ko' },
    { name: 'Marathi', dispName: 'मराठी', value: 'mr' },
    { name: 'Myanmar', dispName: 'မြန်မာ', value: 'my' },
    { name: 'Polish', dispName: 'Polski', value: 'pl' },
    {
        name: 'Portuguese (Brazilian)',
        dispName: 'Português (Brasil)',
        value: 'pt-br',
        localeId: 'pt'
    },
    {
        name: 'Portuguese',
        dispName: 'Português',
        value: 'pt-pt',
        localeId: 'pt-PT'
    },
    { name: 'Romanian', dispName: 'Română', value: 'ro' },
    { name: 'Russian', dispName: 'Русский', value: 'ru' },
    { name: 'Slovak', dispName: 'Slovenský', value: 'sk' },
    { name: 'Serbian', dispName: 'Srpski', value: 'sr' },
    { name: 'Spanish', dispName: 'Español', value: 'es' },
    { name: 'Swedish', dispName: 'Svenska', value: 'sv' },
    { name: 'Turkish', dispName: 'Türkçe', value: 'tr' },
    { name: 'Tamil', dispName: 'தமிழ்', value: 'ta' },
    { name: 'Telugu', dispName: 'తెలుగు', value: 'te' },
    { name: 'Thai', dispName: 'ไทย', value: 'th' },
    {
        name: 'Ukrainian',
        dispName: 'Українська',
        value: 'ua',
        localeId: 'uk',
        momentLocaleId: 'uk'
    },
    {
        name: 'Uzbek (Cyrillic)',
        dispName: 'Ўзбекча',
        value: 'uz-Cyrl-uz',
        localeId: 'uz-Cyrl'
    },
    {
        name: 'Uzbek (Latin)',
        dispName: 'O`zbekcha',
        value: 'uz-Latn-uz',
        localeId: 'uz-Latn'
    },
    { name: 'Vietnamese', dispName: 'Tiếng Việt', value: 'vi' }
];

const constants = {
    MIN_SDK_VERSION,
    TARGET_SDK_VERSION,
    LANGUAGES,
    MAIN_SRC_DIR,
    ANDROID_SRC_DIR
};

module.exports = constants;

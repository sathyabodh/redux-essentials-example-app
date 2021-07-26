import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import intervalPlural from 'i18next-intervalplural-postprocessor'
import moment from "moment";
/*
Need to load locale config files for specific locale for any date formatting to work
If not present, then months, day is not translated
*/
import esLocale from 'moment/locale/es';
i18next
    .use(intervalPlural)
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        // ns:['notification', 'posts'],
        defaultNS: 'app',
        // backend:{
        //     loadPath: '/locales/{{lng}}/{{ns}}.json'
        // },
        debug: true,
        interpolation:{
            escapeValue: false,
            format:function(value, format, lng){
                if(value instanceof Date) {
                    // moment.locale('es')
                    console.log(`before format: ${moment.locale}`)
                    return moment(value).format(format)
                }
                return value
            }
        }
    })
    i18next.on('languageChanged', function(lng) {
        console.log(`chaing moment locale: ${lng}`)
        moment.locale(lng);
      });
    export default i18next
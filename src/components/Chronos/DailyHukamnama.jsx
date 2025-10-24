import axios from "axios";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
const DailyHukamnama = () => {
  const defaultHukamNama = {
    date: {
      gregorian: {
        month: "May",
        monthno: 5,
        date: 4,
        year: 2025,
        day: "Sunday",
      },
      nanakshahi: {
        english: {
          month: "Vaisakh",
          monthno: 2,
          date: 21,
          year: 557,
          day: "Aitvaar",
        },
        punjabi: {
          month: "ਵੈਸਾਖ",
          monthno: "੨",
          date: "੨੧",
          year: "੫੫੭",
          day: "ਐਤਵਾਰ",
        },
      },
    },
    hukamnamainfo: {
      shabadid: ["JHQ"],
      pageno: 686,
      source: {
        id: 1,
        akhar: "SRI gurU gRMQ swihb jI",
        unicode: "ਸ਼੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ",
        english: "Sri Guru Granth Sahib Ji",
        length: 1430,
        pageName: { akhar: "AMg", unicode: "ਅੰਗ", english: "Ang" },
      },
      writer: {
        id: 1,
        akhar: "gurU nwnk dyv jI",
        unicode: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ",
        english: "Guru Nanak Dev Ji",
      },
      raag: {
        id: 14,
        akhar: "rwgu DnwsrI",
        unicode: "ਰਾਗੁ ਧਨਾਸਰੀ",
        english: "Raag Dhanaasree",
        startang: 660,
        endang: 695,
        raagwithpage: "Raag Dhanaasree (660-695)",
      },
      count: 35,
    },
    hukamnama: [
      {
        line: {
          id: "2QPZ",
          type: 2,
          gurmukhi: { akhar: "DnwsrI mhlw 1 ]", unicode: "ਧਨਾਸਰੀ ਮਹਲਾ ੧ ॥" },
          larivaar: { akhar: "DnwsrI​mhlw​1​]", unicode: "ਧਨਾਸਰੀ​ਮਹਲਾ​੧​॥" },
          translation: {
            english: { default: "Dhanaasaree, First Mehl:" },
            punjabi: { default: { akhar: "", unicode: "" } },
            spanish: "Dhanasri, Mejl Guru Nanak, Primer Canal Divino.",
          },
          transliteration: {
            english: {
              text: "dhanaasaree mahalaa 1 |",
              larivaar: "dhanaasaree​mahalaa​1​|",
            },
            devanagari: {
              text: "धनासरी महला १ ॥",
              larivaar: "धनासरी​महला​१​॥",
            },
          },
          linenum: 4,
          firstletters: { akhar: "Dm1]", unicode: "ਧਮ੧॥" },
        },
      },
      {
        line: {
          id: "A3MJ",
          type: 4,
          gurmukhi: {
            akhar: "shij imlY imilAw prvwxu ]",
            unicode: "ਸਹਜਿ ਮਿਲੈ ਮਿਲਿਆ ਪਰਵਾਣੁ ॥",
          },
          larivaar: {
            akhar: "shij​imlY​imilAw​prvwxu​]",
            unicode: "ਸਹਜਿ​ਮਿਲੈ​ਮਿਲਿਆ​ਪਰਵਾਣੁ​॥",
          },
          translation: {
            english: {
              default:
                "That union with the Lord is acceptable, which is united in intuitive poise.",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVw mnu`K gurU dI rwhIN Afol AvsQw ivc itk ky pRBU-crnW ivc juVdw hY, aus dw pRBU-crnW ivc juVnw kbUl pYNdw hY[",
                unicode:
                  "ਜੇਹੜਾ ਮਨੁੱਖ ਗੁਰੂ ਦੀ ਰਾਹੀਂ ਅਡੋਲ ਅਵਸਥਾ ਵਿਚ ਟਿਕ ਕੇ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਵਿਚ ਜੁੜਦਾ ਹੈ, ਉਸ ਦਾ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਵਿਚ ਜੁੜਨਾ ਕਬੂਲ ਪੈਂਦਾ ਹੈ।",
              },
            },
            spanish: "Sólo podrá encontrar a su Dios, ese ser que lo haga,",
          },
          transliteration: {
            english: {
              text: "sehaj milai miliaa paravaan |",
              larivaar: "sehaj​milai​miliaa​paravaan​|",
            },
            devanagari: {
              text: "सहजि मिलै मिलिआ परवाणु ॥",
              larivaar: "सहजि​मिलै​मिलिआ​परवाणु​॥",
            },
          },
          linenum: 4,
          firstletters: { akhar: "smmp", unicode: "ਸਮਮਪ" },
        },
      },
      {
        line: {
          id: "BAXX",
          type: 4,
          gurmukhi: {
            akhar: "nw iqsu mrxu n Awvxu jwxu ]",
            unicode: "ਨਾ ਤਿਸੁ ਮਰਣੁ ਨ ਆਵਣੁ ਜਾਣੁ ॥",
          },
          larivaar: {
            akhar: "nw​iqsu​mrxu​n​Awvxu​jwxu​]",
            unicode: "ਨਾ​ਤਿਸੁ​ਮਰਣੁ​ਨ​ਆਵਣੁ​ਜਾਣੁ​॥",
          },
          translation: {
            english: {
              default:
                "Thereafter, one does not die, and does not come and go in reincarnation.",
            },
            punjabi: {
              default: {
                akhar:
                  "aus mnu`K ƒ nwh Awqmk mOq AwauNdI hY, nwh hI jnm mrn dw gyV[",
                unicode:
                  "ਉਸ ਮਨੁੱਖ ਨੂੰ ਨਾਹ ਆਤਮਕ ਮੌਤ ਆਉਂਦੀ ਹੈ, ਨਾਹ ਹੀ ਜਨਮ ਮਰਨ ਦਾ ਗੇੜ।",
              },
            },
            spanish:
              "en Verdad, a través de un Estado de Equilibrio, sólo y entonces ese ser no morirá,",
          },
          transliteration: {
            english: {
              text: "naa tis maran na aavan jaan |",
              larivaar: "naa​tis​maran​na​aavan​jaan​|",
            },
            devanagari: {
              text: "ना तिसु मरणु न आवणु जाणु ॥",
              larivaar: "ना​तिसु​मरणु​न​आवणु​जाणु​॥",
            },
          },
          linenum: 4,
          firstletters: { akhar: "nqmnAj", unicode: "ਨਤਮਨਅਜ" },
        },
      },
      {
        line: {
          id: "TPC2",
          type: 4,
          gurmukhi: {
            akhar: "Twkur mih dwsu dws mih soie ]",
            unicode: "ਠਾਕੁਰ ਮਹਿ ਦਾਸੁ ਦਾਸ ਮਹਿ ਸੋਇ ॥",
          },
          larivaar: {
            akhar: "Twkur​mih​dwsu​dws​mih​soie​]",
            unicode: "ਠਾਕੁਰ​ਮਹਿ​ਦਾਸੁ​ਦਾਸ​ਮਹਿ​ਸੋਇ​॥",
          },
          translation: {
            english: {
              default:
                "The Lord's slave is in the Lord, and the Lord is in His slave.",
            },
            punjabi: {
              default: {
                akhar:
                  "Ajyhw pRBU dw dws pRBU ivc lIn rihMdw hY, pRBU Ajyhy syvk dy AMdr prgt ho jWdw hY[",
                unicode:
                  "ਅਜੇਹਾ ਪ੍ਰਭੂ ਦਾ ਦਾਸ ਪ੍ਰਭੂ ਵਿਚ ਲੀਨ ਰਹਿੰਦਾ ਹੈ, ਪ੍ਰਭੂ ਅਜੇਹੇ ਸੇਵਕ ਦੇ ਅੰਦਰ ਪਰਗਟ ਹੋ ਜਾਂਦਾ ਹੈ।",
              },
            },
            spanish:
              "ni se irá, ni vendrá. En el Maestro está el alumno, en el alumno está Él,",
          },
          transliteration: {
            english: {
              text: "tthaakur meh daas daas meh soe |",
              larivaar: "tthaakur​meh​daas​daas​meh​soe​|",
            },
            devanagari: {
              text: "ठाकुर महि दासु दास महि सोइ ॥",
              larivaar: "ठाकुर​महि​दासु​दास​महि​सोइ​॥",
            },
          },
          linenum: 5,
          firstletters: { akhar: "Tmddms", unicode: "ਠਮਦਦਮਸ" },
        },
      },
      {
        line: {
          id: "VP3F",
          type: 4,
          gurmukhi: {
            akhar: "jh dyKw qh Avru n koie ]1]",
            unicode: "ਜਹ ਦੇਖਾ ਤਹ ਅਵਰੁ ਨ ਕੋਇ ॥੧॥",
          },
          larivaar: {
            akhar: "jh​dyKw​qh​Avru​n​koie​]1]",
            unicode: "ਜਹ​ਦੇਖਾ​ਤਹ​ਅਵਰੁ​ਨ​ਕੋਇ​॥੧॥",
          },
          translation: {
            english: {
              default: "Wherever I look, I see none other than the Lord. ||1||",
            },
            punjabi: {
              default: {
                akhar:
                  "auh syvk ij`Dr q`kdw hY aus ƒ prmwqmw qoN ibnw hor koeI nhIN id`sdw ]1]",
                unicode:
                  "ਉਹ ਸੇਵਕ ਜਿੱਧਰ ਤੱਕਦਾ ਹੈ ਉਸ ਨੂੰ ਪਰਮਾਤਮਾ ਤੋਂ ਬਿਨਾ ਹੋਰ ਕੋਈ ਨਹੀਂ ਦਿੱਸਦਾ ॥੧॥",
              },
            },
            spanish:
              "el Señor, pues a donde sea que volteo a ver, veo nada más que a Dios. (1)",
          },
          transliteration: {
            english: {
              text: "jeh dekhaa teh avar na koe |1|",
              larivaar: "jeh​dekhaa​teh​avar​na​koe​|1|",
            },
            devanagari: {
              text: "जह देखा तह अवरु न कोइ ॥१॥",
              larivaar: "जह​देखा​तह​अवरु​न​कोइ​॥१॥",
            },
          },
          linenum: 5,
          firstletters: { akhar: "jdqAnk", unicode: "ਜਦਤਅਨਕ" },
        },
      },
      {
        line: {
          id: "Z8K9",
          type: 3,
          gurmukhi: {
            akhar: "gurmuiK Bgiq shj Gru pweIAY ]",
            unicode: "ਗੁਰਮੁਖਿ ਭਗਤਿ ਸਹਜ ਘਰੁ ਪਾਈਐ ॥",
          },
          larivaar: {
            akhar: "gurmuiK​Bgiq​shj​Gru​pweIAY​]",
            unicode: "ਗੁਰਮੁਖਿ​ਭਗਤਿ​ਸਹਜ​ਘਰੁ​ਪਾਈਐ​॥",
          },
          translation: {
            english: {
              default:
                "The Gurmukhs worship the Lord, and find His celestial home.",
            },
            punjabi: {
              default: {
                akhar:
                  "gurU dI srn pY ky prmwqmw dI BgqI kIiqAW auh (Awqmk) itkwxw iml jWdw hY ijQy mn sdw Afol AvsQw ivc itikAw rihMdw hY[",
                unicode:
                  "ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ ਪਰਮਾਤਮਾ ਦੀ ਭਗਤੀ ਕੀਤਿਆਂ ਉਹ (ਆਤਮਕ) ਟਿਕਾਣਾ ਮਿਲ ਜਾਂਦਾ ਹੈ ਜਿਥੇ ਮਨ ਸਦਾ ਅਡੋਲ ਅਵਸਥਾ ਵਿਚ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ।",
              },
            },
            spanish:
              "A través del Guru uno obtiene Su Alabanza y el Estado de Equilibrio,",
          },
          transliteration: {
            english: {
              text: "guramukh bhagat sehaj ghar paaeeai |",
              larivaar: "guramukh​bhagat​sehaj​ghar​paaeeai​|",
            },
            devanagari: {
              text: "गुरमुखि भगति सहज घरु पाईऐ ॥",
              larivaar: "गुरमुखि​भगति​सहज​घरु​पाईऐ​॥",
            },
          },
          linenum: 5,
          firstletters: { akhar: "gBsGp", unicode: "ਗਭਸਘਪ" },
        },
      },
      {
        line: {
          id: "ZUY9",
          type: 3,
          gurmukhi: {
            akhar: "ibnu gur Byty mir AweIAY jweIAY ]1] rhwau ]",
            unicode: "ਬਿਨੁ ਗੁਰ ਭੇਟੇ ਮਰਿ ਆਈਐ ਜਾਈਐ ॥੧॥ ਰਹਾਉ ॥",
          },
          larivaar: {
            akhar: "ibnu​gur​Byty​mir​AweIAY​jweIAY​]1]​rhwau​]",
            unicode: "ਬਿਨੁ​ਗੁਰ​ਭੇਟੇ​ਮਰਿ​ਆਈਐ​ਜਾਈਐ​॥੧॥​ਰਹਾਉ​॥",
          },
          translation: {
            english: {
              default:
                "Without meeting the Guru, they die, and come and go in reincarnation. ||1||Pause||",
            },
            punjabi: {
              default: {
                akhar:
                  "(pr) gurU ƒ imlx qoN ibnw Awqmk mOqy mr ky jnm mrn dy gyV ivc pey rhIdw hY ]1] rhwau ]",
                unicode:
                  "(ਪਰ) ਗੁਰੂ ਨੂੰ ਮਿਲਣ ਤੋਂ ਬਿਨਾ ਆਤਮਕ ਮੌਤੇ ਮਰ ਕੇ ਜਨਮ ਮਰਨ ਦੇ ਗੇੜ ਵਿਚ ਪਏ ਰਹੀਦਾ ਹੈ ॥੧॥ ਰਹਾਉ ॥",
              },
            },
            spanish: "pero sin conocer al Guru, uno sólo va y viene. (1-Pausa)",
          },
          transliteration: {
            english: {
              text: "bin gur bhette mar aaeeai jaaeeai |1| rahaau |",
              larivaar: "bin​gur​bhette​mar​aaeeai​jaaeeai​|1|​rahaau​|",
            },
            devanagari: {
              text: "बिनु गुर भेटे मरि आईऐ जाईऐ ॥१॥ रहाउ ॥",
              larivaar: "बिनु​गुर​भेटे​मरि​आईऐ​जाईऐ​॥१॥​रहाउ​॥",
            },
          },
          linenum: 6,
          firstletters: { akhar: "bgBmAj", unicode: "ਬਗਭਮਅਜ" },
        },
      },
      {
        line: {
          id: "2BV7",
          type: 4,
          gurmukhi: {
            akhar: "so guru krau ij swcu idRVwvY ]",
            unicode: "ਸੋ ਗੁਰੁ ਕਰਉ ਜਿ ਸਾਚੁ ਦ੍ਰਿੜਾਵੈ ॥",
          },
          larivaar: {
            akhar: "so​guru​krau​ij​swcu​idRVwvY​]",
            unicode: "ਸੋ​ਗੁਰੁ​ਕਰਉ​ਜਿ​ਸਾਚੁ​ਦ੍ਰਿੜਾਵੈ​॥",
          },
          translation: {
            english: {
              default:
                "So make Him your Guru, who implants the Truth within you,",
            },
            punjabi: {
              default: {
                akhar:
                  "mYN (BI) auhI gurU Dwrnw cwhuMdw hW jyhVw sdw-iQr pRBU ƒ (myry ihrdy ivc) p`kI qrHW itkw dyvy,",
                unicode:
                  "ਮੈਂ (ਭੀ) ਉਹੀ ਗੁਰੂ ਧਾਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ ਜੇਹੜਾ ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਨੂੰ (ਮੇਰੇ ਹਿਰਦੇ ਵਿਚ) ਪੱਕੀ ਤਰ੍ਹਾਂ ਟਿਕਾ ਦੇਵੇ,",
              },
            },
            spanish:
              "Yo buscaría por todas partes a ese Guru, quien pudiera instalar la Verdad del Señor en mi mente,",
          },
          transliteration: {
            english: {
              text: "so gur krau ji saach drirraavai |",
              larivaar: "so​gur​krau​ji​saach​drirraavai​|",
            },
            devanagari: {
              text: "सो गुरु करउ जि साचु द्रिड़ावै ॥",
              larivaar: "सो​गुरु​करउ​जि​साचु​द्रिड़ावै​॥",
            },
          },
          linenum: 6,
          firstletters: { akhar: "sgkjsd", unicode: "ਸਗਕਜਸਦ" },
        },
      },
      {
        line: {
          id: "GR41",
          type: 4,
          gurmukhi: {
            akhar: "AkQu kQwvY sbid imlwvY ]",
            unicode: "ਅਕਥੁ ਕਥਾਵੈ ਸਬਦਿ ਮਿਲਾਵੈ ॥",
          },
          larivaar: {
            akhar: "AkQu​kQwvY​sbid​imlwvY​]",
            unicode: "ਅਕਥੁ​ਕਥਾਵੈ​ਸਬਦਿ​ਮਿਲਾਵੈ​॥",
          },
          translation: {
            english: {
              default:
                "who leads you to speak the Unspoken Speech, and who merges you in the Word of the Shabad.",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVw mYQoN Ak`Q pRBU dI is&q-swlwh krwvy, qy Awpxy Sbd dI rwhIN mYƒ pRBU-crnW ivc joV dyvy[",
                unicode:
                  "ਜੇਹੜਾ ਮੈਥੋਂ ਅਕੱਥ ਪ੍ਰਭੂ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਕਰਾਵੇ, ਤੇ ਆਪਣੇ ਸ਼ਬਦ ਦੀ ਰਾਹੀਂ ਮੈਨੂੰ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਵਿਚ ਜੋੜ ਦੇਵੇ।",
              },
            },
            spanish:
              "entonarme en la Palabra del Shabd y recitarme el Misterio de lo Indecible.",
          },
          transliteration: {
            english: {
              text: "akath kathaavai sabad milaavai |",
              larivaar: "akath​kathaavai​sabad​milaavai​|",
            },
            devanagari: {
              text: "अकथु कथावै सबदि मिलावै ॥",
              larivaar: "अकथु​कथावै​सबदि​मिलावै​॥",
            },
          },
          linenum: 7,
          firstletters: { akhar: "Aksm", unicode: "ਅਕਸਮ" },
        },
      },
      {
        line: {
          id: "Q8SU",
          type: 4,
          gurmukhi: {
            akhar: "hir ky log Avr nhI kwrw ]",
            unicode: "ਹਰਿ ਕੇ ਲੋਗ ਅਵਰ ਨਹੀ ਕਾਰਾ ॥",
          },
          larivaar: {
            akhar: "hir​ky​log​Avr​nhI​kwrw​]",
            unicode: "ਹਰਿ​ਕੇ​ਲੋਗ​ਅਵਰ​ਨਹੀ​ਕਾਰਾ​॥",
          },
          translation: {
            english: { default: "God's people have no other work to do;" },
            punjabi: {
              default: {
                akhar:
                  "prmwqmw dy Bgq ƒ (is&q-swlwh qoN ibnw) koeI hor kwr nhIN (su`JdI)[",
                unicode:
                  "ਪਰਮਾਤਮਾ ਦੇ ਭਗਤ ਨੂੰ (ਸਿਫ਼ਤ-ਸਾਲਾਹ ਤੋਂ ਬਿਨਾ) ਕੋਈ ਹੋਰ ਕਾਰ ਨਹੀਂ (ਸੁੱਝਦੀ)।",
              },
            },
            spanish:
              "Los seres de Dios no son atraídos por ninguna otra idea más",
          },
          transliteration: {
            english: {
              text: "har ke log avar nahee kaaraa |",
              larivaar: "har​ke​log​avar​nahee​kaaraa​|",
            },
            devanagari: {
              text: "हरि के लोग अवर नही कारा ॥",
              larivaar: "हरि​के​लोग​अवर​नही​कारा​॥",
            },
          },
          linenum: 7,
          firstletters: { akhar: "hklAnk", unicode: "ਹਕਲਅਨਕ" },
        },
      },
      {
        line: {
          id: "7AD8",
          type: 4,
          gurmukhi: {
            akhar: "swcau Twkuru swcu ipAwrw ]2]",
            unicode: "ਸਾਚਉ ਠਾਕੁਰੁ ਸਾਚੁ ਪਿਆਰਾ ॥੨॥",
          },
          larivaar: {
            akhar: "swcau​Twkuru​swcu​ipAwrw​]2]",
            unicode: "ਸਾਚਉ​ਠਾਕੁਰੁ​ਸਾਚੁ​ਪਿਆਰਾ​॥੨॥",
          },
          translation: {
            english: {
              default:
                "they love the True Lord and Master, and they love the Truth. ||2||",
            },
            punjabi: {
              default: {
                akhar:
                  "Bgq sdw-iQr pRBU ƒ hI ismrdw hY, sdw-iQr pRBU aus ƒ ipAwrw l`gdw hY ]2]",
                unicode:
                  "ਭਗਤ ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਨੂੰ ਹੀ ਸਿਮਰਦਾ ਹੈ, ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਉਸ ਨੂੰ ਪਿਆਰਾ ਲੱਗਦਾ ਹੈ ॥੨॥",
              },
            },
            spanish:
              "que la de amar la Verdad del Señor y al Señor Verdadero. (2)",
          },
          transliteration: {
            english: {
              text: "saachau tthaakur saach piaaraa |2|",
              larivaar: "saachau​tthaakur​saach​piaaraa​|2|",
            },
            devanagari: {
              text: "साचउ ठाकुरु साचु पिआरा ॥२॥",
              larivaar: "साचउ​ठाकुरु​साचु​पिआरा​॥२॥",
            },
          },
          linenum: 7,
          firstletters: { akhar: "sTsp", unicode: "ਸਠਸਪ" },
        },
      },
      {
        line: {
          id: "JSH3",
          type: 4,
          gurmukhi: {
            akhar: "qn mih mnUAw mn mih swcw ]",
            unicode: "ਤਨ ਮਹਿ ਮਨੂਆ ਮਨ ਮਹਿ ਸਾਚਾ ॥",
          },
          larivaar: {
            akhar: "qn​mih​mnUAw​mn​mih​swcw​]",
            unicode: "ਤਨ​ਮਹਿ​ਮਨੂਆ​ਮਨ​ਮਹਿ​ਸਾਚਾ​॥",
          },
          translation: {
            english: {
              default:
                "The mind is in the body, and the True Lord is in the mind.",
            },
            punjabi: {
              default: {
                akhar:
                  "aus dw mn srIr dy AMdr hI rihMdw hY (Bwv, mwieAw-moihAw dsIN pwsIN dOVdw nhIN (iPrdw), aus dy mn ivc sdw-iQr pRBU prgt ho jWdw hY,",
                unicode:
                  "ਉਸ ਦਾ ਮਨ ਸਰੀਰ ਦੇ ਅੰਦਰ ਹੀ ਰਹਿੰਦਾ ਹੈ (ਭਾਵ, ਮਾਇਆ-ਮੋਹਿਆ ਦਸੀਂ ਪਾਸੀਂ ਦੌੜਦਾ ਨਹੀਂ (ਫਿਰਦਾ), ਉਸ ਦੇ ਮਨ ਵਿਚ ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਪਰਗਟ ਹੋ ਜਾਂਦਾ ਹੈ,",
              },
            },
            spanish:
              "La mente está en el cuerpo, en la mente está el Dios Verdadero,",
          },
          transliteration: {
            english: {
              text: "tan meh manooaa man meh saachaa |",
              larivaar: "tan​meh​manooaa​man​meh​saachaa​|",
            },
            devanagari: {
              text: "तन महि मनूआ मन महि साचा ॥",
              larivaar: "तन​महि​मनूआ​मन​महि​साचा​॥",
            },
          },
          linenum: 8,
          firstletters: { akhar: "qmmmms", unicode: "ਤਮਮਮਮਸ" },
        },
      },
      {
        line: {
          id: "NXAS",
          type: 4,
          gurmukhi: {
            akhar: "so swcw imil swcy rwcw ]",
            unicode: "ਸੋ ਸਾਚਾ ਮਿਲਿ ਸਾਚੇ ਰਾਚਾ ॥",
          },
          larivaar: {
            akhar: "so​swcw​imil​swcy​rwcw​]",
            unicode: "ਸੋ​ਸਾਚਾ​ਮਿਲਿ​ਸਾਚੇ​ਰਾਚਾ​॥",
          },
          translation: {
            english: {
              default:
                "Merging into the True Lord, one is absorbed into Truth.",
            },
            punjabi: {
              default: {
                akhar:
                  "auh syvk sdw-iQr pRBU ƒ ismr ky qy aus ivc iml ky aus (dI Xwd) ivc lIn rihMdw hY[",
                unicode:
                  "ਉਹ ਸੇਵਕ ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਨੂੰ ਸਿਮਰ ਕੇ ਤੇ ਉਸ ਵਿਚ ਮਿਲ ਕੇ ਉਸ (ਦੀ ਯਾਦ) ਵਿਚ ਲੀਨ ਰਹਿੰਦਾ ਹੈ।",
              },
            },
            spanish: "y conociendo al Dios Verdadero, uno es fundido en Él.",
          },
          transliteration: {
            english: {
              text: "so saachaa mil saache raachaa |",
              larivaar: "so​saachaa​mil​saache​raachaa​|",
            },
            devanagari: {
              text: "सो साचा मिलि साचे राचा ॥",
              larivaar: "सो​साचा​मिलि​साचे​राचा​॥",
            },
          },
          linenum: 8,
          firstletters: { akhar: "ssmsr", unicode: "ਸਸਮਸਰ" },
        },
      },
      {
        line: {
          id: "RRMC",
          type: 4,
          gurmukhi: {
            akhar: "syvku pRB kY lwgY pwie ]",
            unicode: "ਸੇਵਕੁ ਪ੍ਰਭ ਕੈ ਲਾਗੈ ਪਾਇ ॥",
          },
          larivaar: {
            akhar: "syvku​pRB​kY​lwgY​pwie​]",
            unicode: "ਸੇਵਕੁ​ਪ੍ਰਭ​ਕੈ​ਲਾਗੈ​ਪਾਇ​॥",
          },
          translation: {
            english: { default: "God's servant bows at His feet." },
            punjabi: {
              default: {
                akhar: "auh syvk pRBU dy crnW ivc juiVAw rihMdw hY,",
                unicode: "ਉਹ ਸੇਵਕ ਪ੍ਰਭੂ ਦੇ ਚਰਨਾਂ ਵਿਚ ਜੁੜਿਆ ਰਹਿੰਦਾ ਹੈ,",
              },
            },
            spanish: "El Devoto llega a postrarse a los Pies",
          },
          transliteration: {
            english: {
              text: "sevak prabh kai laagai paae |",
              larivaar: "sevak​prabh​kai​laagai​paae​|",
            },
            devanagari: {
              text: "सेवकु प्रभ कै लागै पाइ ॥",
              larivaar: "सेवकु​प्रभ​कै​लागै​पाइ​॥",
            },
          },
          linenum: 8,
          firstletters: { akhar: "spklp", unicode: "ਸਪਕਲਪ" },
        },
      },
      {
        line: {
          id: "EH49",
          type: 4,
          gurmukhi: {
            akhar: "siqguru pUrw imlY imlwie ]3]",
            unicode: "ਸਤਿਗੁਰੁ ਪੂਰਾ ਮਿਲੈ ਮਿਲਾਇ ॥੩॥",
          },
          larivaar: {
            akhar: "siqguru​pUrw​imlY​imlwie​]3]",
            unicode: "ਸਤਿਗੁਰੁ​ਪੂਰਾ​ਮਿਲੈ​ਮਿਲਾਇ​॥੩॥",
          },
          translation: {
            english: {
              default: "Meeting the True Guru, one meets with the Lord. ||3||",
            },
            punjabi: {
              default: {
                akhar:
                  "ijs mnu`K ƒ pUrw gurU iml pYNdw hY gurU aus ƒ pRBU-crnW ivc imlw dyNdw hY ]3]",
                unicode:
                  "ਜਿਸ ਮਨੁੱਖ ਨੂੰ ਪੂਰਾ ਗੁਰੂ ਮਿਲ ਪੈਂਦਾ ਹੈ ਗੁਰੂ ਉਸ ਨੂੰ ਪ੍ਰਭੂ-ਚਰਨਾਂ ਵਿਚ ਮਿਲਾ ਦੇਂਦਾ ਹੈ ॥੩॥",
              },
            },
            spanish:
              "del Señor y se encuentra con el Guru Perfecto y Verdadero. (3)",
          },
          transliteration: {
            english: {
              text: "satigur pooraa milai milaae |3|",
              larivaar: "satigur​pooraa​milai​milaae​|3|",
            },
            devanagari: {
              text: "सतिगुरु पूरा मिलै मिलाइ ॥३॥",
              larivaar: "सतिगुरु​पूरा​मिलै​मिलाइ​॥३॥",
            },
          },
          linenum: 8,
          firstletters: { akhar: "spmm", unicode: "ਸਪਮਮ" },
        },
      },
      {
        line: {
          id: "NY6Q",
          type: 4,
          gurmukhi: {
            akhar: "Awip idKwvY Awpy dyKY ]",
            unicode: "ਆਪਿ ਦਿਖਾਵੈ ਆਪੇ ਦੇਖੈ ॥",
          },
          larivaar: {
            akhar: "Awip​idKwvY​Awpy​dyKY​]",
            unicode: "ਆਪਿ​ਦਿਖਾਵੈ​ਆਪੇ​ਦੇਖੈ​॥",
          },
          translation: {
            english: {
              default:
                "He Himself watches over us, and He Himself makes us see.",
            },
            punjabi: {
              default: {
                akhar:
                  "prmwqmw Awpxw drsn Awp hI (gurU dI rwhIN) krWdw hY, Awp hI (sB jIvW dy) idl dI jwxdw hY[",
                unicode:
                  "ਪਰਮਾਤਮਾ ਆਪਣਾ ਦਰਸਨ ਆਪ ਹੀ (ਗੁਰੂ ਦੀ ਰਾਹੀਂ) ਕਰਾਂਦਾ ਹੈ, ਆਪ ਹੀ (ਸਭ ਜੀਵਾਂ ਦੇ) ਦਿਲ ਦੀ ਜਾਣਦਾ ਹੈ।",
              },
            },
            spanish:
              "El Señor Mismo lo ve todo y nos hace ver a nosotros Sus Maravillas.",
          },
          transliteration: {
            english: {
              text: "aap dikhaavai aape dekhai |",
              larivaar: "aap​dikhaavai​aape​dekhai​|",
            },
            devanagari: {
              text: "आपि दिखावै आपे देखै ॥",
              larivaar: "आपि​दिखावै​आपे​देखै​॥",
            },
          },
          linenum: 9,
          firstletters: { akhar: "AdAd", unicode: "ਅਦਅਦ" },
        },
      },
      {
        line: {
          id: "2372",
          type: 4,
          gurmukhi: {
            akhar: "hiT n pqIjY nw bhu ByKY ]",
            unicode: "ਹਠਿ ਨ ਪਤੀਜੈ ਨਾ ਬਹੁ ਭੇਖੈ ॥",
          },
          larivaar: {
            akhar: "hiT​n​pqIjY​nw​bhu​ByKY​]",
            unicode: "ਹਠਿ​ਨ​ਪਤੀਜੈ​ਨਾ​ਬਹੁ​ਭੇਖੈ​॥",
          },
          translation: {
            english: {
              default:
                "He is not pleased by stubborn-mindedness, nor by various religious robes.",
            },
            punjabi: {
              default: {
                akhar:
                  "(ies vwsqy auh) hT dI rwhIN kIqy krmW auqy nhIN pqIjdw, nwh hI bhuqy (Dwrimk) ByKW qy pRsMn huMdw hY[",
                unicode:
                  "(ਇਸ ਵਾਸਤੇ ਉਹ) ਹਠ ਦੀ ਰਾਹੀਂ ਕੀਤੇ ਕਰਮਾਂ ਉਤੇ ਨਹੀਂ ਪਤੀਜਦਾ, ਨਾਹ ਹੀ ਬਹੁਤੇ (ਧਾਰਮਿਕ) ਭੇਖਾਂ ਤੇ ਪ੍ਰਸੰਨ ਹੁੰਦਾ ਹੈ।",
              },
            },
            spanish:
              "Pero Él no está complacido si uno impone su propia voluntad o se viste con muchos atuendos.",
          },
          transliteration: {
            english: {
              text: "hatth na pateejai naa bahu bhekhai |",
              larivaar: "hatth​na​pateejai​naa​bahu​bhekhai​|",
            },
            devanagari: {
              text: "हठि न पतीजै ना बहु भेखै ॥",
              larivaar: "हठि​न​पतीजै​ना​बहु​भेखै​॥",
            },
          },
          linenum: 9,
          firstletters: { akhar: "hnpnbB", unicode: "ਹਨਪਨਬਭ" },
        },
      },
      {
        line: {
          id: "P3XJ",
          type: 4,
          gurmukhi: {
            akhar: "GiV Bwfy ijin AMimRqu pwieAw ]",
            unicode: "ਘੜਿ ਭਾਡੇ ਜਿਨਿ ਅੰਮ੍ਰਿਤੁ ਪਾਇਆ ॥",
          },
          larivaar: {
            akhar: "GiV​Bwfy​ijin​AMimRqu​pwieAw​]",
            unicode: "ਘੜਿ​ਭਾਡੇ​ਜਿਨਿ​ਅੰਮ੍ਰਿਤੁ​ਪਾਇਆ​॥",
          },
          translation: {
            english: {
              default:
                "He fashioned the body-vessels, and infused the Ambrosial Nectar into them;",
            },
            punjabi: {
              default: {
                akhar:
                  "ijs pRBU ny (swry) srIr swjy hn qy (gurU dI srn Awey iksy vfBwgI dy ihrdy ivc) nwm-AMimRq pwieAw hY,",
                unicode:
                  "ਜਿਸ ਪ੍ਰਭੂ ਨੇ (ਸਾਰੇ) ਸਰੀਰ ਸਾਜੇ ਹਨ ਤੇ (ਗੁਰੂ ਦੀ ਸਰਨ ਆਏ ਕਿਸੇ ਵਡਭਾਗੀ ਦੇ ਹਿਰਦੇ ਵਿਚ) ਨਾਮ-ਅੰਮ੍ਰਿਤ ਪਾਇਆ ਹੈ,",
              },
            },
            spanish:
              "Sólo a través de la Adoración Amorosa de Aquél que construyó los recipientes de nuestros cuerpos y puso el Néctar en su interior,",
          },
          transliteration: {
            english: {
              text: "gharr bhaadde jin amrit paaeaa |",
              larivaar: "gharr​bhaadde​jin​amrit​paaeaa​|",
            },
            devanagari: {
              text: "घड़ि भाडे जिनि अंम्रितु पाइआ ॥",
              larivaar: "घड़ि​भाडे​जिनि​अंम्रितु​पाइआ​॥",
            },
          },
          linenum: 9,
          firstletters: { akhar: "GBjAp", unicode: "ਘਭਜਅਪ" },
        },
      },
      {
        line: {
          id: "2NHB",
          type: 4,
          gurmukhi: {
            akhar: "pRym Bgiq pRiB mnu pqIAwieAw ]4]",
            unicode: "ਪ੍ਰੇਮ ਭਗਤਿ ਪ੍ਰਭਿ ਮਨੁ ਪਤੀਆਇਆ ॥੪॥",
          },
          larivaar: {
            akhar: "pRym​Bgiq​pRiB​mnu​pqIAwieAw​]4]",
            unicode: "ਪ੍ਰੇਮ​ਭਗਤਿ​ਪ੍ਰਭਿ​ਮਨੁ​ਪਤੀਆਇਆ​॥੪॥",
          },
          translation: {
            english: {
              default:
                "God's Mind is pleased only by loving devotional worship. ||4||",
            },
            punjabi: {
              default: {
                akhar: "ausy pRBU ny aus dw mn pRymw BgqI ivc joiVAw hY ]4]",
                unicode: "ਉਸੇ ਪ੍ਰਭੂ ਨੇ ਉਸ ਦਾ ਮਨ ਪ੍ਰੇਮਾ ਭਗਤੀ ਵਿਚ ਜੋੜਿਆ ਹੈ ॥੪॥",
              },
            },
            spanish: "la mente es saciada. (4)",
          },
          transliteration: {
            english: {
              text: "prem bhagat prabh man pateeaeaa |4|",
              larivaar: "prem​bhagat​prabh​man​pateeaeaa​|4|",
            },
            devanagari: {
              text: "प्रेम भगति प्रभि मनु पतीआइआ ॥४॥",
              larivaar: "प्रेम​भगति​प्रभि​मनु​पतीआइआ​॥४॥",
            },
          },
          linenum: 10,
          firstletters: { akhar: "pBpmp", unicode: "ਪਭਪਮਪ" },
        },
      },
      {
        line: {
          id: "LW48",
          type: 4,
          gurmukhi: {
            akhar: "piV piV BUlih cotw Kwih ]",
            unicode: "ਪੜਿ ਪੜਿ ਭੂਲਹਿ ਚੋਟਾ ਖਾਹਿ ॥",
          },
          larivaar: {
            akhar: "piV​piV​BUlih​cotw​Kwih​]",
            unicode: "ਪੜਿ​ਪੜਿ​ਭੂਲਹਿ​ਚੋਟਾ​ਖਾਹਿ​॥",
          },
          translation: {
            english: {
              default:
                "Reading and studying, one becomes confused, and suffers punishment.",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVy mnu`K (iv`idAw) pVH pVH ky (iv`idAw dy mwx ivc hI ismrn qoN) KuMJ jWdy hn auh (Awqmk mOq dIAW) cotW sihMdy hn[",
                unicode:
                  "ਜੇਹੜੇ ਮਨੁੱਖ (ਵਿੱਦਿਆ) ਪੜ੍ਹ ਪੜ੍ਹ ਕੇ (ਵਿੱਦਿਆ ਦੇ ਮਾਣ ਵਿਚ ਹੀ ਸਿਮਰਨ ਤੋਂ) ਖੁੰਝ ਜਾਂਦੇ ਹਨ ਉਹ (ਆਤਮਕ ਮੌਤ ਦੀਆਂ) ਚੋਟਾਂ ਸਹਿੰਦੇ ਹਨ।",
              },
            },
            spanish: "El hombre lee y lee y se pierde en sus lecturas",
          },
          transliteration: {
            english: {
              text: "parr parr bhooleh chottaa khaeh |",
              larivaar: "parr​parr​bhooleh​chottaa​khaeh​|",
            },
            devanagari: {
              text: "पड़ि पड़ि भूलहि चोटा खाहि ॥",
              larivaar: "पड़ि​पड़ि​भूलहि​चोटा​खाहि​॥",
            },
          },
          linenum: 10,
          firstletters: { akhar: "ppBcK", unicode: "ਪਪਭਚਖ" },
        },
      },
      {
        line: {
          id: "EPQS",
          type: 4,
          gurmukhi: {
            akhar: "bhuqu isAwxp Awvih jwih ]",
            unicode: "ਬਹੁਤੁ ਸਿਆਣਪ ਆਵਹਿ ਜਾਹਿ ॥",
          },
          larivaar: {
            akhar: "bhuqu​isAwxp​Awvih​jwih​]",
            unicode: "ਬਹੁਤੁ​ਸਿਆਣਪ​ਆਵਹਿ​ਜਾਹਿ​॥",
          },
          translation: {
            english: {
              default:
                "By great cleverness, one is consigned to coming and going in reincarnation.",
            },
            punjabi: {
              default: {
                akhar:
                  "(iv`idAw dI) bhuqI cqurweI dy kwrn jnm mrn dy gyV ivc pYNdy hn[",
                unicode:
                  "(ਵਿੱਦਿਆ ਦੀ) ਬਹੁਤੀ ਚਤੁਰਾਈ ਦੇ ਕਾਰਨ ਜਨਮ ਮਰਨ ਦੇ ਗੇੜ ਵਿਚ ਪੈਂਦੇ ਹਨ।",
              },
            },
            spanish: "y mientras más afila su intelecto, más va y viene.",
          },
          transliteration: {
            english: {
              text: "bahut siaanap aaveh jaeh |",
              larivaar: "bahut​siaanap​aaveh​jaeh​|",
            },
            devanagari: {
              text: "बहुतु सिआणप आवहि जाहि ॥",
              larivaar: "बहुतु​सिआणप​आवहि​जाहि​॥",
            },
          },
          linenum: 10,
          firstletters: { akhar: "bsAj", unicode: "ਬਸਅਜ" },
        },
      },
      {
        line: {
          id: "T5RN",
          type: 4,
          gurmukhi: {
            akhar: "nwmu jpY Bau Bojnu Kwie ]",
            unicode: "ਨਾਮੁ ਜਪੈ ਭਉ ਭੋਜਨੁ ਖਾਇ ॥",
          },
          larivaar: {
            akhar: "nwmu​jpY​Bau​Bojnu​Kwie​]",
            unicode: "ਨਾਮੁ​ਜਪੈ​ਭਉ​ਭੋਜਨੁ​ਖਾਇ​॥",
          },
          translation: {
            english: {
              default:
                "One who chants the Naam, the Name of the Lord, and eats the food of the Fear of God",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVw jyhVw mnu`K pRBU dw nwm jpdw hY qy pRBU dy fr-Adb ƒ Awpxy Awqmw dI ^urwk bxWdw hY,",
                unicode:
                  "ਜੇਹੜਾ ਜੇਹੜਾ ਮਨੁੱਖ ਪ੍ਰਭੂ ਦਾ ਨਾਮ ਜਪਦਾ ਹੈ ਤੇ ਪ੍ਰਭੂ ਦੇ ਡਰ-ਅਦਬ ਨੂੰ ਆਪਣੇ ਆਤਮਾ ਦੀ ਖ਼ੁਰਾਕ ਬਣਾਂਦਾ ਹੈ,",
              },
            },
            spanish:
              "Si él contempla el Nombre del Señor, si su mente se alimenta del Fervor del Señor y si sirve a su Dios,",
          },
          transliteration: {
            english: {
              text: "naam japai bhau bhojan khaae |",
              larivaar: "naam​japai​bhau​bhojan​khaae​|",
            },
            devanagari: {
              text: "नामु जपै भउ भोजनु खाइ ॥",
              larivaar: "नामु​जपै​भउ​भोजनु​खाइ​॥",
            },
          },
          linenum: 11,
          firstletters: { akhar: "njBBK", unicode: "ਨਜਭਭਖ" },
        },
      },
      {
        line: {
          id: "DZDV",
          type: 4,
          gurmukhi: {
            akhar: "gurmuiK syvk rhy smwie ]5]",
            unicode: "ਗੁਰਮੁਖਿ ਸੇਵਕ ਰਹੇ ਸਮਾਇ ॥੫॥",
          },
          larivaar: {
            akhar: "gurmuiK​syvk​rhy​smwie​]5]",
            unicode: "ਗੁਰਮੁਖਿ​ਸੇਵਕ​ਰਹੇ​ਸਮਾਇ​॥੫॥",
          },
          translation: {
            english: {
              default:
                "becomes Gurmukh, the Lord's servant, and remains absorbed in the Lord. ||5||",
            },
            punjabi: {
              default: {
                akhar: "auh syvk gurU dI srn pY ky pRBU ivc lIn rihMdy hn ]5]",
                unicode:
                  "ਉਹ ਸੇਵਕ ਗੁਰੂ ਦੀ ਸਰਨ ਪੈ ਕੇ ਪ੍ਰਭੂ ਵਿਚ ਲੀਨ ਰਹਿੰਦੇ ਹਨ ॥੫॥",
              },
            },
            spanish:
              "entonces él, por la Gracia del Guru, se inmerge en Dios. (5)",
          },
          transliteration: {
            english: {
              text: "guramukh sevak rahe samaae |5|",
              larivaar: "guramukh​sevak​rahe​samaae​|5|",
            },
            devanagari: {
              text: "गुरमुखि सेवक रहे समाइ ॥५॥",
              larivaar: "गुरमुखि​सेवक​रहे​समाइ​॥५॥",
            },
          },
          linenum: 11,
          firstletters: { akhar: "gsrs", unicode: "ਗਸਰਸ" },
        },
      },
      {
        line: {
          id: "9M2F",
          type: 4,
          gurmukhi: {
            akhar: "pUij islw qIrQ bn vwsw ]",
            unicode: "ਪੂਜਿ ਸਿਲਾ ਤੀਰਥ ਬਨ ਵਾਸਾ ॥",
          },
          larivaar: {
            akhar: "pUij​islw​qIrQ​bn​vwsw​]",
            unicode: "ਪੂਜਿ​ਸਿਲਾ​ਤੀਰਥ​ਬਨ​ਵਾਸਾ​॥",
          },
          translation: {
            english: {
              default:
                "He worships stones, dwells at sacred shrines of pilgrimage and in the jungles,",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVw mnu`K p`Qr (dIAW mUrqIAW) pUjdw irhw, qIrQW dy ieSnwn krdw irhw, jMglW ivc invws r`Kdw irhw,",
                unicode:
                  "ਜੇਹੜਾ ਮਨੁੱਖ ਪੱਥਰ (ਦੀਆਂ ਮੂਰਤੀਆਂ) ਪੂਜਦਾ ਰਿਹਾ, ਤੀਰਥਾਂ ਦੇ ਇਸ਼ਨਾਨ ਕਰਦਾ ਰਿਹਾ, ਜੰਗਲਾਂ ਵਿਚ ਨਿਵਾਸ ਰੱਖਦਾ ਰਿਹਾ,",
              },
            },
            spanish:
              "Si uno alaba alguna piedra o se va a vivir en los bosques o en los lugares santos,",
          },
          transliteration: {
            english: {
              text: "pooj silaa teerath ban vaasaa |",
              larivaar: "pooj​silaa​teerath​ban​vaasaa​|",
            },
            devanagari: {
              text: "पूजि सिला तीरथ बन वासा ॥",
              larivaar: "पूजि​सिला​तीरथ​बन​वासा​॥",
            },
          },
          linenum: 11,
          firstletters: { akhar: "psqbv", unicode: "ਪਸਤਬਵ" },
        },
      },
      {
        line: {
          id: "E7DA",
          type: 4,
          gurmukhi: {
            akhar: "Brmq folq Bey audwsw ]",
            unicode: "ਭਰਮਤ ਡੋਲਤ ਭਏ ਉਦਾਸਾ ॥",
          },
          larivaar: {
            akhar: "Brmq​folq​Bey​audwsw​]",
            unicode: "ਭਰਮਤ​ਡੋਲਤ​ਭਏ​ਉਦਾਸਾ​॥",
          },
          translation: {
            english: {
              default: "wanders, roams around and becomes a renunciate.",
            },
            punjabi: {
              default: {
                akhar:
                  "iqAwgI bx ky QW QW Btkdw foldw iPirAw (qy iehnW hI krmW ƒ Drm smJdw irhw),",
                unicode:
                  "ਤਿਆਗੀ ਬਣ ਕੇ ਥਾਂ ਥਾਂ ਭਟਕਦਾ ਡੋਲਦਾ ਫਿਰਿਆ (ਤੇ ਇਹਨਾਂ ਹੀ ਕਰਮਾਂ ਨੂੰ ਧਰਮ ਸਮਝਦਾ ਰਿਹਾ),",
              },
            },
            spanish:
              "o vaga sin rumbo pidiendo limosna, volviéndose asceta, eso en sí no lo va a purificar,",
          },
          transliteration: {
            english: {
              text: "bharamat ddolat bhe udaasaa |",
              larivaar: "bharamat​ddolat​bhe​udaasaa​|",
            },
            devanagari: {
              text: "भरमत डोलत भए उदासा ॥",
              larivaar: "भरमत​डोलत​भए​उदासा​॥",
            },
          },
          linenum: 12,
          firstletters: { akhar: "BfBa", unicode: "ਭਡਭੳ" },
        },
      },
      {
        line: {
          id: "64X3",
          type: 4,
          gurmukhi: {
            akhar: "min mYlY sUcw ikau hoie ]",
            unicode: "ਮਨਿ ਮੈਲੈ ਸੂਚਾ ਕਿਉ ਹੋਇ ॥",
          },
          larivaar: {
            akhar: "min​mYlY​sUcw​ikau​hoie​]",
            unicode: "ਮਨਿ​ਮੈਲੈ​ਸੂਚਾ​ਕਿਉ​ਹੋਇ​॥",
          },
          translation: {
            english: {
              default: "But his mind is still filthy - how can he become pure?",
            },
            punjabi: {
              default: {
                akhar:
                  "jy aus dw mn mYlw hI irhw, qW auh pivqR ikvyN ho skdw hY?",
                unicode:
                  "ਜੇ ਉਸ ਦਾ ਮਨ ਮੈਲਾ ਹੀ ਰਿਹਾ, ਤਾਂ ਉਹ ਪਵਿਤ੍ਰ ਕਿਵੇਂ ਹੋ ਸਕਦਾ ਹੈ?",
              },
            },
            spanish: "pues su mente es la que está impura.",
          },
          transliteration: {
            english: {
              text: "man mailai soochaa kiau hoe |",
              larivaar: "man​mailai​soochaa​kiau​hoe​|",
            },
            devanagari: {
              text: "मनि मैलै सूचा किउ होइ ॥",
              larivaar: "मनि​मैलै​सूचा​किउ​होइ​॥",
            },
          },
          linenum: 12,
          firstletters: { akhar: "mmskh", unicode: "ਮਮਸਕਹ" },
        },
      },
      {
        line: {
          id: "6A5F",
          type: 4,
          gurmukhi: {
            akhar: "swic imlY pwvY piq soie ]6]",
            unicode: "ਸਾਚਿ ਮਿਲੈ ਪਾਵੈ ਪਤਿ ਸੋਇ ॥੬॥",
          },
          larivaar: {
            akhar: "swic​imlY​pwvY​piq​soie​]6]",
            unicode: "ਸਾਚਿ​ਮਿਲੈ​ਪਾਵੈ​ਪਤਿ​ਸੋਇ​॥੬॥",
          },
          translation: {
            english: {
              default: "One who meets the True Lord obtains honor. ||6||",
            },
            punjabi: {
              default: {
                akhar:
                  "jyhVw mnu`K sdw-iQr pRBU ivc (ismrn dI rwhIN) lIn huMdw hY (auhI pivqR huMdw hY, qy) auh (lok prlok ivc) ie`zq pWdw hY ]6]",
                unicode:
                  "ਜੇਹੜਾ ਮਨੁੱਖ ਸਦਾ-ਥਿਰ ਪ੍ਰਭੂ ਵਿਚ (ਸਿਮਰਨ ਦੀ ਰਾਹੀਂ) ਲੀਨ ਹੁੰਦਾ ਹੈ (ਉਹੀ ਪਵਿਤ੍ਰ ਹੁੰਦਾ ਹੈ, ਤੇ) ਉਹ (ਲੋਕ ਪਰਲੋਕ ਵਿਚ) ਇੱਜ਼ਤ ਪਾਂਦਾ ਹੈ ॥੬॥",
              },
            },
            spanish:
              "Pero si uno recibe la Verdad, uno logra rescatar su honor. (6)",
          },
          transliteration: {
            english: {
              text: "saach milai paavai pat soe |6|",
              larivaar: "saach​milai​paavai​pat​soe​|6|",
            },
            devanagari: {
              text: "साचि मिलै पावै पति सोइ ॥६॥",
              larivaar: "साचि​मिलै​पावै​पति​सोइ​॥६॥",
            },
          },
          linenum: 12,
          firstletters: { akhar: "smpps", unicode: "ਸਮਪਪਸ" },
        },
      },
      {
        line: {
          id: "BW3D",
          type: 4,
          gurmukhi: {
            akhar: "Awcwrw vIcwru srIir ]",
            unicode: "ਆਚਾਰਾ ਵੀਚਾਰੁ ਸਰੀਰਿ ॥",
          },
          larivaar: {
            akhar: "Awcwrw​vIcwru​srIir​]",
            unicode: "ਆਚਾਰਾ​ਵੀਚਾਰੁ​ਸਰੀਰਿ​॥",
          },
          translation: {
            english: {
              default:
                "One who embodies good conduct and contemplative meditation,",
            },
            punjabi: {
              default: {
                akhar:
                  "ijs dy AMdr au`cw Awcrn BI hY qy au`cI (Awqmk) sUJ BI hY,",
                unicode:
                  "ਜਿਸ ਦੇ ਅੰਦਰ ਉੱਚਾ ਆਚਰਨ ਭੀ ਹੈ ਤੇ ਉੱਚੀ (ਆਤਮਕ) ਸੂਝ ਭੀ ਹੈ,",
              },
            },
            spanish:
              "Hacia Aquél que tiene la Conducta Correcta y Sabiduría en su interior.",
          },
          transliteration: {
            english: {
              text: "aachaaraa veechaar sareer |",
              larivaar: "aachaaraa​veechaar​sareer​|",
            },
            devanagari: {
              text: "आचारा वीचारु सरीरि ॥",
              larivaar: "आचारा​वीचारु​सरीरि​॥",
            },
          },
          linenum: 13,
          firstletters: { akhar: "Avs", unicode: "ਅਵਸ" },
        },
      },
      {
        line: {
          id: "6FZC",
          type: 4,
          gurmukhi: {
            akhar: "Awid jugwid shij mnu DIir ]",
            unicode: "ਆਦਿ ਜੁਗਾਦਿ ਸਹਜਿ ਮਨੁ ਧੀਰਿ ॥",
          },
          larivaar: {
            akhar: "Awid​jugwid​shij​mnu​DIir​]",
            unicode: "ਆਦਿ​ਜੁਗਾਦਿ​ਸਹਜਿ​ਮਨੁ​ਧੀਰਿ​॥",
          },
          translation: {
            english: {
              default:
                "his mind abides in intuitive poise and contentment, since the beginning of time, and throughout the ages.",
            },
            punjabi: {
              default: {
                akhar:
                  "ijs dw mn sdw hI Afol AvsQw ivc itikAw rihMdw hY qy gMBIr rihMdw hY,",
                unicode:
                  "ਜਿਸ ਦਾ ਮਨ ਸਦਾ ਹੀ ਅਡੋਲ ਅਵਸਥਾ ਵਿਚ ਟਿਕਿਆ ਰਹਿੰਦਾ ਹੈ ਤੇ ਗੰਭੀਰ ਰਹਿੰਦਾ ਹੈ,",
              },
            },
            spanish: "Hacia Aquél que habita desde el principio de los tiempos",
          },
          transliteration: {
            english: {
              text: "aad jugaad sehaj man dheer |",
              larivaar: "aad​jugaad​sehaj​man​dheer​|",
            },
            devanagari: {
              text: "आदि जुगादि सहजि मनु धीरि ॥",
              larivaar: "आदि​जुगादि​सहजि​मनु​धीरि​॥",
            },
          },
          linenum: 13,
          firstletters: { akhar: "AjsmD", unicode: "ਅਜਸਮਧ" },
        },
      },
      {
        line: {
          id: "B3YS",
          type: 4,
          gurmukhi: {
            akhar: "pl pMkj mih koit auDwry ]",
            unicode: "ਪਲ ਪੰਕਜ ਮਹਿ ਕੋਟਿ ਉਧਾਰੇ ॥",
          },
          larivaar: {
            akhar: "pl​pMkj​mih​koit​auDwry​]",
            unicode: "ਪਲ​ਪੰਕਜ​ਮਹਿ​ਕੋਟਿ​ਉਧਾਰੇ​॥",
          },
          translation: {
            english: {
              default: "In the twinkling of an eye, he saves millions.",
            },
            punjabi: {
              default: {
                akhar:
                  "jo A`K Jmkx dy smy ivc k®oVW bMidAW ƒ (ivkwrW qoN) bcw lYNdw hY,",
                unicode:
                  "ਜੋ ਅੱਖ ਝਮਕਣ ਦੇ ਸਮੇ ਵਿਚ ਕ੍ਰੋੜਾਂ ਬੰਦਿਆਂ ਨੂੰ (ਵਿਕਾਰਾਂ ਤੋਂ) ਬਚਾ ਲੈਂਦਾ ਹੈ,",
              },
            },
            spanish:
              "en toda Paz y Contentamiento, y a Quien en un parpadeo de Su Mirada Maravillosa,",
          },
          transliteration: {
            english: {
              text: "pal pankaj meh kott udhaare |",
              larivaar: "pal​pankaj​meh​kott​udhaare​|",
            },
            devanagari: {
              text: "पल पंकज महि कोटि उधारे ॥",
              larivaar: "पल​पंकज​महि​कोटि​उधारे​॥",
            },
          },
          linenum: 13,
          firstletters: { akhar: "ppmka", unicode: "ਪਪਮਕੳ" },
        },
      },
      {
        line: {
          id: "KKNY",
          type: 4,
          gurmukhi: {
            akhar: "kir ikrpw guru myil ipAwry ]7]",
            unicode: "ਕਰਿ ਕਿਰਪਾ ਗੁਰੁ ਮੇਲਿ ਪਿਆਰੇ ॥੭॥",
          },
          larivaar: {
            akhar: "kir​ikrpw​guru​myil​ipAwry​]7]",
            unicode: "ਕਰਿ​ਕਿਰਪਾ​ਗੁਰੁ​ਮੇਲਿ​ਪਿਆਰੇ​॥੭॥",
          },
          translation: {
            english: {
              default:
                "Have mercy on me, O my Beloved, and let me meet the Guru. ||7||",
            },
            punjabi: {
              default: {
                akhar: "hy ipAwry pRBU! myhr kr ky mYƒ auh gurU imlw ]7]",
                unicode: "ਹੇ ਪਿਆਰੇ ਪ੍ਰਭੂ! ਮੇਹਰ ਕਰ ਕੇ ਮੈਨੂੰ ਉਹ ਗੁਰੂ ਮਿਲਾ ॥੭॥",
              },
            },
            spanish:
              "salva a millones de almas, oh Amor, guíame, guíame hasta tal Guru por Misericordia. (7)",
          },
          transliteration: {
            english: {
              text: "kar kirapaa gur mel piaare |7|",
              larivaar: "kar​kirapaa​gur​mel​piaare​|7|",
            },
            devanagari: {
              text: "करि किरपा गुरु मेलि पिआरे ॥७॥",
              larivaar: "करि​किरपा​गुरु​मेलि​पिआरे​॥७॥",
            },
          },
          linenum: 14,
          firstletters: { akhar: "kkgmp", unicode: "ਕਕਗਮਪ" },
        },
      },
      {
        line: {
          id: "3CRL",
          type: 4,
          gurmukhi: {
            akhar: "iksu AwgY pRB quDu swlwhI ]",
            unicode: "ਕਿਸੁ ਆਗੈ ਪ੍ਰਭ ਤੁਧੁ ਸਾਲਾਹੀ ॥",
          },
          larivaar: {
            akhar: "iksu​AwgY​pRB​quDu​swlwhI​]",
            unicode: "ਕਿਸੁ​ਆਗੈ​ਪ੍ਰਭ​ਤੁਧੁ​ਸਾਲਾਹੀ​॥",
          },
          translation: {
            english: { default: "Unto whom, O God, should I praise You?" },
            punjabi: {
              default: {
                akhar: "hy pRBU! mYN iks bMdy A`gy qyrI is&q-swlwh krW?",
                unicode: "ਹੇ ਪ੍ਰਭੂ! ਮੈਂ ਕਿਸ ਬੰਦੇ ਅੱਗੇ ਤੇਰੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਕਰਾਂ?",
              },
            },
            spanish: "Oh Dios, ¿a quién voy a alabar,",
          },
          transliteration: {
            english: {
              text: "kis aagai prabh tudh saalaahee |",
              larivaar: "kis​aagai​prabh​tudh​saalaahee​|",
            },
            devanagari: {
              text: "किसु आगै प्रभ तुधु सालाही ॥",
              larivaar: "किसु​आगै​प्रभ​तुधु​सालाही​॥",
            },
          },
          linenum: 14,
          firstletters: { akhar: "kApqs", unicode: "ਕਅਪਤਸ" },
        },
      },
      {
        line: {
          id: "01NE",
          type: 4,
          gurmukhi: {
            akhar: "quDu ibnu dUjw mY ko nwhI ]",
            unicode: "ਤੁਧੁ ਬਿਨੁ ਦੂਜਾ ਮੈ ਕੋ ਨਾਹੀ ॥",
          },
          larivaar: {
            akhar: "quDu​ibnu​dUjw​mY​ko​nwhI​]",
            unicode: "ਤੁਧੁ​ਬਿਨੁ​ਦੂਜਾ​ਮੈ​ਕੋ​ਨਾਹੀ​॥",
          },
          translation: {
            english: { default: "Without You, there is no other at all." },
            punjabi: {
              default: {
                akhar: "mYƒ qW qYQoN ibnw hor koeI ikqy id`sdw hI nhIN[",
                unicode: "ਮੈਨੂੰ ਤਾਂ ਤੈਥੋਂ ਬਿਨਾ ਹੋਰ ਕੋਈ ਕਿਤੇ ਦਿੱਸਦਾ ਹੀ ਨਹੀਂ।",
              },
            },
            spanish: "cuando no hay nadie más que Tú?",
          },
          transliteration: {
            english: {
              text: "tudh bin doojaa mai ko naahee |",
              larivaar: "tudh​bin​doojaa​mai​ko​naahee​|",
            },
            devanagari: {
              text: "तुधु बिनु दूजा मै को नाही ॥",
              larivaar: "तुधु​बिनु​दूजा​मै​को​नाही​॥",
            },
          },
          linenum: 14,
          firstletters: { akhar: "qbdmkn", unicode: "ਤਬਦਮਕਨ" },
        },
      },
      {
        line: {
          id: "9Q1V",
          type: 4,
          gurmukhi: {
            akhar: "ijau quDu BwvY iqau rwKu rjwie ]",
            unicode: "ਜਿਉ ਤੁਧੁ ਭਾਵੈ ਤਿਉ ਰਾਖੁ ਰਜਾਇ ॥",
          },
          larivaar: {
            akhar: "ijau​quDu​BwvY​iqau​rwKu​rjwie​]",
            unicode: "ਜਿਉ​ਤੁਧੁ​ਭਾਵੈ​ਤਿਉ​ਰਾਖੁ​ਰਜਾਇ​॥",
          },
          translation: {
            english: { default: "As it pleases You, keep me under Your Will." },
            punjabi: {
              default: {
                akhar: "ijvyN qyrI myhr hovy mYƒ AwpxI rzw ivc r`K,",
                unicode: "ਜਿਵੇਂ ਤੇਰੀ ਮੇਹਰ ਹੋਵੇ ਮੈਨੂੰ ਆਪਣੀ ਰਜ਼ਾ ਵਿਚ ਰੱਖ,",
              },
            },
            spanish: "Consérvame, oh Señor, así como es Tu Voluntad,",
          },
          transliteration: {
            english: {
              text: "jiau tudh bhaavai tiau raakh rajaae |",
              larivaar: "jiau​tudh​bhaavai​tiau​raakh​rajaae​|",
            },
            devanagari: {
              text: "जिउ तुधु भावै तिउ राखु रजाइ ॥",
              larivaar: "जिउ​तुधु​भावै​तिउ​राखु​रजाइ​॥",
            },
          },
          linenum: 14,
          firstletters: { akhar: "jqBqrr", unicode: "ਜਤਭਤਰਰ" },
        },
      },
      {
        line: {
          id: "NGPV",
          type: 4,
          gurmukhi: {
            akhar: "nwnk shij Bwie gux gwie ]8]2]",
            unicode: "ਨਾਨਕ ਸਹਜਿ ਭਾਇ ਗੁਣ ਗਾਇ ॥੮॥੨॥",
          },
          larivaar: {
            akhar: "nwnk​shij​Bwie​gux​gwie​]8]2]",
            unicode: "ਨਾਨਕ​ਸਹਜਿ​ਭਾਇ​ਗੁਣ​ਗਾਇ​॥੮॥੨॥",
          },
          translation: {
            english: {
              default:
                "Nanak, with intuitive poise and natural love, sings Your Glorious Praises. ||8||2||",
            },
            punjabi: {
              default: {
                akhar:
                  "nwnk AwKdw hY- (hy pRBU! qyrw dws) Afol Awqmk AvsQw ivc itk ky qyry pRym ivc itk ky qyry gux gwvy ]8]2]",
                unicode:
                  "ਨਾਨਕ ਆਖਦਾ ਹੈ- (ਹੇ ਪ੍ਰਭੂ! ਤੇਰਾ ਦਾਸ) ਅਡੋਲ ਆਤਮਕ ਅਵਸਥਾ ਵਿਚ ਟਿਕ ਕੇ ਤੇਰੇ ਪ੍ਰੇਮ ਵਿਚ ਟਿਕ ਕੇ ਤੇਰੇ ਗੁਣ ਗਾਵੇ ॥੮॥੨॥",
              },
            },
            spanish:
              "para que pueda yo entonar Tu Alabanza de manera espontánea. (8-2",
          },
          transliteration: {
            english: {
              text: "naanak sehaj bhaae gun gaae |8|2|",
              larivaar: "naanak​sehaj​bhaae​gun​gaae​|8|2|",
            },
            devanagari: {
              text: "नानक सहजि भाइ गुण गाइ ॥८॥२॥",
              larivaar: "नानक​सहजि​भाइ​गुण​गाइ​॥८॥२॥",
            },
          },
          linenum: 15,
          firstletters: { akhar: "nsBgg", unicode: "ਨਸਭਗਗ" },
        },
      },
    ],
    error: false,
  };
  const [arthVisible, setArthVisible] = useState(true);
  const [fetchedHukamState, setHukamnamaState] = useState("");
  //    [fetchedHukamState, setHukamnamaState] = useState(defaultHukamNama);
  const fetchHukam = async () => {
    // console.log("clicked fetchHukam ");
    // console.log("fetching Hukamnama sahib...");

    try {
      const response = await axios.get(
        "https://api.gurbaninow.com/v2/hukamnama/today"
      );

      setHukamnamaState(response.data);
      //   console.log("Hukamnama fetched successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHukam();
  }, []);

  return (
    <>
      {fetchedHukamState ? (
        <section className="m-4 flex flex-col rounded-xl border p-4 text-xs">
          <div className="flex items-center justify-between">
            {/* <span>{fetchedHukamState.hukamnamainfo.source.unicode}</span> */}

            <div className="flex flex-col items-start">
              <span>{fetchedHukamState.hukamnamainfo.source.unicode}</span>
              <span className="pt-1 opacity-40">
                {fetchedHukamState.date.nanakshahi.punjabi.month},{" "}
                {`${fetchedHukamState.date.nanakshahi.punjabi.date}/${fetchedHukamState.date.nanakshahi.punjabi.monthno}/${fetchedHukamState.date.nanakshahi.punjabi.year}`}
              </span>
            </div>
            <div className="my-2 flex flex-col items-center gap-1">
              {" "}
              <span>
                {" "}
                ਰਾਗੁ : #{fetchedHukamState.hukamnamainfo.raag.id} -{" "}
                {fetchedHukamState.hukamnamainfo.raag.unicode}
              </span>
              <span>
                ਅੰਗ: {fetchedHukamState.hukamnamainfo.raag.startang} -{" "}
                {fetchedHukamState.hukamnamainfo.raag.endang}
              </span>
            </div>
            <span className="flex flex-col items-end gap-1">
              {fetchedHukamState.hukamnamainfo.source.pageName.unicode}:{" "}
              {fetchedHukamState.hukamnamainfo.pageno}
              <Switch onClick={() => setArthVisible((prev) => !prev)} />
            </span>
          </div>
          <hr className="mx-auto my-3 w-full" />

          <section className="flex justify-end">
            <ScrollArea className="h-[200px] w-[100%] rounded-md">
              <div className="">
                {fetchedHukamState.hukamnama.map((objectItem, idx) => (
                  <div key={idx} className="mb-2 flex flex-col">
                    <span className="text-primary text-sm">
                      {objectItem.line.gurmukhi.unicode}
                    </span>
                    {arthVisible ? (
                      <span className="italic opacity-30">
                        {objectItem.line.translation.english.default}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
          {/* <Button onClick={fetchHukam}>Button</Button> */}
        </section>
      ) : (
        <div>Loading hukamnama...</div>
      )}
    </>
  );
};

export default DailyHukamnama;

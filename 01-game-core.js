
function avgValue(st){return Math.round(Object.values(st||{}).reduce((a,b)=>a+b,0)/6)}
const defaults={appearance:{skin:"#c98e68",eye:"#3b2418",hair:"#17171b",hairStyle:0,brow:0,ear:0,beard:1},name:"Fateh",nick:"The Storm",country:"Azərbaycan",weight:"Lightweight",height:178,injury:null,prospects:[],age:22,wins:0,losses:0,draws:0,cash:25000,rating:50,rank:0,careerLevel:"Amatör",nextFightWeek:1,belt:false,stats:{striking:42,wrestling:40,defense:42,stamina:44,speed:43,grappling:39},history:[],lastFight:null,day:1,week:1,accepted:false,energy:100,sponsors:[],championshipWins:0,achievements:[],offers:0,eventNumber:334,calendarDate:"2026-11-13",amateurWins:0,regionalWins:0,proWins:0};
let gameSettings={lang:"az",musicVolume:100,difficulty:"normal",trashTalkRate:"medium",fightSpeed:"normal"};
try{gameSettings={...gameSettings,...JSON.parse(localStorage.getItem("ufcLegendsSettings")||"{}")}}catch(e){}
let s;try{s={...defaults,...JSON.parse(localStorage.getItem("ufcLegendsSaveV6")||"{}")};s.stats={...defaults.stats,...(s.stats||{})};s.appearance={...defaults.appearance,...(s.appearance||{})};s.history=s.history||[];s.week=s.week||1;s.achievements=s.achievements||[];s.rank=s.rank??0;s.careerLevel=s.careerLevel||"Amatör";s.nextFightWeek=s.nextFightWeek||1;
s.eventNumber=s.eventNumber||334;s.calendarDate=s.calendarDate||"2026-11-13";
s.amateurWins=s.amateurWins??0;s.regionalWins=s.regionalWins??0;s.proWins=s.proWins??0;s.energy=Math.max(0,Math.min(100,s.energy??100));s.sponsors=Array.isArray(s.sponsors)?s.sponsors:[];
if((s.wins+s.losses+s.draws)===0 && s.careerLevel==="Amatör" && avgValue(s.stats)>60)s.stats={striking:42,wrestling:40,defense:42,stamina:44,speed:43,grappling:39};
}catch(e){s=structuredClone(defaults)}
let opponent=null; let lastOpponentName=""; let rankingsCache={};
const freshCareer=!localStorage.getItem("ufcLegendsSaveV6");
function save(){localStorage.setItem("ufcLegendsSaveV6",JSON.stringify(s));render()}
function avg(){return Math.round(Object.values(s.stats).reduce((a,b)=>a+b,0)/6)}
function money(n){return "$"+Math.round(n).toLocaleString("en-US")}

const divisionRankings={
 "Flyweight":{champion:"Joshua Van",fighters:["Manel Kape", "Alexandre Pantoja", "Brandon Royval", "Tatsuro Taira", "Asu Almabayev", "Lone'er Kavanagh", "Ramazan Temirov", "Kyoji Horiguchi", "Amir Albazi", "Brandon Moreno", "Sumudaerji", "Mitch Raposo", "Imanol Rodriguez", "Rei Tsuruya", "Charles Johnson"]},
 "Bantamweight":{champion:"Petr Yan",fighters:["Merab Dvalishvili", "Sean O'Malley", "Song Yadong", "Umar Nurmagomedov", "Mario Bautista", "Cory Sandhagen", "Payton Talbott", "David Martinez", "Aiemann Zahabi", "Raul Rosas Jr.", "Marlon Vera", "Deiveson Figueiredo", "Marcus McGhee", "Raoni Barcelos", "Bryce Mitchell"]},
 "Featherweight":{champion:"Alexander Volkanovski",fighters:["Movsar Evloev", "Diego Lopes", "Lerone Murphy", "Aljamain Sterling", "Jean Silva", "Arnold Allen", "Pat Sabatini", "Pavel Andrusca", "Youssef Zalal", "Aaron Pico", "Kevin Vallejos", "Joanderson Brito", "Melquizael Costa", "Steve Garcia", "Jamall Emmers"]},
 "Lightweight":{champion:"Justin Gaethje",fighters:["Ilia Topuria", "Arman Tsarukyan", "Charles Oliveira", "Max Holloway", "Paddy Pimblett", "Benoît Saint Denis", "Quillan Salkilld", "Mauricio Ruffy", "Salahdine Parnasse", "Mateusz Gamrot", "Rafael Fiziev", "Renato Moicano", "Dan Hooker", "Tom Nolan", "Beneil Dariush"]},
 "Welterweight":{champion:"Islam Makhachev",fighters:["Carlos Prates", "Ian Machado Garry", "Michael Morales", "Jack Della Maddalena", "Sean Brady", "Gabriel Bonfim", "Belal Muhammad", "Mike Malott", "Uroš Medić", "Leon Edwards", "Kamaru Usman", "Joaquin Buckley", "Yaroslav Amosov", "Jacobe Smith", "Kevin Holland"]},
 "Middleweight":{champion:"Sean Strickland",fighters:["Khamzat Chimaev", "Dricus Du Plessis", "Nassourdine Imavov", "Brendan Allen", "Joe Pyfer", "Caio Borralho", "Gregory Rodrigues", "Anthony Hernandez", "Abus Magomedov", "Israel Adesanya", "Ikram Aliskerov", "Christian Leroy Duncan", "Bo Nickal", "Roman Kopylov", "Edmen Shahbazyan"]},
 "Light Heavyweight":{champion:"Carlos Ulberg",fighters:["Alex Pereira", "Magomed Ankalaev", "Jiří Procházka", "Dominick Reyes", "Paulo Costa", "Khalil Rountree Jr.", "Navajo Stirling", "Reinier de Ridder", "Alonzo Menifield", "Bogdan Guskov", "Robert Whittaker", "Muhammad Saidov", "Abdul Rakhman Yakhyaev", "Azamat Murzakanov", "Modestas Bukauskas"]},
 "Heavyweight":{champion:"Ciryl Gane",fighters:["Tom Aspinall", "Alexander Volkov", "Alex Pereira", "Sergei Pavlovich", "Josh Hokit", "Curtis Blaydes", "Rizvan Kuniev", "Waldo Cortes-Acosta", "Vitor Petrino", "Mario Pinto", "Valter Walker", "Johnny Walker", "Brando Pericic", "Serghei Spivac", "Anthony Wint"]},
};
const divisionPools={
 "Flyweight":[["Joshua Van", 0, 0, 99], ["Manel Kape", 0, 0, 95], ["Alexandre Pantoja", 0, 0, 93], ["Brandon Royval", 0, 0, 91], ["Tatsuro Taira", 0, 0, 89], ["Asu Almabayev", 0, 0, 87], ["Lone'er Kavanagh", 0, 0, 85], ["Ramazan Temirov", 0, 0, 83], ["Kyoji Horiguchi", 0, 0, 81], ["Amir Albazi", 0, 0, 79], ["Brandon Moreno", 0, 0, 77], ["Sumudaerji", 0, 0, 75], ["Mitch Raposo", 0, 0, 73], ["Imanol Rodriguez", 0, 0, 71], ["Rei Tsuruya", 0, 0, 69], ["Charles Johnson", 0, 0, 67]],
 "Bantamweight":[["Petr Yan", 0, 0, 99], ["Merab Dvalishvili", 0, 0, 95], ["Sean O'Malley", 0, 0, 93], ["Song Yadong", 0, 0, 91], ["Umar Nurmagomedov", 0, 0, 89], ["Mario Bautista", 0, 0, 87], ["Cory Sandhagen", 0, 0, 85], ["Payton Talbott", 0, 0, 83], ["David Martinez", 0, 0, 81], ["Aiemann Zahabi", 0, 0, 79], ["Raul Rosas Jr.", 0, 0, 77], ["Marlon Vera", 0, 0, 75], ["Deiveson Figueiredo", 0, 0, 73], ["Marcus McGhee", 0, 0, 71], ["Raoni Barcelos", 0, 0, 69], ["Bryce Mitchell", 0, 0, 67]],
 "Featherweight":[["Alexander Volkanovski", 0, 0, 99], ["Movsar Evloev", 0, 0, 95], ["Diego Lopes", 0, 0, 93], ["Lerone Murphy", 0, 0, 91], ["Aljamain Sterling", 0, 0, 89], ["Jean Silva", 0, 0, 87], ["Arnold Allen", 0, 0, 85], ["Pat Sabatini", 0, 0, 83], ["Pavel Andrusca", 0, 0, 81], ["Youssef Zalal", 0, 0, 79], ["Aaron Pico", 0, 0, 77], ["Kevin Vallejos", 0, 0, 75], ["Joanderson Brito", 0, 0, 73], ["Melquizael Costa", 0, 0, 71], ["Steve Garcia", 0, 0, 69], ["Jamall Emmers", 0, 0, 67]],
 "Lightweight":[["Justin Gaethje", 0, 0, 99], ["Ilia Topuria", 0, 0, 95], ["Arman Tsarukyan", 0, 0, 93], ["Charles Oliveira", 0, 0, 91], ["Max Holloway", 0, 0, 89], ["Paddy Pimblett", 0, 0, 87], ["Benoît Saint Denis", 0, 0, 85], ["Quillan Salkilld", 0, 0, 83], ["Mauricio Ruffy", 0, 0, 81], ["Salahdine Parnasse", 0, 0, 79], ["Mateusz Gamrot", 0, 0, 77], ["Rafael Fiziev", 0, 0, 75], ["Renato Moicano", 0, 0, 73], ["Dan Hooker", 0, 0, 71], ["Tom Nolan", 0, 0, 69], ["Beneil Dariush", 0, 0, 67]],
 "Welterweight":[["Islam Makhachev", 0, 0, 99], ["Carlos Prates", 0, 0, 95], ["Ian Machado Garry", 0, 0, 93], ["Michael Morales", 0, 0, 91], ["Jack Della Maddalena", 0, 0, 89], ["Sean Brady", 0, 0, 87], ["Gabriel Bonfim", 0, 0, 85], ["Belal Muhammad", 0, 0, 83], ["Mike Malott", 0, 0, 81], ["Uroš Medić", 0, 0, 79], ["Leon Edwards", 0, 0, 77], ["Kamaru Usman", 0, 0, 75], ["Joaquin Buckley", 0, 0, 73], ["Yaroslav Amosov", 0, 0, 71], ["Jacobe Smith", 0, 0, 69], ["Kevin Holland", 0, 0, 67]],
 "Middleweight":[["Sean Strickland", 0, 0, 99], ["Khamzat Chimaev", 0, 0, 95], ["Dricus Du Plessis", 0, 0, 93], ["Nassourdine Imavov", 0, 0, 91], ["Brendan Allen", 0, 0, 89], ["Joe Pyfer", 0, 0, 87], ["Caio Borralho", 0, 0, 85], ["Gregory Rodrigues", 0, 0, 83], ["Anthony Hernandez", 0, 0, 81], ["Abus Magomedov", 0, 0, 79], ["Israel Adesanya", 0, 0, 77], ["Ikram Aliskerov", 0, 0, 75], ["Christian Leroy Duncan", 0, 0, 73], ["Bo Nickal", 0, 0, 71], ["Roman Kopylov", 0, 0, 69], ["Edmen Shahbazyan", 0, 0, 67]],
 "Light Heavyweight":[["Carlos Ulberg", 0, 0, 99], ["Alex Pereira", 0, 0, 95], ["Magomed Ankalaev", 0, 0, 93], ["Jiří Procházka", 0, 0, 91], ["Dominick Reyes", 0, 0, 89], ["Paulo Costa", 0, 0, 87], ["Khalil Rountree Jr.", 0, 0, 85], ["Navajo Stirling", 0, 0, 83], ["Reinier de Ridder", 0, 0, 81], ["Alonzo Menifield", 0, 0, 79], ["Bogdan Guskov", 0, 0, 77], ["Robert Whittaker", 0, 0, 75], ["Muhammad Saidov", 0, 0, 73], ["Abdul Rakhman Yakhyaev", 0, 0, 71], ["Azamat Murzakanov", 0, 0, 69], ["Modestas Bukauskas", 0, 0, 67]],
 "Heavyweight":[["Ciryl Gane", 0, 0, 99], ["Tom Aspinall", 0, 0, 95], ["Alexander Volkov", 0, 0, 93], ["Alex Pereira", 0, 0, 91], ["Sergei Pavlovich", 0, 0, 89], ["Josh Hokit", 0, 0, 87], ["Curtis Blaydes", 0, 0, 85], ["Rizvan Kuniev", 0, 0, 83], ["Waldo Cortes-Acosta", 0, 0, 81], ["Vitor Petrino", 0, 0, 79], ["Mario Pinto", 0, 0, 77], ["Valter Walker", 0, 0, 75], ["Johnny Walker", 0, 0, 73], ["Brando Pericic", 0, 0, 71], ["Serghei Spivac", 0, 0, 69], ["Anthony Wint", 0, 0, 67]],
};
const fighterCountries={"Joshua Van":"ABŞ","Manel Kape":"Anqola","Alexandre Pantoja":"Braziliya","Brandon Royval":"ABŞ","Tatsuro Taira":"Yaponiya","Asu Almabayev":"Qazaxıstan","Lone'er Kavanagh":"Böyük Britaniya","Ramazan Temirov":"Özbəkistan","Kyoji Horiguchi":"Yaponiya","Amir Albazi":"İraq","Brandon Moreno":"Meksika","Sumudaerji":"Çin","Mitch Raposo":"ABŞ","Imanol Rodriguez":"Meksika","Rei Tsuruya":"Yaponiya","Charles Johnson":"ABŞ","Petr Yan":"Rusiya","Merab Dvalishvili":"Gürcüstan","Sean O'Malley":"ABŞ","Song Yadong":"Çin","Umar Nurmagomedov":"Rusiya","Mario Bautista":"ABŞ","Cory Sandhagen":"ABŞ","Payton Talbott":"ABŞ","David Martinez":"Meksika","Aiemann Zahabi":"Kanada","Raul Rosas Jr.":"Meksika","Marlon Vera":"Ekvador","Deiveson Figueiredo":"Braziliya","Marcus McGhee":"ABŞ","Raoni Barcelos":"Braziliya","Bryce Mitchell":"ABŞ","Alexander Volkanovski":"Avstraliya","Movsar Evloev":"Rusiya","Diego Lopes":"Braziliya","Lerone Murphy":"Böyük Britaniya","Aljamain Sterling":"ABŞ","Jean Silva":"Braziliya","Arnold Allen":"Böyük Britaniya","Pat Sabatini":"ABŞ","Pavel Andrusca":"Moldova","Youssef Zalal":"Mərakeş","Aaron Pico":"ABŞ","Kevin Vallejos":"Argentina","Joanderson Brito":"Braziliya","Melquizael Costa":"Braziliya","Steve Garcia":"ABŞ","Jamall Emmers":"ABŞ","Justin Gaethje":"ABŞ","Ilia Topuria":"Gürcüstan / İspaniya","Arman Tsarukyan":"Ermənistan","Charles Oliveira":"Braziliya","Max Holloway":"ABŞ","Paddy Pimblett":"Böyük Britaniya","Benoît Saint Denis":"Fransa","Quillan Salkilld":"Avstraliya","Mauricio Ruffy":"Braziliya","Salahdine Parnasse":"Fransa","Mateusz Gamrot":"Polşa","Rafael Fiziev":"Qırğızıstan","Renato Moicano":"Braziliya","Dan Hooker":"Yeni Zelandiya","Tom Nolan":"Avstraliya","Beneil Dariush":"ABŞ","Islam Makhachev":"Rusiya","Carlos Prates":"Braziliya","Ian Machado Garry":"İrlandiya","Michael Morales":"Ekvador","Jack Della Maddalena":"Avstraliya","Sean Brady":"ABŞ","Gabriel Bonfim":"Braziliya","Belal Muhammad":"ABŞ","Mike Malott":"Kanada","Uroš Medić":"Serbiya","Leon Edwards":"Böyük Britaniya","Kamaru Usman":"Nigeriya / ABŞ","Joaquin Buckley":"ABŞ","Yaroslav Amosov":"Ukrayna","Jacobe Smith":"ABŞ","Kevin Holland":"ABŞ","Sean Strickland":"ABŞ","Khamzat Chimaev":"BƏƏ","Dricus Du Plessis":"Cənubi Afrika","Nassourdine Imavov":"Fransa","Brendan Allen":"ABŞ","Joe Pyfer":"ABŞ","Caio Borralho":"Braziliya","Gregory Rodrigues":"Braziliya","Anthony Hernandez":"ABŞ","Abus Magomedov":"Almaniya","Israel Adesanya":"Nigeriya / Yeni Zelandiya","Ikram Aliskerov":"Rusiya","Christian Leroy Duncan":"Böyük Britaniya","Bo Nickal":"ABŞ","Roman Kopylov":"Rusiya","Edmen Shahbazyan":"ABŞ","Carlos Ulberg":"Yeni Zelandiya","Alex Pereira":"Braziliya","Magomed Ankalaev":"Rusiya","Jiří Procházka":"Çexiya","Dominick Reyes":"ABŞ","Paulo Costa":"Braziliya","Khalil Rountree Jr.":"ABŞ","Navajo Stirling":"Yeni Zelandiya","Reinier de Ridder":"Niderland","Alonzo Menifield":"ABŞ","Bogdan Guskov":"Özbəkistan","Robert Whittaker":"Avstraliya","Muhammad Saidov":"Tacikistan","Abdul Rakhman Yakhyaev":"Rusiya","Azamat Murzakanov":"Rusiya","Modestas Bukauskas":"Litva","Ciryl Gane":"Fransa","Tom Aspinall":"Böyük Britaniya","Alexander Volkov":"Rusiya","Sergei Pavlovich":"Rusiya","Josh Hokit":"ABŞ","Curtis Blaydes":"ABŞ","Rizvan Kuniev":"Rusiya","Waldo Cortes-Acosta":"Dominikan Respublikası","Vitor Petrino":"Braziliya","Mario Pinto":"Portuqaliya","Valter Walker":"Braziliya","Johnny Walker":"Braziliya","Brando Pericic":"Avstraliya","Serghei Spivac":"Moldova","Anthony Wint":"Yamayka"};
function faceSvg(name,seed=1,custom=null){
 const h=[...name].reduce((a,c)=>a+c.charCodeAt(0),seed*17);
 const skin=(custom&&custom.skin)||["#e7b995","#c98e68","#f0c9a5","#986448","#d9a27e","#b87958"][h%6];
 const hair=(custom&&custom.hair)||["#17171b","#38251d","#5a4435","#252b35","#111318"][Math.floor(h/3)%5];
 const eye=(custom&&custom.eye)||"#17191f";
 const style=custom?.hairStyle??(h%4), brow=custom?.brow??(h%3), ear=custom?.ear??0, beard=custom?.beard??(h%3!==0);
 const shirt=["#9d2431","#263c60","#354d43","#3d344f","#343943"][Math.floor(h/7)%5];
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
 <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#69758a"/><stop offset=".55" stop-color="#30394b"/><stop offset="1" stop-color="#101520"/></linearGradient>
 <linearGradient id="face" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff" stop-opacity=".23"/><stop offset=".45" stop-color="${skin}"/><stop offset="1" stop-color="#56382f" stop-opacity=".5"/></linearGradient>
 <linearGradient id="shirtg" x2="0" y2="1"><stop stop-color="${shirt}"/><stop offset="1" stop-color="#10131c"/></linearGradient>
 <radialGradient id="spot"><stop stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
 <rect width="120" height="120" fill="url(#bg)"/><circle cx="23" cy="18" r="62" fill="url(#spot)"/>
 <path d="M8 120Q13 91 37 84L60 101 83 84Q108 90 114 120Z" fill="url(#shirtg)"/>
 <path d="M44 77h32l7 16-23 19-23-19z" fill="${skin}"/>
 <path d="M31 42Q27 10 60 8Q94 9 90 48L85 70Q78 88 60 91Q41 87 35 69Z" fill="url(#face)"/>
 ${style===0?`<path d="M31 45Q24 8 59 7Q91 7 91 43L84 29Q68 34 52 28Q42 34 34 30Z" fill="${hair}"/>`:style===1?`<path d="M30 46Q23 4 61 6Q98 8 91 47L82 27Q61 35 35 29Z" fill="${hair}"/>`:style===2?`<path d="M31 45Q26 18 44 10Q71 -1 90 23L88 43Q68 30 50 31L34 39Z" fill="${hair}"/>`:`<path d="M31 45Q28 13 60 8Q90 12 90 45L84 28Q61 38 34 30Z" fill="${hair}"/>`}
 <path d="M35 40Q39 26 52 24M85 40Q80 25 68 24" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
 <path d="M38 45q8-5 17 0M65 45q9-5 17 0" fill="none" stroke="${hair}" stroke-width="${brow===0?3.2:brow===1?4.5:2}" stroke-linecap="round"/>
 <path d="M40 51q7 5 14 0M66 51q7 5 14 0" fill="none" stroke="#7c5143" stroke-width="1.2" opacity=".65"/>
 <ellipse cx="48" cy="51" rx="3.2" ry="2.4" fill="${eye}"/><ellipse cx="73" cy="51" rx="3.2" ry="2.4" fill="${eye}"/>
 <circle cx="49" cy="50.5" r=".8" fill="#fff"/><circle cx="74" cy="50.5" r=".8" fill="#fff"/>
 <path d="M60 51l-4 15 7 3" fill="none" stroke="#895847" stroke-width="2" stroke-linecap="round"/>
 <path d="M51 75q9 5 18 0" fill="none" stroke="#512f2c" stroke-width="2.6" stroke-linecap="round"/>
 <path d="M43 68q17 8 34 0" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
 ${beard?`<path d="M34 64Q34 88 59 92Q84 88 86 64L78 73Q60 82 42 73Z" fill="${hair}" opacity=".94"/><path d="M49 82q11 5 22 0" fill="none" stroke="#8b6756" stroke-width="1.3"/>`:""}
 <path d="M30 44Q${ear?18:22} 40 ${ear?20:24} 58Q26 68 34 65M90 44Q${ear?102:98} 40 ${ear?100:96} 58Q94 68 86 65" fill="${skin}" stroke="#704b3d" stroke-width="1.4"/>
 <path d="M43 94l17 15 17-15" fill="none" stroke="#d6dce6" stroke-opacity=".18" stroke-width="2"/>
 <path d="M13 120l8-20 15-8M107 120l-8-20-15-8" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3"/>
 </svg>`;
}
const realFighterPhotos={
 "Islam Makhachev":"https://en.wikipedia.org/wiki/Special:FilePath/Islam_Makhachev.jpg",
 "Charles Oliveira":"https://en.wikipedia.org/wiki/Special:FilePath/Charles_Oliveira.jpg",
 "Justin Gaethje":"https://en.wikipedia.org/wiki/Special:FilePath/Justin_Gaethje.jpg",
 "Brandon Moreno":"https://en.wikipedia.org/wiki/Special:FilePath/Brandon_Moreno.jpg",
 "Alexandre Pantoja":"https://en.wikipedia.org/wiki/Special:FilePath/Alexandre_Pantoja.jpg",
 "Sean O’Malley":"https://en.wikipedia.org/wiki/Special:FilePath/Sean_O%27Malley_(fighter).jpg",
 "Merab Dvalishvili":"https://en.wikipedia.org/wiki/Special:FilePath/Merab_Dvalishvili.jpg",
 "Alexander Volkanovski":"https://en.wikipedia.org/wiki/Special:FilePath/Alexander_Volkanovski.jpg",
 "Max Holloway":"https://en.wikipedia.org/wiki/Special:FilePath/Max_Holloway.jpg",
 "Leon Edwards":"https://en.wikipedia.org/wiki/Special:FilePath/Leon_Edwards.jpg",
 "Shavkat Rakhmonov":"https://en.wikipedia.org/wiki/Special:FilePath/Shavkat_Rakhmonov.jpg",
 "Dricus du Plessis":"https://en.wikipedia.org/wiki/Special:FilePath/Dricus_du_Plessis.jpg",
 "Israel Adesanya":"https://en.wikipedia.org/wiki/Special:FilePath/Israel_Adesanya.jpg",
 "Alex Pereira":"https://en.wikipedia.org/wiki/Special:FilePath/Alex_Pereira_(fighter).jpg",
 "Magomed Ankalaev":"https://en.wikipedia.org/wiki/Special:FilePath/Magomed_Ankalaev.jpg",
 "Jon Jones":"https://en.wikipedia.org/wiki/Special:FilePath/Jon_Jones.jpg",
 "Tom Aspinall":"https://en.wikipedia.org/wiki/Special:FilePath/Tom_Aspinall.jpg",
 "Conor McGregor":"https://en.wikipedia.org/wiki/Special:FilePath/Conor_McGregor.jpg",
 "Dustin Poirier":"https://en.wikipedia.org/wiki/Special:FilePath/Dustin_Poirier.jpg",
 "Arman Tsarukyan":"https://en.wikipedia.org/wiki/Special:FilePath/Arman_Tsarukyan.jpg",
 "Joshua Van":"https://en.wikipedia.org/wiki/Special:FilePath/Joshua_Van.jpg",
 "Manel Kape":"https://en.wikipedia.org/wiki/Special:FilePath/Manel_Kape.jpg",
 "Alexandre Pantoja":"https://en.wikipedia.org/wiki/Special:FilePath/Alexandre_Pantoja.jpg",
 "Brandon Royval":"https://en.wikipedia.org/wiki/Special:FilePath/Brandon_Royval.jpg",
 "Tatsuro Taira":"https://en.wikipedia.org/wiki/Special:FilePath/Tatsuro_Taira.jpg",
 "Asu Almabayev":"https://en.wikipedia.org/wiki/Special:FilePath/Asu_Almabayev.jpg",
 "Lone'er Kavanagh":"https://en.wikipedia.org/wiki/Special:FilePath/Lone'er_Kavanagh.jpg",
 "Ramazan Temirov":"https://en.wikipedia.org/wiki/Special:FilePath/Ramazan_Temirov.jpg",
 "Kyoji Horiguchi":"https://en.wikipedia.org/wiki/Special:FilePath/Kyoji_Horiguchi.jpg",
 "Amir Albazi":"https://en.wikipedia.org/wiki/Special:FilePath/Amir_Albazi.jpg",
 "Brandon Moreno":"https://en.wikipedia.org/wiki/Special:FilePath/Brandon_Moreno.jpg",
 "Sumudaerji":"https://en.wikipedia.org/wiki/Special:FilePath/Sumudaerji.jpg",
 "Mitch Raposo":"https://en.wikipedia.org/wiki/Special:FilePath/Mitch_Raposo.jpg",
 "Imanol Rodriguez":"https://en.wikipedia.org/wiki/Special:FilePath/Imanol_Rodriguez.jpg",
 "Rei Tsuruya":"https://en.wikipedia.org/wiki/Special:FilePath/Rei_Tsuruya.jpg",
 "Charles Johnson":"https://en.wikipedia.org/wiki/Special:FilePath/Charles_Johnson.jpg",
 "Petr Yan":"https://en.wikipedia.org/wiki/Special:FilePath/Petr_Yan.jpg",
 "Merab Dvalishvili":"https://en.wikipedia.org/wiki/Special:FilePath/Merab_Dvalishvili.jpg",
 "Sean O'Malley":"https://en.wikipedia.org/wiki/Special:FilePath/Sean_O%27Malley_(fighter).jpg",
 "Song Yadong":"https://en.wikipedia.org/wiki/Special:FilePath/Song_Yadong.jpg",
 "Umar Nurmagomedov":"https://en.wikipedia.org/wiki/Special:FilePath/Umar_Nurmagomedov.jpg",
 "Mario Bautista":"https://en.wikipedia.org/wiki/Special:FilePath/Mario_Bautista.jpg",
 "Cory Sandhagen":"https://en.wikipedia.org/wiki/Special:FilePath/Cory_Sandhagen.jpg",
 "Payton Talbott":"https://en.wikipedia.org/wiki/Special:FilePath/Payton_Talbott.jpg",
 "David Martinez":"https://en.wikipedia.org/wiki/Special:FilePath/David_Martinez.jpg",
 "Aiemann Zahabi":"https://en.wikipedia.org/wiki/Special:FilePath/Aiemann_Zahabi.jpg",
 "Raul Rosas Jr.":"https://en.wikipedia.org/wiki/Special:FilePath/Raul_Rosas_Jr..jpg",
 "Marlon Vera":"https://en.wikipedia.org/wiki/Special:FilePath/Marlon_Vera.jpg",
 "Deiveson Figueiredo":"https://en.wikipedia.org/wiki/Special:FilePath/Deiveson_Figueiredo.jpg",
 "Marcus McGhee":"https://en.wikipedia.org/wiki/Special:FilePath/Marcus_McGhee.jpg",
 "Raoni Barcelos":"https://en.wikipedia.org/wiki/Special:FilePath/Raoni_Barcelos.jpg",
 "Bryce Mitchell":"https://en.wikipedia.org/wiki/Special:FilePath/Bryce_Mitchell.jpg",
 "Alexander Volkanovski":"https://en.wikipedia.org/wiki/Special:FilePath/Alexander_Volkanovski.jpg",
 "Movsar Evloev":"https://en.wikipedia.org/wiki/Special:FilePath/Movsar_Evloev.jpg",
 "Diego Lopes":"https://en.wikipedia.org/wiki/Special:FilePath/Diego_Lopes.jpg",
 "Lerone Murphy":"https://en.wikipedia.org/wiki/Special:FilePath/Lerone_Murphy.jpg",
 "Aljamain Sterling":"https://en.wikipedia.org/wiki/Special:FilePath/Aljamain_Sterling.jpg",
 "Jean Silva":"https://en.wikipedia.org/wiki/Special:FilePath/Jean_Silva.jpg",
 "Arnold Allen":"https://en.wikipedia.org/wiki/Special:FilePath/Arnold_Allen.jpg",
 "Pat Sabatini":"https://en.wikipedia.org/wiki/Special:FilePath/Pat_Sabatini.jpg",
 "Pavel Andrusca":"https://en.wikipedia.org/wiki/Special:FilePath/Pavel_Andrusca.jpg",
 "Youssef Zalal":"https://en.wikipedia.org/wiki/Special:FilePath/Youssef_Zalal.jpg",
 "Aaron Pico":"https://en.wikipedia.org/wiki/Special:FilePath/Aaron_Pico.jpg",
 "Kevin Vallejos":"https://en.wikipedia.org/wiki/Special:FilePath/Kevin_Vallejos.jpg",
 "Joanderson Brito":"https://en.wikipedia.org/wiki/Special:FilePath/Joanderson_Brito.jpg",
 "Melquizael Costa":"https://en.wikipedia.org/wiki/Special:FilePath/Melquizael_Costa.jpg",
 "Steve Garcia":"https://en.wikipedia.org/wiki/Special:FilePath/Steve_Garcia.jpg",
 "Jamall Emmers":"https://en.wikipedia.org/wiki/Special:FilePath/Jamall_Emmers.jpg",
 "Justin Gaethje":"https://en.wikipedia.org/wiki/Special:FilePath/Justin_Gaethje.jpg",
 "Ilia Topuria":"https://en.wikipedia.org/wiki/Special:FilePath/Ilia_Topuria.jpg",
 "Arman Tsarukyan":"https://en.wikipedia.org/wiki/Special:FilePath/Arman_Tsarukyan.jpg",
 "Charles Oliveira":"https://en.wikipedia.org/wiki/Special:FilePath/Charles_Oliveira.jpg",
 "Max Holloway":"https://en.wikipedia.org/wiki/Special:FilePath/Max_Holloway.jpg",
 "Paddy Pimblett":"https://en.wikipedia.org/wiki/Special:FilePath/Paddy_Pimblett.jpg",
 "Benoît Saint Denis":"https://en.wikipedia.org/wiki/Special:FilePath/Beno\u00eet_Saint_Denis.jpg",
 "Quillan Salkilld":"https://en.wikipedia.org/wiki/Special:FilePath/Quillan_Salkilld.jpg",
 "Mauricio Ruffy":"https://en.wikipedia.org/wiki/Special:FilePath/Mauricio_Ruffy.jpg",
 "Salahdine Parnasse":"https://en.wikipedia.org/wiki/Special:FilePath/Salahdine_Parnasse.jpg",
 "Mateusz Gamrot":"https://en.wikipedia.org/wiki/Special:FilePath/Mateusz_Gamrot.jpg",
 "Rafael Fiziev":"https://en.wikipedia.org/wiki/Special:FilePath/Rafael_Fiziev.jpg",
 "Renato Moicano":"https://en.wikipedia.org/wiki/Special:FilePath/Renato_Moicano.jpg",
 "Dan Hooker":"https://en.wikipedia.org/wiki/Special:FilePath/Dan_Hooker.jpg",
 "Tom Nolan":"https://en.wikipedia.org/wiki/Special:FilePath/Tom_Nolan.jpg",
 "Beneil Dariush":"https://en.wikipedia.org/wiki/Special:FilePath/Beneil_Dariush.jpg",
 "Islam Makhachev":"https://en.wikipedia.org/wiki/Special:FilePath/Islam_Makhachev.jpg",
 "Carlos Prates":"https://en.wikipedia.org/wiki/Special:FilePath/Carlos_Prates.jpg",
 "Ian Machado Garry":"https://en.wikipedia.org/wiki/Special:FilePath/Ian_Machado_Garry.jpg",
 "Michael Morales":"https://en.wikipedia.org/wiki/Special:FilePath/Michael_Morales.jpg",
 "Jack Della Maddalena":"https://en.wikipedia.org/wiki/Special:FilePath/Jack_Della_Maddalena.jpg",
 "Sean Brady":"https://en.wikipedia.org/wiki/Special:FilePath/Sean_Brady.jpg",
 "Gabriel Bonfim":"https://en.wikipedia.org/wiki/Special:FilePath/Gabriel_Bonfim.jpg",
 "Belal Muhammad":"https://en.wikipedia.org/wiki/Special:FilePath/Belal_Muhammad.jpg",
 "Mike Malott":"https://en.wikipedia.org/wiki/Special:FilePath/Mike_Malott.jpg",
 "Uroš Medić":"https://en.wikipedia.org/wiki/Special:FilePath/Uro\u0161_Medi\u0107.jpg",
 "Leon Edwards":"https://en.wikipedia.org/wiki/Special:FilePath/Leon_Edwards.jpg",
 "Kamaru Usman":"https://en.wikipedia.org/wiki/Special:FilePath/Kamaru_Usman.jpg",
 "Joaquin Buckley":"https://en.wikipedia.org/wiki/Special:FilePath/Joaquin_Buckley.jpg",
 "Yaroslav Amosov":"https://en.wikipedia.org/wiki/Special:FilePath/Yaroslav_Amosov.jpg",
 "Jacobe Smith":"https://en.wikipedia.org/wiki/Special:FilePath/Jacobe_Smith.jpg",
 "Kevin Holland":"https://en.wikipedia.org/wiki/Special:FilePath/Kevin_Holland.jpg",
 "Sean Strickland":"https://en.wikipedia.org/wiki/Special:FilePath/Sean_Strickland.jpg",
 "Khamzat Chimaev":"https://en.wikipedia.org/wiki/Special:FilePath/Khamzat_Chimaev.jpg",
 "Dricus Du Plessis":"https://en.wikipedia.org/wiki/Special:FilePath/Dricus_du_Plessis.jpg",
 "Nassourdine Imavov":"https://en.wikipedia.org/wiki/Special:FilePath/Nassourdine_Imavov.jpg",
 "Brendan Allen":"https://en.wikipedia.org/wiki/Special:FilePath/Brendan_Allen.jpg",
 "Joe Pyfer":"https://en.wikipedia.org/wiki/Special:FilePath/Joe_Pyfer.jpg",
 "Caio Borralho":"https://en.wikipedia.org/wiki/Special:FilePath/Caio_Borralho.jpg",
 "Gregory Rodrigues":"https://en.wikipedia.org/wiki/Special:FilePath/Gregory_Rodrigues.jpg",
 "Anthony Hernandez":"https://en.wikipedia.org/wiki/Special:FilePath/Anthony_Hernandez.jpg",
 "Abus Magomedov":"https://en.wikipedia.org/wiki/Special:FilePath/Abus_Magomedov.jpg",
 "Israel Adesanya":"https://en.wikipedia.org/wiki/Special:FilePath/Israel_Adesanya.jpg",
 "Ikram Aliskerov":"https://en.wikipedia.org/wiki/Special:FilePath/Ikram_Aliskerov.jpg",
 "Christian Leroy Duncan":"https://en.wikipedia.org/wiki/Special:FilePath/Christian_Leroy_Duncan.jpg",
 "Bo Nickal":"https://en.wikipedia.org/wiki/Special:FilePath/Bo_Nickal.jpg",
 "Roman Kopylov":"https://en.wikipedia.org/wiki/Special:FilePath/Roman_Kopylov.jpg",
 "Edmen Shahbazyan":"https://en.wikipedia.org/wiki/Special:FilePath/Edmen_Shahbazyan.jpg",
 "Carlos Ulberg":"https://en.wikipedia.org/wiki/Special:FilePath/Carlos_Ulberg.jpg",
 "Alex Pereira":"https://en.wikipedia.org/wiki/Special:FilePath/Alex_Pereira.jpg",
 "Magomed Ankalaev":"https://en.wikipedia.org/wiki/Special:FilePath/Magomed_Ankalaev.jpg",
 "Jiří Procházka":"https://en.wikipedia.org/wiki/Special:FilePath/Ji\u0159\u00ed_Proch\u00e1zka.jpg",
 "Dominick Reyes":"https://en.wikipedia.org/wiki/Special:FilePath/Dominick_Reyes.jpg",
 "Paulo Costa":"https://en.wikipedia.org/wiki/Special:FilePath/Paulo_Costa.jpg",
 "Khalil Rountree Jr.":"https://en.wikipedia.org/wiki/Special:FilePath/Khalil_Rountree_Jr..jpg",
 "Navajo Stirling":"https://en.wikipedia.org/wiki/Special:FilePath/Navajo_Stirling.jpg",
 "Reinier de Ridder":"https://en.wikipedia.org/wiki/Special:FilePath/Reinier_de_Ridder.jpg",
 "Alonzo Menifield":"https://en.wikipedia.org/wiki/Special:FilePath/Alonzo_Menifield.jpg",
 "Bogdan Guskov":"https://en.wikipedia.org/wiki/Special:FilePath/Bogdan_Guskov.jpg",
 "Robert Whittaker":"https://en.wikipedia.org/wiki/Special:FilePath/Robert_Whittaker.jpg",
 "Muhammad Saidov":"https://en.wikipedia.org/wiki/Special:FilePath/Muhammad_Saidov.jpg",
 "Abdul Rakhman Yakhyaev":"https://en.wikipedia.org/wiki/Special:FilePath/Abdul_Rakhman_Yakhyaev.jpg",
 "Azamat Murzakanov":"https://en.wikipedia.org/wiki/Special:FilePath/Azamat_Murzakanov.jpg",
 "Modestas Bukauskas":"https://en.wikipedia.org/wiki/Special:FilePath/Modestas_Bukauskas.jpg",
 "Ciryl Gane":"https://en.wikipedia.org/wiki/Special:FilePath/Ciryl_Gane.jpg",
 "Tom Aspinall":"https://en.wikipedia.org/wiki/Special:FilePath/Tom_Aspinall.jpg",
 "Alexander Volkov":"https://en.wikipedia.org/wiki/Special:FilePath/Alexander_Volkov.jpg",
 "Sergei Pavlovich":"https://en.wikipedia.org/wiki/Special:FilePath/Sergei_Pavlovich.jpg",
 "Josh Hokit":"https://en.wikipedia.org/wiki/Special:FilePath/Josh_Hokit.jpg",
 "Curtis Blaydes":"https://en.wikipedia.org/wiki/Special:FilePath/Curtis_Blaydes.jpg",
 "Rizvan Kuniev":"https://en.wikipedia.org/wiki/Special:FilePath/Rizvan_Kuniev.jpg",
 "Waldo Cortes-Acosta":"https://en.wikipedia.org/wiki/Special:FilePath/Waldo_Cortes-Acosta.jpg",
 "Vitor Petrino":"https://en.wikipedia.org/wiki/Special:FilePath/Vitor_Petrino.jpg",
 "Mario Pinto":"https://en.wikipedia.org/wiki/Special:FilePath/Mario_Pinto.jpg",
 "Valter Walker":"https://en.wikipedia.org/wiki/Special:FilePath/Valter_Walker.jpg",
 "Johnny Walker":"https://en.wikipedia.org/wiki/Special:FilePath/Johnny_Walker.jpg",
 "Brando Pericic":"https://en.wikipedia.org/wiki/Special:FilePath/Brando_Pericic.jpg",
 "Serghei Spivac":"https://en.wikipedia.org/wiki/Special:FilePath/Serghei_Spivac.jpg",
 "Anthony Wint":"https://en.wikipedia.org/wiki/Special:FilePath/Anthony_Wint.jpg"
};
// Portrait identity is keyed only by fighter name, never by screen/slot.
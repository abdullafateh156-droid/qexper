/* ===== v8: offline translations, real heights, records, fighter cards, opponent search, fixes ===== */
function azDate(d){return d.getDate()+" "+["yanvar","fevral","mart","aprel","may","iyun","iyul","avqust","sentyabr","oktyabr","noyabr","dekabr"][d.getMonth()]+" "+d.getFullYear()}
(function(){
const {T,D,esc,KG,HB,toast,overlay,sl,speak,LNG,OV}=window.__v7;
/* ---------- offline dictionary az | en | tr ---------- */
const DL=`ABŞ|USA|ABD
AUTO SAVE|AUTO SAVE|OTOMATİK KAYIT
OFFLINE OYUN|OFFLINE GAME|ÇEVRİMDIŞI OYUN
SEZON 1|SEASON 1|SEZON 1
Amatör|Amateur|Amatör
Regional|Regional|Bölgesel
Peşəkar|Professional|Profesyonel
Amatör karyera — sıfırdan başla|Amateur career — start from scratch|Amatör kariyer — sıfırdan başla
Amatör liqa|Amateur league|Amatör lig
Amatör mərhələdə 5 qələbə qazan|Win 5 fights in the amateur stage|Amatör aşamada 5 galibiyet kazan
Amatördə upgrade $1,000, Regionalda $2,500, UFC-də $4,000-dir. Hər upgrade +1 göstərici verir. Enerji sistemi yoxdur.|Upgrades cost $1,000 in Amateur, $2,500 in Regional and $4,000 in the UFC. Each upgrade gives +1 stat. There is no energy system.|Geliştirme Amatörde $1,000, Bölgeselde $2,500, UFC'de $4,000. Her geliştirme +1 puan verir. Enerji sistemi yok.
Asan|Easy|Kolay
Az|Low|Az
Azərbaycan|Azerbaijan|Azerbaycan
Açıq|Light|Açık
Açıq buğda|Light tan|Açık buğday
BAŞLA|START|BAŞLA
Balanslı — hər sahədə sabit|Balanced — steady everywhere|Dengeli — her alanda istikrarlı
Bağla|Close|Kapat
Bir az tez-tez|A bit often|Biraz sık
Boy (sm)|Height (cm)|Boy (cm)
Boz|Gray|Gri
Braziliya|Brazil|Brezilya
Bu, real idmançılarla əlaqəsi olmayan, uydurma döyüşçülərdən və sadələşdirilmiş idman simulyasiyasından istifadə edən fan-made menecer oyunudur.|This is a fan-made manager game using fictional fighters and a simplified sports simulation, unrelated to real athletes.|Bu, gerçek sporcularla ilgisi olmayan, kurgusal dövüşçüler ve basitleştirilmiş spor simülasyonu kullanan hayran yapımı bir menajer oyunudur.
Buğda|Wheat|Buğday
Dalğalı|Wavy|Dalgalı
Döyüş başlayanda hadisələr burada görünəcək.|Events will appear here when the fight starts.|Dövüş başlayınca olaylar burada görünecek.
Döyüş gecəsi|Fight Night|Dövüş Gecesi
Döyüş sayı|Fights|Dövüş sayısı
Döyüş strategiyası|Fight strategy|Dövüş stratejisi
Döyüşdən imtina et|Decline the fight|Dövüşü reddet
Döyüşdən əvvəl üz-üzə söhbət: fərqli jurnalist sualları, trash-talk, rəqib mübahisələri və bəzən Dana White-ın çıxışı.|Pre-fight face-to-face: reporter questions, trash talk, rival arguments and sometimes a speech by Dana White.|Dövüş öncesi yüz yüze: gazeteci soruları, trash-talk, rakip tartışmaları ve bazen Dana White'ın konuşması.
Döyüşçü|Fighter|Dövüşçü
Döyüşçünün adı|Fighter name|Dövüşçünün adı
Döyüşü qəbul et|Accept the fight|Dövüşü kabul et
Döyüşə başlamaq üçün düyməyə bas!|Press the button to start the fight!|Dövüşü başlatmak için düğmeye bas!
Döyüşə hazırlaş →|Prepare for the fight →|Dövüşe hazırlan →
Dözümlülük|Stamina|Dayanıklılık
Dəri rəngi|Skin tone|Ten rengi
Enerji limiti yoxdur. Hər upgrade +1 göstərici verir. Qiymət karyera mərhələsinə görə dəyişir.|No energy limit. Each upgrade gives +1 stat. The price depends on your career stage.|Enerji sınırı yok. Her geliştirme +1 puan verir. Fiyat kariyer aşamasına göre değişir.
SƏN|YOU|SEN
RƏQİB|OPPONENT|RAKİP
Fransa|France|Fransa
GÖZLƏYİR|WAITING|BEKLİYOR
Görünüşü dəyiş — eyni üz bütün bölmələrdə qalacaq.|Change the look — the same face stays in every section.|Görünümü değiştir — aynı yüz tüm bölümlerde kalır.
Göz rəngi|Eye color|Göz rengi
Güc|Power|Güç
Güləş|Wrestling|Güreş
Güləş məşqi|Wrestling training|Güreş antrenmanı
Güləşçi — nəzarət və yerüstü üstünlük|Wrestler — control and ground dominance|Güreşçi — kontrol ve yer üstünlüğü
Gürcüstan|Georgia|Gürcistan
Heç-heçə|Draw|Beraberlik
Hələ döyüş keçirilməyib. Döyüşü başlat və raundların gedişatını izlə.|No fight yet. Start a fight and follow the rounds.|Henüz dövüş yapılmadı. Dövüşü başlat ve raundları takip et.
Hələ döyüş tarixçən yoxdur.|You have no fight history yet.|Henüz dövüş geçmişin yok.
Hələ nailiyyət yoxdur. İlk qələbəni qazan!|No achievements yet. Win your first fight!|Henüz başarım yok. İlk galibiyetini kazan!
Həvəskar qaydaları • 3 raund|Amateur rules • 3 rounds|Amatör kuralları • 3 raunt
Karyera|Career|Kariyer
Karyera günü|Career day|Kariyer günü
Kondisiya proqramı|Conditioning program|Kondisyon programı
Konfransı başlat düyməsinə bas.|Press the start conference button.|Basın toplantısını başlat düğmesine bas.
Kontratak — səbir və dəqiqlik|Counter — patience and precision|Kontra — sabır ve isabet
Kəmər yoxdur|No belt|Kemer yok
Çempion 🏆|Champion 🏆|Şampiyon 🏆
Limitsiz|Unlimited|Sınırsız
Ləqəb|Nickname|Lakap
Mavi|Blue|Mavi
Müdafiə|Defense|Savunma
Müdafiə və yayınma|Defense and evasion|Savunma ve kaçınma
Məğlubiyyət|Losses|Mağlubiyet
Məğlubiyyət reytinqə mənfi təsir edir, amma karyera bitmir.|A loss hurts your rating, but your career goes on.|Mağlubiyet reytingini düşürür ama kariyer bitmez.
Məşq sistemi|Training system|Antrenman sistemi
Məşq zalı|Gym|Antrenman salonu
Məşq üçün enerji tələb olunmur. Formanı döyüşlər və təqvim vasitəsilə idarə et.|Training needs no energy. Manage your form through fights and the calendar.|Antrenman için enerji gerekmez. Formunu dövüşler ve takvimle yönet.
Növbəti döyüşdə qələbə səni kəmərə yaxınlaşdıracaq.|Winning your next fight brings you closer to the belt.|Bir sonraki dövüşteki galibiyet seni kemere yaklaştırır.
Növbəti həftəyə keç →|Next week →|Sonraki haftaya geç →
Nəticə döyüşçü göstəriciləri, strategiya, dözümlülük və təsadüfi hadisələr əsasında hesablanır.|The result is calculated from fighter stats, strategy, stamina and random events.|Sonuç dövüşçü istatistikleri, strateji, dayanıklılık ve rastgele olaylara göre hesaplanır.
Orta|Medium|Orta
Peşəkar UFC reytinqi yalnız peşəkar müqavilə aldıqdan sonra açılır.|The pro UFC ranking unlocks only after you get a pro contract.|Profesyonel UFC sıralaması yalnızca profesyonel sözleşme aldıktan sonra açılır.
Polşa|Poland|Polonya
Profili yadda saxla|Save profile|Profili kaydet
Pul kisəsi|Wallet|Cüzdan
Qabarıq / güləşçi qulağı|Cauliflower / wrestler's ear|Şişkin / güreşçi kulağı
Qalın|Thick|Kalın
Qara|Black|Siyah
Qaş forması|Eyebrow shape|Kaş şekli
Qulaq forması|Ear shape|Kulak şekli
Qısa|Short|Kısa
Qəhvəyi|Brown|Kahverengi
Qələbə|Wins|Galibiyet
Qələbə faizi|Win rate|Galibiyet oranı
Qələbə reytinqini və pul mükafatını artırır.|Winning raises your rating and prize money.|Galibiyet reytingini ve ödülünü artırır.
Realist inkişaf üçün amatör yolu seç, ya da UFC 334 kartında peşəkar debüt et.|For realistic progression pick the amateur path, or make a pro debut on the UFC 334 card.|Gerçekçi gelişim için amatör yolu seç ya da UFC 334 kartında profesyonel çıkış yap.
Rekord|Record|Rekor
Reytinq|Rankings|Sıralama
Reytinq xalı|Rating|Reyting puanı
Rusiya|Russia|Rusya
Rəqibin gücü|Opponent's power|Rakibin gücü
Rəqib müəyyənləşir|Opponent TBD|Rakip belirleniyor
Rekord məlum deyil|Record unknown|Rekor bilinmiyor
Saqqal|Beard|Sakal
Saç rəngi|Hair color|Saç rengi
Saç stili|Hair style|Saç stili
Statistika|Stats|İstatistik
Stil|Style|Stil
Striker — ayaqüstü döyüş|Striker — standing fight|Vurucu — ayakta dövüş
Süni portretlər uydurma döyüşçülər üçündür. Real döyüşçülərdə mövcud foto istifadə olunur.|Artificial portraits are for fictional fighters. Real fighters use an existing photo.|Yapay portreler kurgusal dövüşçüler içindir. Gerçek dövüşçülerde mevcut fotoğraf kullanılır.
Sürət|Speed|Hız
Sürət və çeviklik|Speed and agility|Hız ve çeviklik
Sürətli|Fast|Hızlı
Sıx|Dense|Sık
Sənin stilin|Your style|Senin stilin
Sənin ümumi gücün|Your overall power|Genel gücün
Tam saqqal|Full beard|Tam sakal
Texnika|Technique|Teknik
Tünd|Dark|Koyu
Tünd boz|Dark gray|Koyu gri
Tünd qəhvəyi|Dark brown|Koyu kahve
Türkiyə|Türkiye|Türkiye
Təmiz üz|Clean-shaven|Temiz yüz
Təzyiq — yüksək temp|Pressure — high tempo|Baskı — yüksek tempo
UFC 334 — Main Card debütü|UFC 334 — Main Card debut|UFC 334 — Main Card çıkışı
Progress avtomatik olaraq bu brauzerdə saxlanılır.|Progress is saved automatically in this browser.|İlerleme bu tarayıcıda otomatik kaydedilir.
Upgrade et|Upgrade|Geliştir
Upgrade qiyməti|Upgrade price|Geliştirme fiyatı
Yanları qısa|Short sides|Yanlar kısa
Yaponiya|Japan|Japonya
Yavaş|Slow|Yavaş
Yaşıl|Green|Yeşil
Yerüstü texnika|Ground technique|Yer tekniği
Zərbə|Striking|Vuruş
Zərbə texnikası|Striking technique|Vuruş tekniği
Çox çətin|Very hard|Çok zor
Çəki dərəcəsi|Weight class|Sıklet
Çətin|Hard|Zor
Ölkə|Country|Ülke
Öz MMA əfsanəni yarat. 🥊|Create your own MMA legend. 🥊|Kendi MMA efsaneni yarat. 🥊
Öz döyüşçünü qur, məşq et, döyüş simulyasiyası keçir və kəmər qazan.|Build your fighter, train, run fight simulations and win the belt.|Dövüşçünü kur, antrenman yap, dövüş simülasyonu oyna ve kemeri kazan.
Ümumi reytinq|Overall rating|Genel reyting
İncə|Thin|İnce
İrlandiya|Ireland|İrlanda
İtaliya|Italy|İtalya
Əfsanəvi|Legendary|Efsanevi
Əvvəl Amatör və 4 amatör qələbə və 6 regional qələbə qazan, sonra UFC reytinqinə daxil ol.|Win 4 amateur and 6 regional fights first, then enter the UFC rankings.|Önce 4 amatör ve 6 bölgesel galibiyet kazan, sonra UFC sıralamasına gir.
Əvvəl həvəskar turnirlərdən başla, regional liqada təcrübə qazan, sonra peşəkar reytinqə daxil ol.|Start in amateur tournaments, gain experience in the regional league, then enter the pro rankings.|Amatör turnuvalarla başla, bölgesel ligde tecrübe kazan, sonra profesyonel sıralamaya gir.
Əvvəlcə döyüş təklifini qəbul et.|First accept the fight offer.|Önce dövüş teklifini kabul et.
ℹ️ Oyun qaydaları|ℹ️ Game rules|ℹ️ Oyun kuralları
↻ Reset Career — Karyeranı sıfırla|↻ Reset Career|↻ Kariyeri sıfırla
⏭ Döyüşü keç|⏭ Skip fight|⏭ Dövüşü geç
⏱️ Döyüş animasiyasının sürəti|⏱️ Fight animation speed|⏱️ Dövüş animasyon hızı
⚙️ Ayarlar|⚙️ Settings|⚙️ Ayarlar
⚙️ Oyun ayarları|⚙️ Game settings|⚙️ Oyun ayarları
🎙️ Döyüşün gedişatı|🎙️ Fight progress|🎙️ Dövüşün akışı
🎙️ Mətbuat konfransı|🎙️ Press conference|🎙️ Basın toplantısı
🎤 Konfransı başlat|🎤 Start conference|🎤 Toplantıyı başlat
🎤 Sərt trash-talk tezliyi|🎤 Trash-talk frequency|🎤 Trash-talk sıklığı
🎯 Növbəti hədəf|🎯 Next goal|🎯 Sonraki hedef
🎵 Musiqinin səsi|🎵 Music volume|🎵 Müzik sesi
🏁 Karyeranı bitir|🏁 End career|🏁 Kariyeri bitir
🏅 Nailiyyətlər və mükafatlar|🏅 Achievements and awards|🏅 Başarımlar ve ödüller
🏆 Amatör turnir cədvəli|🏆 Amateur tournament table|🏆 Amatör turnuva tablosu
🏋️ Məşq zalı|🏋️ Gym|🏋️ Antrenman salonu
📅 Həftəlik karyera planı|📅 Weekly career plan|📅 Haftalık kariyer planı
📅 Karyera təqvimi|📅 Career calendar|📅 Kariyer takvimi
📈 İnkişaf|📈 Progress|📈 Gelişim
📊 Karyera statistikası|📊 Career stats|📊 Kariyer istatistikleri
📋 Döyüş nəticəsi|📋 Fight result|📋 Dövüş sonucu
📜 Son döyüşlər|📜 Recent fights|📜 Son dövüşler
📝 Döyüşçü profili|📝 Fighter profile|📝 Dövüşçü profili
📸 Öz şəklini də yüklə (istəyə görə)|📸 Upload your own photo (optional)|📸 Kendi fotoğrafını yükle (isteğe bağlı)
📺 Döyüş gecəsinin kartı|📺 Fight night card|📺 Dövüş gecesi kartı
🥇 Sənin döyüşçün|🥇 Your fighter|🥇 Senin dövüşçün
🥊 Canlı döyüş animasiyası|🥊 Live fight animation|🥊 Canlı dövüş animasyonu
🥊 Karyeraya haradan başlamaq istəyirsən?|🥊 Where do you want to start your career?|🥊 Kariyere nereden başlamak istiyorsun?
🥊 Çətinlik səviyyəsi|🥊 Difficulty|🥊 Zorluk seviyesi
🥊 Öz döyüşçünü yarat|🥊 Create your fighter|🥊 Dövüşçünü yarat
Kəmərini qoru!|Defend your belt!|Kemerini koru!
Regional liqada 8 qələbə qazan|Win 8 fights in the Regional league|Bölgesel ligde 8 galibiyet kazan
Çempionluq döyüşünə hazırsan!|You're ready for the title fight!|Şampiyonluk dövüşüne hazırsın!
UFC ilk 5-liyinə yüksəl|Climb into the UFC top 5|UFC ilk 5'ine yüksel
Növbəti müdafiə döyüşündə titulunu qoru.|Defend your title in the next title defense.|Bir sonraki savunmada unvanını koru.
Döyüşlər qazan, reytinq xalı topla və ilk 5-ə daxil ol.|Win fights, collect rating points and break into the top 5.|Dövüşler kazan, reyting puanı topla ve ilk 5'e gir.
Bu karyera bitib. Yeni karyera başlatmaq üçün sıfırla.|This career is over. Reset to start a new one.|Bu kariyer bitti. Yeni kariyer için sıfırla.
Hazırlıq göstəricilərin yaxşıdır, amma rəqibi yüngül sayma.|Your prep stats are good, but don't take the opponent lightly.|Hazırlık istatistiklerin iyi ama rakibi hafife alma.
Rəqib bir az öndədir. Məşq və düzgün taktika vacib olacaq.|The opponent is slightly ahead. Training and good tactics will matter.|Rakip biraz önde. Antrenman ve doğru taktik önemli olacak.
Güc fərqi azdır. Bu qarşılaşmada xırda detallar həlledici ola bilər.|The power gap is small. Small details may decide this matchup.|Güç farkı az. Bu karşılaşmada küçük detaylar belirleyici olabilir.
Döyüş qəbul edildi! Hazır olanda “BAŞLA” düyməsinə bas.|Fight accepted! Press “START” when you're ready.|Dövüş kabul edildi! Hazır olunca “BAŞLA” düğmesine bas.
Bu həftə döyüş təklifi yoxdur. Növbəti tədbiri gözlə.|No fight offer this week. Wait for the next event.|Bu hafta dövüş teklifi yok. Sonraki etkinliği bekle.
Döyüş həftəsidir! Təklifi qəbul edə bilərsən.|It's fight week! You can accept the offer.|Dövüş haftası! Teklifi kabul edebilirsin.
Döyüş təklifi yoxdur|No fight offer|Dövüş teklifi yok
Təlim və bərpa həftəsi|Training and recovery week|Antrenman ve toparlanma haftası
Təklifdən imtina etdin. Cərimə yoxdur.|You declined the offer. No penalty.|Teklifi reddettin. Ceza yok.
Yeni karyera başladı. İlk döyüşünü gözləyir!|New career started. Your first fight awaits!|Yeni kariyer başladı. İlk dövüşün seni bekliyor!
UFC qaydaları • 3 raund|UFC rules • 3 rounds|UFC kuralları • 3 raunt
Regional qaydalar • 3 raund|Regional rules • 3 rounds|Bölgesel kurallar • 3 raunt
5 raundlu titul döyüşü|5-round title fight|5 raundluk şampiyonluk dövüşü
Həvəskar döyüş|Amateur fight|Amatör dövüş
Çempionluq əsas döyüşü|Title main event|Şampiyonluk ana maçı
🎙️ Şərhçi 1: Xanımlar və cənablar, döyüş gecəsinə xoş gəlmisiniz!|🎙️ Commentator 1: Ladies and gentlemen, welcome to fight night!|🎙️ Yorumcu 1: Bayanlar ve baylar, dövüş gecesine hoş geldiniz!
🎙️ Şərhçi 2: Raund başa çatdı, görək hakimlər kimə üstünlük verəcək.|🎙️ Commentator 2: The round is over, let's see who the judges favor.|🎙️ Yorumcu 2: Raunt bitti, bakalım hakemler kimi öne çıkaracak.
🧑‍⚖️ Hakimlər kartları hesabladı — bu döyüş məsafəyə getdi!|🧑‍⚖️ The judges tallied the cards — this fight went the distance!|🧑‍⚖️ Hakemler kartları hesapladı — dövüş sona kadar gitti!
🧑‍⚖️ HAKİMLƏRİN QƏRARI!|🧑‍⚖️ JUDGES' DECISION!|🧑‍⚖️ HAKEM KARARI!
QƏLƏBƏ|WIN|GALİBİYET
MƏĞLUBİYYƏT|LOSS|MAĞLUBİYET
HEÇ-HEÇƏ|DRAW|BERABERLİK
Hakimlərin yekdil/qismən qərarı|Judges' decision|Hakem kararı
Sən üstün oldun|You were ahead|Sen üstün oldun
Rəqib üstün oldu|The opponent was ahead|Rakip üstün oldu
Bərabər raund|Even round|Eşit raunt
Bu raund səndədir|This round is yours|Bu raunt senin
Bu raund rəqibdədir|This round goes to the opponent|Bu raunt rakibin
Raund bərabərdir|The round is even|Raunt eşit
Raundu sən qazandın|You won the round|Raundu sen kazandın
Raundu rəqib qazandı|The opponent won the round|Raundu rakip kazandı
Raund heç-heçə bitdi|The round ended even|Raunt berabere bitti
Keçirilmədi — döyüş daha əvvəl bitdi.|Not played — the fight ended earlier.|Oynanmadı — dövüş daha önce bitti.
Mükafat və karyera göstəriciləri yeniləndi.|Prize and career stats updated.|Ödül ve kariyer istatistikleri güncellendi.
Almaniya|Germany|Almanya
Anqola|Angola|Angola
Avstraliya|Australia|Avustralya
Böyük Britaniya|United Kingdom|Birleşik Krallık
BƏƏ|UAE|BAE
Cənubi Afrika|South Africa|Güney Afrika
Dominikan Respublikası|Dominican Republic|Dominik Cumhuriyeti
Ermənistan|Armenia|Ermenistan
Litva|Lithuania|Litvanya
Meksika|Mexico|Meksika
Mərakeş|Morocco|Fas
Niderland|Netherlands|Hollanda
Nigeriya|Nigeria|Nijerya
Portuqaliya|Portugal|Portekiz
Qazaxıstan|Kazakhstan|Kazakistan
Qırğızıstan|Kyrgyzstan|Kırgızistan
Serbiya|Serbia|Sırbistan
Tacikistan|Tajikistan|Tacikistan
Ukrayna|Ukraine|Ukrayna
Yamayka|Jamaica|Jamaika
Yeni Zelandiya|New Zealand|Yeni Zelanda
Çexiya|Czechia|Çekya
Çin|China|Çin
Özbəkistan|Uzbekistan|Özbekistan
İraq|Iraq|Irak
İspaniya|Spain|İspanya
Kanada|Canada|Kanada
Ekvador|Ecuador|Ekvador`;
const DICT=new Map(DL.split("\n").map(l=>l.split("|")).filter(a=>a.length===3).map(a=>[a[0],a]));
const MON=[["yanvar","January","Ocak"],["fevral","February","Şubat"],["mart","March","Mart"],["aprel","April","Nisan"],["may","May","Mayıs"],["iyun","June","Haziran"],["iyul","July","Temmuz"],["avqust","August","Ağustos"],["sentyabr","September","Eylül"],["oktyabr","October","Ekim"],["noyabr","November","Kasım"],["dekabr","December","Aralık"]];
const RX=[
[/^HƏFTƏ (\d+)$/,"WEEK $1","HAFTA $1"],
[/^Həftə (\d+): məşq et, təqvimi yoxla və növbəti döyüşə hazırlaş\.$/,"Week $1: train, check the calendar and prepare for the next fight.","Hafta $1: antrenman yap, takvimi kontrol et ve sonraki dövüşe hazırlan."],
[/^Sıralama: #(\d+)$/,"Rank: #$1","Sıra: #$1"],
[/^(.+) liqa$/,"$1 league","$1 ligi"],
[/^Bu gün: (.+) • Növbəti tədbir: (.+)$/,"Today: $1 • Next event: $2","Bugün: $1 • Sonraki etkinlik: $2"],
[/^Növbəti döyüş: (.+)$/,"Next fight: $1","Sonraki dövüş: $1"],
[/^\+1 göstərici • (.+)$/,"+1 stat • $1","+1 puan • $1"],
[/^♫ Musiqi: (.+)$/,"♫ Music: $1","♫ Müzik: $1"],
[/^⭐ MAIN EVENT: (.+) vs (.+)$/,"⭐ MAIN EVENT: $1 vs $2","⭐ MAIN EVENT: $1 vs $2"],
[/^Stil: (.+)$/,"Style: $1","Stil: $1"],
[/^(.+) • (\d+)-cü raund • (.+)$/,"$1 • round $2 • $3","$1 • $2. raunt • $3"],
[/^Həftə (\d+) • (.+) • Tədbirə (\d+) həftə qalıb$/,"Week $1 • $2 • $3 week(s) until the event","Hafta $1 • $2 • Etkinliğe $3 hafta kaldı"],
[/^Növbəti döyüş həftəsi hələ çatmayıb\. Təqvim: (.+)\. Məşq et və növbəti həftəyə keç\.$/,"The next fight week hasn't arrived yet. Calendar: $1. Train and move to the next week.","Sonraki dövüş haftası henüz gelmedi. Takvim: $1. Antrenman yap ve sonraki haftaya geç."],
[/^Bu həftə döyüş yoxdur\. Növbəti döyüş (\d+) həftə sonra təklif olunacaq\. Məşq et və istirahət et\.$/,"No fight this week. The next fight will be offered in $1 week(s). Train and rest.","Bu hafta dövüş yok. Sonraki dövüş $1 hafta sonra teklif edilecek. Antrenman yap ve dinlen."],
[/^Təklifdən imtina etdin\. (.+) təşkilati cərimə tutuldu\.$/,"You declined the offer. A $1 organizer fine was charged.","Teklifi reddettin. $1 organizasyon cezası kesildi."],
[/^R(\d+) • (\d+):00 — (.+) dəqiq hücumla üstünlük qazandı\.$/,"R$1 • $2:00 — $3 gained the edge with accurate attacks.","R$1 • $2:00 — $3 isabetli hücumla üstünlük kurdu."],
[/^R(\d+) • (\d+):00 — (.+) yaxşı cavab verdi\.$/,"R$1 • $2:00 — $3 responded well.","R$1 • $2:00 — $3 iyi karşılık verdi."],
[/^R(\d+) • (\d+):00 — bərabər mübarizə, hər iki döyüşçü xal topladı\.$/,"R$1 • $2:00 — an even exchange, both fighters scored.","R$1 • $2:00 — dengeli mücadele, iki dövüşçü de puan aldı."],
[/^— (\d+)-cü raund başladı —$/,"— Round $1 started —","— $1. raunt başladı —"],
[/^🔔 (.+) başladı! (.+) vs (.+)\. (\d+) raund\.$/,"🔔 $1 has started! $2 vs $3. $4 rounds.","🔔 $1 başladı! $2 vs $3. $4 raunt."],
[/^Raund (\d+) yekunu: (.+)\.$/,"Round $1 result: $2.","Raunt $1 sonucu: $2."],
[/^💥 (.+) güclü zərbə vurdu və rəqibini nokauta göndərdi! Hakim dərhal araya girdi\.$/,"💥 $1 landed a huge strike and knocked the opponent out! The referee stepped in at once.","💥 $1 güçlü bir vuruş indirip rakibini nakavt etti! Hakem hemen araya girdi."],
[/^🛑 (.+) ardıcıl güclü zərbələr endirdi — hakim texniki nokautla döyüşü dayandırdı!$/,"🛑 $1 landed unanswered heavy strikes — the referee stopped the fight (TKO)!","🛑 $1 art arda ağır vuruşlar indirdi — hakem teknik nakavtla dövüşü durdurdu!"],
[/^🤼 (.+) boğma\/ağrı fəndini tam oturtdu — rəqib təslim oldu! Submission ilə qələbə!$/,"🤼 $1 locked in the submission — the opponent tapped out! Win by submission!","🤼 $1 kilidi tam oturttu — rakip teslim oldu! Submission ile galibiyet!"],
[/^🤼 (.+) submission cəhdi etdi, amma rəqib müdafiə olunub fənddən çıxdı! Döyüş davam edir\.$/,"🤼 $1 tried a submission, but the opponent defended and escaped! The fight goes on.","🤼 $1 submission denedi ama rakip savunup kurtuldu! Dövüş devam ediyor."],
[/^🤼 (.+) submission cəhdi! Rəqib fənddən çıxdı!$/,"🤼 $1 attempts a submission! The opponent escaped!","🤼 $1 submission denedi! Rakip kurtuldu!"],
[/^🎙️ Şərhçi 1: Rəsmi nəticə — (.+)! (.+)\.$/,"🎙️ Commentator 1: Official result — $1! $2.","🎙️ Yorumcu 1: Resmi sonuç — $1! $2."],
[/^🏆 QƏLƏBƏ! Mükafat: (.+)\. Karyera xalların artdı\.$/,"🏆 WIN! Prize: $1. Your career points went up.","🏆 GALİBİYET! Ödül: $1. Kariyer puanların arttı."],
[/^Bu dəfə alınmadı\. Məğlubiyyət ödənişi: (.+)\. Komanda səhvləri analiz edib geri dönəcək\.$/,"Not this time. Loss payment: $1. The team will analyze the mistakes and come back.","Bu sefer olmadı. Mağlubiyet ücreti: $1. Ekip hataları analiz edip geri dönecek."],
[/^Heç-heçə! Mükafat: (.+)\.$/,"Draw! Prize: $1.","Beraberlik! Ödül: $1."],
[/^🥊 (.+) zərbə endirir!$/,"🥊 $1 lands a strike!","🥊 $1 vuruş indiriyor!"],
[/^🥊 (.+) əks-hücum edir!$/,"🥊 $1 counterattacks!","🥊 $1 kontra hücum yapıyor!"],
[/^(\d+)-CU RAUND BAŞA ÇATDI$/,"ROUND $1 OVER","$1. RAUNT BİTTİ"],
[/^(\d+)-CU RAUND • (.+)$/,"ROUND $1 • $2","$1. RAUNT • $2"],
[/^(\d+)-ci raundun xalı:$/,"Round $1 score:","$1. raunt puanı:"],
[/^(\d+)-ci raund$/,"Round $1","$1. raunt"],
[/^💥 (.+) — NOKAUT!$/,"💥 $1 — KNOCKOUT!","💥 $1 — NAKAVT!"],
[/^🛑 (.+) — TEXNİKİ NOKAUT!$/,"🛑 $1 — TECHNICAL KNOCKOUT!","🛑 $1 — TEKNİK NAKAVT!"],
[/^🤼 (.+) — SUBMISSION QƏLƏBƏSİ!$/,"🤼 $1 — SUBMISSION WIN!","🤼 $1 — SUBMISSION GALİBİYETİ!"],
[/^🏆 Qalib: (.+)$/,"🏆 Winner: $1","🏆 Kazanan: $1"],
[/^Ümumi hakim xalı: (.+) • (\d+) raund keçirildi \((\d+) raund planlaşdırılmışdı\)$/,"Total judges' score: $1 • $2 round(s) fought ($3 scheduled)","Toplam hakem puanı: $1 • $2 raunt oynandı ($3 planlanmıştı)"],
[/^Bütün karyera məlumatların silinəcək.*$/,"All career data will be erased: record, cash, rating, training. Continue?","Tüm kariyer verilerin silinecek: rekor, para, reyting, antrenman. Devam edilsin mi?"],
[/^Karyeranı yekunlaşdırmaq istəyirsən.*$/,"Do you want to end your career? Your record will be kept and fights closed.","Kariyerini bitirmek istiyor musun? Rekorun saklanır ve dövüşler kapanır."]
];
let Lc="en";
const lookup=(c,i)=>{const d=DICT.get(c);return d?d[i]:null};
function off(core,L){const i=L==="en"?1:2;if(L==="az")return null;let d=lookup(core,i);if(d)return d;
 for(const [re,en,tr] of RX){const m=core.match(re);if(m){const g=m.slice(1).map(x=>off(x,L)||x);return(i===1?en:tr).replace(/\$(\d)/g,(_,k)=>g[k-1]??"")}}
 const parts=core.split(/( • | — | \/ )/);if(parts.length>1){let ch=false;const o=parts.map((p,k)=>{if(k%2)return p;const v=off(p,L);if(v!=null){ch=true;return v}return p});if(ch)return o.join("")}
 let m=core,ch=false;for(const a of MON){const r=new RegExp("\\b"+a[0]+"\\b","g");if(r.test(m)){m=m.replace(r,a[i]);ch=true}}
 return ch?m:null}
const _trR=trResolve;trResolve=function(r,cur,L,need){if(L!=="az"){const core=r.az.trim();if(core&&/\p{L}/u.test(core)){const v=off(core,L);if(v!=null)return r.az.match(/^\s*/)[0]+v+r.az.match(/\s*$/)[0]}}return _trR.apply(this,arguments)};
window.__off=off;
const _cf=window.confirm.bind(window);window.confirm=m=>_cf(off(String(m),LNG())||m);
/* ---------- real heights ---------- */
const HT={};`Joshua Van 168|Manel Kape 168|Alexandre Pantoja 165|Brandon Royval 175|Tatsuro Taira 170|Asu Almabayev 168|Lone'er Kavanagh 168|Ramazan Temirov 168|Kyoji Horiguchi 165|Amir Albazi 170|Brandon Moreno 170|Sumudaerji 168|Mitch Raposo 170|Imanol Rodriguez 168|Rei Tsuruya 168|Charles Johnson 183|Petr Yan 170|Merab Dvalishvili 168|Sean O'Malley 180|Song Yadong 173|Umar Nurmagomedov 175|Mario Bautista 180|Cory Sandhagen 180|Payton Talbott 178|David Martinez 173|Aiemann Zahabi 173|Raul Rosas Jr. 168|Marlon Vera 173|Deiveson Figueiredo 168|Marcus McGhee 168|Raoni Barcelos 175|Bryce Mitchell 178|Alexander Volkanovski 168|Movsar Evloev 170|Diego Lopes 173|Lerone Murphy 180|Aljamain Sterling 168|Jean Silva 173|Arnold Allen 180|Pat Sabatini 173|Pavel Andrusca 173|Youssef Zalal 175|Aaron Pico 173|Kevin Vallejos 178|Joanderson Brito 175|Melquizael Costa 173|Steve Garcia 183|Jamall Emmers 178|Justin Gaethje 180|Ilia Topuria 170|Arman Tsarukyan 170|Charles Oliveira 178|Max Holloway 180|Paddy Pimblett 178|Benoît Saint Denis 180|Quillan Salkilld 180|Mauricio Ruffy 178|Salahdine Parnasse 175|Mateusz Gamrot 175|Rafael Fiziev 173|Renato Moicano 175|Dan Hooker 183|Tom Nolan 178|Beneil Dariush 175|Islam Makhachev 178|Carlos Prates 188|Ian Machado Garry 188|Michael Morales 188|Jack Della Maddalena 180|Sean Brady 180|Gabriel Bonfim 185|Belal Muhammad 180|Mike Malott 188|Uroš Medić 183|Leon Edwards 183|Kamaru Usman 183|Joaquin Buckley 178|Yaroslav Amosov 178|Jacobe Smith 183|Kevin Holland 193|Sean Strickland 185|Khamzat Chimaev 188|Dricus Du Plessis 185|Nassourdine Imavov 190|Brendan Allen 188|Joe Pyfer 183|Caio Borralho 188|Gregory Rodrigues 188|Anthony Hernandez 180|Abus Magomedov 183|Israel Adesanya 193|Ikram Aliskerov 183|Christian Leroy Duncan 183|Bo Nickal 183|Roman Kopylov 183|Edmen Shahbazyan 185|Carlos Ulberg 190|Alex Pereira 193|Magomed Ankalaev 190|Jiří Procházka 191|Dominick Reyes 193|Paulo Costa 185|Khalil Rountree Jr. 185|Navajo Stirling 193|Reinier de Ridder 193|Alonzo Menifield 193|Bogdan Guskov 193|Robert Whittaker 183|Muhammad Saidov 188|Abdul Rakhman Yakhyaev 188|Azamat Murzakanov 188|Modestas Bukauskas 188|Ciryl Gane 193|Tom Aspinall 196|Alexander Volkov 201|Sergei Pavlovich 191|Josh Hokit 188|Curtis Blaydes 193|Rizvan Kuniev 196|Waldo Cortes-Acosta 193|Vitor Petrino 193|Mario Pinto 196|Valter Walker 201|Johnny Walker 206|Brando Pericic 196|Serghei Spivac 188|Anthony Wint 193`.split("|").forEach(x=>{const i=x.lastIndexOf(" ");HT[x.slice(0,i)]=+x.slice(i+1)});
function info(o){if(o.info)return o.info;const hs=sdHash(o.name),p=o.power||70;let w,l;if(o.recordKnown){w=o.wins;l=o.losses}else{w=Math.round(9+(p-55)*.42)+hs%4;l=Math.max(0,Math.round((100-p)/9)+hs%3-1)}return o.info={h:HT[o.name]||((HB[s.weight]||175)+hs%13-6),w,l}}
const myRec=()=>`${s.wins}-${s.losses}-${s.draws} • ${s.height||178} cm`;
function metaLine(o){const i=info(o);return`${i.w}-${i.l}-0 • ${i.h} cm`}
/* ---------- fight tab cards + arena meta ---------- */
function ensureMeta(id){const a=document.getElementById(id);let m=a.querySelector(".arena-meta");if(!m){m=document.createElement("div");m.className="arena-meta";m.setAttribute("translate","no");m.style.cssText="font-size:12px;color:#aeb9ca;font-weight:600;margin-top:3px";a.appendChild(m)}return m}
function paint(){try{if(!opponent)return;const i=info(opponent);
 document.getElementById("myFightRecord").textContent=myRec();
 const rec=document.getElementById("oppRecord");rec.textContent=`${i.w}-${i.l}-0 • ${i.h} cm`+(opponent.country?` • ${opponent.country}`:"")+` • ${opponent.style||"MMA"}`;
 if((s.prospects||[]).some(p=>p.name===opponent.name))rec.insertAdjacentHTML("beforeend",` <span translate="no">• ${T("debut")}</span>`);
 ensureMeta("arenaMe").textContent=myRec();ensureMeta("arenaOpp").textContent=metaLine(opponent);setFace(document.querySelector("#arenaMe .arena-face"),s.name);setFace(document.querySelector("#arenaOpp .arena-face"),opponent.name);document.getElementById("arenaMeName").textContent=s.name;document.getElementById("arenaOppName").textContent=opponent.name}catch(e){}}
const _p8=prepareFight;prepareFight=function(){_p8.apply(this,arguments);paint()};
const _sim8=simulate;simulate=async function(){try{paint();document.getElementById("arenaMeName").textContent=s.name;document.getElementById("arenaOppName").textContent=opponent&&opponent.name}catch(e){}return _sim8.apply(this,arguments)};
/* ---------- announcer: portraits, record, height ---------- */
Object.assign(D.az,{srch:"🔍 Rəqib axtarılır…",found:"✅ Rəqib tapıldı!",offer:"Döyüş təklifi",wL:"Çəki",rL:"Rekord",hL:"Boy"});
Object.assign(D.en,{srch:"🔍 Searching for an opponent…",found:"✅ Opponent found!",offer:"Fight offer",wL:"Weight",rL:"Record",hL:"Height"});
Object.assign(D.tr,{srch:"🔍 Rakip aranıyor…",found:"✅ Rakip bulundu!",offer:"Dövüş teklifi",wL:"Sıklet",rL:"Rekor",hL:"Boy"});
const tc=c=>c?(off(c,LNG())||c):"";
const card=(n,rec,h,c)=>`<div class="ac" style="flex:1;min-width:0;border:2px solid #394560;border-radius:14px;padding:12px 6px;background:#0d1320cc;opacity:.4;transition:.4s"><div class="af" style="width:min(30vw,120px);height:min(30vw,120px);margin:0 auto 8px;border-radius:50%;overflow:hidden;border:3px solid #c6a65b"></div><div style="font-weight:1000;font-size:clamp(14px,4vw,22px);color:#f4c95d;word-break:break-word">${esc(n)}</div><div style="font-size:clamp(18px,5vw,28px);margin-top:4px">${rec}</div><div style="font-size:12px;color:#aeb9ca;font-weight:600;margin-top:2px">${T("hh",{h})} • ${T("kg",{k:KG[s.weight]||70})}${c?"<br>"+esc(tc(c)):""}</div></div>`;
function stage(html){const o=document.createElement("div");o.setAttribute("translate","no");o.style.cssText=OV;o.innerHTML=html;document.body.appendChild(o);return o}
window.__announcer=async function(){if(window.__skipFight)return;const i=info(opponent),hs=s.height||178;
 const o=stage(`<div id="ban" style="min-height:2.6em;margin-bottom:12px;font-size:clamp(14px,3.8vw,20px);color:#e63946;letter-spacing:2px"></div><div style="display:flex;gap:10px;width:100%;max-width:560px;align-items:stretch">${card(s.name,`${s.wins}-${s.losses}-${s.draws}`,hs,s.country)}<div style="align-self:center;font-weight:1000;font-style:italic;color:#e63946">VS</div>${card(opponent.name,`${i.w}-${i.l}-0`,i.h,opponent.country)}</div>`);
 let skip=false;o.onclick=()=>{skip=true};const wait=async ms=>{for(let k=0;k<ms/50&&!skip;k++)await sl(50)};
 const cs=o.querySelectorAll(".ac");[s.name,opponent.name].forEach((n,k)=>setFace(cs[k].querySelector(".af"),n));
 const ban=o.querySelector("#ban");
 for(const [k,right,nm,w,l,d,h] of [[0,0,s.name,s.wins,s.losses,s.draws,hs],[1,1,opponent.name,i.w,i.l,0,i.h]]){if(skip)break;cs.forEach((c,j)=>{c.style.opacity=j===k?1:.35;c.style.borderColor=j===k?(k?"#6aa9ff":"#e63946"):"#394560"});
  const line=`${right?T("cornerR"):T("cornerL")}, ${T("rec",{w,l,d})}, ${nm}!`;ban.textContent=(right?"🔵 ":"🔴 ")+line;try{cineSfx("roar")}catch(e){}speak(line);await wait(4300)}
 if(!skip){cs.forEach(c=>{c.style.opacity=1;c.style.borderColor="#f4c95d"});ban.style.color="#fff";ban.textContent=T("fight");try{cineSfx("bell")}catch(e){}speak(T("fight"));await wait(2600)}
 try{speechSynthesis.cancel()}catch(e){}o.remove()};
/* ---------- opponent search ---------- */
async function search(){const names=tierOpponentPool().map(x=>x[0]);if(!names.length||!opponent)return;
 const lab=eventInfo(s.nextFightWeek).label;
 const dt=new Date((s.calendarDate||"2026-11-13")+"T12:00:00");dt.setDate(dt.getDate()+Math.max(0,(s.nextFightWeek||1)-s.week)*7);const ds=azDate(dt),dl=off(ds,LNG())||ds;
 const o=stage(`<div style="color:#f4c95d;font-size:14px;letter-spacing:3px">${esc(lab)} • ${esc(dl)}</div><div style="margin:10px 0 6px;font-size:clamp(14px,3.6vw,18px);color:#9aa6ba">${T("offer")} • ${s.weight}</div><div id="sr" style="font-size:clamp(18px,5vw,28px);margin:14px 0">${T("srch")}</div><div id="sn" style="font-size:clamp(22px,7vw,40px);font-weight:1000;color:#fff;min-height:1.3em"></div>`);
 let skip=false;o.onclick=()=>{skip=true};const sn=o.querySelector("#sn");
 for(let k=0;k<16&&!skip;k++){sn.textContent=names[Math.floor(Math.random()*names.length)];try{cineSfx("tap")}catch(e){}await sl(110+k*22)}
 if(!skip){o.querySelector("#sr").textContent=T("found");sn.innerHTML=`<div class="af" style="width:min(34vw,130px);height:min(34vw,130px);margin:0 auto 10px;border-radius:50%;overflow:hidden;border:3px solid #c6a65b"></div>${esc(opponent.name)}<div style="font-size:clamp(14px,3.8vw,20px);color:#cfd6e4;font-weight:700;margin-top:6px">${metaLine(opponent)}${opponent.country?" • "+esc(tc(opponent.country)):""}</div>`;setFace(sn.querySelector(".af"),opponent.name);try{cineSfx("bell")}catch(e){}for(let k=0;k<30&&!skip;k++)await sl(100)}
 o.remove()}
const ab=document.getElementById("acceptFight"),prevA=ab.onclick;
ab.onclick=async function(){const ok=!s.dead&&!s.careerEnded&&!s.accepted&&s.week>=(s.nextFightWeek||1);if(ok){if(!opponent)prepareFight();try{await search()}catch(e){console.error(e)}}return prevA.apply(this,arguments)};
const db=document.getElementById("declineFight"),prevD=db.onclick;
db.onclick=async function(){const ok=!s.dead&&!s.careerEnded&&s.week>=(s.nextFightWeek||1);const r=prevD.apply(this,arguments);if(ok){try{await search()}catch(e){console.error(e)}}return r};
/* ---------- reset career -> choice screen again ---------- */
const rc=document.getElementById("resetCareer"),prevR=rc.onclick;
rc.onclick=function(){const before=s,r=prevR.apply(this,arguments);if(s!==before){const sc=document.getElementById("startChoice");if(sc)sc.style.display="grid"}return r};
/* ---------- failsafe: never leave a stuck overlay ---------- */
let age=0;setInterval(()=>{const e=document.getElementById("sitd");if(e&&e.classList.contains("on")){if(++age>30){e.classList.remove("on");e.innerHTML="";age=0}}else age=0},4000);
try{render();paint();trScan()}catch(e){}
})();

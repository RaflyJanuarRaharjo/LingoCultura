import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   1. DATA — Cultural Database (bilingual)
───────────────────────────────────────────────────────────────── */
const CULTURE_DB = [
  {
    id: 1, name: "Kebo-keboan", origin: "Banyuwangi, East Java",
    category: "Ritual Ceremony", emoji: "🐃", wikiTitle: "Kebo-keboan",
    bg: "linear-gradient(135deg,#8B5E3C,#C4956A)",
    card: "An agrarian ritual where humans transform into buffalo figures to call upon ancestral blessings for a bountiful harvest.",
    card_id: "Ritual agraris di mana manusia berubah menjadi sosok kerbau untuk memohon berkah leluhur demi panen yang melimpah.",
    detail: "A traditional ceremony by the Osing people where participants dress as buffaloes and plow the fields, symbolizing humanity's harmony with nature and gratitude to the Earth.",
    detail_id: "Upacara tradisional masyarakat Osing di mana peserta mendandani diri sebagai kerbau dan membajak sawah, melambangkan keselarasan manusia dengan alam dan rasa syukur kepada Bumi.",
    symbolism: "Black charcoal paint on the body represents the strength and grounding force of the earth.",
    symbolism_id: "Cat arang hitam di tubuh melambangkan kekuatan dan sifat membumi dari tanah.",
    metaphor: "The Human-Buffalo transformation stands as a metaphor for setting aside the ego to serve the survival of the community.",
    metaphor_id: "Transformasi Manusia-Kerbau merupakan metafora untuk mengesampingkan ego demi melayani kelangsungan hidup masyarakat.",
    translation: "Kebo-keboan is a reduplication of Kebo (buffalo), where the suffix -an signals mimicry or resemblance.",
    translation_id: "Kebo-keboan adalah pengulangan dari kata Kebo (kerbau), di mana akhiran -an menandakan peniruan atau kemiripan.",
  },
  {
    id: 2, name: "Temanten Kucing", origin: "Tulungagung, East Java",
    category: "Ritual Ceremony", emoji: "🐱", wikiTitle: "Temanten Kucing",
    bg: "linear-gradient(135deg,#E74C3C,#FFB347)",
    card: "A unique zoomorphic wedding ritual performed to petition the heavens for rain during extreme droughts.",
    card_id: "Ritual pernikahan zoomorphik unik yang dilakukan untuk memohon hujan kepada langit saat kemarau panjang.",
    detail: "A rain-invoking ritual involving the symbolic marriage of two cats, paraded and bathed in a sacred spring following the structure of a traditional Javanese wedding.",
    detail_id: "Ritual pemanggil hujan yang melibatkan pernikahan simbolik dua ekor kucing yang diarak dan dimandikan di mata air sakral mengikuti struktur pernikahan adat Jawa.",
    symbolism: "Bathing the cats symbolizes the cleansing of the land and the tears of the sky, rain.",
    symbolism_id: "Memandikan kucing melambangkan penyucian tanah dan 'air mata' langit, yaitu hujan.",
    metaphor: "The cat represents a pure, domestic soul whose discomfort during bathing is believed to trigger celestial sympathy.",
    metaphor_id: "Kucing mewakili jiwa yang murni dan jinak; ketidaknyamanannya saat dimandikan dipercaya memicu rasa empati dari langit.",
    translation: "Temanten (Bride/Groom) + Kucing (Cat), literally 'The Cat Wedding.'",
    translation_id: "Temanten (Pengantin) + Kucing (Kucing), secara harfiah berarti 'Pernikahan Kucing.'",
  },
  {
    id: 3, name: "Tari Seblang Bakungan", origin: "Banyuwangi, East Java",
    category: "Traditional Dance / Ritual", emoji: "💃", wikiTitle: "Seblang",
    bg: "linear-gradient(135deg,#9B59B6,#E056FD)",
    card: "An ancient trance ritual performed by elderly women to maintain spiritual equilibrium and protect the village from misfortune.",
    card_id: "Ritual trance kuno yang dilakukan oleh perempuan tua untuk menjaga keseimbangan spiritual dan melindungi desa dari malapetaka.",
    detail: "Performed by post-menopausal women in Bakungan village, this trance dance serves as communal exorcism to ward off bad luck (Tolak Bala).",
    detail_id: "Dilakukan oleh perempuan yang sudah menopause di Desa Bakungan, tarian trance ini merupakan bentuk pengusiran roh jahat komunal untuk menolak bala (Tolak Bala).",
    symbolism: "The Omprok headdress of banana leaves and flowers represents the cycle of life and rebirth.",
    symbolism_id: "Hiasan kepala Omprok yang terbuat dari daun pisang dan bunga melambangkan siklus kehidupan dan kelahiran kembali.",
    metaphor: "The dancer's trance bridges the mundane world and the ancestral realm.",
    metaphor_id: "Keadaan trance penari menjadi jembatan antara dunia fana dan alam leluhur.",
    translation: "Seblang is often interpreted as Sebele Ilang, which means the bad luck is gone.",
    translation_id: "Seblang sering diartikan sebagai Sebele Ilang, yang berarti malapetakanya telah pergi.",
  },
  {
    id: 4, name: "Topeng Malangan", origin: "Malang, East Java",
    category: "Performing Art / Mask Drama", emoji: "🎭", wikiTitle: "Topeng Malang",
    bg: "linear-gradient(135deg,#C0392B,#E74C3C)",
    card: "A kinetic storytelling medium where hand-carved wooden masks breathe life into the epic Panji cycles.",
    card_id: "Medium bercerita yang dinamis di mana topeng kayu ukiran tangan menghidupkan kisah epik siklus Panji.",
    detail: "A traditional mask dance drama from Malang portraying the romantic and heroic tales of Raden Panji, with specific character colors and expressions.",
    detail_id: "Drama tari topeng tradisional dari Malang yang menceritakan kisah romantis dan heroik Raden Panji, dengan warna dan ekspresi karakter yang khas.",
    symbolism: "Mask colors act as visual language: Red for passion, White for purity, and Green for noble intent.",
    symbolism_id: "Warna topeng berfungsi sebagai bahasa visual: Merah untuk semangat, Putih untuk kesucian, dan Hijau untuk niat mulia.",
    metaphor: "Wearing the mask is a metaphor for adopting a social role, echoing the Latin word Persona, which means mask.",
    metaphor_id: "Mengenakan topeng merupakan metafora untuk mengambil peran sosial, serupa dengan kata Latin Persona yang berarti topeng.",
    translation: "Topeng (Mask) + Malangan (of Malang style).",
    translation_id: "Topeng (Topeng) + Malangan (gaya Malang).",
  },
  {
    id: 5, name: "Larung Sembonyo", origin: "Trenggalek, East Java",
    category: "Ritual Ceremony", emoji: "⛵", wikiTitle: "Larung sesaji",
    bg: "linear-gradient(135deg,#1A6FA0,#48CAE4)",
    card: "A maritime offering ritual commemorating ancestral legends and expressing gratitude for the sea's abundance.",
    card_id: "Ritual persembahan maritim yang memperingati legenda leluhur dan mengungkapkan rasa syukur atas kelimpahan laut.",
    detail: "A sea-offering ritual at Prigi Beach where a miniature ship filled with offerings is floated into the ocean, honoring the legend of a wedding between a human and a sea deity.",
    detail_id: "Ritual persembahan laut di Pantai Prigi di mana sebuah miniatur kapal berisi sesaji diapungkan ke laut, menghormati legenda pernikahan antara manusia dan dewa laut.",
    symbolism: "Floating the offerings represents letting go of greed and returning blessings to their source.",
    symbolism_id: "Mengapungkan persembahan melambangkan tindakan melepaskan keserakahan dan mengembalikan berkah kepada sumbernya.",
    metaphor: "The ocean stands as a metaphor for the vast, uncontrollable power of the Divine.",
    metaphor_id: "Lautan merupakan metafora untuk kekuatan Ilahi yang luas dan tak terkendali.",
    translation: "Larung (to float away) + Sembonyo (referring to traditional bride and groom effigies).",
    translation_id: "Larung (dihanyutkan) + Sembonyo (mengacu pada pengantin wayang tradisional).",
  },
  {
    id: 6, name: "Tiban", origin: "Trenggalek / Pacitan, East Java",
    category: "Traditional Sport / Ritual", emoji: "⚡", wikiTitle: "Tiban (game)",
    bg: "linear-gradient(135deg,#4A4A4A,#888888)",
    card: "A sacred whip duel traditionally associated with prayers for rain and the arrival of the monsoon season.",
    card_id: "Duel cemeti sakral yang secara tradisional dikaitkan dengan doa untuk hujan dan kedatangan musim hujan.",
    detail: "A ritual whip fight between two men using whips made from sugar palm leaf ribs, traditionally performed to request rain from the sky.",
    detail_id: "Pertarungan cemeti ritual antara dua pria menggunakan cambuk dari tulang daun aren, secara tradisional dilakukan untuk memohon hujan dari langit.",
    symbolism: "The scars left by the whip represent the cracks in the dry earth awaiting water.",
    symbolism_id: "Bekas luka cambuk melambangkan retakan di tanah kering yang menunggu air.",
    metaphor: "The duel embodies the masculine struggle against the harshness of nature.",
    metaphor_id: "Duel tersebut mewujudkan perjuangan maskulin melawan kerasnya alam.",
    translation: "Tiban derives from Tiba (to fall), referring to rain falling from the sky.",
    translation_id: "Tiban berasal dari kata Tiba (jatuh), mengacu pada hujan yang jatuh dari langit.",
  },
  {
    id: 7, name: "Reog Ponorogo", origin: "Ponorogo, East Java",
    category: "Traditional Performing Art", emoji: "🦁", wikiTitle: "Reog",
    bg: "linear-gradient(135deg,#D4AC0D,#F39C12)",
    card: "A grand synthesis of physical prowess and mystical narrative, manifested through the iconic lion-peacock mask.",
    card_id: "Sintesis agung antara keberanian fisik dan narasi mistis, terwujud melalui topeng singa-merak yang ikonik.",
    detail: "A world-famous performance featuring the Dadak Merak, a massive tiger-head mask adorned with peacock feathers, weighing up to 50kg, carried solely by the dancer's teeth.",
    detail_id: "Pertunjukan terkenal di dunia yang menampilkan Dadak Merak, topeng kepala harimau raksasa yang dihiasi bulu merak, berbobot hingga 50kg, dibawa hanya oleh gigi penarinya.",
    symbolism: "The tiger mask represents courage and power; the peacock feathers represent elegance, authority, and spiritual beauty.",
    symbolism_id: "Topeng harimau melambangkan keberanian dan kekuatan; bulu merak melambangkan keanggunan, wibawa, dan keindahan spiritual.",
    metaphor: "The entire performance is interpreted as the triumph of strategy and cultural expression over raw physical power.",
    metaphor_id: "Seluruh pertunjukan dimaknai sebagai kemenangan strategi dan ekspresi budaya atas kekuatan fisik mentah.",
    translation: "Possibly from Riyok (Javanese: festive noise) or Ma'rufun (Arabic: known / goodness).",
    translation_id: "Kemungkinan dari Riyok (Jawa: kebisingan meriah) atau Ma'rufun (Arab: yang dikenal / kebaikan).",
  },
  {
    id: 8, name: "Ludruk", origin: "Jombang / Surabaya, East Java",
    category: "Traditional Folk Theater", emoji: "🎪", wikiTitle: "Ludruk",
    bg: "linear-gradient(135deg,#16A085,#1ABC9C)",
    card: "East Java's people's theater, a rowdy blend of satire, song, and social critique wrapped in laughter.",
    card_id: "Teater rakyat Jawa Timur, perpaduan satire, lagu, dan kritik sosial yang dikemas dalam tawa.",
    detail: "A folk drama performed by an all-male cast, including men in female roles, known for its egalitarian language and sharp social commentary.",
    detail_id: "Drama rakyat yang dimainkan oleh seluruh pemeran pria, termasuk pria yang berperan sebagai wanita, dikenal karena bahasa yang egaliter dan komentar sosial yang tajam.",
    symbolism: "Cross-dressing (Travesthy) symbolizes social inversion and the fluidity of identity.",
    symbolism_id: "Penyamaran jenis kelamin (Travesthi) melambangkan inversi sosial dan keluwesan identitas.",
    metaphor: "A Democracy in sequins: using humor as a political assertion against injustice.",
    metaphor_id: "Demokrasi berbaju gemerlap: menggunakan humor sebagai pernyataan politis melawan ketidakadilan.",
    translation: "Derived from Ludh-ludh (to be flexible) or Luthur (to speak humorously).",
    translation_id: "Berasal dari Ludh-ludh (luwes/fleksibel) atau Luthur (berbicara dengan jenaka).",
  },
  {
    id: 9, name: "Tumpeng", origin: "East Java (General Java)",
    category: "Gastronomy / Ritual Food", emoji: "🍚", wikiTitle: "Tumpeng",
    bg: "linear-gradient(135deg,#B7950B,#F1C40F)",
    card: "A culinary representation of the Javanese cosmos, where earth and heaven converge at a single peak.",
    card_id: "Representasi kuliner dari kosmologi Jawa, di mana bumi dan surga bertemu di satu puncak.",
    detail: "Cone-shaped yellow rice surrounded by seven types of side dishes, traditionally served during Selamatan to mark important life events.",
    detail_id: "Nasi kuning berbentuk kerucut yang dikelilingi tujuh jenis lauk pauk, secara tradisional disajikan saat Selamatan untuk menandai peristiwa penting dalam hidup.",
    symbolism: "The cone shape represents the sacred mountain (Gunungan), the dwelling place of deities and ancestors in Javanese cosmology.",
    symbolism_id: "Bentuk kerucut melambangkan gunung suci (Gunungan), tempat tinggal para dewa dan leluhur dalam kosmologi Jawa.",
    metaphor: "The side dishes represent the diverse elements of life harmonized on one plate.",
    metaphor_id: "Lauk pauk melambangkan berbagai elemen kehidupan yang selaras dalam satu hidangan.",
    translation: "Folk etymology interprets it as Tumapak ing lempeng, to live honestly and with integrity.",
    translation_id: "Tafsir rakyat Jawa memaknainya sebagai Tumapak ing lempeng, hidup dengan jujur dan berintegritas.",
  },
  {
    id: 10, name: "Rawon", origin: "East Java",
    category: "Gastronomy", emoji: "🍲", wikiTitle: "Rawon",
    bg: "linear-gradient(135deg,#1C1C1C,#555555)",
    card: "A legendary black beef soup characterized by the rich, earthy depth of the fermented kluwek nut.",
    card_id: "Sup sapi hitam legendaris yang ditandai oleh kedalaman rasa tanah yang kaya dari kacang kluwek yang difermentasi.",
    detail: "A deep-black beef soup cited as one of the world's best soups, using kluwek (Pangium edule) for its signature color and nutty flavor.",
    detail_id: "Sup sapi hitam pekat yang disebut sebagai salah satu sup terbaik di dunia, menggunakan kluwek (Pangium edule) untuk warna khasnya dan cita rasa yang berpadu.",
    symbolism: "The black color represents deep wisdom within Javanese philosophy, the concept of Warna Ireng.",
    symbolism_id: "Warna hitam melambangkan kebijaksanaan tersembunyi dalam filosofi Jawa, konsep Warna Ireng.",
    metaphor: "Rawon is called Black Gold, a metaphor for humble appearances concealing extraordinary richness.",
    metaphor_id: "Rawon sering disebut sebagai Emas Hitam, metafora untuk penampilan sederhana yang menyembunyikan kekayaan luar biasa.",
    translation: "Derived from the Old Javanese root Raru, referring to dark coloring agents in traditional culinary arts.",
    translation_id: "Berasal dari akar bahasa Jawa Kuno Raru, mengacu pada bahan pewarna gelap dalam seni kuliner tradisional.",
  },
  {
    id: 11, name: "Karapan Sapi", origin: "Madura, East Java",
    category: "Traditional Sport", emoji: "🐂", wikiTitle: "Kerapan sapi",
    bg: "linear-gradient(135deg,#7D3C0A,#CA6F1E)",
    card: "A prestigious bull racing event showcasing the strength, pride, and competitive spirit of the Madurese people.",
    card_id: "Ajang pacuan sapi bergengsi yang menampilkan kekuatan, kebanggaan, dan semangat kompetitif masyarakat Madura.",
    detail: "A high-speed bull race where a pair of bulls pulls a wooden sled (Kaleles) with a jockey, covering 100 meters in mere seconds.",
    detail_id: "Balapan sapi berkecepatan tinggi di mana sepasang sapi menarik kereta kayu (Kaleles) dengan seorang joki, menempuh 100 meter dalam hitungan detik.",
    symbolism: "The bulls represent the vitality and resilience of the people in the arid land of Madura.",
    symbolism_id: "Sapi melambangkan vitalitas dan ketangguhan masyarakat di tanah Madura yang tandus.",
    metaphor: "The race reflects the struggle to achieve social status and honor, the Madurese concept of Harga Diri.",
    metaphor_id: "Balapan tersebut mencerminkan perjuangan untuk meraih status sosial dan kehormatan, konsep Harga Diri orang Madura.",
    translation: "Derived from Kerap, meaning to organize or to race.",
    translation_id: "Berasal dari kata Kerap, yang berarti mengatur atau berlomba.",
  },
  {
    id: 12, name: "Selamatan Ketupat", origin: "Bondowoso, East Java",
    category: "Ritual Ceremony / Gastronomy", emoji: "🍱", wikiTitle: "Ketupat",
    bg: "linear-gradient(135deg,#1E8449,#2ECC71)",
    card: "A communal thanksgiving ritual celebrating peace and spiritual unity through the sharing of traditional rice cakes.",
    card_id: "Ritual syukuran komunal yang merayakan kedamaian dan persatuan spiritual melalui berbagi kue beras tradisional.",
    detail: "A unique ritual in Bondowoso villages where people gather to pray and exchange Ketupat and Serabi, symbolizing the washing away of sins and social friction.",
    detail_id: "Ritual unik di desa-desa Bondowoso di mana warga berkumpul untuk berdoa dan saling berbagi Ketupat dan Serabi, melambangkan penghapusan dosa dan gesekan sosial.",
    symbolism: "The intricate weaving of Ketupat represents the complexity of human errors; the white rice inside stands for purity after forgiveness.",
    symbolism_id: "Anyaman Ketupat yang rumit melambangkan kompleksitas kesalahan manusia; nasi putih di dalamnya melambangkan kemurnian setelah mendapat maaf.",
    metaphor: "The soft texture of Serabi is a metaphor for the gentleness needed in community relations.",
    metaphor_id: "Tekstur Serabi yang lembut merupakan metafora untuk kelembutan yang dibutuhkan dalam hubungan bermasyarakat.",
    translation: "Ketupat comes from Ngaku Lepat, admitting one's mistakes.",
    translation_id: "Ketupat berasal dari Ngaku Lepat, mengakui kesalahan diri sendiri.",
  },
  {
    id: 13, name: "Ritual Seblang Olehsari", origin: "Banyuwangi, East Java",
    category: "Traditional Dance / Ritual", emoji: "🌸", wikiTitle: "Seblang",
    bg: "linear-gradient(135deg,#C0327A,#F472B6)",
    card: "A youthful iteration of the Seblang ritual, performed by a maiden traditionally associated with hopes for agricultural prosperity.",
    card_id: "Versi muda dari ritual Seblang, dilakukan oleh seorang gadis yang secara tradisional dikaitkan dengan harapan kemakmuran pertanian.",
    detail: "Performed annually in Olehsari village for seven consecutive days after Eid al-Fitr, featuring a young girl in a trance wearing a mask of flowers.",
    detail_id: "Dilakukan setiap tahun di Desa Olehsari selama tujuh hari berturut-turut setelah Hari Raya Idul Fitri, menampilkan seorang gadis muda dalam keadaan trance mengenakan topeng bunga.",
    symbolism: "Fresh flowers in the headdress symbolize youth, fertility, and the flourishing of crops.",
    symbolism_id: "Bunga segar di hiasan kepala melambangkan kemudaan, kesuburan, dan kemakmuran tanaman.",
    metaphor: "The seven-day duration represents the cycle of the week and the continuity of time.",
    metaphor_id: "Durasi tujuh hari melambangkan siklus minggu dan keberlangsungan waktu.",
    translation: "Olehsari refers to the village name, which literally means obtaining the essence or finding the core.",
    translation_id: "Olehsari mengacu pada nama desa, yang secara harfiah berarti mendapatkan inti atau menemukan esensi.",
  },
  {
    id: 14, name: "Tumpeng Sewu", origin: "Banyuwangi, East Java",
    category: "Ritual Ceremony", emoji: "🕯️", wikiTitle: "Tumpeng sewu",
    bg: "linear-gradient(135deg,#B7440A,#E67E22)",
    card: "A village-wide ritual of a thousand cones that transforms a shared meal into a spiritual shield for the community.",
    card_id: "Ritual serentak satu desa berupa seribu tumpeng yang mengubah makan bersama menjadi perisai spiritual bagi komunitas.",
    detail: "A massive ritual in Kemiren village where every household serves Tumpeng Pecel Pitik at their doorstep to foster solidarity and ward off misfortune.",
    detail_id: "Ritual besar di Desa Kemiren di mana setiap rumah tangga menyajikan Tumpeng Pecel Pitik di depan pintu untuk mempererat solidaritas dan menolak malapetaka.",
    symbolism: "The number thousand (Sewu) represents infinity and the collective strength of the community.",
    symbolism_id: "Angka seribu (Sewu) melambangkan ketidakterbatasan dan kekuatan kolektif masyarakat.",
    metaphor: "The row of Tumpeng along the street forms a metaphor for a protective wall built from unity.",
    metaphor_id: "Deretan Tumpeng di sepanjang jalan merupakan metafora untuk tembok pelindung yang dibangun dari persatuan.",
    translation: "Tumpeng (Rice cone) + Sewu (Thousand).",
    translation_id: "Tumpeng (kerucut nasi) + Sewu (Seribu).",
  },
  {
    id: 15, name: "Pecel Madiun", origin: "Madiun, East Java",
    category: "Gastronomy", emoji: "🥜", wikiTitle: "Pecel",
    bg: "linear-gradient(135deg,#7D5A1A,#D4A017)",
    card: "A vibrant vegetable ensemble harmonized by a spicy peanut sauce, traditionally served on a folded banana leaf.",
    card_id: "Sajian sayuran beragam yang diselaraskan oleh saus kacang pedas, secara tradisional disajikan di atas daun pisang yang dilipat.",
    detail: "A signature dish of Madiun featuring steamed vegetables with a distinctively spicy, citrusy peanut sauce, often served in a Pincuk (banana leaf).",
    detail_id: "Hidangan khas Madiun yang terdiri dari sayuran kukus dengan saus kacang yang khas, pedas dan beraroma jeruk, sering disajikan dalam Pincuk (daun pisang).",
    symbolism: "The variety of vegetables represents community diversity; the peanut sauce symbolizes social cohesion by binding diverse ingredients into one dish.",
    symbolism_id: "Ragam sayuran melambangkan keberagaman komunitas; saus kacang melambangkan kohesi sosial dengan menyatukan bahan-bahan yang beragam dalam satu hidangan.",
    metaphor: "Pecel proves humble ingredients can create something extraordinary, a metaphor for simplicity as a virtue.",
    metaphor_id: "Pecel membuktikan bahwa bahan-bahan sederhana dapat menciptakan sesuatu yang luar biasa, metafora untuk kesederhanaan sebagai kebajikan.",
    translation: "Pecel derives from the Javanese verb Mecel, meaning to crush or press, referring to the peanut-grinding process.",
    translation_id: "Pecel berasal dari kata kerja Jawa Mecel, yang berarti menghancurkan atau menekan, mengacu pada proses menghaluskan kacang.",
  },
  {
    id: 16, name: "Tari Remo", origin: "Surabaya / Jombang, East Java",
    category: "Traditional Dance", emoji: "💫", wikiTitle: "Remo (dance)",
    bg: "linear-gradient(135deg,#1565C0,#1CB0F6)",
    card: "A dynamic welcoming dance symbolizing a prince's bravery, characterized by rhythmic bells and powerful leg movements.",
    card_id: "Tarian penyambutan yang dinamis yang melambangkan keberanian seorang pangeran, ditandai dengan gemerincing gongseng dan gerakan kaki yang kuat.",
    detail: "Originally a dance to open Ludruk performances, Tari Remo is now East Java's official welcoming dance, showcasing the bold and open Arek spirit of Surabaya.",
    detail_id: "Awalnya tarian pembuka pertunjukan Ludruk, Tari Remo kini menjadi tarian penyambutan resmi Jawa Timur yang menampilkan semangat Arek Surabaya yang berani dan terbuka.",
    symbolism: "The Gongseng ankle bells symbolize the heartbeat of the land and the alertness of a warrior.",
    symbolism_id: "Gongseng, gelang kaki bergerincing, melambangkan detak jantung bumi dan kewaspadaan seorang prajurit.",
    metaphor: "The wide, low stance of the dancer represents being down to earth (Rendah Hati) while remaining strong.",
    metaphor_id: "Kuda-kuda yang lebar dan rendah dari penari merupakan metafora untuk sikap membumi (Rendah Hati) sembari tetap kuat.",
    translation: "Derived from Reyange (vibrant facial expression) and Momo (masculine spirit).",
    translation_id: "Berasal dari Reyange (ekspresi wajah yang hidup) dan Momo (jiwa maskulin).",
  },
  {
    id: 17, name: "Sate Madura", origin: "Madura, East Java",
    category: "Gastronomy", emoji: "🍢", wikiTitle: "Satay",
    bg: "linear-gradient(135deg,#CC3000,#FF7043)",
    card: "A global culinary icon featuring skewered grilled chicken served with a velvety, rich peanut sauce.",
    card_id: "Ikon kuliner global berupa potongan ayam bakar yang ditusuk dan disajikan dengan saus kacang yang lembut dan kaya.",
    detail: "Perhaps the most famous Indonesian satay, known for its fine peanut sauce and sweet soy sauce, representing the entrepreneurial spirit of the Madurese people who spread this dish worldwide.",
    detail_id: "Mungkin sate Indonesia yang paling terkenal, dikenal dengan saus kacang halusnya dan kecap manis, mewakili semangat wirausaha masyarakat Madura yang menyebarkan hidangan ini ke seluruh dunia.",
    symbolism: "The skewer (Tusuk) represents unity, bringing diverse pieces together into one whole.",
    symbolism_id: "Tusuk sate melambangkan persatuan, menyatukan potongan-potongan yang beragam menjadi satu keutuhan.",
    metaphor: "Grilling over charcoal is a metaphor for the refinement of character through heat and pressure.",
    metaphor_id: "Dipanggang di atas arang merupakan metafora untuk penyempurnaan karakter melalui panas dan tekanan.",
    translation: "The term Sate reflects the phonetic adaptation of regional dialects into the national Indonesian language.",
    translation_id: "Istilah Sate mencerminkan adaptasi fonetis dialek daerah ke dalam bahasa Indonesia nasional.",
  },
  {
    id: 18, name: "Entas-entas", origin: "Tengger, East Java",
    category: "Ritual Ceremony", emoji: "🙏", wikiTitle: "Tengger people",
    bg: "linear-gradient(135deg,#5B2C8D,#9B59B6)",
    card: "A sacred Tenggerese ritual believed to help the soul transition peacefully into the ancestral realm.",
    card_id: "Ritual sakral masyarakat Tengger yang dipercaya membantu roh bertransisi dengan damai menuju alam leluhur.",
    detail: "A post-mortuary ritual by the Tengger Hindu community using Petra (soul effigies) made of woven bamboo and flowers to release the spirit from earthly attachments.",
    detail_id: "Ritual pasca kematian oleh komunitas Hindu Tengger menggunakan Petra (efigi roh) yang terbuat dari anyaman bambu dan bunga untuk melepaskan roh dari keterikatan duniawi.",
    symbolism: "The Petra effigy, made of woven bamboo and flowers, represents the human body and its earthly spirit.",
    symbolism_id: "Efigi Petra yang terbuat dari anyaman bambu dan bunga mewakili tubuh manusia dan roh duniawinya.",
    metaphor: "Lifting the effigy is a metaphor for the soul ascending beyond the physical world.",
    metaphor_id: "Mengangkat efigi merupakan metafora untuk roh yang naik melampaui dunia fisik.",
    translation: "Derived from the Javanese word Entas, meaning to lift out or to rescue from a state of being.",
    translation_id: "Berasal dari kata Jawa Entas, yang berarti mengangkat keluar atau menyelamatkan dari suatu keadaan.",
  },
  {
    id: 19, name: "Jaranan", origin: "Kediri / Tulungagung, East Java",
    category: "Performing Art / Dance", emoji: "🐴", wikiTitle: "Jaran kepang",
    bg: "linear-gradient(135deg,#5D4037,#A1887F)",
    card: "A spirited horse dance depicting a troop of cavalrymen, often involving mystical elements and communal trance.",
    card_id: "Tarian kuda yang penuh semangat menggambarkan pasukan kavaleri, sering melibatkan unsur mistis dan trance komunal.",
    detail: "A traditional performance using woven bamboo horses (Jaran Kepang), depicting historical heroes and often culminating in a trance state called Ndadi.",
    detail_id: "Pertunjukan tradisional menggunakan kuda anyaman bambu (Jaran Kepang), menggambarkan pahlawan bersejarah dan sering berakhir dengan keadaan trance yang disebut Ndadi.",
    symbolism: "The bamboo horse represents the agility and fighting spirit of the Javanese cavalry.",
    symbolism_id: "Kuda bambu melambangkan ketangkasan dan semangat tempur kavaleri Jawa.",
    metaphor: "The Ndadi (trance) state represents the entry of divine or ancestral inspiration into human action.",
    metaphor_id: "Keadaan Ndadi (trance) melambangkan masuknya inspirasi ilahi atau leluhur ke dalam tindakan manusia.",
    translation: "Jaran (Horse) + suffix -an (mimicry of).",
    translation_id: "Jaran (Kuda) + akhiran -an (peniruan).",
  },
  {
    id: 20, name: "Manten Tebu", origin: "Jombang / Kediri, East Java",
    category: "Ritual Ceremony / Tradition", emoji: "🎋", wikiTitle: "Sugarcane",
    bg: "linear-gradient(135deg,#145A32,#27AE60)",
    card: "A symbolic wedding of sugarcane stalks performed to ensure a sweet and abundant harvest for the local sugar industry.",
    card_id: "Pernikahan simbolik batang-batang tebu yang dilakukan untuk memastikan panen yang manis dan melimpah bagi industri gula setempat.",
    detail: "Performed before the milling season in sugar factories, where two sugarcane stalks are dressed as a bride and groom to bring sweetness and safety to the workers.",
    detail_id: "Dilakukan sebelum musim giling di pabrik gula, di mana dua batang tebu didandani sebagai pengantin pria dan wanita untuk membawa kemanisan dan keselamatan bagi para pekerja.",
    symbolism: "The sweetness of sugarcane represents hope for a prosperous life and sweet results from hard labor.",
    symbolism_id: "Rasa manis tebu melambangkan harapan untuk kehidupan yang sejahtera dan hasil yang manis dari kerja keras.",
    metaphor: "The marriage symbolizes the union between human effort and the natural potential of the land.",
    metaphor_id: "Pernikahan melambangkan persatuan antara usaha manusia dan potensi alam dari tanah.",
    translation: "Manten (Bride/Groom) + Tebu (Sugar Cane).",
    translation_id: "Manten (Pengantin) + Tebu (Tebu).",
  },
];

/* ─────────────────────────────────────────────────────────────────
   2. CONFIG — Difficulty levels, Game modes, Team members
───────────────────────────────────────────────────────────────── */
const DIFF = {
  easy:   { pairs: 4, base: 10, time: 90,  label: "Easy",   dot: "🟢", color: "#58CC02", dark: "#45A800" },
  medium: { pairs: 6, base: 20, time: 150, label: "Medium", dot: "🟡", color: "#FFB020", dark: "#E09000" },
  hard:   { pairs: 8, base: 30, time: 210, label: "Hard",   dot: "🔴", color: "#FF4B4B", dark: "#D93B3B" },
};

const GAME_MODES = [
  {
    key: "classic",
    icon: "🃏",
    name: "Classic Match",
    desc: "Match cultural names to their descriptions at your own pace. Perfect for first-timers.",
    tag: "Relaxed",
    tagColor: "#58CC02",
  },
  {
    key: "timeAttack",
    icon: "⏱️",
    name: "Time Attack",
    desc: "Same matching mechanic, but the clock is ticking! How fast can you go?",
    tag: "Fast-Paced",
    tagColor: "#FFB020",
  },
  {
    key: "memoryFlip",
    icon: "🔁",
    name: "Memory Flip",
    desc: "Flip hidden cards and find matching pairs. Put your visual memory to the test!",
    tag: "Memory",
    tagColor: "#1CB0F6",
  },
];

const TEAM_MEMBERS = [
  { name: "Nareswari Maia H.", role: "UI/UX Designer & Web Developer", color: "58CC02", bg: "F0FFF0" },
  { name: "Yusnina Afifah",    role: "Cultural Researcher",            color: "1CB0F6", bg: "E8F8FF" },
  { name: "Anindya R. D.",     role: "Cultural Researcher",            color: "FF9600", bg: "FFF5E0" },
  { name: "Rosita Choirin",    role: "Linguistics Specialist",         color: "FF4B4B", bg: "FFF0F0" },
  { name: "Ihsan Pria D.",     role: "Linguistics Specialist",         color: "9B59B6", bg: "F5EEFF" },
];

const MODE_NAMES = {
  classic:    "Classic Match",
  timeAttack: "Time Attack",
  memoryFlip: "Memory Flip",
};

/* ─────────────────────────────────────────────────────────────────
   3. BILINGUAL UI TEXT
───────────────────────────────────────────────────────────────── */
const T = {
  en: {
    navHome: "Home", navAbout: "About", navModes: "Modes", navTeam: "Team",
    navEnc: "Encyclopedia", navPlay: "Play Now",
    heroBadge: "20 Cultural Items from East Java",
    heroTitle1: "Discover East Java",
    heroTitle2: "Through Play",
    heroSub: "Match cards, flip memories, and race the clock, all while uncovering the living heritage, language, and meaning behind East Java's most iconic traditions.",
    heroPlay: "Start Playing", heroBrowse: "Browse Encyclopedia",
    aboutLabel: "What is Lingo Cultura?",
    aboutTitle: "Culture Meets Language, Learning Meets Fun",
    aboutSub: "Lingo Cultura turns passive scrolling into active discovery. We blend gamification with academic linguistics, so you're not just memorizing names, you're understanding what they really mean.",
    f1title: "3 Game Modes", f1desc: "Classic Match, Time Attack, and Memory Flip, each testing a different cognitive skill.",
    f2title: "Linguistic Depth", f2desc: "Every correct match unlocks a pop-up with symbolism, metaphor, and etymology analysis.",
    f3title: "Bilingual Access", f3desc: "Built for both Indonesian students and international audiences curious about Javanese culture.",
    aboutVisual: "From ritual ceremonies and performing arts to gastronomy and traditional sports, every card tells a story worth knowing.",
    modesLabel: "How to Play", modesTitle: "Three Ways to Explore",
    m1name: "Classic Match", m1desc: "Two columns, cultural names on the left, descriptions on the right. Click a name, then click its matching description. No rush, just pure comprehension.", m1tag: "Beginner-Friendly",
    m2name: "Time Attack",   m2desc: "Same matching mechanic as Classic, but you're racing a countdown timer. Every second counts, can you match them all before the clock hits zero?",       m2tag: "High Pressure",
    m3name: "Memory Flip",   m3desc: "All cards are face-down. Flip two at a time to find matching pairs, an image card and its name card. Wrong guess? They flip back. Right? They stay revealed!", m3tag: "Test Your Memory",
    chooseMode: "Choose Your Mode",
    teamLabel: "The People Behind It", teamTitle: "Meet the Team",
    footerTag: "Preserving East Java's heritage, one card at a time.",
    footerSub: "A web-based cultural gamification project · All cultural data sourced from East Java traditions",
    hubTitle: "Pick Your Game Mode",
    hubSub: "Choose how you want to explore East Java's cultural heritage.",
    hubModeLabel: "Game Mode", hubDiffLabel: "Difficulty",
    hubStart: (name, diff) => `Start ${name}: ${diff}`,
    hubPick: "Select a mode and difficulty to start",
    exitBtn: "Exit", backBtn: "Back", backHome: "Back to Home",
    encTitle: "Cultural Encyclopedia",
    encSearch: "Search by name, origin, or keyword...",
    encEmpty: "No results found.",
    colNames: "Cultural Names", colDesc: "Descriptions",
    hintSelect: (name) => `"${name}" selected, now pick the matching description!`,
    hintStart: "Click a name on the left to start matching",
    lingTitle: "Linguistic Analysis",
    symbolism: "Symbolism", metaphor: "Metaphor", translation: "Translation",
    gotIt: "Understood", totalScore: "TOTAL SCORE",
    maxStreak: "Max Streak", efficiency: "Efficiency", pairsMatched: "Pairs Matched",
    playAgain: "Play Again", browseEnc: "Browse Encyclopedia", mainMenu: "Main Menu",
    resultMsg: (pct) => pct >= 80 ? "Outstanding! You're a true East Java expert!" : pct >= 50 ? "Great job! You know your Javanese culture!" : "Nice effort! Keep exploring East Java's heritage!",
    score: "Score", streak: "Streak", time: "Time", matched: "matched",
  },
  id: {
    navHome: "Beranda", navAbout: "Tentang", navModes: "Mode", navTeam: "Tim",
    navEnc: "Ensiklopedia", navPlay: "Main Sekarang",
    heroBadge: "20 Item Budaya dari Jawa Timur",
    heroTitle1: "Jelajahi Jawa Timur",
    heroTitle2: "Lewat Bermain",
    heroSub: "Cocokkan kartu, latih memori, dan kejar waktu, sambil mengungkap warisan, bahasa, dan makna di balik tradisi paling ikonik Jawa Timur.",
    heroPlay: "Mulai Bermain", heroBrowse: "Lihat Ensiklopedia",
    aboutLabel: "Apa itu Lingo Cultura?",
    aboutTitle: "Budaya Bertemu Bahasa, Belajar Bertemu Seru",
    aboutSub: "Lingo Cultura mengubah scrolling pasif menjadi penemuan aktif. Kami memadukan gamifikasi dengan linguistik akademis, sehingga kamu tidak hanya menghafal nama, tapi benar-benar memahami maknanya.",
    f1title: "3 Mode Permainan", f1desc: "Classic Match, Time Attack, dan Memory Flip, masing-masing menguji kemampuan kognitif yang berbeda.",
    f2title: "Kedalaman Linguistik", f2desc: "Setiap kecocokan yang benar membuka pop-up berisi analisis simbolisme, metafora, dan etimologi.",
    f3title: "Akses Bilingual", f3desc: "Dirancang untuk pelajar Indonesia dan audiens internasional yang tertarik dengan budaya Jawa.",
    aboutVisual: "Dari upacara ritual dan seni pertunjukan hingga gastronomi dan olahraga tradisional, setiap kartu menyimpan cerita yang layak diketahui.",
    modesLabel: "Cara Bermain", modesTitle: "Tiga Cara Menjelajahi",
    m1name: "Classic Match", m1desc: "Dua kolom, nama budaya di kiri, deskripsi di kanan. Klik nama, lalu klik deskripsi yang cocok. Santai saja, tanpa tekanan waktu.", m1tag: "Ramah Pemula",
    m2name: "Time Attack",   m2desc: "Mekanisme yang sama dengan Classic, tapi kamu dikejar hitungan mundur. Setiap detik berharga, bisakah kamu mencocokkan semuanya sebelum waktu habis?", m2tag: "Tekanan Tinggi",
    m3name: "Memory Flip",   m3desc: "Semua kartu menghadap ke bawah. Balik dua kartu sekaligus untuk menemukan pasangan, antara kartu gambar dan kartu nama. Salah? Kartu tertutup lagi. Benar? Kartu tetap terbuka!", m3tag: "Uji Memori",
    chooseMode: "Pilih Mode",
    teamLabel: "Orang-Orang di Baliknya", teamTitle: "Kenali Tim Kami",
    footerTag: "Melestarikan warisan Jawa Timur, satu kartu dalam satu waktu.",
    footerSub: "Proyek gamifikasi budaya berbasis web · Semua data budaya bersumber dari tradisi Jawa Timur",
    hubTitle: "Pilih Mode Permainanmu",
    hubSub: "Pilih cara kamu ingin menjelajahi warisan budaya Jawa Timur.",
    hubModeLabel: "Mode Permainan", hubDiffLabel: "Tingkat Kesulitan",
    hubStart: (name, diff) => `Mulai ${name}: ${diff}`,
    hubPick: "Pilih mode dan tingkat kesulitan untuk mulai",
    exitBtn: "Keluar", backBtn: "Kembali", backHome: "Kembali ke Beranda",
    encTitle: "Ensiklopedia Budaya",
    encSearch: "Cari berdasarkan nama, asal, atau kata kunci...",
    encEmpty: "Tidak ada hasil yang ditemukan.",
    colNames: "Nama Budaya", colDesc: "Deskripsi",
    hintSelect: (name) => `"${name}" dipilih, sekarang pilih deskripsi yang cocok!`,
    hintStart: "Klik nama di sebelah kiri untuk mulai mencocokkan",
    lingTitle: "Analisis Linguistik",
    symbolism: "Simbolisme", metaphor: "Metafora", translation: "Terjemahan",
    gotIt: "Mengerti", totalScore: "SKOR TOTAL",
    maxStreak: "Streak Tertinggi", efficiency: "Efisiensi", pairsMatched: "Pasangan Cocok",
    playAgain: "Main Lagi", browseEnc: "Lihat Ensiklopedia", mainMenu: "Menu Utama",
    resultMsg: (pct) => pct >= 80 ? "Luar biasa! Kamu benar-benar ahli budaya Jawa Timur!" : pct >= 50 ? "Kerja bagus! Kamu mengenal budaya Jawa dengan baik!" : "Usaha yang bagus! Terus jelajahi warisan Jawa Timur!",
    score: "Skor", streak: "Streak", time: "Waktu", matched: "cocok",
  },
};

/* ─────────────────────────────────────────────────────────────────
   4. UTILITIES
───────────────────────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Javanese/local cultural terms that should be rendered in italic.
 * Sorted longest-first so multi-word terms match before sub-words.
 */
const JAVANESE_TERMS = [
  "Tumapak ing lempeng", "Ngaku Lepat", "Sebele Ilang", "Jaran Kepang",
  "Dadak Merak", "Tolak Bala", "Warna Ireng", "Harga Diri", "Rendah Hati",
  "Kebo-keboan", "Karapan Sapi", "Tumpeng Sewu", "Manten Tebu",
  "Seblang", "Kebo", "Temanten", "Kucing", "Topeng", "Malangan",
  "Larung", "Sembonyo", "Tiban", "Tiba", "Riyok", "Ma'rufun",
  "Ludh-ludh", "Luthur", "Tumpeng", "Raru", "Rawon", "Kerap",
  "Ketupat", "Serabi", "Sewu", "Pecel", "Mecel", "Remo", "Reyange",
  "Momo", "Entas", "Petra", "Jaranan", "Jaran", "Ndadi",
  "Manten", "Tebu", "Reog", "Ludruk", "Omprok", "Gunungan",
  "Gongseng", "Kaleles", "Pincuk", "Arek", "Selamatan", "Travesthy",
  "Tusuk", "Olehsari",
].sort((a, b) => b.length - a.length);

/** Wraps known Javanese/local cultural terms in italic, leaves translations normal */
function renderItalic(text) {
  if (!text) return text;
  const escaped = JAVANESE_TERMS.map(t =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        JAVANESE_TERMS.includes(part)
          ? <em key={i} style={{ fontStyle: "italic" }}>{part}</em>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

const imageCache = {};

async function fetchWikiImage(item, setImages) {
  if (imageCache[item.id] !== undefined) return;
  imageCache[item.id] = null;
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.wikiTitle)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query.pages);
    const src = pages[0]?.thumbnail?.source;
    if (src) {
      imageCache[item.id] = src;
      setImages(prev => ({ ...prev, [item.id]: src }));
    }
  } catch (_) {}
}

/* ─────────────────────────────────────────────────────────────────
   5. STYLES
───────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');

  :root {
    --nav-h:        70px;
    --container:    1480px;
    --container-md: 1100px;
    --container-sm: 760px;
    --pad-x:        clamp(1rem, 4vw, 4rem);
    --pad-section:  clamp(3rem, 6vw, 7rem);
    --radius-card:  20px;
    --radius-lg:    28px;
    --shadow-card:  0 4px 20px rgba(0,0,0,.07);
    --shadow-hover: 0 16px 48px rgba(88,204,2,.18);
    --green:        #58CC02;
    --green-dark:   #45A800;
    --gold:         #FFB020;
    --red:          #FF4B4B;
    --blue:         #1CB0F6;
    --text:         #3C3C3C;
    --muted:        #888;
    --border:       #F0E0C0;
    --bg:           #FFF9F0;
    --white:        #fff;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; font-size: clamp(14px, 1vw, 16px); }
  img  { max-width: 100%; display: block; }
  ::-webkit-scrollbar       { width: 7px; }
  ::-webkit-scrollbar-track { background: #f1e8d0; }
  ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 4px; }

  /* === NAVBAR === */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,249,240,.96); backdrop-filter: blur(12px); border-bottom: 2px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 var(--pad-x); height: var(--nav-h); }
  .nav-logo { font-family: 'Fredoka One', cursive; font-size: clamp(1.3rem,1.8vw,1.8rem); color: var(--green); display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: clamp(.8rem,1.5vw,2rem); align-items: center; }
  .nav-link { font-weight: 700; font-size: clamp(.8rem,.9vw,1rem); color: #5A5A5A; cursor: pointer; transition: color .2s; padding: 4px 0; border-bottom: 2px solid transparent; }
  .nav-link:hover { color: var(--green); border-bottom-color: var(--green); }
  .nav-btn { background: var(--green); color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(.8rem,.9vw,1rem); padding: 9px 22px; border: none; border-radius: 12px; cursor: pointer; transition: all .2s; border-bottom: 3px solid var(--green-dark); white-space: nowrap; }
  .nav-btn:hover  { background: #50B800; transform: translateY(-1px); }
  .nav-btn:active { transform: translateY(1px); border-bottom-width: 1px; }

  /* === LANGUAGE TOGGLE === */
  .lang-toggle { display: flex; align-items: center; background: #F0E8DC; border-radius: 20px; padding: 3px; gap: 2px; flex-shrink: 0; }
  .lang-option { font-family: 'Nunito', sans-serif; font-weight: 800; font-size: .75rem; padding: 5px 12px; border-radius: 16px; border: none; cursor: pointer; transition: all .2s; color: #999; background: transparent; }
  .lang-option.active { background: #fff; color: var(--green); box-shadow: 0 2px 8px rgba(0,0,0,.1); }

  /* === BUTTONS === */
  .btn-primary { background: var(--green); color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(1rem,1.1vw,1.2rem); padding: clamp(12px,1.2vh,16px) clamp(24px,2.5vw,40px); border: none; border-radius: 14px; cursor: pointer; transition: all .2s; border-bottom: 4px solid var(--green-dark); display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary:hover  { background: #50B800; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(88,204,2,.35); }
  .btn-primary:active { transform: translateY(1px); border-bottom-width: 2px; }
  .btn-secondary { background: #fff; color: var(--green); font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(1rem,1.1vw,1.2rem); padding: clamp(12px,1.2vh,16px) clamp(24px,2.5vw,40px); border: 2px solid var(--green); border-radius: 14px; cursor: pointer; transition: all .2s; }
  .btn-secondary:hover { background: #F0FFF0; transform: translateY(-2px); }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: #fff; border: 2px solid #E8E8E8; font-family: 'Nunito', sans-serif; font-weight: 700; color: #555; cursor: pointer; font-size: .88rem; margin-bottom: 1.5rem; padding: 8px 18px; border-radius: 10px; transition: all .2s; }
  .back-btn:hover { border-color: var(--green); color: var(--green); background: #F0FFF0; }

  /* === HERO === */
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding-top: var(--nav-h); }
  .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg,#FFF5E0 0%,#FFF9F0 50%,#F0FFF0 100%); }
  .hero-pattern { position: absolute; inset: 0; opacity: .04; background-image: repeating-linear-gradient(45deg,#58CC02 0,#58CC02 1px,transparent 0,transparent 50%), repeating-linear-gradient(-45deg,#FFB020 0,#FFB020 1px,transparent 0,transparent 50%); background-size: 30px 30px; }
  .hero-content { position: relative; text-align: center; max-width: clamp(600px,55vw,820px); padding: 2rem var(--pad-x); }
  .hero-badge { display: inline-block; background: #E8F8E8; color: #45A800; font-weight: 800; font-size: clamp(.75rem,.8vw,.9rem); padding: 7px 18px; border-radius: 20px; margin-bottom: 1.5rem; border: 2px solid #B8ECAA; letter-spacing: .5px; }
  .hero-title { font-family: 'Fredoka One', cursive; font-size: clamp(2.8rem,5.5vw,5.5rem); line-height: 1.08; margin-bottom: 1.2rem; }
  .hero-title .line1 { color: var(--text); }
  .hero-title .line2 { color: var(--green); display: block; }
  .hero-sub { font-size: clamp(.95rem,1.1vw,1.25rem); color: #666; line-height: 1.75; margin-bottom: 2.8rem; max-width: 600px; margin-left: auto; margin-right: auto; }
  .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  /* === FLOATING HERO CARDS === */
  .float-cards { position: absolute; width: 100%; height: 100%; pointer-events: none; }
  .float-card { position: absolute; background: #fff; border-radius: 16px; padding: 12px 18px; box-shadow: 0 8px 28px rgba(0,0,0,.1); border: 2px solid var(--border); display: flex; align-items: center; gap: 10px; animation: float 6s ease-in-out infinite; }
  .float-card .fc-label { font-size: clamp(.65rem,.7vw,.75rem); font-weight: 700; color: #999; display: block; }
  .float-card .fc-name  { font-size: clamp(.8rem,.9vw,1rem);   font-weight: 800; color: var(--text); }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  .fc1 { top: 20%; left: 5%;  animation-delay: 0s; }
  .fc2 { top: 24%; right: 5%; animation-delay: 1.5s; }
  .fc3 { bottom: 20%; left: 4%;  animation-delay: 3s; }
  .fc4 { bottom: 16%; right: 5%; animation-delay: 4.5s; }

  /* === SECTION LAYOUT === */
  .section { padding: var(--pad-section) var(--pad-x); }
  .section-inner { max-width: var(--container); margin: 0 auto; }
  .section-label { font-size: clamp(.72rem,.75vw,.85rem); font-weight: 800; letter-spacing: 2px; color: var(--gold); text-transform: uppercase; margin-bottom: .5rem; }
  .section-title { font-family: 'Fredoka One', cursive; font-size: clamp(2rem,3vw,3.2rem); color: var(--text); margin-bottom: 1rem; }
  .section-sub { font-size: clamp(.9rem,1vw,1.05rem); color: #666; line-height: 1.75; max-width: 600px; }
  .section-alt { background: linear-gradient(135deg,#F0FFF0,#FFF9F0); }

  /* === ABOUT === */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem,4vw,5rem); align-items: center; margin-top: 3rem; }
  .about-features { display: grid; gap: 1.2rem; margin-top: 2rem; }
  .feature-card { background: #fff; border-radius: 16px; padding: clamp(.9rem,1.2vw,1.4rem) clamp(1rem,1.5vw,1.8rem); display: flex; align-items: flex-start; gap: 1rem; border: 2px solid var(--border); transition: all .2s; }
  .feature-card:hover { border-color: var(--green); transform: translateX(5px); }
  .feature-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
  .feature-text h4 { font-weight: 800; font-size: clamp(.88rem,1vw,1.05rem); margin-bottom: .3rem; }
  .feature-text p  { font-size: clamp(.8rem,.88vw,.95rem); color: #777; line-height: 1.6; }
  .about-visual { background: linear-gradient(135deg,var(--green),var(--green-dark)); border-radius: 28px; padding: clamp(2rem,3vw,3.5rem); text-align: center; color: #fff; position: relative; overflow: hidden; }
  .about-visual::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 1px,transparent 0,transparent 50%); background-size: 20px 20px; }
  .about-stat { position: relative; margin-bottom: 1.8rem; }
  .about-stat h3 { font-family: 'Fredoka One', cursive; font-size: clamp(2.5rem,4vw,4rem); margin-bottom: .2rem; }
  .about-stat p  { font-weight: 700; opacity: .85; font-size: clamp(.85rem,1vw,1rem); }

  /* === GAME MODES PREVIEW === */
  .modes-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(1rem,1.5vw,2rem); margin-top: 3rem; }
  .mode-preview { background: #fff; border-radius: var(--radius-card); padding: clamp(1.5rem,2.5vw,3rem); text-align: center; border: 2px solid var(--border); transition: all .25s; cursor: pointer; }
  .mode-preview:hover { border-color: var(--green); transform: translateY(-5px); box-shadow: var(--shadow-hover); }
  .mode-icon { font-size: clamp(2.2rem,3.5vw,4rem); margin-bottom: 1rem; display: block; }
  .mode-preview h3 { font-family: 'Fredoka One', cursive; font-size: clamp(1.1rem,1.4vw,1.6rem); color: var(--text); margin-bottom: .5rem; }
  .mode-preview p  { font-size: clamp(.82rem,.9vw,1rem); color: #777; line-height: 1.65; }
  .mode-tag { display: inline-block; margin-top: 1rem; font-size: clamp(.7rem,.75vw,.85rem); font-weight: 800; padding: 5px 14px; border-radius: 8px; color: #fff; }

  /* === TEAM === */
  .team-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(1rem,1.5vw,1.8rem); margin-top: 3rem; }
  .team-card { background: #fff; border-radius: var(--radius-card); padding: clamp(1.2rem,2vw,2rem) clamp(.8rem,1.2vw,1.5rem); text-align: center; border: 2px solid var(--border); transition: all .2s; flex: 0 0 clamp(160px,16%,240px); }
  .team-card:hover { transform: translateY(-5px); border-color: var(--gold); box-shadow: 0 14px 36px rgba(255,176,32,.22); }
  .team-avatar { width: clamp(80px,7vw,110px); height: clamp(80px,7vw,110px); border-radius: 50%; display: block; margin: 0 auto 1rem; border: 3px solid var(--border); object-fit: cover; background: #F5F5F5; }
  .team-name { font-weight: 800; font-size: clamp(.82rem,.95vw,1rem); margin-bottom: .3rem; line-height: 1.3; }
  .team-role { font-size: clamp(.7rem,.78vw,.88rem); color: var(--muted); font-weight: 600; line-height: 1.45; }

  /* === GAME HUB === */
  .hub { min-height: 100vh; padding: calc(var(--nav-h) + 2rem) var(--pad-x) 3rem; background: linear-gradient(135deg,#F0FFF0,#FFF9F0); }
  .hub-inner { max-width: var(--container-md); margin: 0 auto; }
  .hub-title { font-family: 'Fredoka One', cursive; font-size: clamp(1.8rem,2.8vw,3rem); color: var(--text); text-align: center; margin-bottom: .5rem; }
  .hub-sub { text-align: center; color: var(--muted); margin-bottom: 3rem; font-size: clamp(.88rem,1vw,1.05rem); }
  .hub-section-label { font-weight: 800; font-size: clamp(.72rem,.8vw,.9rem); letter-spacing: 1px; color: #BBB; text-transform: uppercase; margin-bottom: 1rem; }
  .mode-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(.8rem,1.2vw,1.5rem); margin-bottom: 2.5rem; }
  .mode-card { background: #fff; border-radius: 18px; padding: clamp(1.2rem,2vw,2rem); border: 3px solid #E8E8E8; cursor: pointer; transition: all .2s; position: relative; }
  .mode-card:hover { border-color: var(--green); transform: translateY(-4px); box-shadow: 0 14px 36px rgba(88,204,2,.2); }
  .mode-card.selected { border-color: var(--green); background: #F0FFF0; box-shadow: 0 0 0 4px rgba(88,204,2,.18); }
  .mode-card-icon { font-size: clamp(1.8rem,2.5vw,2.8rem); margin-bottom: .8rem; }
  .mode-card h3 { font-weight: 800; font-size: clamp(.88rem,1vw,1.1rem); margin-bottom: .4rem; color: var(--text); }
  .mode-card p  { font-size: clamp(.75rem,.85vw,.95rem); color: #888; line-height: 1.55; }
  .mode-check { position: absolute; top: 12px; right: 12px; width: 26px; height: 26px; border-radius: 50%; background: var(--green); display: none; align-items: center; justify-content: center; color: #fff; font-size: .85rem; }
  .mode-card.selected .mode-check { display: flex; }
  .diff-cards { display: flex; gap: clamp(.6rem,1vw,1.2rem); margin-bottom: 3rem; }
  .diff-card { flex: 1; background: #fff; border-radius: 16px; padding: clamp(.9rem,1.5vw,1.6rem); border: 3px solid #E8E8E8; cursor: pointer; transition: all .2s; text-align: center; }
  .diff-card:hover { transform: translateY(-3px); }
  .diff-card.selected-easy   { border-color: var(--green); background: #F0FFF0; }
  .diff-card.selected-medium { border-color: var(--gold);  background: #FFFBF0; }
  .diff-card.selected-hard   { border-color: var(--red);   background: #FFF5F5; }
  .diff-card h3 { font-weight: 800; font-size: clamp(.88rem,1vw,1.1rem); margin: .5rem 0 .3rem; }
  .diff-card p  { font-size: clamp(.72rem,.8vw,.88rem); color: #888; }
  .hub-start-btn { width: 100%; padding: clamp(14px,1.5vh,20px); background: var(--green); color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(1rem,1.2vw,1.3rem); border: none; border-radius: 16px; cursor: pointer; border-bottom: 4px solid var(--green-dark); transition: all .2s; }
  .hub-start-btn:hover:not(:disabled) { background: #50B800; transform: translateY(-2px); }
  .hub-start-btn:disabled { background: #ccc; border-bottom-color: #bbb; cursor: not-allowed; }

  /* === GAME SCREEN === */
  .game-screen { min-height: 100vh; background: var(--bg); }
  .game-header { background: #fff; border-bottom: 2px solid var(--border); padding: clamp(.8rem,1.2vh,1.2rem) var(--pad-x); display: flex; align-items: center; gap: clamp(.6rem,1vw,1.2rem); position: sticky; top: 0; z-index: 50; }
  .game-stat { display: flex; flex-direction: column; align-items: center; min-width: clamp(60px,5vw,90px); }
  .game-stat-label { font-size: clamp(.62rem,.7vw,.78rem); font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: .5px; }
  .game-stat-value { font-family: 'Fredoka One', cursive; font-size: clamp(1.3rem,1.8vw,2rem); color: var(--text); line-height: 1; }
  .game-stat-value.green { color: var(--green); }
  .game-stat-value.gold  { color: var(--gold);  }
  .stat-sep { width: 1px; background: var(--border); align-self: stretch; }
  .game-progress { flex: 1; height: 10px; background: #F0E0C0; border-radius: 5px; overflow: hidden; }
  .game-progress-fill { height: 100%; background: var(--green); transition: width .4s ease; border-radius: 5px; }
  .game-mode-badge { font-size: clamp(.68rem,.75vw,.85rem); font-weight: 800; padding: 4px 12px; border-radius: 8px; background: #E8F8E8; color: var(--green-dark); white-space: nowrap; }

  /* === CLASSIC GAME === */
  .classic-body { padding: clamp(1.5rem,2.5vw,3rem) var(--pad-x); max-width: var(--container); margin: 0 auto; }
  .classic-cols { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1rem,2vw,2.5rem); }
  .col-label { font-size: clamp(.7rem,.75vw,.85rem); font-weight: 800; letter-spacing: 1px; color: #BBB; text-transform: uppercase; margin-bottom: .8rem; }
  .match-item { background: #fff; border-radius: 14px; padding: clamp(.8rem,1.2vw,1.3rem) clamp(1rem,1.5vw,1.6rem); border: 2px solid #E8E8E8; cursor: pointer; transition: all .2s; margin-bottom: .7rem; font-weight: 700; font-size: clamp(.82rem,.95vw,1.05rem); line-height: 1.5; display: flex; align-items: flex-start; gap: .7rem; }
  .match-item .item-emoji { font-size: clamp(1.1rem,1.4vw,1.5rem); flex-shrink: 0; margin-top: .1rem; }
  .match-item:hover:not(.disabled) { border-color: var(--green); background: #FAFFF5; }
  .match-item.selected { border-color: var(--green); background: #E8FFF0; box-shadow: 0 0 0 3px rgba(88,204,2,.2); }
  .match-item.correct  { border-color: var(--green); background: #E8FFF0; opacity: .6; pointer-events: none; }
  .match-item.wrong-flash { animation: wrongShake .5s ease; }
  .match-item.disabled { opacity: .5; pointer-events: none; cursor: default; }
  @keyframes wrongShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
  .wrong-bg { background: #FFF0F0 !important; border-color: var(--red) !important; }

  /* === MEMORY FLIP === */
  .flip-body { padding: clamp(1.5rem,2.5vw,3rem) var(--pad-x); max-width: var(--container-md); margin: 0 auto; }
  .flip-card-outer { aspect-ratio: 3/4; perspective: 1000px; cursor: pointer; }
  .flip-card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .5s cubic-bezier(.4,.2,.2,1); }
  .flip-card-outer.flipped .flip-card-inner,
  .flip-card-outer.matched .flip-card-inner { transform: rotateY(180deg); }
  .flip-card-front,
  .flip-card-back { position: absolute; inset: 0; border-radius: 16px; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; }
  .flip-card-front { background: linear-gradient(135deg,#4C6EF5,#7048E8); border: 3px solid #3D5AF1; box-shadow: 0 4px 14px rgba(70,100,245,.3); }
  .flip-card-front-pattern { font-size: clamp(1.5rem,2.5vw,2.5rem); opacity: .3; }
  .flip-card-back { transform: rotateY(180deg); border: 3px solid #E8E8E8; background: #fff; overflow: hidden; padding: 0; }
  .flip-card-outer.matched .flip-card-back { border-color: var(--green); box-shadow: 0 4px 18px rgba(88,204,2,.3); }
  .flip-name-card { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; background: #fff; }
  .flip-image-card { width: 100%; height: 100%; overflow: hidden; border-radius: 13px; }
  .flip-image-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* === POPUP / INSIGHT === */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.58); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fadeIn .2s ease; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .popup { background: #fff; border-radius: 26px; max-width: clamp(440px,35vw,580px); width: 100%; animation: slideUp .3s cubic-bezier(.34,1.56,.64,1); max-height: 90vh; overflow-y: auto; }
  @keyframes slideUp { from{transform:translateY(40px) scale(.95);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }
  .popup-header { padding: clamp(1.4rem,2vw,2rem) clamp(1.4rem,2vw,2rem) 1rem; display: flex; align-items: flex-start; gap: 1rem; }
  .popup-emoji-box { width: clamp(60px,5.5vw,80px); height: clamp(60px,5.5vw,80px); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: clamp(1.8rem,2.5vw,2.5rem); flex-shrink: 0; }
  .popup-title  { font-family: 'Fredoka One', cursive; font-size: clamp(1.4rem,1.8vw,2rem); color: var(--text); }
  .popup-origin { font-size: clamp(.78rem,.85vw,.92rem); color: var(--muted); font-weight: 600; margin-top: .2rem; }
  .popup-cat    { display: inline-block; font-size: clamp(.68rem,.75vw,.82rem); font-weight: 800; padding: 3px 10px; border-radius: 8px; background: #E8F8E8; color: var(--green-dark); margin-top: .4rem; }
  .popup-body   { padding: 0 clamp(1.4rem,2vw,2rem) clamp(1.4rem,2vw,2rem); }
  .popup-img    { width: 100%; height: clamp(160px,14vw,220px); object-fit: cover; border-radius: 14px; margin-bottom: 1rem; display: block; }
  .popup-img-fallback { width: 100%; height: clamp(130px,11vw,180px); border-radius: 14px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: clamp(3rem,4.5vw,5rem); }
  .popup-detail { font-size: clamp(.84rem,.95vw,1rem); color: #555; line-height: 1.75; margin-bottom: 1rem; padding: 1rem; background: #FAFAFA; border-radius: 12px; }
  .popup-score-badge { background: var(--gold); color: #fff; font-size: clamp(.7rem,.78vw,.85rem); font-weight: 800; padding: 3px 10px; border-radius: 8px; display: inline-block; margin-top: .4rem; }
  .popup-ling   { background: #F8F0FF; border-radius: 16px; padding: clamp(.9rem,1.2vw,1.4rem); margin-bottom: 1rem; }
  .popup-ling h4 { font-weight: 800; font-size: clamp(.72rem,.8vw,.88rem); color: #9B59B6; text-transform: uppercase; letter-spacing: .5px; margin-bottom: .8rem; }
  .popup-ling-item { margin-bottom: .7rem; }
  .popup-ling-item:last-child { margin-bottom: 0; }
  .popup-ling-label { font-size: clamp(.68rem,.75vw,.82rem); font-weight: 800; color: #9B59B6; text-transform: uppercase; letter-spacing: .5px; }
  .popup-ling-text  { font-size: clamp(.8rem,.9vw,1rem); color: #555; line-height: 1.65; margin-top: .2rem; }
  .popup-close-btn  { width: 100%; padding: clamp(12px,1.3vh,16px); background: var(--green); color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(.9rem,1vw,1.1rem); border: none; border-radius: 14px; cursor: pointer; border-bottom: 3px solid var(--green-dark); transition: all .2s; }
  .popup-close-btn:hover { background: #50B800; }

  /* === TIMER === */
  .timer-bar  { height: 8px; border-radius: 4px; overflow: hidden; background: #F0E0C0; flex: 1; }
  .timer-fill { height: 100%; border-radius: 4px; transition: width 1s linear; }

  /* === RESULT PAGE === */
  .result-page { min-height: 100vh; background: linear-gradient(135deg,#F0FFF0,#FFF9F0); display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .result-card { background: #fff; border-radius: var(--radius-lg); padding: clamp(2rem,4vw,4rem); max-width: clamp(460px,35vw,580px); width: 100%; text-align: center; box-shadow: 0 24px 72px rgba(0,0,0,.1); }
  .result-trophy { font-size: clamp(4rem,6vw,7rem); margin-bottom: 1rem; animation: trophy 1s cubic-bezier(.34,1.56,.64,1); }
  @keyframes trophy { from{transform:scale(0) rotate(-20deg)} to{transform:scale(1) rotate(0)} }
  .result-title { font-family: 'Fredoka One', cursive; font-size: clamp(1.6rem,2.2vw,2.4rem); }
  .result-score { font-family: 'Fredoka One', cursive; font-size: clamp(3.5rem,5.5vw,6rem); color: var(--green); margin: 1rem 0; }
  .result-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
  .result-stat  { background: #FAFAFA; border-radius: 16px; padding: clamp(.9rem,1.5vw,1.4rem); }
  .result-stat-val   { font-family: 'Fredoka One', cursive; font-size: clamp(1.5rem,2vw,2.2rem); color: var(--text); }
  .result-stat-label { font-size: clamp(.68rem,.75vw,.82rem); font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-top: .2rem; }
  .result-btns { display: grid; gap: .8rem; margin-top: 1.5rem; }
  .result-btn-main { padding: clamp(12px,1.3vh,16px); background: var(--green); color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: clamp(.9rem,1vw,1.1rem); border: none; border-radius: 14px; cursor: pointer; border-bottom: 3px solid var(--green-dark); transition: all .2s; }
  .result-btn-main:hover { background: #50B800; transform: translateY(-1px); }
  .result-btn-sec  { padding: clamp(12px,1.3vh,16px); background: #fff; color: #777; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: clamp(.88rem,.98vw,1.05rem); border: 2px solid #E8E8E8; border-radius: 14px; cursor: pointer; transition: all .2s; }
  .result-btn-sec:hover { border-color: #ccc; color: #555; }

  /* === ENCYCLOPEDIA === */
  .enc { min-height: 100vh; background: var(--bg); padding-top: var(--nav-h); }
  .enc-body { max-width: var(--container-md); margin: 0 auto; padding: clamp(1.5rem,2.5vw,3rem) var(--pad-x); }
  .enc-search { width: 100%; padding: clamp(10px,1.2vh,15px) clamp(14px,1.5vw,20px); border: 2px solid #E8E8E8; border-radius: 14px; font-family: 'Nunito', sans-serif; font-size: clamp(.9rem,1vw,1.05rem); outline: none; transition: border-color .2s; background: #fff; }
  .enc-search:focus { border-color: var(--green); }
  .enc-filters { display: flex; gap: .5rem; flex-wrap: wrap; margin: 1rem 0 2rem; }
  .enc-filter { padding: clamp(5px,.7vh,8px) clamp(10px,1.2vw,16px); border-radius: 20px; border: 2px solid #E8E8E8; background: #fff; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: clamp(.72rem,.8vw,.88rem); cursor: pointer; transition: all .2s; }
  .enc-filter:hover  { border-color: var(--green); }
  .enc-filter.active { background: var(--green); border-color: var(--green); color: #fff; }
  .enc-list { display: grid; grid-template-columns: 1fr; gap: clamp(.8rem,1.2vw,1.5rem); }
  .enc-card { background: #fff; border-radius: var(--radius-card); overflow: hidden; border: 2px solid var(--border); transition: all .2s; cursor: pointer; }
  .enc-card:hover { border-color: var(--green); box-shadow: 0 8px 28px rgba(88,204,2,.15); transform: translateY(-2px); }
  .enc-card-header { padding: clamp(1rem,1.5vw,1.6rem) clamp(1.2rem,1.8vw,2rem); display: flex; align-items: center; gap: 1rem; }
  .enc-card-emoji { width: clamp(52px,4.5vw,68px); height: clamp(52px,4.5vw,68px); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: clamp(1.5rem,2vw,2.2rem); flex-shrink: 0; }
  .enc-card-info h3 { font-weight: 800; font-size: clamp(.9rem,1.05vw,1.15rem); color: var(--text); }
  .enc-card-info .enc-origin { font-size: clamp(.75rem,.82vw,.9rem); color: var(--muted); font-weight: 600; margin-top: .2rem; }
  .enc-card-info .enc-cat    { display: inline-block; font-size: clamp(.65rem,.72vw,.8rem); font-weight: 800; padding: 3px 9px; border-radius: 6px; background: #E8F8E8; color: var(--green-dark); margin-top: .4rem; }
  .enc-card-body { padding: 0 clamp(1.2rem,1.8vw,2rem) clamp(1.2rem,1.8vw,2rem); }
  .enc-img { width: 100%; height: clamp(180px,16vw,280px); object-fit: cover; border-radius: 14px; margin-bottom: 1rem; display: block; }
  .enc-img-fallback { width: 100%; height: clamp(140px,13vw,220px); border-radius: 14px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: clamp(3rem,5vw,5rem); }
  .enc-card-sentence { margin-bottom: .8rem; padding: clamp(.7rem,1vw,1rem); background: #FFF9F0; border-radius: 10px; font-size: clamp(.8rem,.9vw,1rem); color: #666; line-height: 1.65; font-style: italic; }
  .enc-card-detail   { font-size: clamp(.82rem,.92vw,.98rem); color: #555; line-height: 1.75; margin-bottom: 1rem; padding: clamp(.7rem,1vw,1rem); background: #FAFAFA; border-radius: 10px; }
  .enc-ling   { background: #F8F0FF; border-radius: 12px; padding: clamp(.8rem,1.2vw,1.3rem); }
  .enc-ling h4 { font-size: clamp(.68rem,.75vw,.82rem); font-weight: 800; color: #9B59B6; text-transform: uppercase; letter-spacing: .5px; margin-bottom: .8rem; }
  .enc-ling-item  { margin-bottom: .6rem; }
  .enc-ling-item:last-child { margin-bottom: 0; }
  .enc-ling-label { font-size: clamp(.65rem,.72vw,.8rem); font-weight: 800; color: #9B59B6; text-transform: uppercase; }
  .enc-ling-text  { font-size: clamp(.78rem,.88vw,.95rem); color: #555; line-height: 1.6; margin-top: .2rem; }

  /* === FOOTER === */
  footer { background: #3C3C3C; color: #ccc; text-align: center; padding: clamp(1.5rem,3vw,3rem) var(--pad-x); font-size: clamp(.8rem,.9vw,1rem); }
  footer strong { color: var(--green); font-family: 'Fredoka One', cursive; font-size: clamp(.95rem,1.1vw,1.2rem); }

  /* === HAMBURGER MENU === */
  .hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 40px; height: 40px; background: none; border: none; cursor: pointer; padding: 4px; border-radius: 8px; transition: background .2s; flex-shrink: 0; }
  .hamburger:hover { background: #F0E8DC; }
  .hamburger-line { display: block; width: 24px; height: 2.5px; background: #3C3C3C; border-radius: 2px; transition: transform .3s ease, opacity .3s ease, width .3s ease; transform-origin: center; }
  .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
  .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; width: 0; }
  .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
  .mobile-menu { display: none; position: fixed; top: var(--nav-h); left: 0; right: 0; background: rgba(255,249,240,.98); backdrop-filter: blur(16px); border-bottom: 2px solid #F0E0C0; flex-direction: column; padding: 1.2rem var(--pad-x) 1.8rem; gap: .4rem; z-index: 99; animation: menuSlide .25s ease; box-shadow: 0 12px 32px rgba(0,0,0,.08); }
  .mobile-menu.open { display: flex; }
  @keyframes menuSlide { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  .mobile-menu-link { font-weight: 700; font-size: 1.05rem; color: #3C3C3C; cursor: pointer; padding: .75rem 1rem; border-radius: 12px; transition: background .18s, color .18s; border: none; background: none; font-family: 'Nunito', sans-serif; text-align: left; width: 100%; }
  .mobile-menu-link:hover { background: #F0F0F0; color: #58CC02; }
  .mobile-menu-divider { height: 1px; background: #F0E0C0; margin: .4rem 0; }
  .mobile-menu-play { margin-top: .4rem; padding: 13px; background: #58CC02; color: #fff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1rem; border: none; border-radius: 14px; cursor: pointer; border-bottom: 3px solid #45A800; transition: all .2s; width: 100%; }
  .mobile-menu-play:hover { background: #50B800; }

  /* === RESPONSIVE === */
  @media (min-width: 1440px) {
    .about-grid { grid-template-columns: 1fr 1fr; gap: 6rem; }
    .modes-grid { gap: 2.5rem; }
  }
  @media (max-width: 1439px) and (min-width: 1024px) { :root { --container: 1200px; } }
  @media (max-width: 1023px) and (min-width: 768px) {
    :root { --container: 100%; --pad-x: 2rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .modes-grid { grid-template-columns: repeat(3,1fr); gap: 1rem; }
    .mode-cards { grid-template-columns: repeat(3,1fr); }
    .team-card  { flex: 0 0 calc(33% - 1rem); }
  }
  @media (max-width: 767px) {
    :root { --pad-x: 1.2rem; --nav-h: 60px; }
    .nav-links  { display: none; }
    .hamburger  { display: flex; }
    .float-cards { display: none; }
    .hero-title  { font-size: clamp(2.2rem,8vw,3rem); }
    .about-grid  { grid-template-columns: 1fr; gap: 2rem; }
    .modes-grid  { grid-template-columns: 1fr; }
    .mode-cards  { grid-template-columns: 1fr; }
    .diff-cards  { flex-direction: column; }
    .classic-cols { grid-template-columns: 1fr; }
    .team-card   { flex: 0 0 calc(50% - .6rem); }
    .result-stats { grid-template-columns: 1fr 1fr; }
    .popup       { max-width: 95vw; }
  }
  @media (max-width: 480px) {
    :root { --pad-x: 1rem; }
    .hero-title  { font-size: 2rem; }
    .hero-sub    { font-size: .92rem; }
    .team-card   { flex: 0 0 100%; max-width: 300px; }
    .result-stats { grid-template-columns: 1fr; }
    .game-header { padding: .6rem 1rem; gap: .5rem; }
    .flip-body   { padding: 1rem; }
  }
`;


/* ─────────────────────────────────────────────────────────────────
   6. SHARED UI COMPONENTS
───────────────────────────────────────────────────────────────── */

function LinguisticAnalysis({ item, lang }) {
  const t = T[lang];
  return (
    <div className="popup-ling">
      <h4>{t.lingTitle}</h4>
      {[
        { label: t.symbolism,   text: lang === "id" ? item.symbolism_id   : item.symbolism   },
        { label: t.metaphor,    text: lang === "id" ? item.metaphor_id    : item.metaphor    },
        { label: t.translation, text: lang === "id" ? item.translation_id : item.translation },
      ].map(({ label, text }) => (
        <div className="popup-ling-item" key={label}>
          <div className="popup-ling-label">{label}</div>
          <div className="popup-ling-text">{renderItalic(text)}</div>
        </div>
      ))}
    </div>
  );
}

function PopupInsight({ item, points, streak, images, lang, onClose }) {
  if (!item) return null;
  const t      = T[lang];
  const imgSrc = images?.[item.id];
  const streakLabel = streak > 1 ? `${streak}x Streak!` : null;
  const detail = lang === "id" ? item.detail_id : item.detail;

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-emoji-box" style={{ background: item.bg }}>{item.emoji}</div>
          <div>
            <div className="popup-title">{item.name}</div>
            <div className="popup-origin">📍 {item.origin}</div>
            <div className="popup-cat">{item.category}</div>
            {points > 0 && (
              <div style={{ marginTop: ".4rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                <span className="popup-score-badge">+{points} pts</span>
                {streakLabel && <span className="popup-score-badge" style={{ background: "#FF9600" }}>{streakLabel}</span>}
              </div>
            )}
          </div>
        </div>
        <div className="popup-body">
          {imgSrc
            ? <img src={imgSrc} alt={item.name} className="popup-img" onError={e => { e.target.style.display = "none"; }} />
            : <div className="popup-img-fallback" style={{ background: item.bg + "33" }}>{item.emoji}</div>
          }
          <div className="popup-detail">{renderItalic(detail)}</div>
          <LinguisticAnalysis item={item} lang={lang} />
          <button className="popup-close-btn" onClick={onClose}>{t.gotIt}</button>
        </div>
      </div>
    </div>
  );
}

function GameHeader({ score, streak, matchedCount, totalCount, timeLeft, maxTime, modeLabel, diffLabel, lang, onBack }) {
  const t          = T[lang];
  const progressPct = (matchedCount / totalCount) * 100;
  const timerPct    = maxTime ? (timeLeft / maxTime) * 100 : null;
  const timerColor  = timeLeft <= 20 ? "#FF4B4B" : timeLeft <= 45 ? "#FFB020" : "#58CC02";

  return (
    <div className="game-header">
      <button className="back-btn" onClick={onBack} style={{ marginBottom: 0 }}>{t.exitBtn}</button>
      <div className="stat-sep" />
      <div className="game-stat">
        <div className="game-stat-label">{t.score}</div>
        <div className="game-stat-value green">{score}</div>
      </div>
      <div className="stat-sep" />
      <div className="game-stat">
        <div className="game-stat-label">{t.streak} {streak >= 3 ? "🔥" : ""}</div>
        <div className="game-stat-value gold">{streak}</div>
      </div>
      {maxTime && (
        <>
          <div className="stat-sep" />
          <div className="game-stat">
            <div className="game-stat-label">{t.time}</div>
            <div className="game-stat-value" style={{ color: timerColor, fontFamily: "'Fredoka One',cursive", fontSize: "1.5rem" }}>
              {timeLeft}s
            </div>
          </div>
        </>
      )}
      <div className="stat-sep" />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#BBB" }}>
            {matchedCount}/{totalCount} {t.matched}
          </span>
          <span className="game-mode-badge">{modeLabel} · {diffLabel}</span>
        </div>
        <div className="game-progress">
          <div className="game-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        {maxTime && (
          <div className="timer-bar" style={{ marginTop: "4px" }}>
            <div className="timer-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7. GAME COMPONENTS
───────────────────────────────────────────────────────────────── */

function ClassicGame({ mode, difficulty, items, images, lang, onComplete, onBack }) {
  const cfg = DIFF[difficulty];
  const t   = T[lang];

  const [score,        setScore]        = useState(0);
  const [streak,       setStreak]       = useState(0);
  const [maxStreak,    setMaxStreak]    = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(cfg.time);
  const [matched,      setMatched]      = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null); // { item, idx }
  // Use array-index (not item.id) so wrong-flash never touches the other column
  const [wrongLeftIdx,  setWrongLeftIdx]  = useState(null);
  const [wrongRightIdx, setWrongRightIdx] = useState(null);
  const [popup,        setPopup]        = useState(null);
  const [pendingPts,   setPendingPts]   = useState(0);
  const [pendingStrk,  setPendingStrk]  = useState(0);

  const rightItems      = useRef(shuffle(items)).current;
  const timerRef        = useRef();
  const pendingComplete = useRef(false);

  useEffect(() => {
    if (mode !== "timeAttack") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (mode === "timeAttack" && timeLeft === 0 && !popup) {
      onComplete(score, maxStreak, "timeout");
    }
  }, [timeLeft, popup]);

  const handleLeft = (item, idx) => {
    if (matched.includes(item.id) || popup) return;
    setSelectedLeft(prev => prev?.item.id === item.id ? null : { item, idx });
  };

  const handleRight = (item, idx) => {
    if (matched.includes(item.id) || popup || !selectedLeft) return;

    if (selectedLeft.item.id === item.id) {
      // Correct match
      const newStreak  = streak + 1;
      const pts        = cfg.base * newStreak;
      const newMatched = [...matched, item.id];
      const newMax     = Math.max(maxStreak, newStreak);
      setScore(s => s + pts);
      setStreak(newStreak);
      setMaxStreak(newMax);
      setMatched(newMatched);
      setSelectedLeft(null);
      setPendingPts(pts);
      setPendingStrk(newStreak);
      setPopup(item);
      if (newMatched.length === items.length) pendingComplete.current = true;
    } else {
      // Wrong match — record the exact index of each clicked card, per column.
      // Index-based tracking means right-column flash can NEVER bleed into left column
      // and vice versa, regardless of shared item ids.
      const li = selectedLeft.idx;
      const ri = idx;
      setStreak(0);
      setSelectedLeft(null);
      setWrongLeftIdx(li);
      setWrongRightIdx(ri);
      setTimeout(() => { setWrongLeftIdx(null); setWrongRightIdx(null); }, 700);
    }
  };

  const handlePopupClose = () => {
    setPopup(null);
    if (pendingComplete.current) onComplete(score + pendingPts, Math.max(maxStreak, pendingStrk));
  };

  // Flash ONLY the card at the exact index the player clicked in this column
  const leftClass = (item, idx) => {
    if (matched.includes(item.id))          return "match-item correct";
    if (selectedLeft?.item.id === item.id)  return "match-item selected";
    if (idx === wrongLeftIdx)               return "match-item wrong-flash wrong-bg";
    return "match-item";
  };

  const rightClass = (item, idx) => {
    if (matched.includes(item.id)) return "match-item correct";
    if (idx === wrongRightIdx)     return "match-item wrong-flash wrong-bg";
    return "match-item";
  };

  const cardText = (item) => lang === "id" ? item.card_id : item.card;

  return (
    <div className="game-screen">
      <GameHeader
        score={score} streak={streak}
        matchedCount={matched.length} totalCount={items.length}
        timeLeft={timeLeft} maxTime={mode === "timeAttack" ? cfg.time : null}
        modeLabel={mode === "timeAttack" ? "Time Attack" : "Classic"}
        diffLabel={cfg.label} lang={lang} onBack={onBack}
      />
      <div className="classic-body">
        <div style={{ textAlign: "center", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 700,
          color: selectedLeft ? "#58CC02" : "#AAA" }}>
          {selectedLeft
            ? t.hintSelect(selectedLeft.item.name)
            : matched.length < items.length ? t.hintStart : ""}
        </div>
        <div className="classic-cols">
          <div>
            <div className="col-label">{t.colNames}</div>
            {items.map((item, idx) => (
              <div key={item.id} className={leftClass(item, idx)} onClick={() => handleLeft(item, idx)}>
                <span className="item-emoji">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="col-label">{t.colDesc}</div>
            {rightItems.map((item, idx) => (
              <div key={item.id} className={rightClass(item, idx)} onClick={() => handleRight(item, idx)}>
                <span style={{ fontSize: ".88rem", lineHeight: 1.5 }}>{cardText(item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {popup && (
        <PopupInsight item={popup} points={pendingPts} streak={pendingStrk}
          images={images} lang={lang} onClose={handlePopupClose} />
      )}
    </div>
  );
}

function MemoryFlipGame({ difficulty, items, images, lang, onComplete, onBack }) {
  const cfg = DIFF[difficulty];
  const t   = T[lang];

  const [cards, setCards] = useState(() =>
    shuffle(
      items.flatMap(item => [
        { uid: `${item.id}-n`, id: item.id, type: "name",  item },
        { uid: `${item.id}-i`, id: item.id, type: "image", item },
      ])
    ).map(c => ({ ...c, flipped: false, matched: false }))
  );

  const [selected,    setSelected]    = useState([]);
  const [score,       setScore]       = useState(0);
  const [streak,      setStreak]      = useState(0);
  const [maxStreak,   setMaxStreak]   = useState(0);
  const [popup,       setPopup]       = useState(null);
  const [pendingPts,  setPendingPts]  = useState(0);
  const [pendingStrk, setPendingStrk] = useState(0);
  const [isLocked,    setIsLocked]    = useState(false);

  const pendingComplete = useRef(false);
  const matchedCount    = cards.filter(c => c.matched).length / 2;

  const handleFlip = (idx) => {
    if (isLocked || cards[idx].flipped || cards[idx].matched || popup) return;
    if (selected.length === 1 && selected[0] === idx) return;

    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    setCards(newCards);

    if (selected.length === 0) {
      setSelected([idx]);
    } else {
      const [aIdx] = selected;
      setSelected([]);
      setIsLocked(true);

      const cardA   = newCards[aIdx];
      const cardB   = newCards[idx];
      const isMatch = cardA.id === cardB.id && cardA.type !== cardB.type;

      if (isMatch) {
        const newStreak = streak + 1;
        const pts       = cfg.base * newStreak;
        setScore(s => s + pts);
        setStreak(newStreak);
        setMaxStreak(m => Math.max(m, newStreak));
        setPendingPts(pts);
        setPendingStrk(newStreak);

        setTimeout(() => {
          setCards(c => c.map((card, i) =>
            i === aIdx || i === idx ? { ...card, matched: true } : card
          ));
          setIsLocked(false);
          setPopup(cardB.item);
          if (matchedCount + 1 === items.length) pendingComplete.current = true;
        }, 500);
      } else {
        setStreak(0);
        setTimeout(() => {
          setCards(c => c.map((card, i) =>
            i === aIdx || i === idx ? { ...card, flipped: false } : card
          ));
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handlePopupClose = () => {
    const pts = pendingPts, st = pendingStrk;
    setPopup(null);
    if (pendingComplete.current) onComplete(score + pts, Math.max(maxStreak, st));
  };

  return (
    <div className="game-screen">
      <GameHeader
        score={score} streak={streak}
        matchedCount={matchedCount} totalCount={items.length}
        modeLabel="Memory Flip" diffLabel={cfg.label} lang={lang} onBack={onBack}
      />
      <div className="flip-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
          {cards.map((card, idx) => (
            <div
              key={card.uid}
              className={`flip-card-outer ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
              onClick={() => handleFlip(idx)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="flip-card-front-pattern">🌀</div>
                  <div style={{ fontSize: ".6rem", fontWeight: 800, color: "rgba(255,255,255,.5)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Flip!
                  </div>
                </div>
                <div className="flip-card-back" style={card.matched ? { borderColor: "#58CC02" } : {}}>
                  {card.type === "image" ? (
                    <div className="flip-image-card">
                      {images?.[card.item.id] ? (
                        <img
                          src={images[card.item.id]}
                          alt={card.item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                        />
                      ) : null}
                      <div style={{
                        width: "100%", height: "100%",
                        display: images?.[card.item.id] ? "none" : "flex",
                        alignItems: "center", justifyContent: "center",
                        background: card.item.bg, fontSize: "3.5rem", borderRadius: "13px",
                      }}>
                        {card.item.emoji}
                      </div>
                    </div>
                  ) : (
                    <div className="flip-name-card">
                      <div style={{
                        fontSize: card.item.name.length > 12 ? ".82rem" : ".95rem",
                        fontWeight: 800, textAlign: "center", color: "#3C3C3C",
                        lineHeight: 1.3, padding: "0 8px",
                      }}>
                        {card.item.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <PopupInsight item={popup} points={pendingPts} streak={pendingStrk}
          images={images} lang={lang} onClose={handlePopupClose} />
      )}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────
   6. SHARED UI COMPONENTS
───────────────────────────────────────────────────────────────── */

function LinguisticAnalysis({ item, lang }) {
  const t = T[lang];
  return (
    <div className="popup-ling">
      <h4>{t.lingTitle}</h4>
      {[
        { label: t.symbolism,   text: lang === "id" ? item.symbolism_id   : item.symbolism   },
        { label: t.metaphor,    text: lang === "id" ? item.metaphor_id    : item.metaphor    },
        { label: t.translation, text: lang === "id" ? item.translation_id : item.translation },
      ].map(({ label, text }) => (
        <div className="popup-ling-item" key={label}>
          <div className="popup-ling-label">{label}</div>
          <div className="popup-ling-text">{renderItalic(text)}</div>
        </div>
      ))}
    </div>
  );
}

function PopupInsight({ item, points, streak, images, lang, onClose }) {
  if (!item) return null;
  const t      = T[lang];
  const imgSrc = images?.[item.id];
  const streakLabel = streak > 1 ? `${streak}x Streak!` : null;
  const detail = lang === "id" ? item.detail_id : item.detail;

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-emoji-box" style={{ background: item.bg }}>{item.emoji}</div>
          <div>
            <div className="popup-title">{item.name}</div>
            <div className="popup-origin">📍 {item.origin}</div>
            <div className="popup-cat">{item.category}</div>
            {points > 0 && (
              <div style={{ marginTop: ".4rem", display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                <span className="popup-score-badge">+{points} pts</span>
                {streakLabel && <span className="popup-score-badge" style={{ background: "#FF9600" }}>{streakLabel}</span>}
              </div>
            )}
          </div>
        </div>
        <div className="popup-body">
          {imgSrc
            ? <img src={imgSrc} alt={item.name} className="popup-img" onError={e => { e.target.style.display = "none"; }} />
            : <div className="popup-img-fallback" style={{ background: item.bg + "33" }}>{item.emoji}</div>
          }
          <div className="popup-detail">{renderItalic(detail)}</div>
          <LinguisticAnalysis item={item} lang={lang} />
          <button className="popup-close-btn" onClick={onClose}>{t.gotIt}</button>
        </div>
      </div>
    </div>
  );
}

function GameHeader({ score, streak, matchedCount, totalCount, timeLeft, maxTime, modeLabel, diffLabel, lang, onBack }) {
  const t          = T[lang];
  const progressPct = (matchedCount / totalCount) * 100;
  const timerPct   = maxTime ? (timeLeft / maxTime) * 100 : null;
  const timerColor = timeLeft <= 20 ? "#FF4B4B" : timeLeft <= 45 ? "#FFB020" : "#58CC02";

  return (
    <div className="game-header">
      <button className="back-btn" onClick={onBack} style={{ marginBottom: 0 }}>{t.exitBtn}</button>
      <div className="stat-sep" />
      <div className="game-stat">
        <div className="game-stat-label">{t.score}</div>
        <div className="game-stat-value green">{score}</div>
      </div>
      <div className="stat-sep" />
      <div className="game-stat">
        <div className="game-stat-label">{t.streak} {streak >= 3 ? "🔥" : ""}</div>
        <div className="game-stat-value gold">{streak}</div>
      </div>
      {maxTime && (
        <>
          <div className="stat-sep" />
          <div className="game-stat">
            <div className="game-stat-label">{t.time}</div>
            <div className="game-stat-value" style={{ color: timerColor, fontFamily: "'Fredoka One',cursive", fontSize: "1.5rem" }}>
              {timeLeft}s
            </div>
          </div>
        </>
      )}
      <div className="stat-sep" />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#BBB" }}>{matchedCount}/{totalCount} {t.matched}</span>
          <span className="game-mode-badge">{modeLabel} · {diffLabel}</span>
        </div>
        <div className="game-progress">
          <div className="game-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        {maxTime && (
          <div className="timer-bar" style={{ marginTop: "4px" }}>
            <div className="timer-fill" style={{ width: `${timerPct}%`, background: timerColor }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7. GAME COMPONENTS
───────────────────────────────────────────────────────────────── */

function ClassicGame({ mode, difficulty, items, images, lang, onComplete, onBack }) {
  const cfg = DIFF[difficulty];
  const t   = T[lang];

  const [score,        setScore]        = useState(0);
  const [streak,       setStreak]       = useState(0);
  const [maxStreak,    setMaxStreak]    = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(cfg.time);
  const [matched,      setMatched]      = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null); // { item, idx }
  const [wrongLeftIdx,  setWrongLeftIdx]  = useState(null);
  const [wrongRightIdx, setWrongRightIdx] = useState(null);
  const [popup,        setPopup]        = useState(null);
  const [pendingPts,   setPendingPts]   = useState(0);
  const [pendingStrk,  setPendingStrk]  = useState(0);

  const rightItems      = useRef(shuffle(items)).current;
  const timerRef        = useRef();
  const pendingComplete = useRef(false);

  useEffect(() => {
    if (mode !== "timeAttack") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (mode === "timeAttack" && timeLeft === 0 && !popup) {
      onComplete(score, maxStreak, "timeout");
    }
  }, [timeLeft, popup]);

  const handleLeft = (item, idx) => {
    if (matched.includes(item.id) || popup) return;
    setSelectedLeft(prev => prev?.item.id === item.id ? null : { item, idx });
  };

  const handleRight = (item, idx) => {
    if (matched.includes(item.id) || popup || !selectedLeft) return;

    if (selectedLeft.item.id === item.id) {
      const newStreak  = streak + 1;
      const pts        = cfg.base * newStreak;
      const newMatched = [...matched, item.id];
      setScore(s => s + pts);
      setStreak(newStreak);
      setMaxStreak(m => Math.max(m, newStreak));
      setMatched(newMatched);
      setSelectedLeft(null);
      setPendingPts(pts);
      setPendingStrk(newStreak);
      setPopup(item);
      if (newMatched.length === items.length) pendingComplete.current = true;
    } else {
      // Wrong answer: flash ONLY the two clicked cards.
      // Do not use item.id here, because the same id exists in both columns.
      // Using index + side prevents revealing the correct pair.
      setStreak(0);
      setWrongLeftIdx(selectedLeft.idx);
      setWrongRightIdx(idx);
      setSelectedLeft(null);

      setTimeout(() => {
        setWrongLeftIdx(null);
        setWrongRightIdx(null);
      }, 700);
    }
  };

  const handlePopupClose = () => {
    setPopup(null);
    if (pendingComplete.current) onComplete(score + pendingPts, Math.max(maxStreak, pendingStrk));
  };

  const leftClass = (item, idx) => {
    if (matched.includes(item.id))          return "match-item correct";
    if (selectedLeft?.item.id === item.id)  return "match-item selected";
    if (idx === wrongLeftIdx)               return "match-item wrong-flash wrong-bg";
    return "match-item";
  };

  const rightClass = (item, idx) => {
    if (matched.includes(item.id)) return "match-item correct";
    if (idx === wrongRightIdx)     return "match-item wrong-flash wrong-bg";
    return "match-item";
  };

  const cardText = (item) => lang === "id" ? item.card_id : item.card;

  return (
    <div className="game-screen">
      <GameHeader
        score={score} streak={streak}
        matchedCount={matched.length} totalCount={items.length}
        timeLeft={timeLeft} maxTime={mode === "timeAttack" ? cfg.time : null}
        modeLabel={mode === "timeAttack" ? "Time Attack" : "Classic"}
        diffLabel={cfg.label} lang={lang} onBack={onBack}
      />
      <div className="classic-body">
        <div style={{ textAlign: "center", marginBottom: "1rem", fontSize: ".88rem", fontWeight: 700,
          color: selectedLeft ? "#58CC02" : "#AAA" }}>
          {selectedLeft
            ? t.hintSelect(selectedLeft.item.name)
            : matched.length < items.length ? t.hintStart : ""}
        </div>
        <div className="classic-cols">
          <div>
            <div className="col-label">{t.colNames}</div>
            {items.map((item, idx) => (
              <div key={item.id} className={leftClass(item, idx)} onClick={() => handleLeft(item, idx)}>
                <span className="item-emoji">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="col-label">{t.colDesc}</div>
            {rightItems.map((item, idx) => (
              <div key={item.id} className={rightClass(item, idx)} onClick={() => handleRight(item, idx)}>
                <span style={{ fontSize: ".88rem", lineHeight: 1.5 }}>{cardText(item)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {popup && (
        <PopupInsight item={popup} points={pendingPts} streak={pendingStrk} images={images} lang={lang} onClose={handlePopupClose} />
      )}
    </div>
  );
}

function MemoryFlipGame({ difficulty, items, images, lang, onComplete, onBack }) {
  const cfg = DIFF[difficulty];
  const t   = T[lang];

  const [cards, setCards] = useState(() =>
    shuffle(
      items.flatMap(item => [
        { uid: `${item.id}-n`, id: item.id, type: "name",  item },
        { uid: `${item.id}-i`, id: item.id, type: "image", item },
      ])
    ).map(c => ({ ...c, flipped: false, matched: false }))
  );
  const [selected,    setSelected]    = useState([]);
  const [score,       setScore]       = useState(0);
  const [streak,      setStreak]      = useState(0);
  const [maxStreak,   setMaxStreak]   = useState(0);
  const [popup,       setPopup]       = useState(null);
  const [pendingPts,  setPendingPts]  = useState(0);
  const [pendingStrk, setPendingStrk] = useState(0);
  const [isLocked,    setIsLocked]    = useState(false);

  const pendingComplete = useRef(false);
  const matchedCount    = cards.filter(c => c.matched).length / 2;

  const handleFlip = (idx) => {
    if (isLocked || cards[idx].flipped || cards[idx].matched || popup) return;
    if (selected.length === 1 && selected[0] === idx) return;

    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    setCards(newCards);

    if (selected.length === 0) {
      setSelected([idx]);
    } else {
      const [aIdx] = selected;
      setSelected([]);
      setIsLocked(true);
      const cardA = newCards[aIdx];
      const cardB = newCards[idx];
      const isMatch = cardA.id === cardB.id && cardA.type !== cardB.type;

      if (isMatch) {
        const newStreak = streak + 1;
        const pts = cfg.base * newStreak;
        setScore(s => s + pts);
        setStreak(newStreak);
        setMaxStreak(m => Math.max(m, newStreak));
        setPendingPts(pts);
        setPendingStrk(newStreak);
        setTimeout(() => {
          setCards(c => c.map((card, i) => i === aIdx || i === idx ? { ...card, matched: true } : card));
          setIsLocked(false);
          setPopup(cardB.item);
          if (matchedCount + 1 === items.length) pendingComplete.current = true;
        }, 500);
      } else {
        setStreak(0);
        setTimeout(() => {
          setCards(c => c.map((card, i) => i === aIdx || i === idx ? { ...card, flipped: false } : card));
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handlePopupClose = () => {
    const pts = pendingPts, st = pendingStrk;
    setPopup(null);
    if (pendingComplete.current) onComplete(score + pts, Math.max(maxStreak, st));
  };

  return (
    <div className="game-screen">
      <GameHeader
        score={score} streak={streak}
        matchedCount={matchedCount} totalCount={items.length}
        modeLabel="Memory Flip" diffLabel={cfg.label} lang={lang} onBack={onBack}
      />
      <div className="flip-body">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
          {cards.map((card, idx) => (
            <div
              key={card.uid}
              className={`flip-card-outer ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
              onClick={() => handleFlip(idx)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="flip-card-front-pattern">🌀</div>
                  <div style={{ fontSize: ".6rem", fontWeight: 800, color: "rgba(255,255,255,.5)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Flip!
                  </div>
                </div>
                <div className="flip-card-back" style={card.matched ? { borderColor: "#58CC02" } : {}}>
                  {card.type === "image" ? (
                    <div className="flip-image-card">
                      {images?.[card.item.id] ? (
                        <img
                          src={images[card.item.id]}
                          alt={card.item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                        />
                      ) : null}
                      <div style={{
                        width: "100%", height: "100%",
                        display: images?.[card.item.id] ? "none" : "flex",
                        alignItems: "center", justifyContent: "center",
                        background: card.item.bg, fontSize: "3.5rem", borderRadius: "13px",
                      }}>
                        {card.item.emoji}
                      </div>
                    </div>
                  ) : (
                    <div className="flip-name-card">
                      <div style={{
                        fontSize: card.item.name.length > 12 ? ".82rem" : ".95rem",
                        fontWeight: 800, textAlign: "center", color: "#3C3C3C",
                        lineHeight: 1.3, padding: "0 8px",
                      }}>
                        {card.item.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <PopupInsight item={popup} points={pendingPts} streak={pendingStrk} images={images} lang={lang} onClose={handlePopupClose} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   8. PAGE COMPONENTS
───────────────────────────────────────────────────────────────── */

function ResultPage({ score, maxStreak, mode, difficulty, itemCount, lang, onReplay, onMenu, onEnc }) {
  const cfg         = DIFF[difficulty];
  const t           = T[lang];
  const maxPossible = cfg.base * itemCount * itemCount;
  const pct         = Math.round((score / maxPossible) * 100);
  const trophy      = pct >= 80 ? "🏆" : pct >= 50 ? "🥈" : "🥉";

  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-trophy">{trophy}</div>
        <div className="result-title">{t.resultMsg(pct)}</div>
        <div className="result-score">{score}</div>
        <div style={{ fontSize: ".85rem", color: "#BBB", fontWeight: 700, marginTop: "-8px", marginBottom: "1rem" }}>
          {t.totalScore}
        </div>
        <div className="result-stats">
          <div className="result-stat">
            <div className="result-stat-val">🔥{maxStreak}</div>
            <div className="result-stat-label">{t.maxStreak}</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val">{pct}%</div>
            <div className="result-stat-label">{t.efficiency}</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val">{itemCount}</div>
            <div className="result-stat-label">{t.pairsMatched}</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-val" style={{ fontSize: "1rem", paddingTop: ".3rem" }}>{MODE_NAMES[mode]}</div>
            <div className="result-stat-label">{cfg.label}</div>
          </div>
        </div>
        <div className="result-btns">
          <button className="result-btn-main" onClick={onReplay}>{t.playAgain}</button>
          <button className="result-btn-sec"  onClick={onEnc}>{t.browseEnc}</button>
          <button className="result-btn-sec"  onClick={onMenu}>{t.mainMenu}</button>
        </div>
      </div>
    </div>
  );
}

function Encyclopedia({ images, lang, onBack }) {
  const t = T[lang];
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [expanded,  setExpanded]  = useState(null);

  const cats = ["All", ...new Set(CULTURE_DB.map(c => c.category.split("/")[0].trim()))];

  const filtered = CULTURE_DB.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q)
      || c.origin.toLowerCase().includes(q)
      || c.card.toLowerCase().includes(q)
      || (c.card_id || "").toLowerCase().includes(q);
    const matchCat = catFilter === "All" || c.category.includes(catFilter);
    return matchSearch && matchCat;
  });

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  const cardText  = (item) => lang === "id" ? item.card_id  : item.card;
  const detailText= (item) => lang === "id" ? item.detail_id: item.detail;

  return (
    <div className="enc">
      <div style={{ background: "#fff", borderBottom: "2px solid #F0E0C0", padding: "1rem var(--pad-x)",
        display: "flex", alignItems: "center", gap: "1rem", position: "sticky", top: 0, zIndex: 50 }}>
        <button className="back-btn" onClick={onBack} style={{ marginBottom: 0 }}>{t.backBtn}</button>
        <span style={{ fontFamily: "'Fredoka One',cursive", fontSize: "1.5rem", color: "#3C3C3C" }}>
          {t.encTitle}
        </span>
        <span style={{ marginLeft: "auto", fontSize: ".82rem", color: "#BBB", fontWeight: 700 }}>
          {CULTURE_DB.length} items
        </span>
      </div>

      <div className="enc-body">
        <input
          className="enc-search"
          placeholder={t.encSearch}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="enc-filters">
          {cats.map(cat => (
            <button key={cat} className={`enc-filter ${catFilter === cat ? "active" : ""}`} onClick={() => setCatFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="enc-list">
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", color: "#BBB", padding: "3rem", fontWeight: 700 }}>{t.encEmpty}</div>
          )}
          {filtered.map(item => {
            const imgSrc     = images?.[item.id];
            const isExpanded = expanded === item.id;
            return (
              <div key={item.id} className={`enc-card ${isExpanded ? "expanded" : ""}`} onClick={() => toggle(item.id)}>
                <div className="enc-card-header">
                  <div className="enc-card-emoji" style={{ background: item.bg }}>{item.emoji}</div>
                  <div className="enc-card-info">
                    <h3>{item.name}</h3>
                    <div className="enc-origin">📍 {item.origin}</div>
                    <div className="enc-cat">{item.category}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#BBB", fontSize: "1.2rem", flexShrink: 0 }}>
                    {isExpanded ? "▲" : "▼"}
                  </div>
                </div>
                {isExpanded && (
                  <div className="enc-card-body" style={{ display: "block" }}>
                    {imgSrc
                      ? <img src={imgSrc} alt={item.name} className="enc-img"
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                      : null
                    }
                    <div className="enc-img-fallback" style={{ background: item.bg + "33", display: imgSrc ? "none" : "flex" }}>
                      {item.emoji}
                    </div>
                    <div className="enc-card-sentence">"{cardText(item)}"</div>
                    <div className="enc-card-detail">{renderItalic(detailText(item))}</div>
                    <div className="enc-ling">
                      <h4>{t.lingTitle}</h4>
                      {[
                        { label: t.symbolism,   text: lang === "id" ? item.symbolism_id   : item.symbolism   },
                        { label: t.metaphor,    text: lang === "id" ? item.metaphor_id    : item.metaphor    },
                        { label: t.translation, text: lang === "id" ? item.translation_id : item.translation },
                      ].map(({ label, text }) => (
                        <div className="enc-ling-item" key={label}>
                          <div className="enc-ling-label">{label}</div>
                          <div className="enc-ling-text">{renderItalic(text)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GameHub({ lang, onStart, onBack }) {
  const t = T[lang];
  const [mode, setMode] = useState(null);
  const [diff, setDiff] = useState(null);

  const canStart   = mode && diff;
  const startLabel = canStart
    ? t.hubStart(GAME_MODES.find(m => m.key === mode)?.name, DIFF[diff].label)
    : t.hubPick;

  return (
    <div className="hub">
      <div className="hub-inner">
        <button className="back-btn" onClick={onBack}>{t.backHome}</button>
        <div className="hub-title">{t.hubTitle}</div>
        <div className="hub-sub">{t.hubSub}</div>

        <div className="hub-section-label">{t.hubModeLabel}</div>
        <div className="mode-cards">
          {GAME_MODES.map(m => (
            <div key={m.key} className={`mode-card ${mode === m.key ? "selected" : ""}`} onClick={() => setMode(m.key)}>
              <div className="mode-check">✓</div>
              <div className="mode-card-icon">{m.icon}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <span className="mode-tag" style={{ background: m.tagColor }}>{m.tag}</span>
            </div>
          ))}
        </div>

        <div className="hub-section-label">{t.hubDiffLabel}</div>
        <div className="diff-cards">
          {Object.entries(DIFF).map(([key, cfg]) => (
            <div key={key} className={`diff-card ${diff === key ? `selected-${key}` : ""}`}
              style={{ borderColor: diff === key ? cfg.color : undefined }}
              onClick={() => setDiff(key)}>
              <div style={{ fontSize: "1.8rem" }}>{cfg.dot}</div>
              <h3 style={{ color: diff === key ? cfg.color : "#3C3C3C" }}>{cfg.label}</h3>
              <p>{cfg.pairs} pairs · {cfg.base}pts/match</p>
            </div>
          ))}
        </div>

        <button className="hub-start-btn" disabled={!canStart}
          onClick={() => onStart(mode, diff, shuffle(CULTURE_DB).slice(0, DIFF[diff].pairs))}>
          {startLabel}
        </button>
      </div>
    </div>
  );
}

function LandingPage({ lang, setLang, onPlay, onEnc }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleEnc  = () => { setMenuOpen(false); onEnc();  };
  const handlePlay = () => { setMenuOpen(false); onPlay(); };

  const NAV_LINKS = [
    { label: t.navHome,  action: () => scrollTo("home")  },
    { label: t.navAbout, action: () => scrollTo("about") },
    { label: t.navModes, action: () => scrollTo("modes") },
    { label: t.navTeam,  action: () => scrollTo("team")  },
    { label: t.navEnc,   action: handleEnc                },
  ];

  const FEATURES = [
    { icon: "🧩", bg: "#E8F8E8", title: t.f1title, desc: t.f1desc },
    { icon: "📚", bg: "#F0F0FF", title: t.f2title, desc: t.f2desc },
    { icon: "🌍", bg: "#FFF8E8", title: t.f3title, desc: t.f3desc },
  ];

  const MODES_INFO = [
    { icon: "🃏", name: t.m1name, desc: t.m1desc, tag: t.m1tag, color: "#58CC02" },
    { icon: "⏱️", name: t.m2name, desc: t.m2desc, tag: t.m2tag, color: "#FFB020" },
    { icon: "🔁", name: t.m3name, desc: t.m3desc, tag: t.m3tag, color: "#1CB0F6" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="nav">
        <div className="nav-logo">Lingo<span>Cultura</span></div>
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <span key={l.label} className="nav-link" onClick={l.action}>{l.label}</span>
          ))}
          {/* Language toggle — desktop */}
          <div className="lang-toggle">
            <button className={`lang-option ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
            <button className={`lang-option ${lang === "id" ? "active" : ""}`} onClick={() => setLang("id")}>ID</button>
          </div>
          <button className="nav-btn" onClick={handlePlay}>{t.navPlay}</button>
        </div>
        <button className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <button key={l.label} className="mobile-menu-link" onClick={l.action}>{l.label}</button>
        ))}
        {/* Language toggle — mobile */}
        <div style={{ display: "flex", gap: ".5rem", padding: ".5rem 1rem" }}>
          <button className="mobile-menu-link" style={{ flex: 1, textAlign: "center",
            background: lang === "en" ? "#E8F8E8" : "none", color: lang === "en" ? "#58CC02" : "#888",
            border: lang === "en" ? "2px solid #58CC02" : "2px solid #E8E8E8", borderRadius: "10px" }}
            onClick={() => { setLang("en"); setMenuOpen(false); }}>English</button>
          <button className="mobile-menu-link" style={{ flex: 1, textAlign: "center",
            background: lang === "id" ? "#E8F8E8" : "none", color: lang === "id" ? "#58CC02" : "#888",
            border: lang === "id" ? "2px solid #58CC02" : "2px solid #E8E8E8", borderRadius: "10px" }}
            onClick={() => { setLang("id"); setMenuOpen(false); }}>Indonesia</button>
        </div>
        <div className="mobile-menu-divider" />
        <button className="mobile-menu-play" onClick={handlePlay}>{t.navPlay}</button>
      </div>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className="float-cards">
          {[
            { emoji: "🦁", label: "Ponorogo",  name: "Reog Ponorogo",   cls: "fc1" },
            { emoji: "🎭", label: "Malang",     name: "Topeng Malangan", cls: "fc2" },
            { emoji: "🍲", label: "East Java",  name: "Rawon",           cls: "fc3" },
            { emoji: "🐴", label: "Kediri",     name: "Jaranan",         cls: "fc4" },
          ].map(fc => (
            <div key={fc.name} className={`float-card ${fc.cls}`}>
              <span>{fc.emoji}</span>
              <div>
                <div className="fc-label">{fc.label}</div>
                <div className="fc-name">{fc.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">{t.heroBadge}</div>
          <h1 className="hero-title">
            <span className="line1">{t.heroTitle1}</span>
            <span className="line2">{t.heroTitle2}</span>
          </h1>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-btns">
            <button className="btn-primary"   onClick={handlePlay}>{t.heroPlay}</button>
            <button className="btn-secondary" onClick={handleEnc}>{t.heroBrowse}</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="section-inner">
          <div className="about-grid">
            <div>
              <div className="section-label">{t.aboutLabel}</div>
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="section-sub">{t.aboutSub}</p>
              <div className="about-features">
                {FEATURES.map(f => (
                  <div key={f.title} className="feature-card">
                    <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                    <div className="feature-text"><h4>{f.title}</h4><p>{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual">
              {[
                { num: "20", label: lang === "id" ? "Item Budaya dari Jawa Timur" : "Cultural Items from East Java" },
                { num: "3",  label: lang === "id" ? "Mode Permainan Unik" : "Unique Game Modes" },
                { num: "3",  label: lang === "id" ? "Tingkat Kesulitan" : "Difficulty Levels" },
              ].map(s => (
                <div key={s.label} className="about-stat"><h3>{s.num}</h3><p>{s.label}</p></div>
              ))}
              <div style={{ marginTop: "1.5rem", fontSize: ".9rem", opacity: .8, lineHeight: 1.7, position: "relative" }}>
                {t.aboutVisual}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="section section-alt" id="modes">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div className="section-label">{t.modesLabel}</div>
            <h2 className="section-title">{t.modesTitle}</h2>
          </div>
          <div className="modes-grid">
            {MODES_INFO.map(m => (
              <div key={m.name} className="mode-preview" onClick={handlePlay}>
                <span className="mode-icon">{m.icon}</span>
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
                <span className="mode-tag" style={{ background: m.color }}>{m.tag}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button className="btn-primary" onClick={handlePlay}>{t.chooseMode}</button>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="team">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div className="section-label">{t.teamLabel}</div>
            <h2 className="section-title">{t.teamTitle}</h2>
          </div>
          <div className="team-grid">
            {TEAM_MEMBERS.map(tm => (
              <div key={tm.name} className="team-card">
                <img className="team-avatar"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(tm.name)}&background=${tm.bg}&color=${tm.color}&size=176&font-size=0.38&bold=true&rounded=true`}
                  alt={tm.name}
                  style={{ border: `3px solid #${tm.color}55` }}
                />
                <div className="team-name">{tm.name}</div>
                <div className="team-role">{tm.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p><strong>LingoCultura</strong> — {t.footerTag}</p>
        <p style={{ marginTop: ".5rem", fontSize: ".8rem", opacity: .6 }}>{t.footerSub}</p>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   9. ROOT APP
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [page,       setPage]       = useState("landing");
  const [lang,       setLang]       = useState("en");
  const [gameMode,   setGameMode]   = useState(null);
  const [gameDiff,   setGameDiff]   = useState(null);
  const [gameItems,  setGameItems]  = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalMax,   setFinalMax]   = useState(0);
  const [images,     setImages]     = useState({});

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    CULTURE_DB.forEach(item => fetchWikiImage(item, setImages));
  }, []);

  const startGame = (mode, diff, items) => {
    setGameMode(mode); setGameDiff(diff); setGameItems(items);
    setPage("game");
  };

  const handleComplete = (score, maxStreak) => {
    setFinalScore(score); setFinalMax(maxStreak);
    setPage("result");
  };

  const replayGame = () => {
    setGameItems(shuffle(CULTURE_DB).slice(0, DIFF[gameDiff].pairs));
    setPage("game");
  };

  const nav = {
    toHub:     () => setPage("hub"),
    toLanding: () => setPage("landing"),
    toEnc:     () => setPage("encyclopedia"),
  };

  switch (page) {
    case "landing":
      return <LandingPage lang={lang} setLang={setLang} onPlay={nav.toHub} onEnc={nav.toEnc} />;
    case "hub":
      return <GameHub lang={lang} onStart={startGame} onBack={nav.toLanding} />;
    case "encyclopedia":
      return <Encyclopedia images={images} lang={lang} onBack={nav.toLanding} />;
    case "result":
      return (
        <ResultPage
          score={finalScore} maxStreak={finalMax}
          mode={gameMode} difficulty={gameDiff}
          itemCount={gameItems.length} lang={lang}
          onReplay={replayGame} onMenu={nav.toLanding} onEnc={nav.toEnc}
        />
      );
    case "game":
      return gameMode === "memoryFlip"
        ? <MemoryFlipGame difficulty={gameDiff} items={gameItems} images={images} lang={lang} onComplete={handleComplete} onBack={nav.toHub} />
        : <ClassicGame mode={gameMode} difficulty={gameDiff} items={gameItems} images={images} lang={lang} onComplete={handleComplete} onBack={nav.toHub} />;
    default:
      return null;
  }
}
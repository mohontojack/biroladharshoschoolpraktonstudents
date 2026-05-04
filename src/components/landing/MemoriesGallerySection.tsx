"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  TreePine,
  Laugh,
  Camera,
  Trophy,
  Flag,
  Facebook,
  Quote,
  ExternalLink,
  Bus,
} from "lucide-react";
import SectionReveal from "./SectionReveal";

interface MemoryItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  story: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  color: string;
}

const memoryCategories = [
  "All",
  "Campus",
  "Events",
  "Achievements",
  "Teachers",
  "Sports",
];

const memories: MemoryItem[] = [
  {
    id: "mem-1",
    title: "The School Gate — Where Dreams Began",
    titleBn: "স্কুলের গেট — যেখানে স্বপ্নের শুরু",
    description:
      "The iconic entrance where generations of students passed through with dreams in their eyes. যে গেট দিয়ে হাজারো শিক্ষার্থী স্বপ্ন নিয়ে প্রবেশ করেছে।",
    story:
      "The school gate of Biral Adarsha High School was never merely an iron structure — it was the threshold between ordinary life and extraordinary possibility. Every single morning, students from surrounding villages would walk miles along dusty paths, their bare feet treading the same earth their parents once walked, carrying tiffin carriers and worn-out school bags. Some cycled from as far as Bahala, some arrived on their fathers' shoulders, and some simply ran — late, breathless, but never willing to miss a single day. That gate witnessed the first-day tears of a six-year-old clutching his mother's hand, the nervous laughter of a new admission, and the bittersweet farewell of a graduating batch wiping their eyes. It saw the monsoon rains that turned the entrance into a small river, the winter fog that made everything look like a dream, and the golden summer mornings when the entire campus shimmered. For every BAHS alumnus scattered across Bangladesh and the world today, that gate remains the starting point of every success story. সেই গেটের নিচে দাঁড়িয়ে আমরা সবাই একসময় ছোট ছিলাম, স্বপ্ন দেখতাম, ভয় পেতাম — আর বিএএইচএস আমাদের সেই স্বপ্নগুলোকে বাস্তবতা হিসেবে দেখিয়েছে।",
    category: "Campus",
    icon: TreePine,
    image: "/images/gallery/img18.jpg",
    color: "from-forest to-forest-light",
  },
  {
    id: "mem-2",
    title: "Annual Sports Day — The Spirit of Competition",
    titleBn: "বার্ষিক ক্রীড়া — প্রতিযোগিতার উৎসাহ",
    description:
      "The most electrifying event of the year — where the entire school came alive with energy. সারা বছরের সবচেয়ে উত্তেজনাপূর্ণ দিন।",
    story:
      "The annual sports day at BAHS was not just an event — it was a festival that united the entire Biral community. For weeks before the big day, students would practice during every break, every evening, determined to bring glory to their class. The playground would be marked with pristine white lines, a grand stage erected with colorful banners, and the entire village would turn up to watch. Fathers would take a day off from farming, mothers would arrive with home-cooked food for their competing children, and grandparents would sit proudly on the sidelines. The 100-meter sprint was always the most anticipated event — entire sections of students would stand and scream themselves hoarse cheering for their champions. But beyond the races, there were cultural programs, prize ceremonies, and that magical moment when a shy student from a humble background would cross the finish line first, proving that talent and determination know no boundaries. Those sports days taught us that winning wasn't everything — courage, participation, and the joy of giving your absolute best was what truly mattered. এই মাঠেই আমরা শিখেছি হেরে যাওয়া মানে শেষ নয়, আবার দাঁড়ানো মানে সত্যিকারের জয়।",
    category: "Sports",
    icon: Trophy,
    image: "/images/gallery/img02.jpg",
    color: "from-gold-dark to-gold",
  },
  {
    id: "mem-3",
    title: "Victory Day — Honoring the Martyrs",
    titleBn: "মহান বিজয় দিবস — শহীদদের প্রতি শ্রদ্ধা",
    description:
      "Every December 16th, BAHS students gathered to pay tribute to the heroes of 1971. প্রতি ১৬ ডিসেম্বর আমরা শহীদদের প্রতি শ্রদ্ধা জানাতাম।",
    story:
      "The Victory Day celebration at BAHS carried a weight that no textbook could ever convey. On November 13, 1971, 37 innocent people were martyred by the Pakistani army at Bahala in Biral — and every year, this sacrifice was remembered with a solemnity that moved even the toughest hearts. Students would gather at the school ground dressed in white, carrying floral wreaths, marching in silence to the memorial. The flag hoisting ceremony was always the most powerful moment — watching the red and green rise slowly against the winter sky while hundreds of young voices sang 'Amar Sonar Bangla' in unison was enough to bring tears to anyone's eyes. Teachers would narrate stories of the Liberation War, of the bravery of ordinary villagers who picked up whatever weapons they could find, of mothers who lost sons and wives who lost husbands. These ceremonies instilled in every BAHS student a profound sense of patriotism and an understanding that the freedom they enjoyed came at an unimaginable cost. BAHS didn't just teach history — it made us feel the pulse of it, the blood in it, the sacrifice beneath it. বিজয় দিবসের সেই আবেগ আজও আমাদের বুকে অনুভূত হয়, যখন আমরা মনে করি এই স্বাধীনতা কত মানুষের রক্তের বিনিময়ে অর্জিত।",
    category: "Events",
    icon: Flag,
    image: "/images/gallery/img04.jpg",
    color: "from-red-700 to-red-500",
  },
  {
    id: "mem-4",
    title: "Classroom Memories — Where Magic Happened",
    titleBn: "ক্লাসরুমের স্মৃতি — যেখানে জাদু ঘটেছিল",
    description:
      "Wooden benches, green chalkboards, chalk dust in the air — our classrooms were sanctuaries of learning. কাঠের বেঞ্চ, সবুজ বোর্ড, আর সেই অপূর্ব পরিবেশ।",
    story:
      "If there is one place that shaped every BAHS student more than any other, it is the classroom. Rows of weathered wooden benches packed with students, the green chalkboard covered in equations and diagrams, chalk dust dancing in golden shafts of sunlight streaming through the windows — these are the images that live forever in our memories. The front-row students who always raised their hands, the back-row dreamers who gazed out the window imagining futures far beyond Biral, the window-seat philosophers who questioned everything — every classroom was a microcosm of Bangladesh's future. Teachers would arrive with nothing more than a piece of chalk and a heart full of knowledge, and somehow transform a room of restless children into a group of inspired minds. The sound of pencils scratching on paper, the whispered conversations during a particularly long lecture, the mad scramble to finish homework before the teacher entered, the collective groan when a surprise test was announced — these small moments collectively formed the most precious chapter of our school life. For students who came from families where no one had ever received formal education, these classrooms were nothing short of magical. এই ক্লাসরুমেই আমরা প্রথম শিখেছি যে শিক্ষা মানে শুধু পড়াশোনা নয়, শিক্ষা মানে জীবনকে বোঝা, জীবনকে ভালোবাসা, আর জীবনের জন্য লড়াই করা।",
    category: "Campus",
    icon: BookOpen,
    image: "/images/gallery/img17.jpg",
    color: "from-amber-600 to-amber-400",
  },
  {
    id: "mem-5",
    title: "BCS Pride — BAHS Alumni Serving the Nation",
    titleBn: "বিএইচএস-এর গর্ব — বিসিএস ক্যাডার",
    description:
      "Naimul Haque (45th BCS) and Afrin Brishti (49th BCS) — proof that BAHS nurtures national leaders. বিএইচএস থেকে বিসিএস ক্যাডার — আমাদের অহংকারের বিষয়।",
    story:
      "When the news broke that Naimul Haque had been recommended for the 45th BCS Administration Cadre, the entire Biral community erupted in celebration that lasted for days. A boy who had walked the dusty village roads to reach BAHS every morning, who had studied under the same tin roof as thousands of others, who had shared the same tiffin with classmates — had achieved what many from privileged backgrounds could not. Then came Afrin Brishti with the 49th BCS Special Education Cadre, further cementing BAHS's legacy as a school that produces national-level achievers. These success stories are not anomalies — they are the natural result of the extraordinary education provided by dedicated teachers who believed in every student regardless of their background. They proved that poverty of resources does not mean poverty of potential. A small school in a remote village of Dinajpur was competing with the most prestigious institutions in Dhaka and winning. Every BCS officer from BAHS carries with them the values of humility, hard work, and service that they learned in the classrooms of Biral. They are living proof that BAHS does not just educate — it transforms destinies. বিরালের ছোট্ট স্কুল থেকে বিসিএস ক্যাডার — এই কথাটা আজও আমাদের বুক গর্বে ভরিয়ে দেয়। এটা প্রমাণ করে যে শিক্ষার কোনো বিকল্প নেই, আর বিএইচএস সেই শিক্ষার আলো জ্বালিয়ে রেখেছে প্রতিটি শিক্ষার্থীর জীবনে।",
    category: "Achievements",
    icon: GraduationCap,
    image: "/images/gallery/img07.jpg",
    color: "from-forest to-gold-dark",
  },
  {
    id: "mem-6",
    title: "Campus Life — Our Silent Companion",
    titleBn: "ক্যাম্পাসের জীবন — আমাদের নীরব সঙ্গী",
    description:
      "Every tree, every corner, every bench on campus holds a thousand untold stories. ক্যাম্পাসের প্রতিটি কোণে লুকিয়ে আছে অগণিত স্মৃতি।",
    story:
      "The BAHS campus was a world unto itself — a small universe where friendships were born, dreams were nurtured, and life's most important lessons were learned outside any classroom. The old trees that lined the boundary provided shade for countless conversations — about cricket, about future plans, about the girl in the next section. The corridors echoed with footsteps during change of periods, the staircase witnessed nervous confessions before exams, and the playground held the sweat and tears of a thousand afternoons. During monsoon, the campus would transform into a waterlogged paradise where students would splash and play, their laughter competing with the sound of rain. During winter, the morning fog would blanket everything in white, making the red brick building look like a painting. And during summer, the scorching heat would drive everyone to the few shaded spots where they would sit and share stories. The campus wasn't just a physical space — it was a living, breathing character in every BAHS student's life story. Even today, when alumni visit after years, the moment they step onto the campus, every memory comes rushing back like a flood. এই ক্যাম্পাসের মাটিতে আমাদের হাসি, কান্না, স্বপ্ন, সবই মিশে আছে। এই মাটি আমাদের আপন করে নিয়েছে আর আমরা সারাজীবন এই ক্যাম্পাসকে মনে রাখবো।",
    category: "Campus",
    icon: TreePine,
    image: "/images/gallery/img06.jpg",
    color: "from-green-700 to-green-500",
  },
  {
    id: "mem-7",
    title: "SSC Results — Joy and Pride",
    titleBn: "এসএসসি ফলাফল — আনন্দ ও গর্ব",
    description:
      "The most nerve-wracking day of school life — when months of hard work met their verdict. এসএসসি পরীক্ষার ফলাফলের দিন — উত্তেজনা আর আনন্দের মিশেল।",
    story:
      "The day SSC results were published was unlike any other day in the life of a BAHS student. The entire village would hold its breath. Students would gather at the school, at local computer shops, or crowd around the single smartphone in the neighborhood, fingers trembling as they typed their roll numbers one digit at a time. When the results appeared — the reactions were unforgettable. Screams of joy that echoed across the campus, tears streaming down faces of proud parents, teachers embracing their students with tears in their own eyes. In recent years, BAHS has consistently produced outstanding results — with students achieving GPA-5 across Science, Business Studies, and Humanities, a remarkable feat for a school in a rural area. These results were never just individual achievements — they were victories for the entire community. For a farmer's son to score the highest marks, for a day laborer's daughter to achieve a golden GPA — these were miracles that BAHS made possible every single year. The sweets distributed in the neighborhood, the congratulatory phone calls from distant relatives, the proud announcements at the local mosque — SSC result day at BAHS was a celebration of what dedication and quality education can achieve even in the most resource-constrained environments. বিরালের ছোট্ট স্কুল থেকে এত বড় ফলাফল — এটা সম্ভব হয়েছে শুধু শিক্ষকদের অকৃত্রিম আন্তরিকতার কারণে।",
    category: "Achievements",
    icon: Trophy,
    image: "/images/gallery/img03.jpg",
    color: "from-gold-dark to-gold-light",
  },
  {
    id: "mem-8",
    title: "Tiffin Break — The Golden Hours",
    titleBn: "টিফিন ব্রেক — সোনালী সময়",
    description:
      "The most anticipated 30 minutes of the day — sharing food, laughter, and unforgettable moments. দিনের সবচেয়ে আনন্দময় মুহূর্ত — টিফিন ব্রেক।",
    story:
      "If heaven existed for school students, it was those precious 30 minutes of tiffin break at BAHS. The moment the bell rang, the entire school would transform. Classrooms would empty in seconds, the playground would fill with running students, and the campus would come alive with an energy that no teacher could contain. Students would huddle under trees, on the staircase, in the corridors — sharing home-cooked food from small steel containers. Rice and dal, fish curry, mashed potato, and on special days — pitha or mishti that someone's mother had lovingly prepared. The sharing was never about the food — it was about love, about belonging, about the unspoken bond of being a BAHS family. Some students would rush to the school canteen for a rare treat — biscuits, chanachur, or a cold drink on a hot day. On the playground, impromptu cricket matches would erupt with a tennis ball and a broken branch for a bat. Others would sit quietly under a tree reading a novel borrowed from the library, or simply gossip about the latest news. These 30 minutes were the golden threads that wove the fabric of lifelong friendships. Even today, when alumni meet, the first thing they remember is not the exams or the results — it's those tiffin breaks where the simplest food tasted like a feast because it was shared with the best friends in the world. টিফিন ব্রেকের সেই সোনালী সময় আজও আমাদের মনে হলে বুক ভেঙে যায়। সেই সময়গুলো ফিরে পাওয়া যায় না, কিন্তু স্মৃতি হিসেবে চিরকাল বেঁচে থাকবে।",
    category: "Events",
    icon: Laugh,
    image: "/images/gallery/img05.jpg",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "mem-9",
    title: "Teachers Who Changed Our Lives",
    titleBn: "শিক্ষকগণ — জীবন বদলে দেওয়া মানুষ",
    description:
      "They were more than educators — they were mentors, guides, and parental figures who shaped who we are. তাঁরা শুধু শিক্ষক ছিলেন না, তাঁরা ছিলেন জীবন বদলে দেওয়া মানুষ।",
    story:
      "The teachers of BAHS were the beating heart of the institution — men and women who dedicated their entire lives to the education and upliftment of rural children. They arrived at school before the first student and left after the last one had gone home. Many of them walked miles from their own villages, carrying bags full of answer sheets to grade late into the night. Mohi Uddin Sir, whose legendary discipline taught an entire generation the value of punctuality and responsibility — students still quote his words decades after leaving school. Abdul Hakim Sir, whose gentle wisdom extended far beyond textbooks and whose door was always open for any student in need. Farju Ara Toyes Apa, whose compassion made every child feel seen and valued, especially those who came from the most disadvantaged backgrounds. Rai Kamal Sarkar Sir, whose unwavering dedication to science education inspired countless students to pursue careers in engineering and medicine. These teachers did not choose this profession for money or prestige — they chose it because they believed in the transformative power of education. They invested their own money to buy books for poor students, visited homes to convince parents to keep their children in school, and stayed after hours to provide extra coaching to struggling students. They believed in us when the world didn't, they pushed us when we wanted to give up, and they celebrated every small victory as if it were their own. As the Alumni Eid Reunion & Farewell 2026 approaches, it is these extraordinary human beings that we honor most — for everything we are today, we owe to them. আমাদের শিক্ষকগণ ছিলেন আমাদের জীবনের আলো। তাঁদের কৃপণতা ছিল না, তাঁদের আন্তরিকতা ছিল অসীম, আর তাঁদের ভালোবাসা ছিল শর্তহীন।",
    category: "Teachers",
    icon: Heart,
    image: "/images/gallery/img01.jpg",
    color: "from-forest to-forest-light",
  },
  {
    id: "mem-10",
    title: "Morning Assembly — Lessons in Discipline",
    titleBn: "সকালের সমাবেশ — শৃঙ্খলার শিক্ষা",
    description:
      "Standing in straight lines, singing the national anthem, watching the flag rise — a daily lesson in discipline. সোজা লাইনে দাঁড়িয়ে জাতীয় সঙ্গীত গাওয়া — প্রতিদিনের শৃঙ্খলার শিক্ষা।",
    story:
      "The morning assembly at BAHS was a sacred daily ritual that quietly shaped the character of every student who passed through its gates. Hundreds of students standing in neat, precise lines on the school ground, the early morning mist slowly lifting as the sun climbed higher — it was a sight that could fill any visitor with awe. The assembly would begin with the singing of 'Amar Sonar Bangla' — hundreds of young voices rising in unison, a sound so powerful it could move mountains and certainly moved hearts. There was something profoundly transformative about standing shoulder to shoulder with your classmates, singing about the beauty and sacrifice of your motherland, while watching the red and green flag climb against the blue sky. The headmaster's address would follow — sometimes stern about attendance and discipline, sometimes encouraging about upcoming exams, but always filled with genuine care for the students' wellbeing. Important announcements, student achievements, and upcoming events would be shared. On special days, students would present speeches, poems, or short cultural performances. This daily ritual instilled values that no textbook could teach — the value of punctuality, the power of collective identity, the importance of respect, and the beauty of starting each day with purpose. Many alumni credit the morning assembly as the foundation of their professional discipline later in life. সকালের সমাবেশে দাঁড়িয়ে আমরা শিখেছি শৃঙ্খলা, শিখেছি সময়ের গুরুত্ব, আর শিখেছি দেশের জন্য ভালোবাসা। সেই শিক্ষা আজও আমাদের গাইড করে।",
    category: "Campus",
    icon: Flag,
    image: "/images/gallery/img11.jpg",
    color: "from-forest-dark to-forest",
  },
  {
    id: "mem-11",
    title: "School Trip — Unforgettable Days",
    titleBn: "স্কুল ট্রিপ — অবিস্মরণীয় দিন",
    description:
      "The rare school excursions that opened our eyes to the world beyond Biral. বিরালের বাইরের দুনিয়া দেখার সেই অবিস্মরণীয় স্কুল ট্রিপ।",
    story:
      "For students growing up in the villages around Biral, a school trip was the equivalent of a journey to another planet. The excitement would begin days before the actual trip — packing snacks, borrowing a camera from a relative, staying up the entire night before out of pure excitement. The bus journey itself was an adventure — singing songs at the top of our lungs, pressing our faces against the window to see the changing landscape, sharing food and stories as the countryside rolled by. Whether it was a visit to a historical site in Dinajpur town, a science exhibition in Rajshahi, or a nature trip to a nearby forest — every school trip opened our eyes to a world beyond the boundaries of our small village. Students who had never seen a multi-story building would stare in wonder at the city skyline. Those who had never eaten at a restaurant would savor every bite of a simple meal with an enthusiasm that only comes from experiencing something truly new. But more than the destinations, it was the journey itself that created the most precious memories. The friends who sat together on the bus, the pranks played on tired teachers, the songs sung until our throats hurt — these moments became the stories we would tell for the rest of our lives. For many BAHS students, school trips were their first taste of adventure, their first understanding that the world was much bigger and more beautiful than they had ever imagined. সেই স্কুল ট্রিপগুলো ছিল আমাদের জীবনের সবচেয়ে সুন্দর অভিজ্ঞতাগুলোর একটি। আমরা বিশ্বাস করতাম না যে দুনিয়া এত সুন্দর হতে পারে, যতক্ষণ না আমরা নিজে দেখলাম।",
    category: "Events",
    icon: Bus,
    image: "/images/gallery/img16.jpg",
    color: "from-purple-600 to-purple-400",
  },
  {
    id: "mem-12",
    title: "Science Academy — The Light of Knowledge",
    titleBn: "বিজ্ঞান একাডেমি — জ্ঞানের আলো",
    description:
      "Biral Science Academy nurtured young scientific minds and brought BDJSO Olympiads to BAHS. বিজ্ঞান একাডেমি আমাদের মেধাকে নতুন উচ্চতায় নিয়ে গেছে।",
    story:
      "In recent years, BAHS has emerged as a beacon of scientific curiosity and academic excellence, thanks largely to the transformative work of the Biral Science Academy. The BDJSO (Bangladesh Junior Science Olympiad) events hosted at BAHS have given rural students opportunities that were once unimaginable — competing in mathematics olympiads, science fairs, and quiz competitions at regional and national levels. Students who once thought science was merely about memorizing formulas from a textbook discovered the thrill of hands-on experiments, creative problem-solving, and the pure joy of intellectual competition. The annual science fair exhibitions became one of the most anticipated events on the school calendar, with students presenting innovative projects on renewable energy, agricultural science, environmental conservation, and technology. What made these initiatives truly remarkable was that they proved — once again — that talent is distributed equally across Bangladesh, but opportunity is not. By bringing Olympiad-level exposure to a school in rural Dinajpur, the Science Academy leveled the playing field for students who otherwise would never have had access to such experiences. Many participants went on to pursue higher education in science and engineering, carrying with them the confidence and curiosity that was first ignited in the classrooms and laboratories of BAHS. বিজ্ঞান একাডেমি প্রমাণ করেছে যে বিরালের মেধাবী শিক্ষার্থীরা দেশের যেকোনো প্রতিষ্ঠানের সাথে প্রতিযোগিতা করতে সক্ষম। জ্ঞানের আলো এখন বিরালের প্রতিটি ঘরে পৌঁছে যাচ্ছে।",
    category: "Events",
    icon: BookOpen,
    image: "/images/gallery/img08.jpg",
    color: "from-forest to-sage",
  },
];

function MemoryCard({
  memory,
  index,
  onOpen,
}: {
  memory: MemoryItem;
  index: number;
  onOpen: () => void;
}) {
  const Icon = memory.icon;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 50) + 20
  );

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <SectionReveal
      delay={index * 0.08}
      direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative bg-white rounded-2xl overflow-hidden border border-forest/5 hover:border-gold/25 hover:shadow-xl hover:shadow-forest/8 transition-all duration-500 cursor-pointer h-full flex flex-col"
        onClick={onOpen}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${memory.color} opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
              {memory.category}
            </span>
          </div>

          {/* Icon */}
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Bottom gradient text */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-white font-bold text-sm drop-shadow-lg leading-tight">
              {memory.title}
            </h3>
            <p className="text-white/70 text-xs mt-0.5 font-medium">
              {memory.titleBn}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
            {memory.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-forest/5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-all duration-200 min-h-[36px] ${
                liked
                  ? "bg-red-50 text-red-500 border border-red-200"
                  : "bg-cream text-muted-foreground border border-transparent hover:border-gold/20"
              }`}
            >
              <Heart
                className={`w-3 h-3 ${liked ? "fill-red-500" : ""}`}
              />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-muted-foreground hover:text-forest hover:bg-cream transition-colors min-h-[36px]"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Comment</span>
            </button>
            <div className="ml-auto">
              <span className="text-xs text-muted-foreground/40 font-medium">
                Read Story →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionReveal>
  );
}

function MemoryModal({
  memory,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  memory: MemoryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const Icon = memory.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-forest-dark/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${memory.color} opacity-40`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div className="absolute bottom-4 left-5 right-5">
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
              {memory.category}
            </span>
            <h2 className="text-white font-bold text-xl mt-2 drop-shadow-lg">
              {memory.title}
            </h2>
            <p className="text-white/70 text-sm mt-0.5">{memory.titleBn}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Story */}
          <div className="relative mb-6">
            <div className="absolute -left-4 top-0 text-gold/10">
              <Quote className="w-8 h-8" />
            </div>
            <p className="text-muted-foreground leading-[1.8] text-[15px] pl-4 border-l-2 border-gold/20">
              {memory.story}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-forest/5">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-forest/5 hover:bg-forest/10 rounded-full text-forest-dark text-sm transition-colors">
              <Heart className="w-4 h-4" />
              Like
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-cream hover:bg-sage rounded-full text-muted-foreground text-sm transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <a
              href="https://www.facebook.com/bahs.dnj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 text-sm transition-colors ml-auto"
            >
              <Facebook className="w-4 h-4" />
              View on FB
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MemoriesGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredMemories =
    selectedCategory === "All"
      ? memories
      : memories.filter((m) => m.category === selectedCategory);

  const openMemory = (memory: MemoryItem, index: number) => {
    setSelectedMemory(memory);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedMemory(filteredMemories[newIndex]);
    setSelectedIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % filteredMemories.length;
    setSelectedMemory(filteredMemories[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <section id="memories" className="py-24 md:py-32 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-forest/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span className="text-forest/70 text-sm font-medium">
              Memory Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            Our School &
            <span className="block text-forest/60 font-light mt-2">
              Our Memories
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Every corner of BAHS holds a thousand stories. From the school gate where
            our journey began to the playground where friendships were forged — these
            are the memories that define us. আমাদের স্কুল, আমাদের স্মৃতি — সবই অমূল্য।
          </p>
        </SectionReveal>

        {/* Featured Memory Banner */}
        <SectionReveal delay={0.1} className="mb-12">
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openMemory(memories[0], 0)}>
            <div className="relative h-56 md:h-72">
              <img
                src="/images/gallery/img19.jpg"
                alt="BAHS Alumni — Memories That Last Forever"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-xs font-semibold w-fit mb-3">
                <Heart className="w-3 h-3" />
                Featured Memory
              </span>
              <h3 className="text-white font-bold text-xl md:text-3xl drop-shadow-lg max-w-lg">
                The School Gate — Where Dreams Began
              </h3>
              <p className="text-white/70 text-sm mt-1 font-medium">
                স্কুলের গেট — যেখানে স্বপ্নের শুরু
              </p>
              <p className="text-white/60 text-sm mt-2 max-w-lg leading-relaxed">
                The iconic entrance where generations of students passed through with
                dreams in their eyes, carrying hopes of a brighter future from the
                villages of Biral. যে গেট দিয়ে হাজারো শিক্ষার্থী স্বপ্ন নিয়ে
                প্রবেশ করেছে।
              </p>
              <div className="inline-flex items-center gap-1 text-gold text-xs mt-3 group-hover:gap-2 transition-all">
                <span>Read the full story</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Category Filter */}
        <SectionReveal delay={0.15} className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {memoryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-forest text-white shadow-md shadow-forest/20"
                    : "bg-white text-muted-foreground border border-forest/10 hover:border-gold/30 hover:text-forest-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-center text-muted-foreground/60 text-xs mt-3">
            Showing {filteredMemories.length} {filteredMemories.length === 1 ? "memory" : "memories"} — click any card to read the full story
          </p>
        </SectionReveal>

        {/* Memory Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
                onOpen={() => openMemory(memory, index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Facebook page link */}
        <SectionReveal delay={0.3} className="text-center mt-12">
          <a
            href="https://www.facebook.com/bahs.dnj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest/5 hover:bg-forest/10 border border-forest/10 hover:border-forest/20 rounded-full text-sm text-forest-dark font-medium transition-colors"
          >
            <Facebook className="w-4 h-4" />
            View more on BAHS Facebook Page →
          </a>
        </SectionReveal>
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={filteredMemories.length > 1}
            hasNext={filteredMemories.length > 1}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

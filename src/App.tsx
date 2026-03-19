import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Lightbulb, 
  Code, 
  Presentation, 
  HeartPulse, 
  GraduationCap, 
  ShieldCheck, 
  Globe, 
  Leaf, 
  Zap,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { RegistrationForm } from './components/RegistrationForm';

const challenges = [
  { id: 1, title: 'רפואה ובריאות דיגיטלית', icon: HeartPulse, desc: 'שיפור קבלת החלטות רפואיות, רצף טיפולי וחוויית עבודה של צוותים רפואיים.' },
  { id: 2, title: 'בריאות, רווחה ואיכות חיים', icon: Zap, desc: 'שיפור איכות החיים והרווחה של אנשים וקהילות בעזרת פתרונות חכמים.' },
  { id: 3, title: 'חינוך וכלים לדור הבא', icon: GraduationCap, desc: 'הענקת כלים, מיומנויות והזדמנויות שיאפשרו לדור הבא להוביל.' },
  { id: 4, title: 'שירותים ציבוריים חכמים (GovTech)', icon: Globe, desc: 'הפיכת שירותים ציבוריים לפשוטים יותר, נגישים יותר ושקופים יותר.' },
  { id: 5, title: 'חוסן קהילתי ושייכות', icon: ShieldCheck, desc: 'חיזוק חוסן חברתי, תחושת שייכות וקשרים בין אנשים.' },
  { id: 6, title: 'קיימות ותשתיות חיים', icon: Leaf, desc: 'התמודדות עם אתגרי קיימות ותשתיות כחלק מהחיים היומיומיים.' },
];

const schedule = [
  { time: '08:30', event: 'התכנסות, הרשמה וקפה' },
  { time: '09:00', event: 'פתיחה רשמית: מה זה ISEF 2045' },
  { time: '09:10', event: 'הצגת אתגרי הליבה' },
  { time: '09:25', event: 'במה פתוחה לרעיונות (60 שניות לרעיון)' },
  { time: '09:45', event: 'בניית צוותים (4-6 משתתפים)' },
  { time: '10:05', event: 'ספרינט 1: מיקוד מוצר והצעת ערך' },
  { time: '10:25', event: 'ספרינט 2: בניית אבטיפוס (Figma, POC)' },
  { time: '11:35', event: 'סבב מנטורים 1: חידוד פתרון' },
  { time: '12:05', event: 'הפסקת צהריים ונטוורקינג' },
  { time: '12:35', event: 'ספרינט 3: Demo Ready' },
  { time: '13:35', event: 'ספרינט 4: Pitch Build' },
  { time: '13:55', event: 'סבב מנטורים 2: חידוד הפיץ׳' },
  { time: '14:15', event: 'Demo Day: הצגות מול שופטים' },
  { time: '15:40', event: 'הכרזה על זוכים ומה הלאה' },
];

export default function App() {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1920" 
            alt="Hackathon background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-yellow-400 text-black font-bold mb-6 brutal-border">
              ISEF 2045 HACKATHON
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              הופכים רעיונות<br />לפתרונות אמיתיים
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium text-zinc-300">
              האקתון חצי־יומי שמחבר בין בוגרות ובוגרי אייסף לבין סטודנטיות וסטודנטים מצטיינים.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button onClick={scrollToRegister} className="brutal-button bg-yellow-400 text-black text-xl w-full md:w-auto">
                הירשמו עכשיו
              </button>
              <div className="flex items-center gap-4 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>8 שעות של עשייה</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>בוגרים + סטודנטים</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">זה לא אירוע של "עוד מצגות ועוד דיבורים"</h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                האקתון ISEF 2045 הוא פורמט ספרינט ממוקד: מגיעים עם סקרנות, יוצאים עם אבטיפוס, דמו וסיפור ברור.
                במהלך 8 שעות נעבוד בצוותים כדי לפתח פתרונות טכנולוגיים לאתגרים שמשפיעים על איכות החיים בישראל.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 border-l-4 border-black bg-zinc-50">
                  <div className="font-black text-3xl mb-1">8h</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-zinc-500">זמן עבודה נטו</div>
                </div>
                <div className="p-4 border-l-4 border-black bg-zinc-50">
                  <div className="font-black text-3xl mb-1">MVP</div>
                  <div className="text-sm font-bold uppercase tracking-wider text-zinc-500">תוצר מוחשי</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square brutal-border overflow-hidden rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 brutal-border -rotate-3 hidden md:block">
                <p className="font-bold text-lg italic">"מצוינות עם משמעות"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-zinc-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">אתגרי הליבה</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">בחרו אתגר אחד, זהו בו נקודת כאב ברורה, והתמקדו בפתרון שניתן לבנייה ולהדגמה.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((c, i) => (
              <motion.div 
                key={c.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 brutal-border group"
              >
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6 brutal-border group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-8">מתחילים עוד לפני ההאקתון</h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-yellow-400">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-yellow-400 rounded-full" />
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">וובינר 1: Kickoff והיכרות</h4>
                  <p className="text-zinc-400">ליצור חיבור, לתת שפה משותפת, ולהוריד חשש אצל אנשים שאין להם רעיון או צוות.</p>
                </div>
                <div className="relative pl-8 border-l-2 border-yellow-400">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-yellow-400 rounded-full" />
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">וובינר 2: Matchmaking וחידוד רעיונות</h4>
                  <p className="text-zinc-400">להפוך את הוובינר לאירוע תכל’ס - לצאת ממנו עם צוותים סגורים וכיוון ברור.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-zinc-900 brutal-border border-white/20 p-6 flex flex-col justify-center items-center text-center">
                <Users className="w-10 h-10 mb-4 text-yellow-400" />
                <span className="font-bold">נטוורקינג מונחה</span>
              </div>
              <div className="aspect-square bg-zinc-900 brutal-border border-white/20 p-6 flex flex-col justify-center items-center text-center">
                <Lightbulb className="w-10 h-10 mb-4 text-yellow-400" />
                <span className="font-bold">חידוד רעיונות</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">לו"ז ההאקתון</h2>
          <div className="max-w-3xl mx-auto">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-center gap-8 py-4 border-b border-zinc-100 group">
                <div className="w-20 font-mono text-lg font-bold text-zinc-400 group-hover:text-black transition-colors">
                  {item.time}
                </div>
                <div className="flex-1 font-bold text-lg">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 bg-yellow-400">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">מוכנים לבנות את העתיד?</h2>
            <p className="text-xl font-bold">הצטרפו אלינו ל-8 שעות של חדשנות, יצירה ומשמעות.</p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-black mb-2">ISEF 2045</h3>
              <p className="text-zinc-500 text-sm">מצוינות עם משמעות. בונים את ישראל של המחר.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <span className="text-zinc-400 text-sm">צור קשר:</span>
              <a href="tel:+97250786690" className="hover:text-yellow-400 transition-colors font-bold">
                נועה - ממלאת מקום וועד ראש ארגון הבוגרים | 050-786-690
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-zinc-600 text-xs">
            © 2026 ISEF Foundation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

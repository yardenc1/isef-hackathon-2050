import React from 'react';
import { useForm } from 'react-hook-form';

const ISEF_BLUE = '#1B2F6E';
const ISEF_ORANGE = '#F5821F';

interface RegistrationFormData {
  fullName: string;
  phone: string;
  email: string;
  status: string;
  institution: string;
  city: string;
  challenges: string[];
  professionalBackground: string;
  hasTeam: string;
  // אם יש צוות
  teamMembers?: string;
  ideaDescription?: string;
  // אם אין צוות
  hasIdea?: string;
  joinExistingTeam?: string;
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: `2px solid ${ISEF_BLUE}`,
  outline: 'none',
  fontSize: '1rem',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '6px',
  color: ISEF_BLUE,
};

export const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<RegistrationFormData>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const hasTeam = watch('hasTeam');
  const hasIdea = watch('hasIdea');

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setError(null);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'שגיאה לא ידועה');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error saving registration:', err);
      setError('חלה שגיאה בשמירת הנתונים. אנא נסו שוב מאוחר יותר.');
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0fdf4', border: `2px solid #22c55e`, borderRadius: '12px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: ISEF_BLUE, marginBottom: '8px' }}>תודה שנרשמת!</h3>
        <p style={{ color: '#166534' }}>הפרטים שלך התקבלו. ניצור קשר עם פרטים נוספים על מפגש חיבור הצוותים.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: 'white', padding: '40px', border: `2px solid ${ISEF_BLUE}`, boxShadow: `6px 6px 0 ${ISEF_ORANGE}` }}>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: ISEF_BLUE, borderBottom: `2px solid ${ISEF_ORANGE}`, paddingBottom: '10px', marginBottom: '8px' }}>שאלון הרשמה</h3>
        <p style={{ fontSize: '0.875rem', color: '#52525b' }}>הטופס נועד להכיר אתכם, לשבץ לצוותים חזקים, ולוודא שלכולם יש חווית האקתון מקצועית וכיפית.</p>
      </div>

      {/* פרטים אישיים */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div>
          <label style={labelStyle}>שם מלא</label>
          <input {...register('fullName', { required: true })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>טלפון</label>
          <input {...register('phone', { required: true })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>אימייל</label>
          <input {...register('email', { required: true })} type="email" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>סטטוס</label>
          <select {...register('status', { required: true })} style={inputStyle}>
            <option value="">-- בחר/י --</option>
            <option value="בוגר/ת אייסף">בוגר/ת אייסף</option>
            <option value="סטודנט/ית אייסף">סטודנט/ית אייסף</option>
            <option value="אחר">אחר</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>מוסד לימודים / מקום עבודה</label>
          <input {...register('institution', { required: true })} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>עיר מגורים</label>
          <input {...register('city', { required: true })} style={inputStyle} />
        </div>
      </div>

      {/* אתגרים */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>איזה אתגר הכי מעניין אותך?</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['בריאות ורווחת האדם (HealthTech)', 'חינוך וכלים לדור הבא', 'חוסן קהילתי ושייכות', 'שירותים ציבוריים חכמים (GovTech)', 'קיימות ותשתיות חיים', 'פתוח / אחר'].map(c => (
            <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" value={c} {...register('challenges')} style={{ width: '16px', height: '16px', accentColor: ISEF_ORANGE }} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* רקע מקצועי */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>רקע מקצועי / תחום התמחות</label>
        <textarea
          {...register('professionalBackground', { required: true })}
          placeholder="ספר/י בקצרה על הרקע המקצועי שלך, התפקיד הנוכחי, ומה אתה/את מביא/ה לצוות"
          style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
        />
      </div>

      {/* יש צוות? */}
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>האם יש לך צוות קיים?</label>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['כן', 'לא'].map(v => (
            <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" value={v} {...register('hasTeam', { required: true })} style={{ width: '16px', height: '16px', accentColor: ISEF_ORANGE }} />
              <span style={{ fontWeight: 'bold' }}>{v}</span>
            </label>
          ))}
        </div>
      </div>

      {/* אם יש צוות */}
      {hasTeam === 'כן' && (
        <div style={{ backgroundColor: '#EFF6FF', padding: '20px', border: `2px solid ${ISEF_BLUE}`, marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold', color: ISEF_BLUE, marginBottom: '16px' }}>מעולה! ספר/י לנו על הצוות:</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>שמות חברי הצוות</label>
            <textarea
              {...register('teamMembers')}
              placeholder="שם מלא, תפקיד — שם מלא, תפקיד"
              style={{ ...inputStyle, height: '70px', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={labelStyle}>תיאור הרעיון / הבעיה שאתם עובדים עליה</label>
            <textarea
              {...register('ideaDescription')}
              placeholder="תאר/י בקצרה את הבעיה ואת הפתרון שאתם מציעים"
              style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
            />
          </div>
        </div>
      )}

      {/* אם אין צוות */}
      {hasTeam === 'לא' && (
        <div style={{ backgroundColor: '#FFF7ED', padding: '20px', border: `2px solid ${ISEF_ORANGE}`, marginBottom: '24px' }}>
          <p style={{ fontWeight: 'bold', color: ISEF_BLUE, marginBottom: '16px' }}>נחבר אותך לצוות מושלם במפגש החיבור 🤝</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>האם יש לך רעיון לפרויקט?</label>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['כן', 'לא'].map(v => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" value={v} {...register('hasIdea')} style={{ width: '16px', height: '16px', accentColor: ISEF_ORANGE }} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
            {hasIdea === 'כן' && (
              <textarea
                {...register('ideaDescription')}
                placeholder="תאר/י את הרעיון בשתי שורות"
                style={{ ...inputStyle, height: '70px', resize: 'vertical', marginTop: '12px' }}
              />
            )}
          </div>
          <div>
            <label style={labelStyle}>האם תהיה/י מוכן/ה להצטרף לצוות קיים?</label>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['כן', 'לא'].map(v => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" value={v} {...register('joinExistingTeam')} style={{ width: '16px', height: '16px', accentColor: ISEF_ORANGE }} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', backgroundColor: '#FEF2F2', border: '2px solid #ef4444', color: '#991b1b', fontWeight: 'bold', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.6 : 1,
          backgroundColor: ISEF_BLUE,
          color: 'white',
          border: `3px solid ${ISEF_BLUE}`,
          fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}
      >
        {isSubmitting ? 'שולח...' : 'שלח הרשמה ✓'}
      </button>
    </form>
  );
};

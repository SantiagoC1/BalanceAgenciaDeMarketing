import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { submitLead } from '../../lib/api';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface FormState {
  nombre:   string;
  email:    string;
  telefono: string;
  mensaje:  string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/* ── Datos iniciales ─────────────────────────────────────────────────────── */

const INITIAL_FORM: FormState = {
  nombre:   '',
  email:    '',
  telefono: '',
  mensaje:  '',
};

/* ── Íconos de marca (Lucide v1 no incluye brand icons) ─────────────────── */

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={18}
    height={18}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} aria-hidden="true">
    <path d="M7.803 5.731c.613 0 1.168.031 1.665.094.496.062.934.182 1.306.358.372.176.664.437.878.782.214.345.321.79.321 1.338 0 .572-.128 1.047-.384 1.421-.256.374-.637.68-1.143.919.683.199 1.194.556 1.534 1.07.34.515.51 1.136.51 1.863 0 .617-.118 1.153-.355 1.609a3.05 3.05 0 01-.968 1.075c-.406.275-.876.474-1.411.597a7.282 7.282 0 01-1.684.183H2V5.731h5.803zm-.351 4.972c.48 0 .878-.115 1.189-.346.311-.23.468-.6.468-1.108 0-.279-.051-.51-.153-.692a1.07 1.07 0 00-.415-.42 1.761 1.761 0 00-.6-.21 3.941 3.941 0 00-.709-.061H4.538v2.837h2.914zm.157 5.239c.268 0 .524-.026.766-.077.243-.051.457-.138.644-.261a1.31 1.31 0 00.44-.488c.107-.206.161-.465.161-.779 0-.617-.17-1.057-.511-1.32-.341-.264-.796-.395-1.364-.395H4.538v3.32h3.071zm9.248.636c.378.369.922.553 1.633.553.508 0 .947-.128 1.318-.384.371-.256.598-.527.682-.811h2.357c-.378 1.172-1.003 2.01-1.874 2.514-.871.504-1.924.756-3.159.756-.858 0-1.629-.141-2.314-.421a4.946 4.946 0 01-1.748-1.19 5.334 5.334 0 01-1.098-1.83 6.868 6.868 0 01-.383-2.33c0-.826.132-1.591.395-2.296a5.31 5.31 0 011.127-1.818 5.13 5.13 0 011.748-1.19c.678-.282 1.428-.422 2.251-.422.921 0 1.727.177 2.42.532a4.696 4.696 0 011.7 1.435c.44.604.756 1.3.945 2.087.189.787.258 1.622.207 2.504h-7.01c.041.786.288 1.391.668 1.76zm2.87-5.535c-.306-.338-.797-.507-1.472-.507-.431 0-.789.073-1.075.218a2.09 2.09 0 00-.685.551 2.059 2.059 0 00-.364.725 3.566 3.566 0 00-.116.72h4.456c-.089-.719-.438-1.37-.744-1.707zM15.374 7.1h4.875v1.303h-4.875V7.1z" />
  </svg>
);

/* ── Clase base de inputs ────────────────────────────────────────────────── */

const INPUT_CLASS = [
  'bg-white/5 border border-white/10 rounded-lg px-4 py-3',
  'text-brand-white placeholder:text-white/25 text-sm w-full',
  'focus:border-brand-violet focus:ring-1 focus:ring-brand-violet/30 focus:outline-none',
  'transition duration-200 font-display',
].join(' ');

/* ── Componente ──────────────────────────────────────────────────────────── */

export const Contacto = () => {
  const [form, setForm]     = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nombre || form.nombre.trim().length < 5 || /\d/.test(form.nombre))
      newErrors.nombre = 'Ingresá tu nombre completo (sin números)';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || /^\d+@/.test(form.email))
      newErrors.email = 'Ingresá un email válido';
    if (!form.mensaje || form.mensaje.trim().length < 10)
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    if (form.telefono && !/^\d{8,}$/.test(form.telefono.replace(/\s/g, '')))
      newErrors.telefono = 'Ingresá un teléfono válido (solo números)';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setStatus('loading');

    const result = await submitLead(form);

    if (result.ok) {
      setStatus('success');
      setTimeout(() => {
        setForm(INITIAL_FORM);
        setStatus('idle');
      }, 4000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const isDisabled = status === 'loading' || status === 'success';

  const buttonClass = [
    'w-full mt-2 font-display font-bold text-brand-white py-4 rounded-lg text-base',
    'transition duration-200',
    status === 'loading'
      ? 'bg-brand-violet/70 cursor-not-allowed opacity-70'
      : status === 'success'
      ? 'bg-brand-green cursor-not-allowed'
      : status === 'error'
      ? 'bg-red-500/80 hover:brightness-110'
      : 'bg-brand-violet hover:brightness-110',
  ].join(' ');

  return (
    <section
      id="contacto"
      className="bg-brand-black py-24 px-6 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* ── Columna izquierda ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="flex flex-col"
        >
          {/* Label */}
          <span className="font-display font-medium text-xs text-brand-green tracking-widest uppercase">
            CONTACTO
          </span>

          {/* Headline en dos líneas */}
          <h2 className="font-display font-black text-4xl md:text-5xl text-brand-white leading-tight tracking-tight mt-3">
            Hablemos de
            <br />
            <span className="font-script font-bold text-brand-violet">
              tu marca
            </span>
          </h2>

          {/* Párrafo */}
          <p className="font-display text-lg text-white/60 leading-relaxed max-w-xs mt-4">
            Contanos sobre tu proyecto y te respondemos en menos de 24 horas.
          </p>

          {/* Separador */}
          <div className="w-12 h-px bg-brand-violet mt-8 mb-8" aria-hidden="true" />

          {/* Info de contacto */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hola@agenciabalance.com"
              className="flex items-center gap-3 font-display text-sm text-white/70 hover:text-brand-violet transition-colors duration-200"
            >
              <Mail size={18} aria-hidden="true" />
              hola@agenciabalance.com
            </a>

            <a
              href="#"
              aria-label="Instagram de Balance (@agenciabalance)"
              className="flex items-center gap-3 font-display text-sm text-white/70 hover:text-brand-violet transition-colors duration-200"
            >
              <InstagramIcon />
              @agenciabalance
            </a>

            <a
              href="https://www.linkedin.com/in/balance-group-752621286"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-display text-sm text-white/70 hover:text-brand-violet transition-colors duration-200"
            >
              <LinkedInIcon />
              Balance Group
            </a>

            <a
              href="https://www.behance.net/balancegroup"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-display text-sm text-white/70 hover:text-brand-violet transition-colors duration-200"
            >
              <BehanceIcon />
              balancegroup
            </a>
          </div>

          {/* Frase final */}
          <p className="font-script font-bold text-brand-violet text-2xl mt-auto pt-12">
            Creamos juntos ✦
          </p>
        </motion.div>

        {/* ── Columna derecha — Formulario flotante ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.1 }}
          className="bg-white/5 backdrop-blur border border-white/20 rounded-2xl p-8"
        >
          {/* Título del formulario */}
          <h3 className="font-display font-bold text-brand-white text-xl mb-6">
            Envianos un mensaje
          </h3>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Fila 1: nombre + email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className={[INPUT_CLASS, errors.nombre ? 'border-red-500/50 focus:border-red-500' : ''].join(' ')}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Tu email"
                  required
                  className={[INPUT_CLASS, errors.email ? 'border-red-500/50 focus:border-red-500' : ''].join(' ')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Fila 2: teléfono */}
            <div className="flex flex-col">
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Tu teléfono (opcional)"
                className={[INPUT_CLASS, errors.telefono ? 'border-red-500/50 focus:border-red-500' : ''].join(' ')}
              />
              {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
            </div>

            {/* Fila 3: mensaje */}
            <div className="flex flex-col">
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Contanos sobre tu proyecto..."
                rows={5}
                className={[INPUT_CLASS, errors.mensaje ? 'border-red-500/50 focus:border-red-500' : ''].join(' ')}
              />
              {errors.mensaje && <p className="text-red-400 text-xs mt-1">{errors.mensaje}</p>}
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={isDisabled}
              className={buttonClass}
            >
              {status === 'loading'
                ? 'Enviando...'
                : status === 'success'
                ? '¡Mensaje enviado! Te contactamos pronto ✓'
                : status === 'error'
                ? 'Error al enviar. Intentá de nuevo.'
                : 'Enviar mensaje'}
            </button>

            {/* Privacidad */}
            <p className="text-center text-white/25 text-xs mt-4 font-display">
              🔒 Tu información es privada y nunca será compartida.
            </p>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

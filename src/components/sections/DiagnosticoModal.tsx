import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CheckCircle2 } from 'lucide-react';
import { submitLead } from '../../lib/api';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface Props {
  isOpen:  boolean;
  onClose: () => void;
}

interface FormState {
  nombre:          string;
  marca:           string;
  email:           string;
  telefono:        string;
  productos:       string;
  comoVende:       string;
  porqueContratar: string;
  objetivos:       string[];
  otroObjetivo:    string;
  servicioInteres: string[];
  materialVisual:  string[];
  inversion:       string;
  comentarios:     string;
}

/* ── Datos iniciales ─────────────────────────────────────────────────────── */

const INITIAL_FORM: FormState = {
  nombre:          '',
  marca:           '',
  email:           '',
  telefono:        '',
  productos:       '',
  comoVende:       '',
  porqueContratar: '',
  objetivos:       [],
  otroObjetivo:    '',
  servicioInteres: [],
  materialVisual:  [],
  inversion:       '',
  comentarios:     '',
};

/* ── Constantes de pasos ─────────────────────────────────────────────────── */

const COMO_VENDE_OPTS    = ['Desde el local', 'De manera online', 'Ambas'] as const;
const OBJETIVOS_OPTS     = ['Darnos a conocer', 'Generar comunidad', 'Crecer en seguidores', 'Aumentar ventas', 'Fidelizar clientes', 'Otro'] as const;
const SERVICIOS_OPTS     = ['Gestión y estrategias de contenidos digitales', 'Arquitectura de marca', 'Consultorías y mentoría de impacto'] as const;
const MATERIAL_OPTS      = ['Fotos', 'Videos', 'No tengo material'] as const;
const INVERSION_OPTS     = ['$150.000 - $250.000', '$250.000 - $350.000', '$350.000 - $450.000', '$450.000 - $550.000'] as const;

/* ── Variantes de animación de paso ─────────────────────────────────────── */

const stepVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ── Helpers de estilo ───────────────────────────────────────────────────── */

const inputClass = (hasError: boolean) =>
  [
    'w-full border-2 rounded-xl px-4 py-3',
    'font-display text-sm text-brand-black placeholder:text-brand-black/30',
    'focus:outline-none transition-all duration-200',
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-brand-gray focus:border-brand-violet',
  ].join(' ');

const labelClass = 'font-display text-sm font-medium text-brand-black mb-1 block';

/* ── Sub-componente: opción radio ────────────────────────────────────────── */

interface RadioOptProps {
  label:    string;
  selected: boolean;
  onClick:  () => void;
}

const RadioOpt = ({ label, selected, onClick }: RadioOptProps) => (
  <div
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    onClick={onClick}
    onKeyDown={e => e.key === 'Enter' && onClick()}
    className={[
      'flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200',
      selected ? 'border-brand-violet bg-brand-violet/5' : 'border-brand-gray',
    ].join(' ')}
  >
    <div className={[
      'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
      selected ? 'border-brand-violet bg-brand-violet' : 'border-brand-gray bg-white',
    ].join(' ')}>
      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
    <span className="font-display text-sm text-brand-black">{label}</span>
  </div>
);

/* ── Sub-componente: opción checkbox ─────────────────────────────────────── */

interface CheckOptProps {
  label:    string;
  selected: boolean;
  onClick:  () => void;
}

const CheckOpt = ({ label, selected, onClick }: CheckOptProps) => (
  <div
    role="checkbox"
    aria-checked={selected}
    tabIndex={0}
    onClick={onClick}
    onKeyDown={e => e.key === 'Enter' && onClick()}
    className={[
      'flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200',
      selected ? 'border-brand-violet bg-brand-violet/5' : 'border-brand-gray',
    ].join(' ')}
  >
    <div className={[
      'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0',
      selected ? 'border-brand-violet bg-brand-violet/10' : 'border-brand-gray bg-white',
    ].join(' ')}>
      {selected && <Check size={12} className="text-brand-violet" />}
    </div>
    <span className="font-display text-sm text-brand-black">{label}</span>
  </div>
);

/* ── Componente principal ────────────────────────────────────────────────── */

export const DiagnosticoModal = ({ isOpen, onClose }: Props) => {
  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [status,    setStatus]    = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form,      setForm]      = useState<FormState>(INITIAL_FORM);

  /* ── Validación por paso ─────────────────────────────────────────────── */

  const validateStep = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};

    if (s === 1) {
      if (!form.nombre || form.nombre.trim().length < 3 || /\d/.test(form.nombre))
        e.nombre = 'Ingresá tu nombre completo (mínimo 3 letras, sin números)';
      if (!form.marca || form.marca.trim().length < 2)
        e.marca = 'Ingresá el nombre de tu marca (mínimo 2 caracteres)';
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = 'Ingresá un email válido';
      if (!form.productos || form.productos.trim().length < 10)
        e.productos = 'Describí tus productos/servicios (mínimo 10 caracteres)';
      if (!form.comoVende)
        e.comoVende = 'Seleccioná cómo vendés';
    }

    if (s === 2) {
      if (!form.porqueContratar || form.porqueContratar.trim().length < 10)
        e.porqueContratar = 'Contanos por qué buscás ayuda (mínimo 10 caracteres)';
      if (form.objetivos.length === 0)
        e.objetivos = 'Seleccioná al menos un objetivo';
      if (form.servicioInteres.length === 0)
        e.servicioInteres = 'Seleccioná al menos un servicio';
    }

    if (s === 3) {
      if (form.materialVisual.length === 0)
        e.materialVisual = 'Seleccioná una opción';
      if (!form.inversion)
        e.inversion = 'Seleccioná un rango de inversión';
    }

    return e;
  };

  /* ── Handlers de navegación ──────────────────────────────────────────── */

  const handleNext = () => {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setDirection(1);
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    setErrors({});
    setDirection(-1);
    setStep(s => s - 1);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDirection(1);
      setErrors({});
      setStatus('idle');
      setForm(INITIAL_FORM);
    }, 300);
  };

  /* ── Helpers de formulario ───────────────────────────────────────────── */

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key as string]) setErrors(prev => ({ ...prev, [key as string]: '' }));
  };

  const toggleArray = (field: 'objetivos' | 'servicioInteres' | 'materialVisual', value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(v => v !== value)
        : [...(prev[field] as string[]), value],
    }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  /* ── Submit ──────────────────────────────────────────────────────────── */

  const handleSubmit = async () => {
    const e = validateStep(3);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus('loading');

    const submitData: Record<string, string> = {
      nombre:          form.nombre,
      marca:           form.marca,
      email:           form.email,
      telefono:        form.telefono,
      productos:       form.productos,
      comoVende:       form.comoVende,
      porqueContratar: form.porqueContratar,
      objetivos: [
        ...form.objetivos.filter(o => o !== 'Otro'),
        ...(form.objetivos.includes('Otro') && form.otroObjetivo
          ? [form.otroObjetivo]
          : []),
      ].join(', '),
      servicioInteres: form.servicioInteres.join(', '),
      materialVisual:  form.materialVisual.join(', '),
      inversion:       form.inversion,
      comentarios:     form.comentarios,
    };

    const result = await submitLead(submitData);
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  /* ── Progreso ────────────────────────────────────────────────────────── */

  const progressWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
          aria-label="Formulario de diagnóstico gratuito"
        >
          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >

            {/* ── Header fijo ──────────────────────────────────────────── */}
            <div className="px-6 md:px-8 pt-5 pb-4 border-b border-brand-gray flex-shrink-0">
              {/* Fila 1: logo + cerrar */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-black text-brand-black text-lg">
                  balance
                </span>
                <button
                  type="button"
                  aria-label="Cerrar diagnóstico"
                  onClick={handleClose}
                  className="text-brand-black/40 hover:text-brand-black transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Fila 2: progreso */}
              <div className="flex items-center gap-3">
                <span className="font-display text-brand-black/40 text-xs whitespace-nowrap">
                  Paso {step} de 3
                </span>
                <div className="flex-1 h-1 bg-brand-gray rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-violet rounded-full transition-all duration-500"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>

            {/* ── Pantalla de éxito ─────────────────────────────────────── */}
            {status === 'success' ? (
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-12 flex flex-col items-center justify-center text-center">
                <div className="bg-brand-green/10 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-brand-green" />
                </div>
                <h3 className="font-display font-black text-brand-black text-2xl mt-6">
                  ¡Diagnóstico enviado!
                </h3>
                <p className="font-display text-brand-black/60 mt-2">
                  Te contactamos en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 bg-brand-violet text-white font-display font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all duration-200"
                >
                  Cerrar
                </button>
              </div>

            ) : (
              <>
                {/* ── Contenido scrolleable ─────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
                  <AnimatePresence mode="wait" custom={direction}>

                    {/* ─── PASO 1 ──────────────────────────────────── */}
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          Contanos sobre tu negocio
                        </h3>

                        <div className="flex flex-col gap-4">

                          {/* Nombre */}
                          <div>
                            <label className={labelClass}>
                              Nombre y apellido <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: María González"
                              value={form.nombre}
                              onChange={e => setField('nombre', e.target.value)}
                              className={inputClass(!!errors.nombre)}
                            />
                            {errors.nombre && (
                              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                            )}
                          </div>

                          {/* Marca */}
                          <div>
                            <label className={labelClass}>
                              Nombre de tu marca <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Ej: Florería Alma"
                              value={form.marca}
                              onChange={e => setField('marca', e.target.value)}
                              className={inputClass(!!errors.marca)}
                            />
                            {errors.marca && (
                              <p className="text-red-500 text-xs mt-1">{errors.marca}</p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className={labelClass}>
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="tu@email.com"
                              value={form.email}
                              onChange={e => setField('email', e.target.value)}
                              className={inputClass(!!errors.email)}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className={labelClass}>
                              Teléfono{' '}
                              <span className="text-brand-black/40 font-normal">(opcional)</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="Ej: 11 2345-6789"
                              value={form.telefono}
                              onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))}
                              className={inputClass(false)}
                            />
                          </div>

                          {/* Productos / servicios */}
                          <div>
                            <label className={labelClass}>
                              ¿Qué productos o servicios ofrecés? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Describí brevemente qué vendés o qué servicio ofrecés"
                              value={form.productos}
                              onChange={e => setField('productos', e.target.value)}
                              className={inputClass(!!errors.productos) + ' resize-none'}
                            />
                            {errors.productos && (
                              <p className="text-red-500 text-xs mt-1">{errors.productos}</p>
                            )}
                          </div>

                          {/* ¿Cómo vendés? */}
                          <div>
                            <label className={labelClass}>
                              ¿Cómo vendés? <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {COMO_VENDE_OPTS.map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.comoVende === opt}
                                  onClick={() => setField('comoVende', opt)}
                                />
                              ))}
                            </div>
                            {errors.comoVende && (
                              <p className="text-red-500 text-xs mt-1">{errors.comoVende}</p>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── PASO 2 ──────────────────────────────────── */}
                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          ¿Qué querés lograr?
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* ¿Por qué buscás ayuda? */}
                          <div>
                            <label className={labelClass}>
                              ¿Por qué elegís contratar ayuda para tus redes?{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Contanos qué te llevó a buscar ayuda profesional"
                              value={form.porqueContratar}
                              onChange={e => setField('porqueContratar', e.target.value)}
                              className={inputClass(!!errors.porqueContratar) + ' resize-none'}
                            />
                            {errors.porqueContratar && (
                              <p className="text-red-500 text-xs mt-1">{errors.porqueContratar}</p>
                            )}
                          </div>

                          {/* Objetivos (checkboxes) */}
                          <div>
                            <label className={labelClass}>
                              ¿Cuál es tu objetivo?{' '}
                              <span className="text-red-500">*</span>{' '}
                              <span className="text-brand-black/40 font-normal">
                                (podés elegir varios)
                              </span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {OBJETIVOS_OPTS.map(opt => (
                                <CheckOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.objetivos.includes(opt)}
                                  onClick={() => toggleArray('objetivos', opt)}
                                />
                              ))}
                            </div>
                            {form.objetivos.includes('Otro') && (
                              <div className="mt-2">
                                <input
                                  type="text"
                                  placeholder="¿Cuál?"
                                  value={form.otroObjetivo}
                                  onChange={e =>
                                    setForm(p => ({ ...p, otroObjetivo: e.target.value }))
                                  }
                                  className={inputClass(false)}
                                />
                              </div>
                            )}
                            {errors.objetivos && (
                              <p className="text-red-500 text-xs mt-1">{errors.objetivos}</p>
                            )}
                          </div>

                          {/* Servicio de interés (checkboxes) */}
                          <div>
                            <label className={labelClass}>
                              ¿En qué servicio estás interesado?{' '}
                              <span className="text-red-500">*</span>{' '}
                              <span className="text-brand-black/40 font-normal">
                                (podés elegir varios)
                              </span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {SERVICIOS_OPTS.map(opt => (
                                <CheckOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.servicioInteres.includes(opt)}
                                  onClick={() => toggleArray('servicioInteres', opt)}
                                />
                              ))}
                            </div>
                            {errors.servicioInteres && (
                              <p className="text-red-500 text-xs mt-1">{errors.servicioInteres}</p>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── PASO 3 ──────────────────────────────────── */}
                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          Ya casi terminamos
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* Material visual (checkboxes) */}
                          <div>
                            <label className={labelClass}>
                              ¿Tu negocio cuenta con material visual?{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {MATERIAL_OPTS.map(opt => (
                                <CheckOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.materialVisual.includes(opt)}
                                  onClick={() => toggleArray('materialVisual', opt)}
                                />
                              ))}
                            </div>
                            {errors.materialVisual && (
                              <p className="text-red-500 text-xs mt-1">{errors.materialVisual}</p>
                            )}
                          </div>

                          {/* Inversión (radios) */}
                          <div>
                            <label className={labelClass}>
                              ¿Cuánto estarías dispuesto a invertir?{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {INVERSION_OPTS.map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.inversion === opt}
                                  onClick={() => setField('inversion', opt)}
                                />
                              ))}
                            </div>
                            {errors.inversion && (
                              <p className="text-red-500 text-xs mt-1">{errors.inversion}</p>
                            )}
                          </div>

                          {/* Comentarios (opcional) */}
                          <div>
                            <label className={labelClass}>
                              ¿Hay algo que quieras que sepamos?{' '}
                              <span className="text-brand-black/40 font-normal">(opcional)</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Cualquier info extra que nos ayude a preparar tu propuesta"
                              value={form.comentarios}
                              onChange={e =>
                                setForm(p => ({ ...p, comentarios: e.target.value }))
                              }
                              className={inputClass(false) + ' resize-none'}
                            />
                          </div>

                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* ── Footer fijo ───────────────────────────────────── */}
                <div className="px-6 md:px-8 py-4 border-t border-brand-gray flex justify-between items-center flex-shrink-0">

                  {/* Botón anterior */}
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="font-display font-medium text-brand-black/50 hover:text-brand-black transition-colors duration-200"
                    >
                      ← Anterior
                    </button>
                  ) : (
                    <div aria-hidden="true" />
                  )}

                  {/* Botón siguiente / enviar */}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-brand-violet text-white font-display font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all duration-200"
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className={[
                        'bg-brand-violet text-white font-display font-bold px-6 py-3 rounded-full transition-all duration-200',
                        status === 'loading'
                          ? 'opacity-70 cursor-not-allowed'
                          : 'hover:brightness-110',
                      ].join(' ')}
                    >
                      {status === 'loading'
                        ? 'Enviando...'
                        : status === 'error'
                        ? 'Error. Intentá de nuevo'
                        : 'Enviar diagnóstico'}
                    </button>
                  )}

                </div>
              </>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

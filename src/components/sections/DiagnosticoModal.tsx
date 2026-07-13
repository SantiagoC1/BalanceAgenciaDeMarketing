import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CheckCircle2, Globe, BarChart2, Layers } from 'lucide-react';
import { submitLead } from '../../lib/api';
import type { Lead, ServicioRama } from '../../lib/types';
import type { FormConfig } from '../../hooks/useConfig';
import { useTranslation } from '../../i18n/useTranslation';

/* ── Tipos ───────────────────────────────────────────────────────────────── */

interface Props {
  isOpen:     boolean;
  onClose:    () => void;
  formConfig: FormConfig;
}

type StepId =
  | 'servicio'
  | 'contacto'
  | 'negocio'
  | 'presenciaWeb'
  | 'tipoSitio'
  | 'redes'
  | 'objetivosServicio'
  | 'inversion'
  | 'cierre';

interface FormState {
  servicioRama:     ServicioRama | null;
  nombre:           string;
  marca:            string;
  email:            string;
  telefono:         string;
  productos:        string;
  comoVende:        string;
  sitioActual:      string;
  identidadVisual:  string;
  tipoSitio:        string;
  objetivoSitio:    string;
  redesActuales:    string[];
  porqueContratar:  string;
  objetivos:        string[];
  otroObjetivo:     string;
  servicioInteres:  string[];
  materialVisual:   string[];
  inversion:        string;
  comoNosConociste: string;
  comentarios:      string;
}

/* ── Datos iniciales ─────────────────────────────────────────────────────── */

const INITIAL_FORM: FormState = {
  servicioRama:     null,
  nombre:           '',
  marca:            '',
  email:            '',
  telefono:         '',
  productos:        '',
  comoVende:        '',
  sitioActual:      '',
  identidadVisual:  '',
  tipoSitio:        '',
  objetivoSitio:    '',
  redesActuales:    [],
  porqueContratar:  '',
  objetivos:        [],
  otroObjetivo:     '',
  servicioInteres:  [],
  materialVisual:   [],
  inversion:        '',
  comoNosConociste: '',
  comentarios:      '',
};

const WEB_FIELDS: (keyof FormState)[] = ['sitioActual', 'identidadVisual', 'tipoSitio', 'objetivoSitio'];
const MARKETING_FIELDS: (keyof FormState)[] = ['redesActuales', 'porqueContratar', 'objetivos', 'otroObjetivo', 'servicioInteres', 'materialVisual'];

/* ── Cálculo de pasos según rama ─────────────────────────────────────────── */

function getSteps(rama: ServicioRama | null): StepId[] {
  const base: StepId[] = ['contacto', 'negocio'];
  const web: StepId[] = ['presenciaWeb', 'tipoSitio'];
  const marketing: StepId[] = ['redes', 'objetivosServicio'];
  const cierre: StepId[] = ['inversion', 'cierre'];

  if (!rama) return ['servicio'];
  if (rama === 'web') return ['servicio', ...base, ...web, ...cierre];
  if (rama === 'marketing') return ['servicio', ...base, ...marketing, ...cierre];
  return ['servicio', ...base, ...web, ...marketing, ...cierre];
}

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

/* ── Sub-componente: card de servicio (Paso 0) ───────────────────────────── */

interface ServiceCardProps {
  icon:     typeof Globe;
  label:    string;
  selected: boolean;
  onClick:  () => void;
}

const ServiceCard = ({ icon: Icon, label, selected, onClick }: ServiceCardProps) => (
  <div
    role="radio"
    aria-checked={selected}
    tabIndex={0}
    onClick={onClick}
    onKeyDown={e => e.key === 'Enter' && onClick()}
    className={[
      'flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center',
      selected ? 'border-brand-violet bg-brand-violet/5' : 'border-brand-gray',
    ].join(' ')}
  >
    <Icon className="w-8 h-8 mb-2 mx-auto text-brand-violet" />
    <span className="font-display text-sm font-medium text-brand-black">{label}</span>
  </div>
);

/* ── Componente principal ────────────────────────────────────────────────── */

export const DiagnosticoModal = ({ isOpen, onClose, formConfig }: Props) => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction,  setDirection]  = useState(1);
  const [errors,     setErrors]     = useState<Record<string, string>>({});
  const [status,     setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form,       setForm]       = useState<FormState>(INITIAL_FORM);

  const steps = getSteps(form.servicioRama);
  const stepId = steps[stepIndex];

  /* ── Validación por paso ─────────────────────────────────────────────── */

  const validateStep = (id: StepId): Record<string, string> => {
    const e: Record<string, string> = {};

    if (id === 'servicio') {
      if (!form.servicioRama) e.servicioRama = t('modal_error_servicio_rama');
    }

    if (id === 'contacto') {
      if (!form.nombre || form.nombre.trim().length < 3 || /\d/.test(form.nombre))
        e.nombre = t('modal_error_nombre');
      if (!form.marca || form.marca.trim().length < 2)
        e.marca = t('modal_error_marca');
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = t('modal_error_email');
    }

    if (id === 'negocio') {
      if (!form.productos || form.productos.trim().length < 10)
        e.productos = t('modal_error_productos');
      if (!form.comoVende)
        e.comoVende = t('modal_error_como_vende');
    }

    if (id === 'presenciaWeb') {
      if (!form.sitioActual) e.sitioActual = t('modal_error_sitio_actual');
      if (!form.identidadVisual) e.identidadVisual = t('modal_error_identidad_visual');
    }

    if (id === 'tipoSitio') {
      if (!form.tipoSitio) e.tipoSitio = t('modal_error_tipo_sitio');
      if (!form.objetivoSitio) e.objetivoSitio = t('modal_error_objetivo_sitio');
    }

    if (id === 'redes') {
      if (form.redesActuales.length === 0) e.redesActuales = t('modal_error_redes_actuales');
      if (!form.porqueContratar || form.porqueContratar.trim().length < 10)
        e.porqueContratar = t('modal_error_porque');
    }

    if (id === 'objetivosServicio') {
      if (form.objetivos.length === 0)
        e.objetivos = t('modal_error_objetivos');
      if (form.servicioInteres.length === 0)
        e.servicioInteres = t('modal_error_servicio_interes');
      if (form.materialVisual.length === 0)
        e.materialVisual = t('modal_error_material_visual');
    }

    if (id === 'inversion') {
      if (!form.inversion) e.inversion = t('modal_error_inversion');
    }

    if (id === 'cierre') {
      if (!form.comoNosConociste) e.comoNosConociste = t('modal_error_como_nos_conociste');
    }

    return e;
  };

  /* ── Handlers de navegación ──────────────────────────────────────────── */

  const handleNext = () => {
    const e = validateStep(stepId);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setDirection(1);
    setStepIndex(i => i + 1);
  };

  const handlePrev = () => {
    setErrors({});
    setDirection(-1);
    setStepIndex(i => i - 1);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStepIndex(0);
      setDirection(1);
      setErrors({});
      setStatus('idle');
      setForm(INITIAL_FORM);
    }, 300);
  };

  /* ── Selección de rama (Paso 0) ───────────────────────────────────────── */

  const selectRama = (rama: ServicioRama) => {
    if (rama !== form.servicioRama) {
      const clearedFields: Partial<FormState> = {};
      for (const field of [...WEB_FIELDS, ...MARKETING_FIELDS]) {
        (clearedFields as Record<string, unknown>)[field] = Array.isArray(INITIAL_FORM[field])
          ? []
          : INITIAL_FORM[field];
      }
      setForm(prev => ({ ...prev, ...clearedFields, servicioRama: rama }));
    }
    if (errors.servicioRama) setErrors(prev => ({ ...prev, servicioRama: '' }));
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

  const toggleRed = (value: string, ningunaLabel: string) => {
    setForm(prev => {
      if (value === ningunaLabel) {
        return { ...prev, redesActuales: prev.redesActuales.includes(ningunaLabel) ? [] : [ningunaLabel] };
      }
      const withoutNinguna = prev.redesActuales.filter(v => v !== ningunaLabel);
      const next = withoutNinguna.includes(value)
        ? withoutNinguna.filter(v => v !== value)
        : [...withoutNinguna, value];
      return { ...prev, redesActuales: next };
    });
    if (errors.redesActuales) setErrors(prev => ({ ...prev, redesActuales: '' }));
  };

  /* ── Submit ──────────────────────────────────────────────────────────── */

  const handleSubmit = async () => {
    const e = validateStep('cierre');
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus('loading');

    const objetivosFinal = [
      ...form.objetivos.filter(o => o !== 'Otro'),
      ...(form.objetivos.includes('Otro') && form.otroObjetivo ? [form.otroObjetivo] : []),
    ].join(', ');

    const payload: Lead = {
      nombre:           form.nombre,
      marca:            form.marca,
      email:            form.email,
      telefono:         form.telefono,
      productos:        form.productos,
      comoVende:        form.comoVende,
      porqueContratar:  form.porqueContratar,
      objetivos:        objetivosFinal,
      servicioInteres:  form.servicioInteres.join(', '),
      materialVisual:   form.materialVisual.join(', '),
      inversion:        form.inversion,
      comentarios:      form.comentarios,
      servicioRama:     form.servicioRama as ServicioRama,
      sitioActual:      form.sitioActual,
      identidadVisual:  form.identidadVisual,
      tipoSitio:        form.tipoSitio,
      objetivoSitio:    form.objetivoSitio,
      redesActuales:    form.redesActuales.join(', '),
      comoNosConociste: form.comoNosConociste,
    };

    const result = await submitLead(payload as unknown as Record<string, string>);
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  /* ── Progreso ────────────────────────────────────────────────────────── */

  const progressWidth = `${Math.round(((stepIndex + 1) / steps.length) * 100)}%`;

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
          aria-label={t('modal_aria_label')}
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
                  {t('modal_logo')}
                </span>
                <button
                  type="button"
                  aria-label={t('modal_close_aria')}
                  onClick={handleClose}
                  className="text-brand-black/40 hover:text-brand-black transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Fila 2: progreso */}
              <div className="flex items-center gap-3">
                <span className="font-display text-brand-black/40 text-xs whitespace-nowrap">
                  {t('modal_step_label')} {stepIndex + 1} {t('modal_of_label')} {steps.length}
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
                  {t('modal_success_title')}
                </h3>
                <p className="font-display text-brand-black/60 mt-2">
                  {t('modal_success_message')}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 bg-brand-violet text-white font-display font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all duration-200"
                >
                  {t('modal_close_button')}
                </button>
              </div>

            ) : (
              <>
                {/* ── Contenido scrolleable ─────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
                  <AnimatePresence mode="wait" custom={direction}>

                    {/* ─── PASO 0: Selección de servicio ─────────────── */}
                    {stepId === 'servicio' && (
                      <motion.div
                        key="step-servicio"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_step0_title')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <ServiceCard
                            icon={Globe}
                            label={t('modal_option_web')}
                            selected={form.servicioRama === 'web'}
                            onClick={() => selectRama('web')}
                          />
                          <ServiceCard
                            icon={BarChart2}
                            label={t('modal_option_marketing')}
                            selected={form.servicioRama === 'marketing'}
                            onClick={() => selectRama('marketing')}
                          />
                          <ServiceCard
                            icon={Layers}
                            label={t('modal_option_ambos')}
                            selected={form.servicioRama === 'ambos'}
                            onClick={() => selectRama('ambos')}
                          />
                        </div>
                        {errors.servicioRama && (
                          <p className="text-red-500 text-xs mt-2">{errors.servicioRama}</p>
                        )}
                      </motion.div>
                    )}

                    {/* ─── A1: Datos de contacto ──────────────────────── */}
                    {stepId === 'contacto' && (
                      <motion.div
                        key="step-contacto"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepA1_title')}
                        </h3>

                        <div className="flex flex-col gap-4">

                          {/* Nombre */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_nombre')} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder={t('modal_placeholder_nombre')}
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
                              {t('modal_label_marca')} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder={t('modal_placeholder_marca')}
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
                              {t('modal_label_email')} <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder={t('modal_placeholder_email')}
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
                              {t('modal_label_telefono')}{' '}
                              <span className="text-brand-black/40 font-normal">{t('modal_optional')}</span>
                            </label>
                            <input
                              type="tel"
                              placeholder={t('modal_placeholder_telefono')}
                              value={form.telefono}
                              onChange={e => setForm(p => ({ ...p, telefono: e.target.value }))}
                              className={inputClass(false)}
                            />
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── A2: Tu negocio ─────────────────────────────── */}
                    {stepId === 'negocio' && (
                      <motion.div
                        key="step-negocio"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepA2_title')}
                        </h3>

                        <div className="flex flex-col gap-4">

                          {/* Productos / servicios */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_productos')} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder={t('modal_placeholder_productos')}
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
                              {t('modal_label_como_vende')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {formConfig.como_vende.map(opt => (
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

                    {/* ─── W1: Presencia digital actual ───────────────── */}
                    {stepId === 'presenciaWeb' && (
                      <motion.div
                        key="step-presenciaWeb"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepW1_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* ¿Tenés sitio web actualmente? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_sitio_actual')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                t('modal_opt_sitio_activo'),
                                t('modal_opt_sitio_no_tengo'),
                                t('modal_opt_sitio_desactualizado'),
                              ].map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.sitioActual === opt}
                                  onClick={() => setField('sitioActual', opt)}
                                />
                              ))}
                            </div>
                            {errors.sitioActual && (
                              <p className="text-red-500 text-xs mt-1">{errors.sitioActual}</p>
                            )}
                          </div>

                          {/* ¿Tenés identidad visual definida? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_identidad_visual')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                t('modal_opt_identidad_completa'),
                                t('modal_opt_identidad_parcial'),
                                t('modal_opt_identidad_no_tengo'),
                              ].map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.identidadVisual === opt}
                                  onClick={() => setField('identidadVisual', opt)}
                                />
                              ))}
                            </div>
                            {errors.identidadVisual && (
                              <p className="text-red-500 text-xs mt-1">{errors.identidadVisual}</p>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── W2: El sitio que necesitás ──────────────────── */}
                    {stepId === 'tipoSitio' && (
                      <motion.div
                        key="step-tipoSitio"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepW2_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* ¿Qué tipo de sitio necesitás? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_tipo_sitio')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                t('modal_opt_tipo_landing'),
                                t('modal_opt_tipo_institucional'),
                                t('modal_opt_tipo_ecommerce'),
                                t('modal_opt_tipo_portfolio'),
                              ].map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.tipoSitio === opt}
                                  onClick={() => setField('tipoSitio', opt)}
                                />
                              ))}
                            </div>
                            {errors.tipoSitio && (
                              <p className="text-red-500 text-xs mt-1">{errors.tipoSitio}</p>
                            )}
                          </div>

                          {/* ¿Cuál es el objetivo principal del sitio? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_objetivo_sitio')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                t('modal_opt_objetivo_captar'),
                                t('modal_opt_objetivo_vender'),
                                t('modal_opt_objetivo_portfolio'),
                                t('modal_opt_objetivo_info'),
                              ].map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.objetivoSitio === opt}
                                  onClick={() => setField('objetivoSitio', opt)}
                                />
                              ))}
                            </div>
                            {errors.objetivoSitio && (
                              <p className="text-red-500 text-xs mt-1">{errors.objetivoSitio}</p>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── M1: Tu presencia en redes ──────────────────── */}
                    {stepId === 'redes' && (
                      <motion.div
                        key="step-redes"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepM1_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* ¿En qué redes estás presente hoy? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_redes_actuales')}{' '}
                              <span className="text-red-500">*</span>{' '}
                              <span className="text-brand-black/40 font-normal">
                                {t('modal_multi_hint')}
                              </span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {[
                                t('modal_opt_red_instagram'),
                                t('modal_opt_red_tiktok'),
                                t('modal_opt_red_linkedin'),
                                t('modal_opt_red_facebook'),
                                t('modal_opt_red_ninguna'),
                              ].map(opt => (
                                <CheckOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.redesActuales.includes(opt)}
                                  onClick={() => toggleRed(opt, t('modal_opt_red_ninguna'))}
                                />
                              ))}
                            </div>
                            {errors.redesActuales && (
                              <p className="text-red-500 text-xs mt-1">{errors.redesActuales}</p>
                            )}
                          </div>

                          {/* ¿Por qué buscás ayuda? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_porque')}{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder={t('modal_placeholder_porque')}
                              value={form.porqueContratar}
                              onChange={e => setField('porqueContratar', e.target.value)}
                              className={inputClass(!!errors.porqueContratar) + ' resize-none'}
                            />
                            {errors.porqueContratar && (
                              <p className="text-red-500 text-xs mt-1">{errors.porqueContratar}</p>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* ─── M2: Objetivos y servicio ───────────────────── */}
                    {stepId === 'objetivosServicio' && (
                      <motion.div
                        key="step-objetivosServicio"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepM2_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* Objetivos (checkboxes) */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_objetivos')}{' '}
                              <span className="text-red-500">*</span>{' '}
                              <span className="text-brand-black/40 font-normal">
                                {t('modal_multi_hint')}
                              </span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {formConfig.objetivos.map(opt => (
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
                                  placeholder={t('modal_placeholder_otro')}
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
                              {t('modal_label_servicio_interes')}{' '}
                              <span className="text-red-500">*</span>{' '}
                              <span className="text-brand-black/40 font-normal">
                                {t('modal_multi_hint')}
                              </span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {formConfig.servicios.map(opt => (
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

                          {/* Material visual (checkboxes) */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_material_visual')}{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {formConfig.material_visual.map(opt => (
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

                        </div>
                      </motion.div>
                    )}

                    {/* ─── B1: Inversión ──────────────────────────────── */}
                    {stepId === 'inversion' && (
                      <motion.div
                        key="step-inversion"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepB1_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          <div>
                            <label className={labelClass}>
                              {t('modal_label_inversion')}{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {formConfig.inversion.map(opt => (
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

                        </div>
                      </motion.div>
                    )}

                    {/* ─── B2: Cierre ──────────────────────────────────── */}
                    {stepId === 'cierre' && (
                      <motion.div
                        key="step-cierre"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <h3 className="font-display font-black text-brand-black text-xl mb-6">
                          {t('modal_stepB2_title')}
                        </h3>

                        <div className="flex flex-col gap-5">

                          {/* ¿Cómo nos conociste? */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_como_nos_conociste')}{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                t('modal_opt_conociste_instagram'),
                                t('modal_opt_conociste_google'),
                                t('modal_opt_conociste_recomendacion'),
                                t('modal_opt_conociste_linkedin'),
                                t('modal_opt_conociste_otro'),
                              ].map(opt => (
                                <RadioOpt
                                  key={opt}
                                  label={opt}
                                  selected={form.comoNosConociste === opt}
                                  onClick={() => setField('comoNosConociste', opt)}
                                />
                              ))}
                            </div>
                            {errors.comoNosConociste && (
                              <p className="text-red-500 text-xs mt-1">{errors.comoNosConociste}</p>
                            )}
                          </div>

                          {/* Comentarios (opcional) */}
                          <div>
                            <label className={labelClass}>
                              {t('modal_label_comentarios')}{' '}
                              <span className="text-brand-black/40 font-normal">{t('modal_optional')}</span>
                            </label>
                            <textarea
                              rows={3}
                              placeholder={t('modal_placeholder_comentarios')}
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
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="font-display font-medium text-brand-black/50 hover:text-brand-black transition-colors duration-200"
                    >
                      {t('modal_prev')}
                    </button>
                  ) : (
                    <div aria-hidden="true" />
                  )}

                  {/* Botón siguiente / continuar / enviar */}
                  {stepIndex < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-brand-violet text-white font-display font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all duration-200"
                    >
                      {stepId === 'servicio' ? t('modal_continue') : t('modal_next')}
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
                        ? t('modal_submitting')
                        : status === 'error'
                        ? t('modal_submit_error')
                        : t('modal_submit')}
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

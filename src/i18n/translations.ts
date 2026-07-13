export type Locale = 'es' | 'en'

export const translations: Record<Locale, Record<string, string>> = {
  es: {
    // ── Header / nav ──────────────────────────────────────────────
    nav_about: 'Sobre Nosotras',
    nav_team: 'Equipo',
    nav_services: 'Servicios',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contacto',
    nav_cta: 'Hacer diagnóstico',
    header_logo_home_aria: 'Balance - volver al inicio',
    header_logo_alt: 'Balance — Agencia de Marketing y Comunicación',
    header_whatsapp_label: 'WhatsApp',
    header_whatsapp_aria: 'Contactar por WhatsApp',
    header_menu_open_aria: 'Abrir menú',
    header_menu_close_aria: 'Cerrar menú',
    header_nav_aria: 'Navegación principal',
    language_toggle_aria: 'Cambiar idioma',

    // ── Footer ─────────────────────────────────────────────────────
    footer_logo_alt: 'Balance — Agencia de Marketing y Comunicación Argentina',
    footer_tagline: 'Comunicación y Marketing para marcas y líderes',
    footer_instagram_aria: 'Instagram de Balance (próximamente)',
    footer_linkedin_aria: 'LinkedIn de Balance',
    footer_behance_aria: 'Behance de Balance',
    footer_rights: 'Todos los derechos reservados.',
    footer_dev_by: 'Desarrollado por',

    // ── Hero ───────────────────────────────────────────────────────
    hero_aria_label: 'Inicio',
    hero_headline_1: 'Comunicación y Marketing',
    hero_headline_2_pre: 'para',
    hero_headline_2_script: 'marcas y líderes',
    hero_subtitle_pre: 'Somos el balance entre la',
    hero_subtitle_creatividad: 'creatividad',
    hero_subtitle_mid: 'y la',
    hero_subtitle_estrategia: 'estrategia',
    hero_subtitle_post: 'que tu marca necesita para construir una identidad que conecte de forma real.',
    hero_cta_primary: 'Hacer diagnóstico',
    hero_cta_secondary: 'Ver portfolio',
    hero_tag: 'Agencia de Marketing',
    hero_stat_marcas_label: 'marcas',
    hero_stat_experiencia_label: 'años de experiencia',

    // ── Sobre Nosotras ─────────────────────────────────────────────
    about_aria_label: 'Sobre nosotras',
    about_label: 'Sobre Nosotras',
    about_heading_pre: 'Hola!',
    about_heading_script: 'somos',
    about_cofounder: 'Co-fundadora',
    about_pili_alt_mobile: 'Pili, co-fundadora de Balance',
    about_pachi_alt_mobile: 'Pachi, co-fundadora de Balance',
    about_pili_alt_desktop: 'Pili, co-fundadora de Balance — agencia de marketing argentina',
    about_pachi_alt_desktop: 'Pachi, co-fundadora de Balance — agencia de marketing argentina',
    about_paragraph: 'Somos el balance entre la creatividad y la estrategia que tu marca necesita para construir una identidad que conecte de forma real.',
    about_pill_1: 'Comunicación estratégica',
    about_pill_2: 'Identidad memorable',
    about_pill_3: 'Contenido con impacto',

    // ── Equipo / Colaborador ───────────────────────────────────────
    team_label: 'NUESTRO EQUIPO',
    team_heading_1: 'Las personas',
    team_heading_2: 'detrás de Balance',
    team_subtitle: 'Comunicación, estrategia y tecnología en un solo lugar.',
    team_pili_rol: 'Dirección de Marketing & Estrategia',
    team_pili_pill: 'Marketing & Estrategia',
    team_pili_alt: 'Pili - Dirección de Marketing y Estrategia',
    team_pachi_rol: 'Dirección de Comunicación & Experiencia de marca',
    team_pachi_pill: 'Comunicación & Marca',
    team_pachi_alt: 'Pachi - Dirección de Comunicación y Experiencia de marca',
    team_santi_rol: 'Desarrollo Fullstack & Tecnología',
    team_santi_pill: 'Desarrollo Web & IA',
    team_santi_alt: 'Santiago Cáceres - Desarrollador Fullstack',

    // ── Servicios ────────────────────────────────────────────────────
    services_aria_label: 'Nuestros servicios',
    services_label: 'SERVICIOS',
    services_heading_pre: 'Todo lo que necesitás',
    services_heading_script: 'para crecer',
    services_divider: 'DESARROLLO WEB',

    // ── Portfolio ────────────────────────────────────────────────────
    portfolio_aria_label: 'Portfolio de trabajos',
    portfolio_label: 'Nuestro Trabajo',
    portfolio_heading_pre: 'Casos que',
    portfolio_heading_script: 'hablan',
    portfolio_stat: '4 marcas transformadas',
    portfolio_ver_prefix: 'Ver caso:',
    portfolio_cursor_ver: 'VER',
    portfolio_modal_close_aria: 'Cerrar',
    portfolio_cta_behance: 'Ver en Behance →',

    // ── CTA Diagnóstico ──────────────────────────────────────────────
    cta_pill: 'Diagnóstico gratuito',
    cta_heading_1: '¿Tu marca está',
    cta_heading_2: 'hablando claro?',
    cta_paragraph: 'En 5 minutos analizamos tu presencia digital y te damos un diagnóstico honesto. Sin compromiso.',
    cta_primary: 'Quiero mi diagnóstico →',
    cta_secondary: 'Ver nuestro trabajo',
    cta_stat_diagnostico_value: '5 min',
    cta_stat_diagnostico_label: 'Diagnóstico',
    cta_stat_marcas_label: 'Marcas analizadas',
    cta_stat_costo_value: '0 $',
    cta_stat_costo_label: 'Sin costo',

    // ── Contacto ─────────────────────────────────────────────────────
    contact_aria_label: 'Contacto',
    contact_ghost_text: 'HABLEMOS · HABLEMOS · HABLEMOS ·',
    contact_label: 'CONTACTO',
    contact_heading_1: '¿Listo para',
    contact_heading_2_script: 'construir tu marca?',
    contact_response_time: 'Respondemos en menos de 24 horas hábiles',
    contact_email_aria: 'Enviar email a Balance',
    contact_instagram_label: '@balance.marketing',
    contact_instagram_aria: 'Instagram de Balance',
    contact_linkedin_label: 'balance-group',
    contact_linkedin_aria: 'LinkedIn de Balance',
    contact_behance_label: 'balancegroup',
    contact_behance_aria: 'Behance de Balance',
    contact_script_phrase: 'Creamos juntos ✦',
    contact_cta_line1: 'Hacer',
    contact_cta_line2: 'diagnóstico',
    contact_cta_line3: 'gratuito',
    contact_cta_aria: 'Abrir formulario de diagnóstico gratuito',
    contact_legend: 'Sin compromiso · Respondemos en 24hs hábiles',

    // ── Modal de diagnóstico ─────────────────────────────────────────
    modal_aria_label: 'Formulario de diagnóstico gratuito',
    modal_logo: 'balance',
    modal_close_aria: 'Cerrar diagnóstico',
    modal_step_label: 'Paso',
    modal_of_label: 'de',
    modal_optional: '(opcional)',
    modal_multi_hint: '(podés elegir varios)',

    modal_success_title: '¡Diagnóstico enviado!',
    modal_success_message: 'Te contactamos en menos de 24 horas hábiles.',
    modal_close_button: 'Cerrar',

    modal_step0_title: '¿Qué servicio te interesa?',
    modal_option_web: 'Presencia Web',
    modal_option_marketing: 'Marketing & Contenidos',
    modal_option_ambos: 'Ambos',
    modal_error_servicio_rama: 'Seleccioná un servicio para continuar',
    modal_continue: 'Continuar',

    modal_stepA1_title: 'Contanos sobre vos',
    modal_label_nombre: 'Nombre y apellido',
    modal_placeholder_nombre: 'Ej: María González',
    modal_label_marca: 'Nombre de tu marca',
    modal_placeholder_marca: 'Ej: Florería Alma',
    modal_label_email: 'Email',
    modal_placeholder_email: 'tu@email.com',
    modal_label_telefono: 'Teléfono',
    modal_placeholder_telefono: 'Ej: 11 2345-6789',
    modal_error_nombre: 'Ingresá tu nombre completo (mínimo 3 letras, sin números)',
    modal_error_marca: 'Ingresá el nombre de tu marca (mínimo 2 caracteres)',
    modal_error_email: 'Ingresá un email válido',

    modal_stepA2_title: 'Contanos sobre tu negocio',
    modal_label_productos: '¿Qué productos o servicios ofrecés?',
    modal_placeholder_productos: 'Describí brevemente qué vendés o qué servicio ofrecés',
    modal_label_como_vende: '¿Cómo vendés?',
    modal_error_productos: 'Describí tus productos/servicios (mínimo 10 caracteres)',
    modal_error_como_vende: 'Seleccioná cómo vendés',

    modal_stepW1_title: 'Tu presencia digital actual',
    modal_label_sitio_actual: '¿Tenés sitio web actualmente?',
    modal_opt_sitio_activo: 'Sí, está activo',
    modal_opt_sitio_no_tengo: 'No tengo',
    modal_opt_sitio_desactualizado: 'Tengo pero está desactualizado',
    modal_error_sitio_actual: 'Seleccioná una opción',
    modal_label_identidad_visual: '¿Tenés identidad visual definida?',
    modal_opt_identidad_completa: 'Sí, completa (logo, colores, tipografías)',
    modal_opt_identidad_parcial: 'Sí, parcial',
    modal_opt_identidad_no_tengo: 'No tengo',
    modal_error_identidad_visual: 'Seleccioná una opción',

    modal_stepW2_title: 'El sitio que necesitás',
    modal_label_tipo_sitio: '¿Qué tipo de sitio necesitás?',
    modal_opt_tipo_landing: 'Landing page',
    modal_opt_tipo_institucional: 'Sitio institucional',
    modal_opt_tipo_ecommerce: 'E-commerce',
    modal_opt_tipo_portfolio: 'Portfolio',
    modal_error_tipo_sitio: 'Seleccioná una opción',
    modal_label_objetivo_sitio: '¿Cuál es el objetivo principal del sitio?',
    modal_opt_objetivo_captar: 'Captar clientes',
    modal_opt_objetivo_vender: 'Vender online',
    modal_opt_objetivo_portfolio: 'Mostrar mi portfolio',
    modal_opt_objetivo_info: 'Dar información de contacto',
    modal_error_objetivo_sitio: 'Seleccioná una opción',

    modal_stepM1_title: 'Tu presencia en redes',
    modal_label_redes_actuales: '¿En qué redes estás presente hoy?',
    modal_opt_red_instagram: 'Instagram',
    modal_opt_red_tiktok: 'TikTok',
    modal_opt_red_linkedin: 'LinkedIn',
    modal_opt_red_facebook: 'Facebook',
    modal_opt_red_ninguna: 'Ninguna',
    modal_error_redes_actuales: 'Seleccioná al menos una opción',
    modal_label_porque: '¿Por qué elegís contratar ayuda para tus redes?',
    modal_placeholder_porque: 'Contanos qué te llevó a buscar ayuda profesional',
    modal_error_porque: 'Contanos por qué buscás ayuda (mínimo 10 caracteres)',

    modal_stepM2_title: '¿Qué querés lograr?',
    modal_label_objetivos: '¿Cuál es tu objetivo?',
    modal_placeholder_otro: '¿Cuál?',
    modal_label_servicio_interes: '¿En qué servicio estás interesado?',
    modal_error_objetivos: 'Seleccioná al menos un objetivo',
    modal_error_servicio_interes: 'Seleccioná al menos un servicio',
    modal_label_material_visual: '¿Tenés material visual?',
    modal_error_material_visual: 'Seleccioná una opción',

    modal_stepB1_title: 'Inversión',
    modal_label_inversion: '¿En qué rango de inversión mensual pensás?',
    modal_error_inversion: 'Seleccioná un rango de inversión',

    modal_stepB2_title: 'Ya casi terminamos',
    modal_label_como_nos_conociste: '¿Cómo nos conociste?',
    modal_opt_conociste_instagram: 'Instagram',
    modal_opt_conociste_google: 'Google',
    modal_opt_conociste_recomendacion: 'Me lo recomendaron',
    modal_opt_conociste_linkedin: 'LinkedIn',
    modal_opt_conociste_otro: 'Otro',
    modal_error_como_nos_conociste: 'Seleccioná una opción',
    modal_label_comentarios: '¿Hay algo que quieras que sepamos?',
    modal_placeholder_comentarios: 'Cualquier info extra que nos ayude a preparar tu propuesta',

    modal_prev: '← Anterior',
    modal_next: 'Siguiente →',
    modal_submit: 'Enviar diagnóstico',
    modal_submitting: 'Enviando...',
    modal_submit_error: 'Error. Intentá de nuevo',
  },
  en: {
    // ── Header / nav ──────────────────────────────────────────────
    nav_about: 'About Us',
    nav_team: 'Team',
    nav_services: 'Services',
    nav_portfolio: 'Portfolio',
    nav_contact: 'Contact',
    nav_cta: 'Get a diagnosis',
    header_logo_home_aria: 'Balance - back to home',
    header_logo_alt: 'Balance — Marketing and Communication Agency',
    header_whatsapp_label: 'WhatsApp',
    header_whatsapp_aria: 'Contact us on WhatsApp',
    header_menu_open_aria: 'Open menu',
    header_menu_close_aria: 'Close menu',
    header_nav_aria: 'Main navigation',
    language_toggle_aria: 'Switch language',

    // ── Footer ─────────────────────────────────────────────────────
    footer_logo_alt: 'Balance — Argentine Marketing and Communication Agency',
    footer_tagline: 'Communication and Marketing for brands and leaders',
    footer_instagram_aria: 'Balance Instagram (coming soon)',
    footer_linkedin_aria: 'Balance LinkedIn',
    footer_behance_aria: 'Balance Behance',
    footer_rights: 'All rights reserved.',
    footer_dev_by: 'Developed by',

    // ── Hero ───────────────────────────────────────────────────────
    hero_aria_label: 'Home',
    hero_headline_1: 'Communication and Marketing',
    hero_headline_2_pre: 'for',
    hero_headline_2_script: 'brands and leaders',
    hero_subtitle_pre: 'We are the balance between',
    hero_subtitle_creatividad: 'creativity',
    hero_subtitle_mid: 'and',
    hero_subtitle_estrategia: 'strategy',
    hero_subtitle_post: 'that your brand needs to build an identity that truly connects.',
    hero_cta_primary: 'Get a diagnosis',
    hero_cta_secondary: 'View portfolio',
    hero_tag: 'Marketing Agency',
    hero_stat_marcas_label: 'brands',
    hero_stat_experiencia_label: 'years of experience',

    // ── Sobre Nosotras ─────────────────────────────────────────────
    about_aria_label: 'About us',
    about_label: 'About Us',
    about_heading_pre: 'Hi!',
    about_heading_script: "we're",
    about_cofounder: 'Co-founder',
    about_pili_alt_mobile: 'Pili, co-founder of Balance',
    about_pachi_alt_mobile: 'Pachi, co-founder of Balance',
    about_pili_alt_desktop: 'Pili, co-founder of Balance — Argentine marketing agency',
    about_pachi_alt_desktop: 'Pachi, co-founder of Balance — Argentine marketing agency',
    about_paragraph: 'We are the balance between creativity and strategy that your brand needs to build an identity that truly connects.',
    about_pill_1: 'Strategic communication',
    about_pill_2: 'Memorable identity',
    about_pill_3: 'Impactful content',

    // ── Equipo / Colaborador ───────────────────────────────────────
    team_label: 'OUR TEAM',
    team_heading_1: 'The people',
    team_heading_2: 'behind Balance',
    team_subtitle: 'Communication, strategy and technology in one place.',
    team_pili_rol: 'Marketing & Strategy Direction',
    team_pili_pill: 'Marketing & Strategy',
    team_pili_alt: 'Pili - Marketing and Strategy Direction',
    team_pachi_rol: 'Communication & Brand Experience Direction',
    team_pachi_pill: 'Communication & Brand',
    team_pachi_alt: 'Pachi - Communication and Brand Experience Direction',
    team_santi_rol: 'Fullstack Development & Technology',
    team_santi_pill: 'Web Development & AI',
    team_santi_alt: 'Santiago Cáceres - Fullstack Developer',

    // ── Servicios ────────────────────────────────────────────────────
    services_aria_label: 'Our services',
    services_label: 'SERVICES',
    services_heading_pre: 'Everything you need',
    services_heading_script: 'to grow',
    services_divider: 'WEB DEVELOPMENT',

    // ── Portfolio ────────────────────────────────────────────────────
    portfolio_aria_label: 'Portfolio of work',
    portfolio_label: 'Our Work',
    portfolio_heading_pre: 'Cases that',
    portfolio_heading_script: 'speak',
    portfolio_stat: '4 brands transformed',
    portfolio_ver_prefix: 'View case:',
    portfolio_cursor_ver: 'VIEW',
    portfolio_modal_close_aria: 'Close',
    portfolio_cta_behance: 'View on Behance →',

    // ── CTA Diagnóstico ──────────────────────────────────────────────
    cta_pill: 'Free diagnosis',
    cta_heading_1: 'Is your brand',
    cta_heading_2: 'speaking clearly?',
    cta_paragraph: 'In 5 minutes we analyze your digital presence and give you an honest diagnosis. No strings attached.',
    cta_primary: 'I want my diagnosis →',
    cta_secondary: 'View our work',
    cta_stat_diagnostico_value: '5 min',
    cta_stat_diagnostico_label: 'Diagnosis',
    cta_stat_marcas_label: 'Brands analyzed',
    cta_stat_costo_value: '$ 0',
    cta_stat_costo_label: 'No cost',

    // ── Contacto ─────────────────────────────────────────────────────
    contact_aria_label: 'Contact',
    contact_ghost_text: "LET'S TALK · LET'S TALK · LET'S TALK ·",
    contact_label: 'CONTACT',
    contact_heading_1: 'Ready to',
    contact_heading_2_script: 'build your brand?',
    contact_response_time: 'We respond within 24 business hours',
    contact_email_aria: 'Send an email to Balance',
    contact_instagram_label: '@balance.marketing',
    contact_instagram_aria: 'Balance Instagram',
    contact_linkedin_label: 'balance-group',
    contact_linkedin_aria: 'Balance LinkedIn',
    contact_behance_label: 'balancegroup',
    contact_behance_aria: 'Balance Behance',
    contact_script_phrase: "Let's create together ✦",
    contact_cta_line1: 'Get a',
    contact_cta_line2: 'free',
    contact_cta_line3: 'diagnosis',
    contact_cta_aria: 'Open the free diagnosis form',
    contact_legend: 'No strings attached · We respond within 24 business hours',

    // ── Modal de diagnóstico ─────────────────────────────────────────
    modal_aria_label: 'Free diagnosis form',
    modal_logo: 'balance',
    modal_close_aria: 'Close diagnosis form',
    modal_step_label: 'Step',
    modal_of_label: 'of',
    modal_optional: '(optional)',
    modal_multi_hint: '(you can choose several)',

    modal_success_title: 'Diagnosis sent!',
    modal_success_message: "We'll contact you within 24 business hours.",
    modal_close_button: 'Close',

    modal_step0_title: 'Which service are you interested in?',
    modal_option_web: 'Web Presence',
    modal_option_marketing: 'Marketing & Content',
    modal_option_ambos: 'Both',
    modal_error_servicio_rama: 'Select a service to continue',
    modal_continue: 'Continue',

    modal_stepA1_title: 'Tell us about you',
    modal_label_nombre: 'Full name',
    modal_placeholder_nombre: 'E.g.: Jane Smith',
    modal_label_marca: 'Your brand name',
    modal_placeholder_marca: 'E.g.: Alma Flower Shop',
    modal_label_email: 'Email',
    modal_placeholder_email: 'you@email.com',
    modal_label_telefono: 'Phone',
    modal_placeholder_telefono: 'E.g.: +1 555 123 4567',
    modal_error_nombre: 'Enter your full name (minimum 3 letters, no numbers)',
    modal_error_marca: 'Enter your brand name (minimum 2 characters)',
    modal_error_email: 'Enter a valid email',

    modal_stepA2_title: 'Tell us about your business',
    modal_label_productos: 'What products or services do you offer?',
    modal_placeholder_productos: 'Briefly describe what you sell or the service you offer',
    modal_label_como_vende: 'How do you sell?',
    modal_error_productos: 'Describe your products/services (minimum 10 characters)',
    modal_error_como_vende: 'Select how you sell',

    modal_stepW1_title: 'Your current digital presence',
    modal_label_sitio_actual: 'Do you currently have a website?',
    modal_opt_sitio_activo: 'Yes, it\'s live',
    modal_opt_sitio_no_tengo: "I don't have one",
    modal_opt_sitio_desactualizado: 'I have one but it\'s outdated',
    modal_error_sitio_actual: 'Select an option',
    modal_label_identidad_visual: 'Do you have a defined visual identity?',
    modal_opt_identidad_completa: 'Yes, complete (logo, colors, typography)',
    modal_opt_identidad_parcial: 'Yes, partial',
    modal_opt_identidad_no_tengo: "I don't have one",
    modal_error_identidad_visual: 'Select an option',

    modal_stepW2_title: 'The site you need',
    modal_label_tipo_sitio: 'What type of site do you need?',
    modal_opt_tipo_landing: 'Landing page',
    modal_opt_tipo_institucional: 'Institutional site',
    modal_opt_tipo_ecommerce: 'E-commerce',
    modal_opt_tipo_portfolio: 'Portfolio',
    modal_error_tipo_sitio: 'Select an option',
    modal_label_objetivo_sitio: "What's the site's main goal?",
    modal_opt_objetivo_captar: 'Attract customers',
    modal_opt_objetivo_vender: 'Sell online',
    modal_opt_objetivo_portfolio: 'Showcase my portfolio',
    modal_opt_objetivo_info: 'Provide contact information',
    modal_error_objetivo_sitio: 'Select an option',

    modal_stepM1_title: 'Your presence on social media',
    modal_label_redes_actuales: 'Which social networks are you on today?',
    modal_opt_red_instagram: 'Instagram',
    modal_opt_red_tiktok: 'TikTok',
    modal_opt_red_linkedin: 'LinkedIn',
    modal_opt_red_facebook: 'Facebook',
    modal_opt_red_ninguna: 'None',
    modal_error_redes_actuales: 'Select at least one option',
    modal_label_porque: 'Why are you choosing to hire help for your social media?',
    modal_placeholder_porque: 'Tell us what led you to look for professional help',
    modal_error_porque: 'Tell us why you need help (minimum 10 characters)',

    modal_stepM2_title: 'What do you want to achieve?',
    modal_label_objetivos: 'What is your goal?',
    modal_placeholder_otro: 'Which one?',
    modal_label_servicio_interes: 'Which service are you interested in?',
    modal_error_objetivos: 'Select at least one goal',
    modal_error_servicio_interes: 'Select at least one service',
    modal_label_material_visual: 'Do you have visual material?',
    modal_error_material_visual: 'Select an option',

    modal_stepB1_title: 'Investment',
    modal_label_inversion: 'What monthly investment range are you thinking of?',
    modal_error_inversion: 'Select an investment range',

    modal_stepB2_title: "We're almost done",
    modal_label_como_nos_conociste: 'How did you hear about us?',
    modal_opt_conociste_instagram: 'Instagram',
    modal_opt_conociste_google: 'Google',
    modal_opt_conociste_recomendacion: 'Someone recommended us',
    modal_opt_conociste_linkedin: 'LinkedIn',
    modal_opt_conociste_otro: 'Other',
    modal_error_como_nos_conociste: 'Select an option',
    modal_label_comentarios: 'Is there anything else you want us to know?',
    modal_placeholder_comentarios: 'Any extra info that helps us prepare your proposal',

    modal_prev: '← Previous',
    modal_next: 'Next →',
    modal_submit: 'Submit diagnosis',
    modal_submitting: 'Sending...',
    modal_submit_error: 'Error. Please try again',
  },
}

// ── Datos estructurados (Servicios y Portfolio) ───────────────────────────
// El texto vive acá para poder traducirlo; los campos no-textuales
// (id, numero, variant, video) se completan en el componente.

export interface ServicioTexto {
  id: string
  numero: string
  titulo: string
  descripcion: string
  keywords: readonly string[]
  variant?: 'balance' | 'scdev'
}

export const serviciosData: Record<Locale, ServicioTexto[]> = {
  es: [
    {
      id: 'contenidos',
      numero: '01',
      titulo: 'Gestión y estrategias de contenidos digitales',
      descripcion:
        'No sólo gestionamos perfiles, construimos autoridad. Este servicio integra la ' +
        'planificación estratégica, la producción y edición de contenido para lograr que ' +
        'tu marca tenga una identidad clara y un vínculo genuino con su audiencia, ' +
        'asegurando que tu mensaje sea coherente en cada historia y publicación.',
      keywords: ['Planificación estratégica', 'Producción de contenido', 'Métricas'],
    },
    {
      id: 'marca',
      numero: '02',
      titulo: 'Arquitectura de marca',
      descripcion:
        'Definimos la esencia que hace que tu marca sea única y memorable. Creamos un ' +
        'sistema visual completo (logo, tipografías, paleta de color y elementos gráficos) ' +
        'y establecemos el tono y la voz de la marca. Entregamos un manual de identidad ' +
        'integral que garantiza coherencia en cada punto de contacto.',
      keywords: ['Identidad visual', 'Manual de marca', 'Logo & tipografía'],
    },
    {
      id: 'consultoria-balance',
      numero: '03',
      titulo: 'Consultorías y mentoría de impacto',
      descripcion:
        'Diseñamos una hoja de ruta integral que se adapta a tu estructura actual. A ' +
        'través de diagnósticos de percepción y sesiones de mentoría, transformamos tu ' +
        'visión en un sistema de trabajo coherente, humano y autónomo.',
      keywords: ['Diagnóstico de marca', 'Mentoría', 'Estrategia de crecimiento'],
    },
    {
      id: 'desarrollo-web',
      numero: '04',
      titulo: 'Desarrollo Web',
      descripcion:
        'Desde una página de una sola sección hasta sitios corporativos completos. ' +
        'Desarrollamos tu presencia web con React, animaciones, formularios y deploy ' +
        'incluido. Ideal para profesionales, comercios y empresas que quieren estar ' +
        'online de forma profesional.',
      keywords: ['React + Vite', 'Animaciones', 'SEO incluido', 'Deploy'],
      variant: 'scdev',
    },
    {
      id: 'automatizacion-ia',
      numero: '05',
      titulo: 'Automatización e IA',
      descripcion:
        'Bots de WhatsApp, automatización de procesos internos y flujos que trabajan ' +
        'solos. Integramos WATI, Apps Script, Python y APIs para que tu negocio funcione ' +
        'con menos trabajo manual y más eficiencia.',
      keywords: ['WhatsApp / WATI', 'Apps Script', 'Python', 'Integración email'],
      variant: 'scdev',
    },
    {
      id: 'mantenimiento',
      numero: '06',
      titulo: 'Mantenimiento',
      descripcion:
        'Tu sitio siempre activo, seguro y actualizado. Nos encargamos del hosting, SSL, ' +
        'actualizaciones de seguridad y cambios de contenido para que vos te enfoques en ' +
        'tu negocio. Planes mensuales adaptados a cada necesidad.',
      keywords: ['Hosting + SSL', 'Actualizaciones', 'Soporte WhatsApp', 'Backup'],
      variant: 'scdev',
    },
    {
      id: 'consultoria-scdev',
      numero: '07',
      titulo: 'Consultoría y Digitalización',
      descripcion:
        'Diagnóstico digital para PyMEs. Analizamos tu presencia online, procesos ' +
        'digitalizables y te entregamos una hoja de ruta concreta de mejoras. Trabajamos ' +
        'junto con Balance para ofrecerte una solución integral de comunicación y tecnología.',
      keywords: ['Auditoría digital', 'Hoja de ruta', 'Procesos internos', 'PyMEs'],
      variant: 'scdev',
    },
  ],
  en: [
    {
      id: 'contenidos',
      numero: '01',
      titulo: 'Digital content management and strategy',
      descripcion:
        "We don't just manage profiles, we build authority. This service integrates " +
        'strategic planning, content production and editing so your brand has a clear ' +
        'identity and a genuine bond with its audience, ensuring your message is ' +
        'consistent across every story and post.',
      keywords: ['Strategic planning', 'Content production', 'Metrics'],
    },
    {
      id: 'marca',
      numero: '02',
      titulo: 'Brand architecture',
      descripcion:
        'We define the essence that makes your brand unique and memorable. We create a ' +
        'complete visual system (logo, typography, color palette and graphic elements) ' +
        'and establish the tone and voice of the brand. We deliver a full brand manual ' +
        'that guarantees consistency at every touchpoint.',
      keywords: ['Visual identity', 'Brand manual', 'Logo & typography'],
    },
    {
      id: 'consultoria-balance',
      numero: '03',
      titulo: 'Impact consulting and mentoring',
      descripcion:
        'We design a comprehensive roadmap that adapts to your current structure. ' +
        'Through perception diagnostics and mentoring sessions, we turn your vision ' +
        'into a coherent, human and self-sufficient way of working.',
      keywords: ['Brand diagnosis', 'Mentoring', 'Growth strategy'],
    },
    {
      id: 'desarrollo-web',
      numero: '04',
      titulo: 'Web Development',
      descripcion:
        'From a single-section page to full corporate sites. We build your web ' +
        'presence with React, animations, forms and deployment included. Ideal for ' +
        'professionals, shops and companies that want a professional online presence.',
      keywords: ['React + Vite', 'Animations', 'SEO included', 'Deployment'],
      variant: 'scdev',
    },
    {
      id: 'automatizacion-ia',
      numero: '05',
      titulo: 'Automation and AI',
      descripcion:
        'WhatsApp bots, internal process automation and workflows that run on their ' +
        'own. We integrate WATI, Apps Script, Python and APIs so your business runs ' +
        'with less manual work and more efficiency.',
      keywords: ['WhatsApp / WATI', 'Apps Script', 'Python', 'Email integration'],
      variant: 'scdev',
    },
    {
      id: 'mantenimiento',
      numero: '06',
      titulo: 'Maintenance',
      descripcion:
        'Your site always live, secure and up to date. We handle hosting, SSL, ' +
        'security updates and content changes so you can focus on your business. ' +
        'Monthly plans tailored to every need.',
      keywords: ['Hosting + SSL', 'Updates', 'WhatsApp support', 'Backup'],
      variant: 'scdev',
    },
    {
      id: 'consultoria-scdev',
      numero: '07',
      titulo: 'Consulting and Digitalization',
      descripcion:
        'Digital diagnosis for SMEs. We analyze your online presence, processes that ' +
        'can be digitalized, and deliver a concrete roadmap for improvement. We work ' +
        'alongside Balance to offer you a complete communication and technology solution.',
      keywords: ['Digital audit', 'Roadmap', 'Internal processes', 'SMEs'],
      variant: 'scdev',
    },
  ],
}

export interface CasoPortfolioTexto {
  id: string
  titulo: string
  cliente: string
  categorias: readonly string[]
  descripcion: string
  numero: string
}

export const portfolioData: Record<Locale, CasoPortfolioTexto[]> = {
  es: [
    {
      id: 'cruz-del-sur',
      titulo: 'Cruz del Sur',
      cliente: 'Consultorios Médicos',
      categorias: ['Arquitectura de marca', 'Estrategia digital'],
      numero: '01',
      descripcion:
        'El desafío inicial fue transformar una comunicación fragmentada en una identidad ' +
        'institucional sólida. Nos encontramos con una marca que carecía de unidad visual. ' +
        'Nuestra intervención comenzó con la creación de una identidad visual que proyectara ' +
        'confianza y cercanía. Rediseñamos el ecosistema digital en Instagram bajo una narrativa ' +
        'coherente que entiende el ciclo del paciente, logrando humanizar la atención y generar ' +
        'un entorno de seguridad para la comunidad.',
    },
    {
      id: 'grow',
      titulo: 'Grow',
      cliente: 'Centro de Alto Rendimiento',
      categorias: ['Arquitectura de marca', 'Estrategia digital'],
      numero: '02',
      descripcion:
        'Grow nació desde los cimientos con nuestra guía. Fuimos parte de la construcción de su ' +
        'identidad visual y diseñamos el sistema interno de la organización. El mayor reto fue la ' +
        'dualidad de su público: hablarle con autoridad al deportista de alto rendimiento sin ' +
        'descuidar al público general. Logramos un equilibrio entre la exigencia del rendimiento ' +
        'y la calidez de la rehabilitación.',
    },
    {
      id: 'glow-pro',
      titulo: 'Glow Pro',
      cliente: 'Marca de guantes para arqueros · ITA',
      categorias: ['Estrategia digital'],
      numero: '03',
      descripcion:
        'Para esta marca argentina con proyección en Italia, el objetivo fue claro: dejar de vender ' +
        'guantes para empezar a vender autoridad en el arco. A través de una narrativa técnica pero ' +
        'emocionante, posicionamos a Glow Pro como un referente de calidad y diseño internacional, ' +
        'manteniendo viva la raíz y la garra del arquero sudamericano.',
    },
    {
      id: 'bocaditos',
      titulo: 'Bocaditos',
      cliente: 'Coffee & Culture · USA',
      categorias: ['Estrategia digital'],
      numero: '04',
      descripcion:
        'Llevar la esencia argentina al mercado estadounidense requiere más que traducir un menú; ' +
        'requiere transmitir una emoción. Nuestra estrategia se centró en la identidad y la ' +
        'estacionalidad, capturando la nostalgia y la alegría del reencuentro. Logramos que la ' +
        'cafetería fuera un espacio de pertenencia donde la cultura argentina se vive y se celebra ' +
        'en cada detalle visual.',
    },
  ],
  en: [
    {
      id: 'cruz-del-sur',
      titulo: 'Cruz del Sur',
      cliente: 'Medical Consulting Rooms',
      categorias: ['Brand architecture', 'Digital strategy'],
      numero: '01',
      descripcion:
        'The initial challenge was to turn fragmented communication into a solid ' +
        'institutional identity. We found a brand that lacked visual unity. Our ' +
        'intervention began by creating a visual identity that projected trust and ' +
        'warmth. We redesigned the Instagram digital ecosystem under a coherent ' +
        'narrative that understands the patient journey, humanizing care and building ' +
        'a sense of safety for the community.',
    },
    {
      id: 'grow',
      titulo: 'Grow',
      cliente: 'High Performance Center',
      categorias: ['Brand architecture', 'Digital strategy'],
      numero: '02',
      descripcion:
        'Grow was born from the ground up with our guidance. We took part in building ' +
        'its visual identity and designed the internal system of the organization. The ' +
        "biggest challenge was its audience's duality: speaking with authority to " +
        'high-performance athletes without neglecting the general public. We achieved ' +
        'a balance between the demands of performance and the warmth of rehabilitation.',
    },
    {
      id: 'glow-pro',
      titulo: 'Glow Pro',
      cliente: 'Goalkeeper glove brand · Italy',
      categorias: ['Digital strategy'],
      numero: '03',
      descripcion:
        'For this Argentine brand with a presence in Italy, the goal was clear: stop ' +
        'selling gloves and start selling authority in the goal. Through a technical yet ' +
        'exciting narrative, we positioned Glow Pro as a benchmark of quality and ' +
        'international design, while keeping alive the roots and grit of the South ' +
        'American goalkeeper.',
    },
    {
      id: 'bocaditos',
      titulo: 'Bocaditos',
      cliente: 'Coffee & Culture · USA',
      categorias: ['Digital strategy'],
      numero: '04',
      descripcion:
        'Bringing the Argentine essence to the US market takes more than translating a ' +
        'menu; it takes conveying an emotion. Our strategy focused on identity and ' +
        'seasonality, capturing the nostalgia and joy of reunion. We turned the coffee ' +
        'shop into a space of belonging where Argentine culture is lived and celebrated ' +
        'in every visual detail.',
    },
  ],
}

import { useState, useEffect } from 'react'
import { getConfig } from '../lib/api'

export interface SiteConfig {
  whatsapp?: string
  email?: string
  instagram?: string
  linkedin?: string
  behance?: string
  hero_titulo?: string
  hero_subtitulo?: string
  hero_cta?: string
  marcas?: string
  experiencia?: string
}

export interface Servicio {
  ID: string
  Título: string
  Descripción: string
  Ícono: string
  Activo: string | boolean
}

export interface FormConfig {
  como_vende:     string[]
  objetivos:      string[]
  servicios:      string[]
  material_visual: string[]
  inversion:      string[]
}

function parseOpts(value?: string): string[] {
  if (!value) return []
  return value.split('|').map(s => s.trim()).filter(Boolean)
}

const FALLBACK_FORM_CONFIG: FormConfig = {
  como_vende:     ['Desde el local', 'De manera online', 'Ambas'],
  objetivos:      ['Darnos a conocer', 'Generar comunidad', 'Crecer en seguidores', 'Aumentar ventas', 'Fidelizar clientes', 'Otro'],
  servicios:      ['Gestión y estrategias de contenidos digitales', 'Arquitectura de marca', 'Consultorías y mentoría de impacto'],
  material_visual: ['Fotos', 'Videos', 'No tengo material'],
  inversion:      ['$150.000 - $250.000', '$250.000 - $350.000', '$350.000 - $450.000', '$450.000 - $550.000'],
}

export function useConfig() {
  const [config,     setConfig]     = useState<SiteConfig>({})
  const [servicios,  setServicios]  = useState<Servicio[]>([])
  const [formConfig, setFormConfig] = useState<FormConfig>(FALLBACK_FORM_CONFIG)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    getConfig().then(data => {
      if (data) {
        setConfig((data.config || {}) as unknown as SiteConfig)
        setServicios((data.servicios || []) as unknown as Servicio[])
        const fc = data.formConfig || {}
        const parsed = {
          como_vende:      parseOpts(fc.como_vende),
          objetivos:       parseOpts(fc.objetivos),
          servicios:       parseOpts(fc.servicios),
          material_visual: parseOpts(fc.material_visual),
          inversion:       parseOpts(fc.inversion),
        }
        setFormConfig(parsed.como_vende.length > 0 ? parsed : FALLBACK_FORM_CONFIG)
      }
      setLoading(false)
    })
  }, [])

  return { config, servicios, formConfig, loading }
}

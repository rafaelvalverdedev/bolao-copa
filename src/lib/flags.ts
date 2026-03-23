export function flagUrl(code: string): string {
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`
}

export const teamFlags: Record<string, string> = {
  // Grupo A
  'Brasil':           'br',
  'México':           'mx',
  'Alemanha':         'de',
  'Argentina':        'ar',
  // Grupo B
  'França':           'fr',
  'Inglaterra':       'gb-eng',
  'Portugal':         'pt',
  'Espanha':          'es',
  // Grupo C
  'Holanda':          'nl',
  'Bélgica':          'be',
  'Croácia':          'hr',
  'Dinamarca':        'dk',
  // Grupo D
  'Uruguai':          'uy',
  'Colômbia':         'co',
  'Equador':          'ec',
  'Chile':            'cl',
  // Grupo E
  'Estados Unidos':              'us',
  'Canadá':           'ca',
  'Jamaica':          'jm',
  // Grupo F
  'Japão':            'jp',
  'Coreia do Sul':    'kr',
  'Austrália':        'au',
  'Irã':              'ir',
  // Grupo G
  'Marrocos':         'ma',
  'Senegal':          'sn',
  'Egito':            'eg',
  'Nigéria':          'ng',
  // Grupo H
  'Turquia':          'tr',
  'Suíça':            'ch',
  'Sérvia':           'rs',
  // Grupo I
  'Áustria':          'at',
  'Escócia':          'gb-sct',
  'Hungria':          'hu',
  // Grupo J
  'Argélia':          'dz',
  'Polônia':          'pl',
  'Romênia':          'ro',
  // Grupo K
  'Suécia':           'se',
  'Noruega':          'no',
  // Grupo L
  'Arábia Saudita':   'sa',
  'Gana':             'gh',
  'Qatar':            'qa',
  'Camarões':         'cm',
  'Paraguai':          'py',
  'África do Sul':    'za',
  'Haiti':            'ht',
  'Curaçao':           'cw',
  'Costa do Marfim':      'ci',
  'Tunísia':          'tn',
  'Cabo Verde':        'cv',
  'Nova Zelândia':        'nz',
  'Jordânia':         'jo',
  'Panamá':          'pa',
  'Uzbequistão':      'uz',
  
}

export function teamFlagUrl(teamName: string): string {
  const code = teamFlags[teamName]
  if (!code) return ''
  return flagUrl(code)
}
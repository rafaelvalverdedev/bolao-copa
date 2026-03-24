insert into public.matches
  (home_team, away_team, home_flag, away_flag, match_date, group_stage)
values

-- ═══════════════════════════════
-- GRUPO A \ MEX México • AFS África do Sul • COR Coreia do Sul • EU4 Europa4
-- ═══════════════════════════════
('México',          'África do Sul',    'MEX','AFS', '2026-06-11 16:00:00', 'Grupo A'),
('Coreia do Sul',   'Europa4',          'COR','EU4', '2026-06-11 23:00:00', 'Grupo A'),
('Europa4',         'África do Sul',    'EU4','AFS', '2026-06-18 13:00:00', 'Grupo A'),
('México',          'Coreia do Sul',    'MEX','COR', '2026-06-18 22:00:00', 'Grupo A'),
('Europa4',         'México',           'EU4','MEX', '2026-06-24 22:00:00', 'Grupo A'),
('África do Sul',   'Coreia do Sul',    'AFS','COR', '2026-06-24 22:00:00', 'Grupo A'),

-- ═══════════════════════════════
-- GRUPO B \ CAN Canadá •  EU1 Europa1 • QAT Qatar • SUI Suíça
-- ═══════════════════════════════
('Canadá',          'Europa1',          'CAN','EU1', '2026-06-12 16:00:00', 'Grupo B'),
('Qatar',           'Suíça',            'QAT','SUI', '2026-06-13 16:00:00', 'Grupo B'),
('Suíça',           'Europa1',          'SUI','EU1', '2026-06-18 16:00:00', 'Grupo B'),
('Canadá',          'Qatar',            'CAN','QAT', '2026-06-18 19:00:00', 'Grupo B'),
('Suíça',           'Canadá',           'SUI','CAN', '2026-06-24 16:00:00', 'Grupo B'),
('Europa1',         'Qatar',            'EU1','QAT', '2026-06-24 16:00:00', 'Grupo B'),

-- ═══════════════════════════════
-- GRUPO C \ BRA Brasil • MAR Marrocos • HAT Haiti • ESC Escócia
-- ═══════════════════════════════
('Brasil',          'Marrocos',         'BRA','MAR', '2026-06-13 19:00:00', 'Grupo C'),
('Haiti',           'Escócia',          'HAT','ESC', '2026-06-13 22:00:00', 'Grupo C'),
('Escócia',         'Marrocos',         'ESC','MAR', '2026-06-19 19:00:00', 'Grupo C'),
('Brasil',          'Haiti',            'BRA','HAT', '2026-06-19 22:00:00', 'Grupo C'),
('Escócia',         'Brasil',           'ESC','BRA', '2026-06-24 19:00:00', 'Grupo C'),
('Marrocos',        'Haiti',            'MAR','HAT', '2026-06-24 19:00:00', 'Grupo C'),


-- ═══════════════════════════════
-- GRUPO D \ EUA Estados Unidos • PAR Paraguai • AUS Austrália • EU3 Europa3
-- ═══════════════════════════════
('Estados Unidos',  'Paraguai',         'EUA','PAR', '2026-06-12 22:00:00', 'Grupo D'),
('Austrália',       'Europa3',          'AUS','EU3', '2026-06-13 01:00:00', 'Grupo D'),
('Europa3',         'Paraguai',         'EU3','PAR', '2026-06-19 01:00:00', 'Grupo D'),
('Estados Unidos',  'Austrália',        'EUA','AUS', '2026-06-19 16:00:00', 'Grupo D'),
('Europa3',         'Estados Unidos',   'EU3','EUA', '2026-06-25 23:00:00', 'Grupo D'),
('Paraguai',        'Austrália',        'PAR','AUS', '2026-06-25 23:00:00', 'Grupo D'),

-- ═══════════════════════════════
-- GRUPO E \ ALE Alemanha • CUR Curaçao • CMD Costa do Marfim • EQU Equador
-- ═══════════════════════════════
('Alemanha',        'Curaçao',          'ALE','CUR', '2026-06-14 14:00:00', 'Grupo E'),
('Costa do Marfim', 'Equador',          'CDM','EQU', '2026-06-14 20:00:00', 'Grupo E'),
('Equador',         'Curaçao',          'EQU','CUR', '2026-06-20 21:00:00', 'Grupo E'),
('Alemanha',        'Costa do Marfim',  'ALE','CDM', '2026-06-20 17:00:00', 'Grupo E'),
('Curaçao',         'Costa do Marfim',  'CUR','CDM', '2026-06-25 17:00:00', 'Grupo E'),
('Equador',         'Alemanha',         'EQU','ALE', '2026-06-25 17:00:00', 'Grupo E'),

-- ═══════════════════════════════
-- GRUPO F \ HOL Holanda • JAP Japão • EU2 Europa2 • TUN Tunísia
-- ═══════════════════════════════
('Holanda',         'Japão',            'HOL','JAP', '2026-06-14 17:00:00', 'Grupo F'),
('Europa2',         'Tunísia',          'EU2','TUN', '2026-06-14 23:00:00', 'Grupo F'),
('Tunísia',         'Japão',            'TUN','JAP', '2026-06-21 01:00:00', 'Grupo F'),
('Holanda',         'Europa2',          'HOL','EU2', '2026-06-20 14:00:00', 'Grupo F'),
('Tunísia',         'Holanda',          'TUN','HOL', '2026-06-25 20:00:00', 'Grupo F'),
('Japão',           'Europa2',          'JAP','EU2', '2026-06-25 20:00:00', 'Grupo F'),

-- ═══════════════════════════════
-- GRUPO G \ BEL Bélgica • EGT Egito • IRA Irã • NZL Nova Zelândia
-- ═══════════════════════════════
('Bélgica',         'Egito',            'BEL','EGT', '2026-06-15 16:00:00', 'Grupo G'),
('Irã',             'Nova Zelândia',    'IRA','NZL', '2026-06-15 22:00:00', 'Grupo G'),
('Bélgica',         'Irã',              'BEL','IRA', '2026-06-21 16:00:00', 'Grupo G'),
('Nova Zelândia',   'Egito',            'NZL','EGT', '2026-06-21 22:00:00', 'Grupo G'),
('Nova Zelândia',   'Bélgica',          'NZL','BEL', '2026-06-26 00:00:00', 'Grupo G'),
('Egito',           'Irã',              'EGT','IRA', '2026-06-26 00:00:00', 'Grupo G'),

-- ═══════════════════════════════
-- GRUPO H \ ESP Espanha • CPV Cabo Verde • SAU Arábia Saudita • URU Uruguai
-- ═══════════════════════════════
('Espanha',         'Cabo Verde',       'ESP','CPV', '2026-06-15 13:00:00', 'Grupo H'),
('Arábia Saudita',  'Uruguai',          'SAU','URU', '2026-06-15 19:00:00', 'Grupo H'),
('Espanha',         'Arábia Saudita',   'ESP','SAU', '2026-06-21 13:00:00', 'Grupo H'),
('Uruguai',         'Cabo Verde',       'URU','CPV', '2026-06-21 19:00:00', 'Grupo H'),
('Uruguai',         'Espanha',          'URU','ESP', '2026-06-26 21:00:00', 'Grupo H'),
('Cabo Verde',      'Arábia Saudita',   'CPV','SAU', '2026-06-26 21:00:00', 'Grupo H'),

-- ═══════════════════════════════
-- GRUPO I \ FRA França • SEN Senegal • Repescagem2 • NOR Noruega
-- ═══════════════════════════════
('França',          'Senegal',          'FRA','SEN', '2026-06-16 16:00:00', 'Grupo I'),
('Repescagem2',     'Noruega',          'RP2','NOR', '2026-06-16 19:00:00', 'Grupo I'),
('França',          'Repescagem2',      'FRA','RP2', '2026-06-22 18:00:00', 'Grupo I'),
('Noruega',         'Senegal',          'NOR','SEN', '2026-06-22 21:00:00', 'Grupo I'),
('Noruega',         'França',           'NOR','FRA', '2026-06-26 16:00:00', 'Grupo I'),
('Senegal',         'Repescagem2',      'SEN','RP2', '2026-06-26 16:00:00', 'Grupo I'),



-- ═══════════════════════════════
-- GRUPO J \ ARG Argentina • AGL Argélia • AUT Áustria • JRD Jordânia
-- ═══════════════════════════════
('Áustria',         'Jordânia',         'AUT','JRD', '2026-06-17 01:00:00', 'Grupo J'),
('Argentina',       'Argélia',          'ARG','AGL', '2026-06-16 22:00:00', 'Grupo J'),
('Jordânia',        'Argélia',          'JOR','AGL', '2026-06-23 00:00:00', 'Grupo J'),
('Argentina',       'Áustria',          'ARG','AUT', '2026-06-22 14:00:00', 'Grupo J'),
('Jordânia',        'Argentina',        'JOR','ARG', '2026-06-27 23:00:00', 'Grupo J'),
('Argélia',         'Áustria',          'AGL','AUT', '2026-06-27 23:00:00', 'Grupo J'),

-- ═══════════════════════════════
-- GRUPO K \ POR Portugal • RP1 Repescagem1 • UZB Uzbequistão • COL Colômbia
-- ═══════════════════════════════
('Portugal',        'Repescagem1',      'POR','RP1', '2026-06-17 14:00:00', 'Grupo K'),
('Uzbequistão',     'Colômbia',         'UZB','COL', '2026-06-17 23:00:00', 'Grupo K'),
('Portugal',        'Uzbequistão',      'POR','UZB', '2026-06-23 14:00:00', 'Grupo K'),
('Colômbia',        'Repescagem1',      'COL','RP1', '2026-06-23 23:00:00', 'Grupo K'),
('Colômbia',        'Portugal',         'COL','POR', '2026-06-27 20:30:00', 'Grupo K'),
('Repescagem1',     'Uzbequistão',      'RP1','UZB', '2026-06-27 20:30:00', 'Grupo K'),

-- ═══════════════════════════════
-- GRUPO L \ ING Inglaterra • CRO Croácia • GAN Gana • PAN Panamá
-- ═════════════════════════════==  
('Inglaterra',      'Croácia',          'ING','CRO', '2026-06-17 17:00:00', 'Grupo L'),
('Gana',            'Panamá',           'GAN','PAN', '2026-06-17 20:00:00', 'Grupo L'),
('Inglaterra',      'Gana',             'ING','GAN', '2026-06-23 17:00:00', 'Grupo L'),
('Panamá',          'Croácia',          'PAN','CRO', '2026-06-23 20:00:00', 'Grupo L'),
('Panamá',          'Inglaterra',       'PAN','ING', '2026-06-27 18:00:00', 'Grupo L'),
('Croácia',         'Gana',             'CRO','GAN', '2026-06-27 18:00:00', 'Grupo L');
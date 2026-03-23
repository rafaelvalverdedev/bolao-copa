// Representa um usuário cadastrado no sistema
export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

// Representa uma partida da Copa do Mundo
export interface Match {
  id: string
  home_team: string        // time da casa
  away_team: string        // time visitante
  home_flag: string        // emoji da bandeira
  away_flag: string
  match_date: string       // data e hora da partida
  home_score: number | null  // null = partida ainda não aconteceu
  away_score: number | null
  group_stage: string      // ex: "Grupo A", "Oitavas", "Final"
  round: number
  is_finished: boolean
}

// Representa um palpite de um usuário para uma partida
export interface Bet {
  id: string
  user_id: string          // quem apostou
  match_id: string         // em qual partida
  home_score: number       // palpite do placar da casa
  away_score: number       // palpite do placar visitante
  points: number | null    // pontos ganhos (null = ainda não calculado)
  created_at: string
}

// Representa uma linha do ranking
export interface RankingEntry {
  user_id: string
  user_name: string
  total_points: number
  exact_scores: number     // quantos placares exatos acertou
  correct_results: number  // quantos resultados (vitória/empate) acertou
  position: number
}
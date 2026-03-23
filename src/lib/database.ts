import { supabase } from './supabase'
import type { Bet, Match, RankingEntry } from '../types'

// ── PARTIDAS ──────────────────────────────────────

// Busca todas as partidas ordenadas por data
export async function getMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })

  if (error) throw new Error(error.message)
  return data as Match[]
}

// ── PALPITES ──────────────────────────────────────

// Busca todos os palpites de um usuário específico
export async function getUserBets(userId: string): Promise<Bet[]> {
  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .eq('user_id', userId)  // filtra pelo id do usuário

  if (error) throw new Error(error.message)
  return data as Bet[]
}

// Salva ou atualiza um palpite
// upsert = insert se não existe, update se já existe
export async function saveBet(
  userId: string,
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<void> {
  const { error } = await supabase
    .from('bets')
    .upsert(
      {
        user_id: userId,
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
      },
      { onConflict: 'user_id,match_id' }  // se já existe esse par, atualiza
    )

  if (error) throw new Error(error.message)
}

// ── RANKING ───────────────────────────────────────

// Busca o ranking com estatísticas detalhadas
export async function getRanking(): Promise<RankingEntry[]> {
  // Busca perfis ordenados por pontos
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, name, total_points')
    .order('total_points', { ascending: false })

  if (profilesError) throw new Error(profilesError.message)
  if (!profiles || profiles.length === 0) return []

  // Busca estatísticas de palpites de todos os usuários
  const { data: bets, error: betsError } = await supabase
    .from('bets')
    .select('user_id, points')
    .not('points', 'is', null)  // só palpites já pontuados

  if (betsError) throw new Error(betsError.message)

  // Calcula estatísticas por usuário
  return profiles.map((profile, index) => {
    const userBets = (bets ?? []).filter(b => b.user_id === profile.id)

    const exactScores    = userBets.filter(b => b.points === 10).length
    const correctResults = userBets.filter(b => b.points === 5).length

    return {
      user_id:         profile.id,
      user_name:       profile.name,
      total_points:    profile.total_points,
      exact_scores:    exactScores,
      correct_results: correctResults,
      position:        index + 1,
    }
  })
}
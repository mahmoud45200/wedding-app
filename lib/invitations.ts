import { supabase } from './supabase'

export async function getInvitation(slug: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error) {
    console.error('Failed to fetch invitation:', error)

    return null
  }

  return data
}
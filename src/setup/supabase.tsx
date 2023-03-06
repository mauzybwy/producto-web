import { createClient } from '@supabase/supabase-js'

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'producto' },
  },
}

export const supabase = createClient("https://zlifjiqlgbuvppmnexkr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaWZqaXFsZ2J1dnBwbW5leGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc3NzY0OTIsImV4cCI6MTk5MzM1MjQ5Mn0.Ejf_jNPRXola1tWZ2cjhT996g1OAyilVPQkYkco-ee0", options)


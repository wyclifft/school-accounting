import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ubxtjvavwidwzznzqnpr.supabase.co', // paste your actual project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieHRqdmF2d2lkd3p6bnpxbnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODI4MjksImV4cCI6MjA3MTk1ODgyOX0.TebQS1VHBM1lHqAxTvrxpwOolp6sRNtIxRpCDsjxCWk' // paste your actual anon key
)


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://iqwckccxsmjgjfocdbqq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2NrY2N4c21qZ2pmb2NkYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTk1MDMsImV4cCI6MTk4ODM3NTUwM30.DqNEQWjTuH2g8IvBwvzCoGf0buYUV3Tlq9NUBkT3CtM')

modules.exports = supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oglqubhokihqouytbkzd.supabase.co';
const supabaseKey = 'sb_publishable_Svx9SjNO8o0UqjRAIOPz5A_LIrQk6lw';

export const supabase = createClient(supabaseUrl, supabaseKey);
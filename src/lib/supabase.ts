import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vkwzxezehrkhombjorvo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_9oc_GA_4A2SIkJSengCU_Q_Ed_09K0_';

export const supabase = createClient(supabaseUrl, supabaseKey);

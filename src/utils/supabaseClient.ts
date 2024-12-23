import { createClient } from '@supabase/supabase-js';
import { config } from '../lib/supabase/config';

export const supabase = createClient(config.url, config.anonKey);
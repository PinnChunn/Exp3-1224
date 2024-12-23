import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import type { Database } from '../../types/supabase';

export const supabase = createClient<Database>(config.url, config.anonKey);
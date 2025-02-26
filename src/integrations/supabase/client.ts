
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbukqlcbcdqegquigkom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidWtxbGNiY2RxZWdxdWlna29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MjM0NjYsImV4cCI6MjA1NjA5OTQ2Nn0.4n1d5SOVkknU6Il9seIZUjf4fl1-HylasNmjtDw4xJ4';

export const supabase = createClient(supabaseUrl, supabaseKey);

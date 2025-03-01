
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbukqlcbcdqegquigkom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidWtxbGNiY2RxZWdxdWlna29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MjM0NjYsImV4cCI6MjA1NjA5OTQ2Nn0.4n1d5SOVkknU6Il9seIZUjf4fl1-HylasNmjtDw4xJ4';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
  
  return data?.user || null;
};

// Function to save a CV
export const saveCV = async (name: string, cvData: any, templateId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('You must be logged in to save a CV');
  }
  
  const { data, error } = await supabase
    .from('saved_cvs')
    .insert({
      user_id: user.user.id,
      name,
      cv_data: cvData,
      template_id: templateId
    })
    .select();
  
  if (error) {
    console.error('Error saving CV:', error);
    throw error;
  }
  
  return data[0];
};

// Function to get all saved CVs for the current user
export const getSavedCVs = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('saved_cvs')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching saved CVs:', error);
    throw error;
  }
  
  return data;
};

// Function to get a specific saved CV
export const getSavedCV = async (id: string) => {
  const { data, error } = await supabase
    .from('saved_cvs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching CV:', error);
    throw error;
  }
  
  return data;
};

// Function to update a saved CV
export const updateSavedCV = async (id: string, updates: Partial<{name: string, cv_data: any, template_id: string}>) => {
  const { data, error } = await supabase
    .from('saved_cvs')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating CV:', error);
    throw error;
  }
  
  return data[0];
};

// Function to delete a saved CV
export const deleteSavedCV = async (id: string) => {
  const { error } = await supabase
    .from('saved_cvs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting CV:', error);
    throw error;
  }
  
  return true;
};

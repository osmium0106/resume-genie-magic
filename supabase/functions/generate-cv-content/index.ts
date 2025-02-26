
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.2.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { field, content, context } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    let prompt = '';
    let result;

    switch (field) {
      case 'summary':
        prompt = `Given this context about a professional named ${context.fullName} who works as a ${context.currentPosition} in the ${context.industry} industry, please enhance this professional summary while keeping the core message: "${content}". Generate a polished, confident professional summary (2-3 sentences) that highlights their expertise and value proposition.`;
        break;
      case 'experience':
        prompt = `Given this context about a professional named ${context.fullName} who works as a ${context.currentPosition} in the ${context.industry} industry, please enhance this job description while keeping the core information: "${content}". Generate a compelling description (2-3 sentences) that highlights achievements and responsibilities.`;
        break;
      case 'skills':
        prompt = `Given this context about a professional named ${context.fullName} who works as a ${context.currentPosition} in the ${context.industry} industry, and based on these current skills: "${content}", generate an enhanced, comma-separated list of 8-10 relevant technical and soft skills that would be valuable in their field.`;
        break;
      default:
        throw new Error('Invalid field specified');
    }

    const result = await model.generateText(prompt);
    const text = result.text;
    
    console.log('Generated content for field:', field);
    console.log('Generated text:', text);

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

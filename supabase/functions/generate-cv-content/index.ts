
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.2.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, currentPosition, yearsOfExperience, industry, skills } = await req.json();

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Given this information about a professional:
    - Name: ${fullName}
    - Current Position: ${currentPosition}
    - Years of Experience: ${yearsOfExperience}
    - Industry: ${industry}
    - Skills: ${skills}

    Please generate:
    1. A professional summary (about 2-3 sentences)
    2. A detailed skills section (list of 8-10 relevant skills)
    3. A professional description for their current role (2-3 sentences)

    Format the response as a JSON object with keys: "summary", "skills", "description"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    const content = JSON.parse(text);

    return new Response(JSON.stringify(content), {
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

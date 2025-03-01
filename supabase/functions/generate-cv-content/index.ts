
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const requestData = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    let prompt = '';
    let field = requestData.field || '';
    let content = requestData.content || '';
    let context = requestData.context || {};

    // Handle different types of requests (field-specific enhancements or full CV generation)
    if (field) {
      // Field-specific enhancement
      switch (field) {
        case 'summary':
          prompt = `Given this context about a professional named ${context.fullName || 'the professional'} who works as a ${context.currentPosition || 'professional'} in the ${context.industry || 'industry'}, please enhance this professional summary while keeping the core message: "${content}". Generate a polished, confident professional summary (2-3 sentences) that highlights their expertise and value proposition.`;
          break;
        case 'experience':
          prompt = `Given this context about a professional named ${context.fullName || 'the professional'} who works as a ${context.currentPosition || 'professional'} in the ${context.industry || 'industry'}, please enhance this job description while keeping the core information: "${content}". Generate a compelling description (2-3 sentences) that highlights achievements and responsibilities.`;
          break;
        case 'skills':
          prompt = `Given this context about a professional named ${context.fullName || 'the professional'} who works as a ${context.currentPosition || 'professional'} in the ${context.industry || 'industry'}, and based on these current skills: "${content}", generate an enhanced, comma-separated list of 8-10 relevant technical and soft skills that would be valuable in their field.`;
          break;
        default:
          throw new Error('Invalid field specified');
      }
    } else {
      // Full CV generation based on basic information
      const fullName = requestData.fullName || '';
      const currentPosition = requestData.currentPosition || '';
      const yearsOfExperience = requestData.yearsOfExperience || '';
      const industry = requestData.industry || '';
      const skills = requestData.skills || '';

      prompt = `Create a professional summary, job description, and skill list for a CV. The person's name is ${fullName}, they work as a ${currentPosition} with ${yearsOfExperience} years of experience in the ${industry} industry. Their current skills include: ${skills}. Format the response as a JSON object with three keys: "summary" (a professional summary paragraph), "description" (a compelling job description focused on achievements), and "skills" (a comma-separated list of 8-10 relevant skills).`;
    }

    console.log('Sending request to Gemini API with prompt:', prompt);

    // Use the new Gemini API endpoint format
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini API:', JSON.stringify(data));

    let text = '';

    // Extract text from the new API response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      text = data.candidates[0].content.parts[0].text || '';
    }

    console.log('Extracted text:', text);

    // Handle different response formats depending on request type
    if (!field) {
      try {
        // Try to parse the response as JSON for full CV generation
        const jsonResponse = JSON.parse(text);
        return new Response(JSON.stringify(jsonResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        return new Response(JSON.stringify({ text }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      // For field-specific enhancements, return the text directly
      return new Response(JSON.stringify({ text }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

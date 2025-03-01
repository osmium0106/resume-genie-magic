
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
    const { field, content, context, additionalInstructions } = await req.json();

    // Get API key from environment variable
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    console.log(`Generating content for field: ${field}`);
    console.log(`Content prompt: ${content}`);
    console.log(`Context: ${JSON.stringify(context)}`);
    console.log(`Additional instructions: ${additionalInstructions || "None"}`);

    // Build the prompt based on the field
    let prompt = "";
    
    if (field === 'summary') {
      prompt = `Enhance this professional summary for a CV: "${content}". 
      Context: Name: ${context.fullName || "N/A"}, Position: ${context.currentPosition || "N/A"}, Industry: ${context.industry || "N/A"}.
      Keep it concise, about 50 words in 4 lines maximum. Don't label it as "Option 1" or similar, just provide the enhanced content.`;
    } 
    else if (field === 'experience') {
      prompt = `Enhance this job description for a CV: "${content}".
      Context: Position: ${context.currentPosition || "N/A"}, Company/Industry: ${context.industry || "N/A"}.
      Keep it concise, about 50 words in 4 lines maximum. Focus on achievements and responsibilities. 
      Don't label it as "Option 1" or similar, just provide the enhanced content.`;
    } 
    else if (field === 'skills') {
      prompt = `Based on this skill: "${content}", generate 5 similar and relevant skills that would complement it on a CV.
      Return only 5 skills as a comma-separated list of single words or short phrases. 
      For example, if the input is "coding", return something like "HTML, CSS, JavaScript, Python, C++".`;
    }

    // Add any additional instructions if provided
    if (additionalInstructions) {
      prompt += ` ${additionalInstructions}`;
    }

    // Make API request to Gemini API
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    const responseData = await response.json();
    console.log("API Response:", JSON.stringify(responseData));

    // Extract the generated text from the response
    let text = "";
    if (responseData.candidates && 
        responseData.candidates[0] && 
        responseData.candidates[0].content && 
        responseData.candidates[0].content.parts && 
        responseData.candidates[0].content.parts[0] && 
        responseData.candidates[0].content.parts[0].text) {
      text = responseData.candidates[0].content.parts[0].text.trim();
      
      // For skills, ensure we have exactly 5 skills if possible
      if (field === 'skills' && text.includes(',')) {
        const skills = text.split(',').map(s => s.trim()).filter(s => s);
        if (skills.length > 5) {
          text = skills.slice(0, 5).join(', ');
        }
      }
    } else {
      throw new Error("Unexpected API response format");
    }

    return new Response(
      JSON.stringify({ text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-cv-content function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

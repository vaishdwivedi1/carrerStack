import { Loader2, Wand2, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

// AI Assistant Component with Google Gemini API
const AIAssistant = ({
  currentContent,
  onUpdate,
  onClose,
  sectionType,
  fieldName,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  // Gemini API configuration
  const GEMINI_API_KEY = "AIzaSyCzXUA_GAl6qMOeISyr4rdS2ojodVpohZE";
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  const generateAIContent = async (userPrompt, currentText, sectionType) => {
    try {
      // Create a context-aware prompt
      let systemPrompt = `You are an expert resume writer and career coach. Your task is to enhance and improve the following ${sectionType} section of a resume.`;

      let enhancementPrompt = "";

      if (userPrompt && userPrompt.trim() !== "") {
        enhancementPrompt = `User request: ${userPrompt}\n\n`;
      } else {
        enhancementPrompt =
          "Please enhance this content to make it more professional, impactful, and compelling. ";

        // Add section-specific instructions
        switch (sectionType) {
          case "summary":
            enhancementPrompt +=
              "Focus on creating a powerful professional summary that highlights key strengths, experience, and value proposition. Use action-oriented language and keep it concise (2-3 sentences).";
            break;
          case "experience":
            enhancementPrompt +=
              "Focus on achievements rather than responsibilities. Use strong action verbs, quantify results where possible, and highlight impact.";
            break;
          case "project":
            enhancementPrompt +=
              "Highlight technical achievements, problem-solving skills, and measurable outcomes. Use bullet points for clarity.";
            break;
          case "achievement":
            enhancementPrompt +=
              "Emphasize recognition, awards, and significant accomplishments. Include metrics and impact where possible.";
            break;
          default:
            enhancementPrompt +=
              "Make the content clear, professional, and impactful. Use proper grammar and industry-appropriate terminology.";
        }
      }

      const fullPrompt = `${systemPrompt}\n\n${enhancementPrompt}\n\nCurrent content to enhance:\n${currentText || "No content provided. Please generate a professional template for this section."}\n\nPlease provide only the enhanced content without any additional explanations or formatting instructions.`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Extract the generated text from the response
      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0]
      ) {
        const generatedText = response.data.candidates[0].content.parts[0].text;
        return generatedText.trim();
      } else {
        throw new Error("No content generated");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);

      // Fallback responses based on section type
      if (sectionType === "summary") {
        return "Experienced professional with a proven track record of delivering exceptional results. Skilled in strategic planning, team leadership, and process optimization. Committed to driving organizational success through innovative solutions and continuous improvement.";
      } else if (sectionType === "experience") {
        return "• Led cross-functional teams to achieve project goals ahead of schedule\n• Increased efficiency by 25% through process optimization\n• Successfully managed budgets exceeding $500K\n• Received Employee of the Month award for outstanding performance";
      } else {
        return "Enhanced version with improved clarity, professional tone, and impactful language to better communicate your value proposition.";
      }
    }
  };

  const handleEnhance = async () => {
    setIsLoading(true);
    setAiSuggestion("");

    try {
      const enhanced = await generateAIContent(
        prompt,
        currentContent,
        sectionType,
      );
      setAiSuggestion(enhanced);
    } catch (error) {
      console.error("Enhancement error:", error);
      setAiSuggestion(
        "An error occurred while generating content. Please try again with a different prompt.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const applySuggestion = () => {
    if (
      aiSuggestion &&
      aiSuggestion !==
        "An error occurred while generating content. Please try again with a different prompt."
    ) {
      onUpdate(aiSuggestion);
      onClose();
    }
  };

  // Pre-defined prompts for quick use
  const quickPrompts = [
    "Make it more professional",
    "Add achievements and metrics",
    "Improve grammar and clarity",
    "Make it more concise",
    "Add action verbs",
    "Make it more impactful",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wand2 className="text-purple-600" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">
              AI Assistant - {fieldName || sectionType}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              ✨ AI can help you improve grammar, make writing more
              professional, and add impactful action verbs. Try these prompts:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickPrompts.map((quickPrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(quickPrompt)}
                  className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {quickPrompt}
                </button>
              ))}
            </div>
          </div>

          {/* Current Content Preview */}
          {currentContent && currentContent !== "<br>" && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Content:
              </label>
              <div
                className="text-sm text-gray-600 max-h-[100px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: currentContent }}
              />
            </div>
          )}

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to improve?
            </label>
            <textarea
              placeholder="Describe what you want to improve... (e.g., 'Make it more professional', 'Add achievements', 'Improve grammar')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleEnhance}
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Generating with Gemini AI...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>Generate AI Enhancement</span>
              </>
            )}
          </button>

          {/* AI Suggestion Result */}
          {aiSuggestion && (
            <div className="mt-4 animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ✨ AI Suggestion:
              </label>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-700">
                {aiSuggestion}
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={applySuggestion}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply This Enhancement
                </button>
                <button
                  onClick={() => setAiSuggestion("")}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

// Add this CSS to your global styles or component
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

// Inject styles if needed
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

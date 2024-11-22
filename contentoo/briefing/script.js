// script.js

// Variables to store form data
let formData = {};

// Variables for step navigation
let currentStep = 1;
const totalSteps = 10;

// DOM Elements
const apiKeyPrompt = document.getElementById('api-key-prompt');
const mainContainer = document.getElementById('main-container');
const saveApiKeyBtn = document.getElementById('save-api-key-btn');
const apiKeyInput = document.getElementById('api-key-input');

// Check if API key is stored
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = localStorage.getItem('openai_api_key');
  if (apiKey) {
    apiKeyPrompt.style.display = 'none';
    mainContainer.style.display = 'block';
    showStep(currentStep);
  } else {
    apiKeyPrompt.style.display = 'flex';
  }
});

// Save API key
saveApiKeyBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  if (apiKey) {
    localStorage.setItem('openai_api_key', apiKey);
    apiKeyPrompt.style.display = 'none';
    mainContainer.style.display = 'block';
    showStep(currentStep);
  } else {
    alert('Please enter a valid API key.');
  }
});

// Function to show a specific step
function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.step').forEach((stepElement) => {
    stepElement.style.display = 'none';
  });

  // Show the current step
  const currentStepElement = document.getElementById(`step-${step}`);
  currentStepElement.style.display = 'block';

  // Handle AI suggestions if needed
  handleAISuggestions(step);
}

// Navigation Buttons
document.querySelectorAll('.next-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      currentStep++;
      if (currentStep <= totalSteps) {
        showStep(currentStep);
      }
    }
  });
});

document.querySelectorAll('.prev-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentStep--;
    if (currentStep >= 1) {
      showStep(currentStep);
    }
  });
});

// Validate inputs before moving to the next step
function validateStep(step) {
  let isValid = true;
  switch (step) {
    case 1:
      const websiteURL = document.getElementById('website-url').value.trim();
      if (websiteURL) {
        formData.websiteURL = websiteURL;
      } else {
        alert('Please enter a website URL.');
        isValid = false;
      }
      break;
    case 2:
      const goalsSelect = document.getElementById('content-goals');
      const selectedGoals = Array.from(goalsSelect.selectedOptions).map(opt => opt.value);
      if (selectedGoals.length > 0) {
        formData.contentGoals = selectedGoals;
      } else {
        alert('Please select at least one content goal.');
        isValid = false;
      }
      break;
    // Validate other steps similarly
    // ...
  }
  return isValid;
}

// Handle AI suggestions
function handleAISuggestions(step) {
  switch (step) {
    case 1:
      // Fetch suggestions based on website URL
      // Do not display any output as per instructions
      break;
    case 2:
      // If unsure, suggest goals based on website
      const step2Suggestions = document.getElementById('step-2-suggestions');
      step2Suggestions.innerHTML = 'Fetching suggestions...';
      fetchAISuggestions('content goals').then(suggestions => {
        step2Suggestions.innerHTML = `<p>AI Suggestions: ${suggestions}</p>`;
      });
      break;
    // Handle suggestions for other steps
    // ...
  }
}

// Fetch AI suggestions using the OpenAI API
async function fetchAISuggestions(topic) {
  const apiKey = localStorage.getItem('openai_api_key');
  const prompt = generatePrompt(topic);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      })
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('No suggestions received.');
    }
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return 'Unable to fetch suggestions at this time.';
  }
}

// Generate prompts for AI
function generatePrompt(topic) {
  switch (topic) {
    case 'content goals':
      return `Based on the website ${formData.websiteURL}, suggest primary goals for content creation.`;
    // Add prompts for other topics
    // ...
    default:
      return '';
  }
}

// Generate Content Draft
document.getElementById('generate-content-btn').addEventListener('click', async () => {
  const contentDraftDiv = document.getElementById('content-draft');
  contentDraftDiv.innerHTML = 'Generating content draft...';

  const apiKey = localStorage.getItem('openai_api_key');
  const prompt = `Using the following briefing, create a full content draft:\n\n${JSON.stringify(formData, null, 2)}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      })
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      const contentDraft = data.choices[0].message.content.trim();
      contentDraftDiv.innerHTML = `<h3>Content Draft:</h3><p>${contentDraft}</p>`;
    } else {
      throw new Error('No content draft received.');
    }
  } catch (error) {
    console.error('Error generating content draft:', error);
    contentDraftDiv.innerHTML = 'Unable to generate content draft at this time.';
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const depressionForm = document.getElementById('depressionForm');
    const depressionResultDiv = document.getElementById('depressionResult');

    // --- Navigation Logic ---
    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('visible');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('visible');
        } else {
            document.getElementById('home').classList.add('visible'); // Default to home
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('data-target');

            if (targetId) {
                event.preventDefault();

                // Update active nav link styling
                navLinks.forEach(lnk => lnk.classList.remove('active'));
                link.classList.add('active');
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    // Also keep the main dropdown link visually active if a sub-item is clicked
                    parentDropdown.querySelector('a.nav-link').classList.add('active');
                } else {
                    // Ensure other main dropdown links are deactivated if a non-dropdown item is clicked
                     document.querySelectorAll('.dropdown > a.nav-link').forEach(dl => {
                         if (!dl.isEqualNode(link)) { // don't deactivate if it IS the dropdown link itself
                             dl.classList.remove('active');
                         }
                     });
                }


                showSection(targetId);
                // Optional: Scroll to the top of the content area smoothly
                const mainElement = document.querySelector('main');
                if (mainElement) {
                     mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

            }
        });
    });

    // Show initial section (Home)
    showSection('home');

    // --- Depression Risk Calculator Logic ---
    if (depressionForm) {
        depressionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            depressionResultDiv.innerHTML = ''; // Clear previous results

             // --- *** CRITICAL WARNING *** ---
            // The calculation below is the SAME EXAMPLE from the blueprint.
            // It uses ARBITRARY numbers and logic. It is **NOT** medically
            // validated or accurate for real-world use.
            // Replace this with a professionally validated algorithm.
            // --- *** END WARNING *** ---

            // Get input values
            const age = parseInt(document.getElementById('depAge').value);
            const sex = document.getElementById('depSex').value; // Get selected sex
            const familyHistory = document.getElementById('depFamilyHistory').value;
            const lifeEvents = parseInt(document.getElementById('depLifeEvents').value);
            const sleep = document.getElementById('depSleep').value;
            const support = document.getElementById('depSupport').value;

            // --- Example Calculation Logic (NOT VALIDATED) ---
            let adjustedScore = 4.5; // Start with the blueprint's example baseline
             if (lifeEvents > 0) adjustedScore += 2; // Example adjustment from blueprint
             if (sleep === 'poor') adjustedScore += 1; // Example adjustment from blueprint

            let finalScore = adjustedScore;
            if (familyHistory === 'yes') {
                 finalScore *= 1.5; // Example multiplier from blueprint
             }
            finalScore = Math.round(finalScore);
             // --- End Example Calculation ---


            // Determine risk category (Example thresholds adjusted slightly)
            let riskCategory = 'Low'; // Default
            if (finalScore > 10) { // High risk based on example
                riskCategory = 'High';
            } else if (finalScore > 5) { // Moderate risk
                riskCategory = 'Moderate';
            } else { // Low risk
                riskCategory = 'Low';
            }

            // --- Generate Result Message Based on Category and Sex ---
            let resultHTML = `<h3>Calculation Result (Illustrative Example)</h3>`;

            if (riskCategory === 'Low') {
                resultHTML += `<p class="result-message result-low">Sab changa si! 😎 Keep up the great work!</p>`;
            } else if (riskCategory === 'Moderate') {
                if (sex === 'female') {
                    resultHTML += `<p class="result-message result-moderate">Tension na le chhori! 😉 Focus on positive habits.</p>`;
                } else if (sex === 'male') {
                    resultHTML += `<p class="result-message result-moderate">Tension na le chhora! 😊 Focus on positive habits.</p>`;
                } else { // Fallback if sex not selected (shouldn't happen with 'required')
                     resultHTML += `<p class="result-message result-moderate">Looks moderate. Focus on positive habits.</p>`;
                }
            } else { // High Risk
                 resultHTML += `<p class="result-message result-high">Risk appears elevated in this example calculation. Prioritize self-care. 🙏</p>`;
            }

             // Add common elements: Score, Disclaimer, Recommendations
             resultHTML += `
                <p><strong>Example Score:</strong> ${finalScore}</p>
                <p class="disclaimer" style="font-size: 0.9em;"><strong>Remember:</strong> This score is from a non-validated example. Real depression risk is complex. This is NOT a diagnosis.</p>
                <h4>General Recommendations (Not Medical Advice):</h4>
                <ul>
                    ${riskCategory === 'High' || riskCategory === 'Moderate' ? '<li>Consider discussing your feelings and this result with a trusted friend, family member, or healthcare professional.</li>' : ''}
                    <li>Maintain a consistent sleep schedule.</li>
                    <li>Incorporate regular physical activity you enjoy.</li>
                    <li>Eat a balanced diet rich in fruits, vegetables, and whole grains.</li>
                    <li>Nurture your social connections.</li>
                    <li>Explore stress-reduction techniques like mindfulness, deep breathing, or hobbies.</li>
                </ul>
                <p><em>Always consult a qualified healthcare provider for accurate assessment and personalized advice.</em></p>
            `;


            // Display the result
            depressionResultDiv.innerHTML = resultHTML;
            depressionResultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        });
    }


     // --- Chatbot UI Interaction (DEMO ONLY) ---
     const chatInput = document.getElementById('chat-input');
     const sendChatBtn = document.getElementById('send-chat-btn');
     const chatHistory = document.getElementById('chat-history');
     const chatLoading = document.getElementById('chat-loading');

     function addDemoChatMessage(message, sender = 'user') {
         const messageElement = document.createElement('p');
         const isUser = sender === 'user';
         messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
         messageElement.textContent = `${isUser ? 'You: ' : 'Assistant: '}${message}`; // Add prefix
         chatHistory.appendChild(messageElement);
         // Scroll to the bottom smoothly
         chatHistory.scrollTo({ top: chatHistory.scrollHeight, behavior: 'smooth' });
     }


     function handleChatSend() {
         const message = chatInput.value.trim();
         if (message) {
             addDemoChatMessage(message, 'user'); // Show user message
             chatInput.value = ''; // Clear input
             chatLoading.style.display = 'block'; // Show thinking indicator

             // Simulate bot thinking and response (NO ACTUAL AI)
             setTimeout(() => {
                 chatLoading.style.display = 'none'; // Hide thinking
                 addDemoChatMessage("I'm just a demo UI right now! I can't process requests yet, but thanks for talking to me!", 'bot');
             }, 1500); // Wait 1.5 seconds
         }
     }

     if (sendChatBtn) {
         sendChatBtn.addEventListener('click', handleChatSend);
     }

     if (chatInput) {
         chatInput.addEventListener('keypress', (event) => {
             if (event.key === 'Enter') {
                 handleChatSend();
                 event.preventDefault();
             }
         });
     }

    // --- End Chatbot UI Demo ---


}); // End DOMContentLoaded
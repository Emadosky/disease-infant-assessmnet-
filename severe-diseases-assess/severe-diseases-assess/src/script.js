function updateStatus(condition, button) {
  const statusContainer = document.getElementById('status-container');
  const interactionContainer = document.getElementById('interaction-container');
  const statusElement = document.getElementById('status');
  const interactionElement = interactionContainer.querySelector('p');

  // Toggle the active class on the button
  button.classList.toggle('active');

  // If the "None" button is clicked, deactivate all other buttons
  if (condition === 'none') {
    const buttons = document.querySelectorAll('.buttons-container button');
    buttons.forEach(btn => {
      if (btn !== button) {
        btn.classList.remove('active');
      }
    });
  } else {
    // If any other button is clicked, deactivate the "None" button
    document.querySelector('.buttons-container button[onclick="updateStatus(\'none\', this)"]').classList.remove('active');
  }

  // Get all active buttons
  const activeButtons = document.querySelectorAll('.buttons-container button.active');

  // Determine the new status based on the active buttons
  let hasSevere = false;
  let hasInfection = false;
  let hasUnlikely = false;

  activeButtons.forEach(btn => {
    switch (btn.textContent) {
      case 'Convulsions':
      case 'Fast Breathing (60 breaths per minute or above)':
      case 'Fever (37.5°C or above)':
      case 'Low Body Temperature (less than 35.5°C)':
      case 'Movement only when stimulated or no movement at all':
      case 'Not feeding well':
      case 'Severe chest indrawing':
        hasSevere = true;
        break;
      case 'Skin pustules':
      case 'Umbilicus red or draining pus':
        hasInfection = true;
        break;
      case 'None of the signs of very severe disease or local bacterial infection':
        hasUnlikely = true;
        break;
      default:
        break;
    }
  });

  // Set the status based on the conditions
  if (hasSevere) {
    statusElement.textContent = 'Very severe disease';
    statusContainer.className = 'status severe';
    interactionElement.textContent = 'Possible nursing interaction:Refere the client to Consult a doctor';
    interactionContainer.className = 'interaction severe';
  } else if (hasInfection) {
    statusElement.textContent = 'Local bacterial infection';
    statusContainer.className = 'status infection';
    interactionElement.textContent = 'Possible nursing interaction: Consult a doctor';
    interactionContainer.className = 'interaction infection';
  } else if (hasUnlikely) {
    statusElement.textContent = 'Severe disease or local infection unlikely';
    statusContainer.className = 'status unlikely';
    interactionElement.textContent = 'Possible nursing interaction: None';
    interactionContainer.className = 'interaction unlikely';
  } else {
    statusElement.textContent = 'Normal findings';
    statusContainer.className = 'status normal';
    interactionElement.textContent = 'Possible nursing interaction: None';
    interactionContainer.className = 'interaction normal';
  }

  // Change the rainbow animation on the header text when any button is clicked
  const headerText = document.getElementById('header-text');
  headerText.classList.remove('header-animated');
  void headerText.offsetWidth; // Trigger reflow
  headerText.classList.add('header-animated');
}

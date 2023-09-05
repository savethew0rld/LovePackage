document.addEventListener('DOMContentLoaded', function() {
  const progressTexts = document.querySelectorAll('.progress-text');

  progressTexts.forEach((progressText) => {
    const currentValueElement = progressText.querySelector('#current-value');
    const goalValueElement = progressText.querySelector('#goal-value');
    const percentageValueElement = progressText.querySelector('#percentage-value');
    const progressBar = progressText.querySelector('.progress-bar');
    const progressBarOverlay = progressText.querySelector('.progress-bar-overlay');
    const goalTextElement = progressText.querySelector('#goal-text');

    if (currentValueElement && goalValueElement && percentageValueElement && goalTextElement) {
      const currentValue = parseFloat(currentValueElement.textContent.replace('$', ''));
      const goalValue = parseFloat(goalValueElement.textContent.replace('$', ''));

      const formattedCurrentValue = `$${currentValue.toFixed(2)}`;
      const formattedGoalValue = `$${goalValue.toFixed(2)}`;

      currentValueElement.textContent = formattedCurrentValue;
      goalValueElement.textContent = formattedGoalValue;

      const percentage = (currentValue / goalValue) * 100;
      const adjustedPercentage = Math.min(percentage, 200);

      progressBar.style.width = `${adjustedPercentage}%`;
      progressBar.style.backgroundColor = '#fad400'; // Yellow

      if (adjustedPercentage >= 100) {
        progressBarOverlay.style.width = `${adjustedPercentage - 100}%`;
        progressBarOverlay.style.backgroundColor = '#215cbd'; // Blue
      } else {
        progressBarOverlay.style.width = '0';
      }

      if (adjustedPercentage === 100) {
        currentValueElement.style.fontWeight = 'bold';
        currentValueElement.style.color = '#fad400'; // Yellow
        currentValueElement.style.fontSize = 'x-large';
        percentageValueElement.style.fontWeight = 'bold';
        percentageValueElement.style.color = '#fad400'; // Yellow
        percentageValueElement.style.fontSize = 'x-large';
      } else if (adjustedPercentage > 100) {
        goalTextElement.classList.add('goal-reached');
        currentValueElement.classList.add('color-changing');
  			percentageValueElement.classList.add('color-changing');
        currentValueElement.style.fontWeight = 'bold';
        currentValueElement.style.color = '#215cbd'; // Blue
        currentValueElement.style.fontSize = 'x-large';
        percentageValueElement.style.fontWeight = 'bold';
        percentageValueElement.style.color = '#215cbd'; // Blue
        percentageValueElement.style.fontSize = 'x-large';
      } else {
        goalTextElement.classList.remove('goal-reached');
        currentValueElement.classList.remove('color-changing');
  			percentageValueElement.classList.remove('color-changing');
        currentValueElement.textContent = `CURRENT: ${formattedCurrentValue}`;
        currentValueElement.style.fontWeight = 'normal';
        currentValueElement.style.color = 'white';
        currentValueElement.style.fontSize = 'initial';
        percentageValueElement.style.fontWeight = 'normal';
        percentageValueElement.style.color = 'white';
        percentageValueElement.style.fontSize = 'initial';
      }

      percentageValueElement.textContent =
        adjustedPercentage >= 100 ? `${adjustedPercentage.toFixed(2)}%` : `PERCENTAGE: ${percentage.toFixed(2)}%`;
    }
  });
});
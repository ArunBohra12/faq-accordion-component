export type Question = HTMLButtonElement;

export const isAccordionOpen = (questionElement: Question) => questionElement.getAttribute('aria-expanded') === 'true';

export const toggleAccordion = (questionButton: Question) => {
  const isExpanded = isAccordionOpen(questionButton);

  const answer = document.querySelector(`#${questionButton.getAttribute('aria-controls')}`);

  if (!isExpanded) {
    questionButton.setAttribute('aria-expanded', 'true');
    questionButton.dataset.expanded = 'true';
    answer?.classList.remove('hidden');
    answer?.setAttribute('tabindex', '0');
    return;
  }

  questionButton.setAttribute('aria-expanded', 'false');
  questionButton.dataset.expanded = 'false';
  answer?.classList.add('hidden');
  answer?.setAttribute('tabindex', '-1');
};

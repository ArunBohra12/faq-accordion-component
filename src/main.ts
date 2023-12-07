import { toggleAccordion, type Question } from './accordion';

const questionButtons: NodeListOf<Question> = document.querySelectorAll('button.question')!;

questionButtons.forEach((questionButton) => {
  questionButton.addEventListener('click', () => toggleAccordion(questionButton));
});

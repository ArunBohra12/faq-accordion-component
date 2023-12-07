/**
 * @jest-environment jsdom
 */

import { Question, isAccordionOpen, toggleAccordion } from '../accordion';

describe('Accordion behavior', () => {
  let questionButtons: NodeListOf<Question>;
  const questionsMockData = [
    {
      isExpanded: true,
      question: 'What is Frontend Mentor, and how will it help me?',
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.",
    },
  ];

  beforeEach(() => {
    // Simulate required DOM elements for testing

    let questionsHTML = '';

    // HTML will not contain items not necessary for tests eg. img
    questionsMockData.forEach((question, i) => {
      questionsHTML += `
          <div class="question-container">
            <button
              class="question"
              id="question-${i}-btn"
              data-expanded="${question.isExpanded ? 'true' : 'false'}"
              aria-expanded="${question.isExpanded ? 'true' : 'false'}"
              aria-controls="answer-${i}">
              <p>${question.question}</p>
            </button>
            <div class="answer" id="answer-${i}" role="region" aria-labelledby="question-${i}-btn" tabindex="0">
              ${question.answer}
            </div>
          </div>
        </div>`;
    });

    document.body.innerHTML = questionsHTML;
    questionButtons = document.querySelectorAll('button.question');
  });

  it('Have questions injected in the DOM', () => {
    expect(questionButtons.length).toBe(1);
  });

  it('Should toggle the accordion', () => {
    const question = questionsMockData[0];
    toggleAccordion(questionButtons[0]);

    const answer = document.querySelector(`#${questionButtons[0].getAttribute('aria-controls')}`);
    const isExpanded = questionButtons[0].dataset.expanded;

    expect(isExpanded).toBe(question.isExpanded ? 'false' : 'true');
    expect(answer?.classList.contains('hidden')).toBe(question.isExpanded ? true : false);
  });

  it('Should toggle aria controls', () => {
    const question = questionsMockData[0];
    // This function uses aria-expanded to test visibility
    toggleAccordion(questionButtons[0]);

    expect(isAccordionOpen(questionButtons[0])).toBe(!question.isExpanded);
  });

  it('Should toggle the tabindex for the answer on toggling question', () => {
    const question = questionsMockData[0];

    toggleAccordion(questionButtons[0]);
    const answer = document.querySelector(`#${questionButtons[0].getAttribute('aria-controls')}`);

    expect(answer?.getAttribute('tabindex')).toBe(question.isExpanded ? '-1' : '0');
  });
});

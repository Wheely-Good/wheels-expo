import { LessonStep } from './lesson_types';


export const lessonSteps: LessonStep[] = [
  {
    type: 'explanation',
    content: 'Japanese is infamous for having many levels of formality. Some grammar points are used only when speaking to your friends and family, and some of them are only used in professional situations.',
  },
  {
    type: 'example',
    sentence: 'その仕事をするにあたっては、君の援助が必要だ。',
    translation: 'To do that job, your help is necessary.',
  },
  {
    type: 'explanation',
    content: "In this lesson, we'll focus on formal expressions used in professional contexts. These forms show respect and maintain appropriate distance in business relationships.",
  },
  {
    type: 'example',
    sentence: '会議に際しまして、ご意見を承りたいと存じます。',
    translation: 'Regarding the meeting, I would like to receive your opinions.',
  },
  {
    type: 'quiz',
    question: 'Choose the correct option to fill in the sentence:',
    sentence: '彼は新しい＿＿＿を結んだ。',
    options: ['契約', '契約した'],
    correctAnswer: '契約',
  },
  {
    type: 'build',
    sentence: 'こちらの紙に＿＿＿。',
    options: ['書いて', '注意事項', 'があります', '入院に際しての'],
    correctAnswer: '注意事項があります',
  },
  {
    type: 'listen',
    sentence: '一言ご挨拶を申し上げます。',
    translation: 'Let me say a few words of greeting.',
  },
  {
    type: 'finish',
  },
];
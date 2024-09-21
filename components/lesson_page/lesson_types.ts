// lessonTypes.ts

export type ExplanationStep = {
    type: 'explanation';
    content: string;
  };
  
  export type ExampleStep = {
    type: 'example';
    sentence: string;
    translation: string;
  };
  
  export type QuizStep = {
    type: 'quiz';
    question: string;
    sentence: string;
    options: string[];
    correctAnswer: string;
  };
  
  export type BuildStep = {
    type: 'build';
    sentence: string;
    options: string[];
    correctAnswer: string;
  };
  
  export type ListenStep = {
    type: 'listen';
    sentence: string;
    translation: string;
  };
  
  export type FinishStep = {
    type: 'finish';
  };
  
  export type LessonStep =
    | ExplanationStep
    | ExampleStep
    | QuizStep
    | BuildStep
    | ListenStep
    | FinishStep;
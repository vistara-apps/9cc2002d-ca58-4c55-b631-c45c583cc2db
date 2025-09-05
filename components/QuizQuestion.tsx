'use client';

import { QuizQuestion as QuizQuestionType } from '@/lib/types';
import { useState } from 'react';
import { FrameButton } from './FrameButton';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: string, selectedAnswer: number, isCorrect: boolean) => void;
  showResult?: boolean;
  selectedAnswer?: number;
  className?: string;
}

export function QuizQuestion({ 
  question, 
  onAnswer, 
  showResult = false,
  selectedAnswer,
  className = '' 
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(selectedAnswer ?? null);
  const [hasAnswered, setHasAnswered] = useState(showResult);

  const handleOptionClick = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelected(optionIndex);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    
    const isCorrect = selected === question.correctAnswer;
    setHasAnswered(true);
    onAnswer(question.id, selected, isCorrect);
  };

  const getOptionClass = (optionIndex: number) => {
    let baseClass = 'question-option';
    
    if (selected === optionIndex) {
      baseClass += ' selected';
    }
    
    if (hasAnswered) {
      if (optionIndex === question.correctAnswer) {
        baseClass += ' correct';
      } else if (selected === optionIndex && optionIndex !== question.correctAnswer) {
        baseClass += ' incorrect';
      }
    }
    
    return baseClass;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-dark-text mb-2">{question.question}</h3>
        <div className="text-sm text-gray-400">+{question.points} points</div>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(index)}
            onClick={() => handleOptionClick(index)}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full border-2 border-gray-400 mr-3 flex items-center justify-center">
                {selected === index && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="text-dark-text">{option}</span>
            </div>
          </div>
        ))}
      </div>
      
      {!hasAnswered && (
        <FrameButton
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full mt-6"
        >
          Submit Answer
        </FrameButton>
      )}
      
      {hasAnswered && (
        <div className="mt-6 p-4 glass-card rounded-lg">
          <div className={`text-sm font-medium mb-2 ${selected === question.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {selected === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
          </div>
          <p className="text-sm text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

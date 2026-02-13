"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface Option {
    id: string;
    label: string;
    emoji?: string;
    value: string;
}

interface Question {
    id: string;
    text: string;
    options: Option[];
    multiSelect?: boolean;
}

const quizQuestions: Question[] = [
    {
        id: "style",
        text: "What's your travel style?",
        options: [
            { id: "luxury", label: "Ultra Luxury", emoji: "💎", value: "luxury" },
            { id: "adventure", label: "Adventure", emoji: "🏕️", value: "adventure" },
            { id: "family", label: "Family Friendly", emoji: "👨‍👩‍👧‍👦", value: "family" },
            { id: "romance", label: "Honeymoon", emoji: "❤️", value: "romance" },
        ],
    },
    {
        id: "wildlife",
        text: "What do you most want to see?",
        multiSelect: true,
        options: [
            { id: "big5", label: "Big Five", emoji: "🦁", value: "big5" },
            { id: "birds", label: "Bird Watching", emoji: "🦅", value: "birds" },
            { id: "water", label: "Water Safari", emoji: "⛵", value: "water" },
            { id: "culture", label: "Local Culture", emoji: "🌍", value: "culture" },
        ],
    },
    {
        id: "budget",
        text: "What is your budget per person?",
        options: [
            { id: "budget", label: "$2,000 - $4,000", value: "budget" },
            { id: "mid", label: "$4,000 - $8,000", value: "mid" },
            { id: "high", label: "$8,000+", value: "high" },
        ],
    },
];

export default function PreferenceQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSelect = (questionId: string, value: string, multi: boolean) => {
        setAnswers((prev) => {
            if (multi) {
                const current = (prev[questionId] as string[]) || [];
                if (current.includes(value)) {
                    return { ...prev, [questionId]: current.filter((v) => v !== value) };
                }
                return { ...prev, [questionId]: [...current, value] };
            }
            return { ...prev, [questionId]: value };
        });
    };

    const handleNext = () => {
        if (currentStep < quizQuestions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsCompleted(true);
            // Here you would trigger the recommendation engine
            console.log("Quiz Answers:", answers);
        }
    };

    if (isCompleted) {
        return (
            <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-lg mx-auto border border-beige/50">
                <h3 className="text-2xl font-display font-bold text-dark-deep mb-4">Thanks! We're planning your trip.</h3>
                <p className="text-warm-gray mb-6">Based on your preferences, we've curated some amazing packages for you.</p>
                <Button onClick={() => window.location.href = '/packages'}>
                    View Recommendations
                </Button>
            </div>
        );
    }

    const question = quizQuestions[currentStep];
    const currentAnswer = answers[question.id] || (question.multiSelect ? [] : "");

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-beige/20 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-display font-bold text-dark-deep text-center">{question.text}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {question.options.map((option) => {
                            const isSelected = question.multiSelect
                                ? (currentAnswer as string[]).includes(option.value)
                                : currentAnswer === option.value;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelect(question.id, option.value, !!question.multiSelect)}
                                    className={cn(
                                        "p-6 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                                        isSelected
                                            ? "border-accent bg-accent/5"
                                            : "border-beige/50 bg-white hover:border-accent/50"
                                    )}
                                >
                                    <div>
                                        {option.emoji && <span className="text-2xl mr-3">{option.emoji}</span>}
                                        <span className={cn("font-semibold", isSelected ? "text-dark-deep" : "text-warm-gray group-hover:text-dark-deep")}>
                                            {option.label}
                                        </span>
                                    </div>
                                    {isSelected && <Check className="h-5 w-5 text-accent" />}
                                </button>
                            )
                        })}
                    </div>

                    <div className="pt-6 flex justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)}
                        >
                            {currentStep === quizQuestions.length - 1 ? "Finish" : "Next Step"}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

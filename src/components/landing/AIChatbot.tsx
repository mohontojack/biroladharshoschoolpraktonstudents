"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  UserPlus,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  action?: string;
}

interface RegistrationData {
  name?: string;
  batch?: string;
  phone?: string;
  email?: string;
  profession?: string;
  location?: string;
  attending?: string;
  guests?: string;
}

interface ChatbotWidgetProps {
  onRegistrationComplete?: (data: RegistrationData) => void;
}

function generateSessionId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

const SUGGESTED_QUESTIONS = [
  { text: "Register me for the event", bn: "আমাকে রেজিস্টার করুন" },
  { text: "When is the event?", bn: "ইভেন্টটি কখন?" },
  { text: "Where is the venue?", bn: "ভেন্যু কোথায়?" },
  { text: "How can I contact?", bn: "কিভাবে যোগাযোগ করব?" },
];

export default function ChatbotWidget({ onRegistrationComplete }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const registrationDataRef = useRef<RegistrationData>({});

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text.trim() }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error, action: "error" },
        ]);
      } else {
        const assistantMsg: ChatMessage = {
          role: "assistant",
          content: data.reply || "I'm here to help!",
          action: data.action,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // Track registration data
        if (data.data && typeof data.data === "object") {
          registrationDataRef.current = {
            ...registrationDataRef.current,
            ...data.data,
          };
        }

        // Handle complete registration
        if (data.action === "complete" && data.data && onRegistrationComplete) {
          onRegistrationComplete(data.data);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue. Please try again or use the registration form below.",
          action: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (text: string) => {
    if (!hasStarted) setHasStarted(true);
    sendMessage(text);
  };

  const handleReset = async () => {
    setMessages([]);
    registrationDataRef.current = {};
    setHasStarted(false);
    try {
      await fetch("/api/chatbot", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch {
      // Ignore reset errors
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasStarted) setHasStarted(true);
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[136px] right-4 z-50 sm:bottom-6 sm:right-6 flex items-center justify-center w-14 h-14 bg-forest rounded-full shadow-lg shadow-forest/30 hover:shadow-forest/50 transition-all duration-300 group"
            aria-label="Open AI Chat Assistant"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute inset-0 rounded-full bg-forest animate-ping opacity-20" />
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-forest-dark" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-50 ${
              isMinimized
                ? 'bottom-[136px] right-4 w-72 sm:bottom-6 sm:right-6'
                : 'bottom-20 right-4 w-[calc(100vw-2rem)] max-w-[370px] sm:bottom-6 sm:right-6'
            } bg-white rounded-2xl shadow-2xl shadow-forest/20 border border-forest/10 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-forest to-forest-dark text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1.5">
                    BAHS Alumni Assistant
                    <Sparkles className="w-3 h-3 text-gold" />
                  </h3>
                  <p className="text-xs text-white/60">
                    AI-powered registration helper
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <ChevronDown
                    className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                      isMinimized ? "" : "rotate-180"
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-cream/30">
                  {messages.length === 0 && !hasStarted && (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <div className="w-16 h-16 rounded-full bg-forest/5 border border-forest/10 flex items-center justify-center mb-4">
                        <UserPlus className="w-7 h-7 text-forest/50" />
                      </div>
                      <h4 className="text-forest-dark font-semibold text-base mb-1">
                        Welcome to BAHS Alumni Reunion!
                      </h4>
                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                        I can help you register for the event or answer any questions. Just ask!
                      </p>

                      {/* Suggested Questions */}
                      <div className="grid grid-cols-1 gap-2 w-full">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestedQuestion(q.text)}
                            className="text-left text-sm px-3.5 py-2.5 bg-white rounded-xl border border-forest/10 hover:border-forest/25 hover:bg-white shadow-sm transition-all duration-200 text-forest/80 hover:text-forest-dark"
                          >
                            {q.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-forest text-white rounded-br-md"
                            : msg.action === "complete"
                            ? "bg-green-50 text-forest-dark border border-green-200 rounded-bl-md"
                            : msg.action === "error"
                            ? "bg-red-50 text-red-700 border border-red-100 rounded-bl-md"
                            : "bg-white text-forest-dark border border-forest/5 rounded-bl-md shadow-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-forest/5 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-forest/30 rounded-full animate-bounce [animation-delay:0ms]" />
                          <div className="w-2 h-2 bg-forest/30 rounded-full animate-bounce [animation-delay:150ms]" />
                          <div className="w-2 h-2 bg-forest/30 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Reset Button */}
                {messages.length > 0 && (
                  <div className="px-4 py-1.5 bg-white border-t border-forest/5">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-forest transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Start new conversation
                    </button>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-3 bg-white border-t border-forest/5">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type a message..."
                      disabled={isLoading}
                      className="flex-1 h-10 px-3.5 bg-cream/50 border border-forest/10 rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-forest/30 disabled:opacity-50 transition-colors"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isLoading || !inputValue.trim()}
                      className="h-11 w-11 p-0 bg-forest hover:bg-forest-light text-white rounded-xl disabled:opacity-40 transition-colors flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground/40 mt-1.5 text-center">
                    AI-powered by BAHS প্রাক্তন শিক্ষার্থী
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

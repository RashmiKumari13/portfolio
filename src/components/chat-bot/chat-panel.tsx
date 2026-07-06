"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(500, "Message too long"),
});

type FormData = z.infer<typeof messageSchema>;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What is your tech stack?",
  "Tell me about Sentinel Vector DB.",
  "Are you open to relocation?",
  "What are you looking for next?",
];

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Alex's AI Assistant. Ask me anything about my systems engineering background, Rust/Go web projects, Three.js shaders, or availability.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  });

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const onSubmit = async (data: FormData) => {
    const userMsg = data.message.trim();
    if (!userMsg) return;

    // Append user message
    const updatedMessages = [...messages, { role: "user", content: userMsg } as Message];
    setMessages(updatedMessages);
    reset();
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error("API call failed");

      const result = await response.json();
      setMessages((prev) => [...prev, result]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble reaching the telemetry gateway. Please try asking again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedClick = (question: string) => {
    setValue("message", question);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger Button */}
        <SheetTrigger
          render={
            <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-black font-bold shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300" />
          }
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs tracking-wider uppercase font-extrabold">Ask AI Assistant</span>
          </span>
        </SheetTrigger>

        {/* Sheet Content Panel */}
        <SheetContent className="glass-panel-heavy border-l border-white/10 w-full sm:max-w-md flex flex-col h-full text-white p-0">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between">
            <SheetTitle className="text-white text-base font-bold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Recruiter Assistant</span>
            </SheetTitle>
          </SheetHeader>

          {/* Messages Feed */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 no-scrollbar">
            <div className="space-y-4 pb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`p-1.5 rounded-lg border text-xs shrink-0 ${
                      msg.role === "user"
                        ? "bg-zinc-800 border-zinc-700 text-zinc-300"
                        : "bg-primary/10 border-primary/20 text-primary"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-zinc-850 text-white rounded-tr-none border border-white/5"
                        : "bg-white/5 text-zinc-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.content.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex items-center gap-2 max-w-[80%] mr-auto">
                  <div className="p-1.5 rounded-lg border bg-primary/10 border-primary/20 text-primary shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-white/5 bg-black/20">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                Suggested Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 text-left transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t border-white/10 bg-zinc-950">
            <div className="flex gap-2 relative items-center">
              <input
                {...register("message")}
                type="text"
                placeholder="Ask about my experience, skills..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 transition-all pr-10"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 p-1.5 rounded-lg bg-primary text-black hover:bg-primary/80 disabled:opacity-50 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {errors.message && (
              <span className="text-[10px] text-rose-500 mt-1 block pl-2">{errors.message.message}</span>
            )}
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

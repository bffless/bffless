import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { UIMessage } from "@ai-sdk/react";
import type { ChatStatus, SuggestionItem } from "./types";

interface ChatMessagesProps {
  messages: UIMessage[];
  status: ChatStatus;
  suggestions: SuggestionItem[];
  onSuggestionClick: (prompt: string) => void;
}

function getMessageText(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) return "";
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } => part.type === "text"
    )
    .map((part) => part.text)
    .join("");
}

function EmptyState({
  suggestions,
  onSuggestionClick,
}: {
  suggestions: SuggestionItem[];
  onSuggestionClick: (prompt: string) => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-charcoal"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-charcoal">Hi there!</h3>
        <p className="mt-1 text-sm text-charcoal-muted">
          Ask me anything about BFFless
        </p>
      </div>
      <div className="w-full space-y-2">
        {suggestions.map((s) => (
          <button
            key={s.prompt}
            onClick={() => onSuggestionClick(s.prompt)}
            className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-left text-sm text-charcoal transition-colors hover:border-charcoal-muted hover:bg-cream-dark"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChatMessages({
  messages,
  status,
  suggestions,
  onSuggestionClick,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <EmptyState
        suggestions={suggestions}
        onSuggestionClick={onSuggestionClick}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {messages.map((message) => {
        const text = getMessageText(message);
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                isUser
                  ? "bg-charcoal text-white"
                  : "bg-cream-dark text-charcoal"
              }`}
            >
              {isUser ? (
                <p className="text-sm whitespace-pre-wrap">{text}</p>
              ) : (
                <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_pre]:bg-charcoal [&_pre]:text-white [&_pre]:rounded-md [&_pre]:p-2 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_code]:text-xs [&_a]:text-charcoal [&_a]:underline">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {(status === "streaming" || status === "submitted") &&
        messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-cream-dark px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-charcoal-muted" />
              </div>
            </div>
          </div>
        )}
      <div ref={messagesEndRef} />
    </div>
  );
}

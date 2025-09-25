'use client';

import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    headings.push({ id, text, level });
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const extractedHeadings = extractHeadings(content);
    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    // Find all heading elements and observe them
    const headingElements = headings.map(heading =>
      document.getElementById(heading.id)
    ).filter(Boolean);

    headingElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      headingElements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="card p-4">
      <h3 className="text-lg font-semibold text-white mb-4 font-display">
        Table of Contents
      </h3>

      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(heading.id)}
              className={`block w-full text-left text-sm transition-colors duration-200 py-1 px-2 rounded ${
                activeId === heading.id
                  ? 'text-destiny-primary bg-destiny-primary/10 border-l-2 border-destiny-primary'
                  : 'text-destiny-gray-400 hover:text-destiny-primary hover:bg-destiny-primary/5'
              }`}
              style={{
                paddingLeft: `${(heading.level - 1) * 0.5 + 0.5}rem`,
              }}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>

      {/* Progress indicator */}
      <div className="mt-6 pt-4 border-t border-destiny-gray-700">
        <div className="flex items-center gap-2 text-xs text-destiny-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Reading progress</span>
        </div>
        <div className="mt-2 w-full bg-destiny-gray-800 rounded-full h-2">
          <div
            className="bg-destiny-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, Math.max(0,
                headings.findIndex(h => h.id === activeId) / Math.max(1, headings.length - 1) * 100
              ))}%`,
            }}
          />
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs bg-destiny-gray-800 hover:bg-destiny-primary/20 text-destiny-gray-400 hover:text-destiny-primary rounded transition-colors duration-200"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Back to top
      </button>
    </nav>
  );
}
'use client';

import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { COMMANDS, getWelcomeMessage, getCommandNames } from '@/lib/commands';

interface OutputItem {
  id: number;
  type: 'command' | 'response';
  content: React.ReactNode;
  command?: string;
}

interface TerminalProps {
  externalCommand?: string;
  onCommandExecuted?: () => void;
}

export default function Terminal({ externalCommand, onCommandExecuted }: TerminalProps) {
  const [output, setOutput] = useState<OutputItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  // Initialize with welcome message
  useEffect(() => {
    setOutput([{
      id: idCounter.current++,
      type: 'response',
      content: getWelcomeMessage(),
    }]);
  }, []);

  // Handle external commands from sidebar
  useEffect(() => {
    if (externalCommand) {
      executeCommand(externalCommand);
      onCommandExecuted?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalCommand]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '') {
      // Just show a new prompt line
      setOutput(prev => [...prev, {
        id: idCounter.current++,
        type: 'command',
        content: null,
        command: '',
      }]);
      return;
    }

    // Add to history
    setCommandHistory(prev => {
      if (prev[0] !== trimmedInput) {
        const newHistory = [trimmedInput, ...prev];
        return newHistory.slice(0, 50);
      }
      return prev;
    });

    // Parse command
    const parts = trimmedInput.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add command to output
    const commandOutputItem: OutputItem = {
      id: idCounter.current++,
      type: 'command',
      content: null,
      command: trimmedInput,
    };

    // Execute command
    let result: React.ReactNode;
    if (COMMANDS[commandName]) {
      result = COMMANDS[commandName].execute(args);
      
      // Handle clear command
      if (result === '__CLEAR__') {
        setOutput([]);
        setInputValue('');
        setHistoryIndex(-1);
        return;
      }
    } else {
      result = (
        <div>
          <div className="text-accent">Command not found: {commandName}</div>
          <div className="text-text-muted">Type &apos;help&apos; to see available commands.</div>
        </div>
      );
    }

    const responseOutputItem: OutputItem = {
      id: idCounter.current++,
      type: 'response',
      content: result,
    };

    setOutput(prev => [...prev, commandOutputItem, responseOutputItem]);
    setInputValue('');
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        executeCommand(inputValue);
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          if (historyIndex === -1) {
            setCurrentInput(inputValue);
          }
          const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInputValue(currentInput);
        }
        break;
      
      case 'Tab':
        e.preventDefault();
        autocomplete();
        break;
      
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          if (inputValue !== '') {
            setOutput(prev => [...prev, {
              id: idCounter.current++,
              type: 'command',
              content: null,
              command: inputValue + '^C',
            }]);
            setInputValue('');
            setHistoryIndex(-1);
          }
        }
        break;
      
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          setOutput([]);
        }
        break;
    }
  };

  const autocomplete = () => {
    const input = inputValue.trim().toLowerCase();
    if (input === '') return;

    const commandNames = getCommandNames();
    const matches = commandNames.filter(cmd => cmd.startsWith(input));

    if (matches.length === 1) {
      setInputValue(matches[0]);
    } else if (matches.length > 1) {
      // Find common prefix
      let prefix = matches[0];
      for (let i = 1; i < matches.length; i++) {
        while (!matches[i].startsWith(prefix)) {
          prefix = prefix.slice(0, -1);
          if (prefix === '') break;
        }
      }
      if (prefix.length > input.length) {
        setInputValue(prefix);
      } else {
        // Show available matches
        setOutput(prev => [...prev, 
          {
            id: idCounter.current++,
            type: 'command',
            content: null,
            command: inputValue,
          },
          {
            id: idCounter.current++,
            type: 'response',
            content: <div className="text-text-muted">{matches.join('  ')}</div>,
          }
        ]);
      }
    }
  };

  const handleContentClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] xl:h-[700px] bg-bg-secondary rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(230,57,70,0.1)] border border-bg-tertiary flex flex-col">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-bg-titlebar border-b border-bg-tertiary select-none">
        <div className="flex gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-btn-close hover:brightness-125 transition-all cursor-pointer" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-btn-minimize hover:brightness-125 transition-all cursor-pointer" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-btn-maximize hover:brightness-125 transition-all cursor-pointer" />
        </div>
        <div className="text-xs sm:text-sm text-text-secondary font-medium truncate max-w-[150px] sm:max-w-none">
          visitor@portfolio — zsh
        </div>
        <div className="w-[40px] sm:w-[52px]" />
      </div>

      {/* Terminal Content */}
      <div 
        ref={contentRef}
        className="flex-1 p-3 sm:p-4 md:p-5 overflow-y-auto flex flex-col cursor-text"
        onClick={handleContentClick}
      >
        {/* Output */}
        <div className="flex-1 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words overflow-x-auto">
          {output.map((item) => (
            <div key={item.id} className="mb-1">
              {item.type === 'command' && (
                <div className="flex items-start sm:items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                  <Prompt />
                  <span className="break-all">{item.command}</span>
                </div>
              )}
              {item.type === 'response' && (
                <div className="mb-3 sm:mb-4">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        {/* Input Line */}
        <div className="flex items-start sm:items-center pt-2 gap-1 sm:gap-0">
          <Prompt />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-text-primary caret-accent ml-1 sm:ml-2 text-xs sm:text-sm min-w-0"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="flex-shrink-0 text-xs sm:text-sm">
      <span className="text-prompt-green font-semibold">visitor</span>
      <span className="text-text-secondary">@</span>
      <span className="text-prompt-cyan font-semibold">portfolio</span>
      <span className="text-text-secondary">:</span>
      <span className="text-prompt-yellow">~</span>
      <span className="text-text-primary ml-1">$</span>
    </span>
  );
}

import React from 'react';

export interface SearchInputProps {
  initialValue: string | null;
  onSearch: (value: string | null) => void;
}

export interface SearchInputState {
  inputValue: string;
}

export interface ContentGridProps {
  items: Record<string, string>[];
}

export interface ContentGridState {
  items: Record<string, string>[];
}

export interface GridElementState {
  element: Record<string, string>;
}
export interface GridElementProps {
  element: Record<string, string>;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface StarWarsData {
  count: number;
  next: string;
  previous: string | null;
  results: Record<string, string>[];
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

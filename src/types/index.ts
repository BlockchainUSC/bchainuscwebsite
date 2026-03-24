export interface ResearchPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  url?: string;
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  location: string;
  description: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  url?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

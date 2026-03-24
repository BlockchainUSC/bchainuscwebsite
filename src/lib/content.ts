import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ResearchPost, Event } from "@/types";

const contentDir = path.join(process.cwd(), "content");
const dataDir = path.join(process.cwd(), "data");

export function getAllResearch(): ResearchPost[] {
  const dir = path.join(contentDir, "research");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? "",
      url: data.url ?? undefined,
    } satisfies ResearchPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllEvents(): Event[] {
  const dir = path.join(contentDir, "events");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const events = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      displayDate: data.displayDate ?? "",
      location: data.location ?? "",
      description: data.description ?? "",
      buttonText: data.buttonText ?? "RSVP",
      buttonVariant: data.buttonVariant ?? "secondary",
      url: data.url ?? undefined,
    } satisfies Event;
  });

  return events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getTeamMembers() {
  const file = path.join(dataDir, "team.json");
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as import("@/types").TeamMember[];
}

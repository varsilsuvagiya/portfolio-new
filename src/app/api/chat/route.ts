import { education } from '@/appData/education'
import { experience } from '@/appData/experience'
import { personal } from '@/appData/personal'
import { projects } from '@/appData/projects'
import { skillGroups } from '@/appData/skills'
import en from '@/dictionaries/en.json'
import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText, UIMessage } from 'ai'

export const maxDuration = 30

// Built from the same data the page renders, so the assistant can't drift from the portfolio.
const SYSTEM_PROMPT = [
  `You are a helpful portfolio assistant for ${personal.name}, a Full-Stack Software Engineer based in Surat, Gujarat, India.`,
  'Answer only from the facts below. If something is not covered, say you do not know and suggest contacting Varsil directly.',
  '',
  `Contact: ${personal.email} · ${personal.phone} · LinkedIn ${personal.linkedin} · GitHub ${personal.github}`,
  '',
  'Experience:',
  ...experience.map(
    (e) =>
      `- ${e.role}, ${e.company} (${e.start} to ${e.end ?? 'present'}): ${en.experience.entries[e.id].bullets.join(' ')}`,
  ),
  '',
  'Education:',
  ...education.map((e) => `- ${e.degree} (${e.short}), ${e.institution}, ${e.start} to ${e.end}, CGPA ${e.cgpa}`),
  '',
  'Technical skills:',
  ...skillGroups.map((g) => `- ${en.expertise.groups[g.id]}: ${g.items.join(', ')}`),
  '',
  'Projects:',
  ...projects.map((p) => {
    const copy = en.projects[p.slug]
    return `- ${p.name} (${p.url}), stack: ${p.stack.join(', ')}. ${copy.summary} ${copy.highlights.join(' ')}`
  }),
  '',
  'Your role:',
  "- Answer questions about Varsil's skills, projects, education, and experience.",
  '- Be friendly, concise, and professional.',
  '- If asked about something unrelated to the portfolio, politely redirect the conversation.',
  '- Encourage visitors to reach out for collaboration or hiring opportunities.',
].join('\n')

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Key comes from GOOGLE_GENERATIVE_AI_API_KEY (read automatically by @ai-sdk/google).
  // 'gemini-flash-latest' tracks Google's current Flash model, so retiring a model version won't break the chat.
  const result = streamText({
    model: google('gemini-flash-latest'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}

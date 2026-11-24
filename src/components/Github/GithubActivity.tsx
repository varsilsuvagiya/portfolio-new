import { personal } from '@/appData/personal'
import type { Dictionary } from '@/dictionaries'
import { formatDay } from '@/utils'
import { ArrowUpRightIcon } from '@/utils/icons'
import SectionHeading from '../SectionHeading/SectionHeading'
import ScrollReveal from '../UI/ScrollReveal'

type Repo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  fork: boolean
  pushed_at: string
}

// Everything shown here comes straight from the public GitHub API (cached for an hour). Nothing is estimated.
async function getGithub() {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const base = `https://api.github.com/users/${personal.githubUser}`

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(base, { headers, next: { revalidate: 3600 } }),
      fetch(`${base}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate: 3600 } }),
    ])
    if (!userRes.ok || !reposRes.ok) return null

    const user: { public_repos: number; followers: number } = await userRes.json()
    const repos = ((await reposRes.json()) as Repo[]).filter((r) => !r.fork)

    const counts = new Map<string, number>()
    for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    const withLanguage = [...counts.values()].reduce((a, b) => a + b, 0)
    const languages = [...counts]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, share: Math.round((n / withLanguage) * 100) }))

    return { publicRepos: user.public_repos, followers: user.followers, languages, recent: repos.slice(0, 4) }
  } catch {
    return null
  }
}

const GithubActivity = async ({ dict, locale }: { dict: Dictionary['github']; locale: string }) => {
  const data = await getGithub()

  return (
    <section id="github" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="06" label={dict.label} title={dict.title} subtitle={dict.subtitle} />

        {data ? (
          <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <dl className="border-border grid grid-cols-2 border-y">
                {[
                  { label: dict.repos, value: data.publicRepos },
                  { label: dict.followers, value: data.followers },
                ].map((stat) => (
                  <div key={stat.label} className="border-border py-6 first:border-r first:pr-6 last:pl-6">
                    <dt className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">{stat.label}</dt>
                    <dd className="text-neutral mt-3 text-5xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              {data.languages.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">{dict.languages}</h3>
                  <ul className="mt-5 space-y-4">
                    {data.languages.map((lang) => (
                      <li key={lang.name}>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral">{lang.name}</span>
                          <span className="text-tertiary-content font-mono tabular-nums">{lang.share}%</span>
                        </div>
                        <div className="bg-border mt-2 h-px">
                          <div className="bg-accent h-px" style={{ width: `${lang.share}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:col-span-7">
              <h3 className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">{dict.recent}</h3>
              <ul className="border-border mt-5 border-t">
                {data.recent.map((repo) => (
                  <li key={repo.name} className="border-border border-b">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/repo flex items-start justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p className="text-neutral font-mono text-base break-words">{repo.name}</p>
                        {repo.description && (
                          <p className="text-tertiary-content mt-1.5 line-clamp-2 text-sm leading-relaxed">{repo.description}</p>
                        )}
                        <p className="text-tertiary-content mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
                          {repo.language && <span>{repo.language}</span>}
                          <span>★ {repo.stargazers_count}</span>
                          <span>
                            {dict.updated} {formatDay(repo.pushed_at, locale)}
                          </span>
                        </p>
                      </div>
                      <ArrowUpRightIcon className="text-tertiary-content group-hover/repo:text-neutral mt-1 shrink-0 transition-transform duration-300 group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        ) : (
          <p className="text-tertiary-content mt-16">{dict.unavailable}</p>
        )}

        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link text-neutral mt-12 inline-flex items-center gap-2 text-sm font-medium">
          <span className="relative">
            {dict.viewProfile}
            <span className="bg-accent absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100" />
          </span>
          <ArrowUpRightIcon />
        </a>
      </div>
    </section>
  )
}

export default GithubActivity

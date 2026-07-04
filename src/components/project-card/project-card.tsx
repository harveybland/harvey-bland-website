export type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  tags: string[];
  stats?: { label: string; value: string }[];
};

export function ProjectCard({
  title,
  description,
  href,
  tags,
  stats,
}: ProjectCardProps) {
  return (
    <article class="project-card">
      <div class="project-card-glow" aria-hidden="true" />
      <div class="project-card-inner">
        <div class="project-card-header">
          <p class="project-card-eyebrow">Featured project</p>
          <h2 class="project-card-title">{title}</h2>
        </div>

        <p class="project-card-description">{description}</p>

        {stats && stats.length > 0 && (
          <dl class="project-card-stats">
            {stats.map((stat) => (
              <div class="project-card-stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul class="project-card-tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <a
          class="project-card-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {title}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

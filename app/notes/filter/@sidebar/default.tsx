
import Link from 'next/link';
import css from './DefaultSidebar.module.css'; 

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
  return (
    <nav className={css.sidebar}>
      <h2 className={css.title}>Tags</h2>
      <ul className={css.list}>
        {tags.map(tag => (
          <li key={tag} className={css.item}>
            <Link href={`/notes/filter/${tag}`} className={css.link}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

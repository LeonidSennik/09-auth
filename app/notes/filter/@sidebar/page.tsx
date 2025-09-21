'use client';
import css from './SidebarNotes.module.css';
import Link from 'next/link';


const tags = ['All', 'Work', 'Personal', 'Important'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map(tag => {
        const href = tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink} aria-label={`Filter by ${tag}`}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
